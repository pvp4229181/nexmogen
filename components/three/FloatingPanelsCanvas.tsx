"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

const MODEL_URL = "/models/floating-ui-panels.obj";

function FloatingPanels() {
  const source = useLoader(OBJLoader, MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const materials = useMemo(
    () => ({
      chassis: new THREE.MeshPhysicalMaterial({ color: "#09090b", metalness: 0.82, roughness: 0.24 }),
      bezel: new THREE.MeshPhysicalMaterial({ color: "#260407", metalness: 0.72, roughness: 0.28 }),
      screen: new THREE.MeshPhysicalMaterial({ color: "#710910", emissive: "#e50914", emissiveIntensity: 0.32, metalness: 0.25, roughness: 0.2, clearcoat: 0.8 }),
      ui: new THREE.MeshStandardMaterial({ color: "#ff4d57", emissive: "#e50914", emissiveIntensity: 0.7, roughness: 0.3 }),
      accent: new THREE.MeshStandardMaterial({ color: "#e50914", emissive: "#9f0710", emissiveIntensity: 0.7, metalness: 0.35, roughness: 0.25 }),
      ink: new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#ff4d57", emissiveIntensity: 0.12, roughness: 0.5 }),
    }),
    []
  );

  const model = useMemo(() => {
    const clone = source.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const normalizedScale = 4.7 / Math.max(size.x, size.y, size.z);

    clone.position.sub(center);
    clone.scale.setScalar(normalizedScale);
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const original = Array.isArray(child.material) ? child.material[0] : child.material;
      const materialName = original?.name?.toLowerCase() ?? "chassis";
      child.material = materials[materialName as keyof typeof materials] ?? materials.chassis;
      child.castShadow = true;
      child.receiveShadow = true;
    });

    return clone;
  }, [materials, source]);

  useEffect(() => {
    return () => Object.values(materials).forEach((material) => material.dispose());
  }, [materials]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.18 - 0.3, 0.035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.1 + Math.sin(time * 0.45) * 0.025, 0.035);
    group.current.rotation.z = Math.sin(time * 0.3) * 0.018;
    group.current.position.y = Math.sin(time * 0.6) * 0.1;
    group.current.rotation.y += delta * 0.025;
  });

  return (
    <group ref={group} scale={viewport.width < 7 ? 0.76 : 1} rotation={[0.05, -0.3, 0]}>
      <primitive object={model} />
    </group>
  );
}

export default function FloatingPanelsCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, 7.2], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      shadows
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#ffffff" castShadow />
      <pointLight position={[-4, 1, 4]} intensity={48} color="#e50914" />
      <pointLight position={[4, -2, 3]} intensity={34} color="#ff4d57" />
      <Suspense fallback={null}>
        <FloatingPanels />
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}

useLoader.preload(OBJLoader, MODEL_URL);
