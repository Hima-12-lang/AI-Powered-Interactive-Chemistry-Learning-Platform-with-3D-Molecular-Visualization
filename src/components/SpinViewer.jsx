import { lazy, Suspense, useEffect, useState } from "react";
import { Camera, Download, EyeOff, RotateCcw, RotateCw, Tags, ZoomIn, ZoomOut } from "lucide-react";
import { groupClass } from "../utils/groupTheme.js";

const ModelViewer = lazy(() => import("./ModelViewer.jsx"));

export default function SpinViewer({ object, onScreenshot, onExport }) {
  const [autoRotate, setAutoRotate] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [zoomSignal, setZoomSignal] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const [uiHidden, setUiHidden] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [exploreMode, setExploreMode] = useState(true);

  useEffect(() => {
    setAutoRotate(false);
    setModelReady(false);
    setModelError(false);
    setLoadProgress(0);
    setZoomSignal(0);
    setResetSignal(0);
    setUiHidden(false);
    setExploreMode(true);
  }, [object.id]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Space") {
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA" || event.target.isContentEditable) return;
        event.preventDefault();
        setAutoRotate((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleWheel = (event) => {
    setZoomSignal((current) => current + (event.deltaY < 0 ? 1 : -1));
  };

  const resetView = () => {
    setResetSignal((current) => current + 1);
  };

  const zoomIn = () => {
    setZoomSignal((current) => current + 1);
  };

  const zoomOut = () => {
    setZoomSignal((current) => current - 1);
  };

  const downloadModel = () => {
    if (!object.modelPath || modelError) {
      onExport();
      return;
    }
    const link = document.createElement("a");
    link.href = object.modelPath;
    link.download = `${object.name}.glb`;
    link.click();
  };

  return (
    <div
      className={`${uiHidden ? "spin-area model-only ui-hidden" : "spin-area model-only"} ${groupClass(object.group)} ${isInteracting ? "is-interacting" : ""}`}
      onWheel={handleWheel}
      onPointerDownCapture={() => setIsInteracting(true)}
      onPointerUpCapture={() => setIsInteracting(false)}
      onPointerCancelCapture={() => setIsInteracting(false)}
      onPointerLeave={() => setIsInteracting(false)}
    >
      <div className="particle particle-one" />
      <div className="particle particle-two" />
      <div className="particle particle-three" />
      {!uiHidden && <div className="viewer-status-strip">
        <label className="toggle-line">
          <input type="checkbox" checked={autoRotate} onChange={(event) => setAutoRotate(event.target.checked)} />
          <span>Auto Rotate</span>
        </label>
        <label className="toggle-line">
          <input type="checkbox" checked={exploreMode} onChange={(event) => setExploreMode(event.target.checked)} />
          <span>Labels</span>
        </label>
        <div className="frame-pill">
          {modelError ? "Model Needed" : modelReady ? "Live 3D Structure" : `Loading ${loadProgress}%`}
        </div>
      </div>}

      <div className="model-stage">
        <div className="radial-glow" />
        <div className="orbit-ring" />
        {modelError ? (
          <div className="missing-image model-missing">
            <strong>3D model not found</strong>
            <span>Unable to render this chemistry structure.</span>
            <code>{object.name}</code>
          </div>
        ) : (
          <Suspense fallback={<div className="image-skeleton">Preparing 3D viewer...</div>}>
            <ModelViewer
              object={object}
              autoRotate={autoRotate}
              zoomSignal={zoomSignal}
              resetSignal={resetSignal}
              onReady={() => {
                setLoadProgress(100);
                setModelReady(true);
              }}
              onError={() => setModelError(true)}
              onProgress={setLoadProgress}
            />
          </Suspense>
        )}
        <div className="scale-ghost" aria-label={`Scale reference for ${object.name}`}>
          <span className="hand-ghost" />
          <span className="scale-dot" />
          <small>{object.size}</small>
        </div>
        {exploreMode && (
          <div className="exploration-labels" aria-label={`Exploration labels for ${object.name}`}>
            {object.knowledge.parts.slice(0, 4).map((part, index) => (
              <button className={`structure-label label-${index}`} key={part.name} title={part.role}>
                <Tags size={12} />
                <span>{part.name}</span>
              </button>
            ))}
          </div>
        )}
        <div className="soft-shadow" />
      </div>

      {uiHidden ? (
        <button className="show-ui-button" onClick={() => setUiHidden(false)}>Show UI</button>
      ) : (
        <>
          <div className="bottom-controls center">
            <button className={autoRotate ? "control-active rotate-active" : ""} onClick={() => setAutoRotate((value) => !value)} title="Rotate" aria-label="Rotate">
              <RotateCw size={17} />
            </button>
            <button onClick={zoomIn} title="Zoom in" aria-label="Zoom in"><ZoomIn size={17} /></button>
            <button onClick={zoomOut} title="Zoom out" aria-label="Zoom out"><ZoomOut size={17} /></button>
            <button onClick={() => setUiHidden(true)} title="Hide UI" aria-label="Hide UI"><EyeOff size={17} /></button>
            <button onClick={resetView} title="Reset view" aria-label="Reset view"><RotateCcw size={17} /></button>
            <button onClick={onScreenshot} title="Screenshot" aria-label="Screenshot"><Camera size={17} /></button>
            <button className={modelError ? "disabled" : ""} onClick={downloadModel} aria-disabled={modelError} title="Download model" aria-label="Download model">
              <Download size={17} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
