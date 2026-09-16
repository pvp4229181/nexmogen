"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

function RotatingGroup() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.06;
    group.current.rotation.x = Math.sin(t * 0.08) * 0.15;
    // subtle parallax toward pointer
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      state.pointer.x * 0.08,
      0.02
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.6}>
        <Icosahedron args={[1.15, 1]} position={[2.4, 0.6, -1]}>
          <MeshDistortMaterial
            color="#ef4444"
            distort={0.35}
            speed={2}
            roughness={0.15}
            metalness={0.6}
            emissive="#b91c1c"
            emissiveIntensity={0.25}
          />
        </Icosahedron>
      </Float>

      <Float speed={1.1} rotationIntensity={1.6} floatIntensity={2.2}>
        <Torus args={[0.85, 0.28, 32, 100]} position={[-2.6, -0.4, -1.5]} rotation={[0.6, 0.4, 0]}>
          <MeshDistortMaterial
            color="#ff4d4d"
            distort={0.25}
            speed={1.5}
            roughness={0.2}
            metalness={0.5}
            emissive="#00958a"
            emissiveIntensity={0.2}
          />
        </Torus>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.2}>
        <Octahedron args={[0.55, 0]} position={[0.2, 1.6, -2]}>
          <MeshDistortMaterial
            color="#fb7185"
            distort={0.4}
            speed={3}
            roughness={0.1}
            metalness={0.7}
          />
        </Octahedron>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#fb7185" />
        <pointLight position={[-5, -3, 2]} intensity={1} color="#ff4d4d" />
        <Suspense fallback={null}>
          <RotatingGroup />
        </Suspense>
      </Canvas>
    </div>
  );
}
