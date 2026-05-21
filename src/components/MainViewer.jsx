import { Camera, Download, EyeOff, Info, Layers3, RotateCcw, RotateCw, Sparkles } from "lucide-react";
import SpinViewer from "./SpinViewer.jsx";
import { groupClass } from "../utils/groupTheme.js";

export default function MainViewer({ object, onToast }) {
  return (
    <section className={`viewer-card ${groupClass(object.group)}`}>
      <div className="viewer-title-row">
        <div>
          <h2>{object.name}</h2>
          <p>{object.category} / {object.subtitle}</p>
        </div>
        <div className="tip-note">Tip: Drag to rotate. Scroll to zoom.</div>
      </div>
      <SpinViewer
        object={object}
        onScreenshot={() => onToast("Screenshot captured for studio view")}
        onExport={() => onToast("This chemistry structure is rendered live in the browser")}
      />
      <div className="viewer-meta-strip">
        <span><Sparkles size={15} /> {object.mainFunction}</span>
        <span><Info size={15} /> {object.keyFeatures.slice(0, 3).join(" / ")}</span>
      </div>
      <div className="hidden-icon-bank" aria-hidden="true">
        <RotateCw /><RotateCcw /><EyeOff /><Camera /><Download /><Layers3 />
      </div>
    </section>
  );
}
