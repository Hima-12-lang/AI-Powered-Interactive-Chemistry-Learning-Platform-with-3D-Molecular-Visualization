import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Box3, Vector3 } from "three";

const makeMaterial = (color, options = {}) =>
  new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.48,
    metalness: options.metalness ?? 0.08,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0
  });

const createBondMesh = (start, end, color = 0xdbeafe, radius = 0.055) => {
  const direction = new Vector3().subVectors(end, start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 20);
  const material = makeMaterial(color, { roughness: 0.34, metalness: 0.18 });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize());
  return mesh;
};

const createChemistryModel = (structure) => {
  const group = new THREE.Group();
  const atoms = structure.atoms ?? [];

  atoms.forEach((item) => {
    const geometry = new THREE.SphereGeometry(item.radius ?? 0.3, 48, 32);
    const mesh = new THREE.Mesh(geometry, makeMaterial(item.color ?? "#e2e8f0"));
    mesh.position.set(item.x, item.y, item.z);
    mesh.name = item.element;
    group.add(mesh);
  });

  (structure.bonds ?? []).forEach((item) => {
    const fromAtom = atoms[item.from];
    const toAtom = atoms[item.to];
    if (!fromAtom || !toAtom) return;

    const from = new Vector3(fromAtom.x, fromAtom.y, fromAtom.z);
    const to = new Vector3(toAtom.x, toAtom.y, toAtom.z);
    const order = Math.round(item.order ?? 1);
    const offsets = order === 2 ? [-0.07, 0.07] : order >= 3 ? [-0.11, 0, 0.11] : [0];
    const axis = new Vector3().subVectors(to, from).normalize();
    const offsetDirection = new Vector3().crossVectors(axis, new Vector3(0, 0, 1));
    if (offsetDirection.lengthSq() < 0.001) offsetDirection.crossVectors(axis, new Vector3(0, 1, 0));
    offsetDirection.normalize();

    offsets.forEach((offset) => {
      const shift = offsetDirection.clone().multiplyScalar(offset);
      group.add(createBondMesh(from.clone().add(shift), to.clone().add(shift), 0xcbd5e1, 0.045));
    });
  });

  (structure.orbits ?? []).forEach((orbit, index) => {
    const geometry = new THREE.TorusGeometry(orbit.radius, 0.008, 12, 112);
    const material = new THREE.MeshBasicMaterial({
      color: orbit.color ?? "#60a5fa",
      transparent: true,
      opacity: 0.72
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = index % 2 ? Math.PI / 2.8 : Math.PI / 2;
    ring.rotation.y = index % 2 ? Math.PI / 5 : 0;
    group.add(ring);
  });

  (structure.electronPairs ?? []).forEach((electron) => {
    const geometry = new THREE.SphereGeometry(0.08, 24, 16);
    const mesh = new THREE.Mesh(
      geometry,
      makeMaterial(electron.color ?? "#60a5fa", { emissive: 0x2563eb, emissiveIntensity: 0.25 })
    );
    mesh.position.set(electron.x, electron.y, electron.z);
    group.add(mesh);
  });

  return group;
};

export default function ModelViewer({ object, autoRotate, zoomSignal, resetSignal, onReady, onError, onProgress }) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const baseDistanceRef = useRef(6);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  const onProgressRef = useRef(onProgress);
  const autoRotateRef = useRef(autoRotate);
  const lastZoomSignalRef = useRef(zoomSignal);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    onReadyRef.current = onReady;
    onErrorRef.current = onError;
    onProgressRef.current = onProgress;
  }, [onReady, onError, onProgress]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
    if (controlsRef.current) controlsRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    lastZoomSignalRef.current = zoomSignal;
    setProgress(0);
    onProgressRef.current?.(0);

    const scene = new THREE.Scene();
    scene.background = null;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 1000);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minPolarAngle = 0.08;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1.4;
    controls.maxDistance = 18;
    controls.autoRotateSpeed = 1.7;
    controlsRef.current = controls;

    scene.add(new THREE.HemisphereLight(0xfff4dd, 0x7a8f78, 2.25));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xaed6ff, 2.1);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    const warmLight = new THREE.PointLight(0xffc27a, 12, 20);
    warmLight.position.set(0, -3, 4);
    scene.add(warmLight);

    let disposed = false;
    let frameId = 0;

    const resize = () => {
      const width = mount.clientWidth || 640;
      const height = mount.clientHeight || 420;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const frameModel = (model) => {
      const box = new Box3().setFromObject(model);
      const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
      const maxSize = Math.max(size.x, size.y, size.z) || 1;

      model.position.sub(center);
      model.scale.setScalar(3.2 / maxSize);

      const cameraDistance = 7;
      baseDistanceRef.current = cameraDistance;

      camera.position.set(cameraDistance * 0.72, cameraDistance * 0.32, cameraDistance);
      camera.near = 0.01;
      camera.far = 100;
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.minDistance = 2.2;
      controls.maxDistance = 14;
      controls.minPolarAngle = 0.08;
      controls.maxPolarAngle = Math.PI * 0.5;
      controls.update();
    };

    if (object.structure) {
      const model = createChemistryModel(object.structure);
      scene.add(model);
      modelRef.current = model;
      frameModel(model);
      setProgress(100);
      onProgressRef.current?.(100);
      onReadyRef.current?.();
    } else if (object.modelPath) {
      const loader = new GLTFLoader();
      loader.load(
        object.modelPath,
        (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        model.traverse((child) => {
          if (!child.isMesh) return;
          child.castShadow = true;
          child.receiveShadow = true;
          const originalMaterial = Array.isArray(child.material) ? child.material[0] : child.material;
          child.material = new THREE.MeshStandardMaterial({
            map: originalMaterial?.map ?? null,
            normalMap: originalMaterial?.normalMap ?? null,
            color: 0xf2e9ff,
            roughness: 0.72,
            metalness: 0.02,
            side: THREE.DoubleSide
          });
          child.material.needsUpdate = true;
        });
        scene.add(model);
        modelRef.current = model;
        frameModel(model);
        setProgress(100);
        onProgressRef.current?.(100);
        onReadyRef.current?.();
      },
      (event) => {
        const nextProgress = event.total
          ? Math.round((event.loaded / event.total) * 100)
          : Math.min(95, Math.round((event.loaded / 1024 / 1024) * 8));
        setProgress(nextProgress);
        onProgressRef.current?.(nextProgress);
      },
      (error) => {
        if (disposed) return;
        onErrorRef.current?.(error);
      }
      );
    } else {
      onErrorRef.current?.(new Error("No model source available"));
    }

    const animate = () => {
      controls.autoRotate = autoRotateRef.current;
      controls.update();
      mount.dataset.autoRotate = String(controls.autoRotate);
      mount.dataset.cameraDistance = camera.position.distanceTo(controls.target).toFixed(3);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      controls.dispose();
      renderer.dispose();
      scene.traverse((item) => {
        if (item.geometry) item.geometry.dispose();
        if (item.material) {
          const materials = Array.isArray(item.material) ? item.material : [item.material];
          materials.forEach((material) => material.dispose());
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, [object.id, object.modelPath]);

  useEffect(() => {
    if (!controlsRef.current || !cameraRef.current) return;
    const delta = zoomSignal - lastZoomSignalRef.current;
    lastZoomSignalRef.current = zoomSignal;
    if (delta === 0) return;

    const controls = controlsRef.current;
    const camera = cameraRef.current;
    const direction = camera.position.clone().sub(controls.target).normalize();
    const currentDistance = camera.position.distanceTo(controls.target);
    const nextDistance = Math.min(
      controls.maxDistance,
      Math.max(controls.minDistance, currentDistance - delta * baseDistanceRef.current * 0.14)
    );
    camera.position.copy(controls.target).add(direction.multiplyScalar(nextDistance));
    controls.update();
  }, [zoomSignal]);

  useEffect(() => {
    if (!controlsRef.current || !cameraRef.current) return;
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    const distance = baseDistanceRef.current;
    camera.position.set(distance * 0.7, distance * 0.35, distance);
    controls.target.set(0, 0, 0);
    controls.update();
  }, [resetSignal]);

  return (
    <div className="glb-viewer" ref={mountRef}>
      {progress < 100 && (
        <div className="model-loading">
          <div className="model-loading-top">
            <span>Loading 3D structure</span>
            <b>{progress}%</b>
          </div>
          <div className="model-progress-track">
            <div className="model-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
