"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Wireframe globe with nodes on the surface — the "global delivery" motif. */
function Globe() {
  const globe = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const points: [number, number, number][] = [];
    const total = 60;
    for (let i = 0; i < total; i += 1) {
      // Fibonacci sphere keeps the nodes evenly spread.
      const y = 1 - (i / (total - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      points.push([
        Math.cos(theta) * radius * 2.02,
        y * 2.02,
        Math.sin(theta) * radius * 2.02,
      ]);
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (!globe.current) return;
    globe.current.rotation.y += delta * 0.14;
    globe.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
  });

  return (
    <group ref={globe}>
      <mesh>
        <sphereGeometry args={[2, 28, 20]} />
        <meshBasicMaterial color="#ff4d57" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.96, 32, 32]} />
        <meshStandardMaterial
          color="#08131a"
          roughness={0.4}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#ffffff" : "#ff4d57"} />
        </mesh>
      ))}
    </group>
  );
}

export default function GlobeCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 5]} intensity={60} color="#e50914" />
      <pointLight position={[-4, -2, 2]} intensity={35} color="#ff4d57" />
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
    </Canvas>
  );
}
