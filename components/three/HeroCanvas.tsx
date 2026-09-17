"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Preload,
  Torus,
} from "@react-three/drei";
import * as THREE from "three";

/** Drifting dust field that reacts to the pointer. */
function Particles({ count = 900 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      array[i * 3 + 2] = radius * Math.cos(phi) - 2;
    }
    return array;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.03;
    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      -state.pointer.y * 0.12,
      0.03
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color="#ff4d57"
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Two counter-rotating rings framing the core. */
function OrbitRings() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outer.current) {
      outer.current.rotation.z += delta * 0.12;
      outer.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.35;
    }
    if (inner.current) {
      inner.current.rotation.z -= delta * 0.2;
      inner.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Torus ref={outer} args={[2.5, 0.012, 16, 128]} rotation={[1.2, 0, 0]}>
        <meshBasicMaterial color="#e50914" transparent opacity={0.6} />
      </Torus>
      <Torus ref={inner} args={[3.2, 0.008, 16, 128]} rotation={[0.6, 0.4, 0]}>
        <meshBasicMaterial color="#ff1744" transparent opacity={0.35} />
      </Torus>
    </group>
  );
}

/** The distorted core plus its wireframe shell. */
function Core() {
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!shell.current) return;
    shell.current.rotation.y += delta * 0.08;
    shell.current.rotation.x -= delta * 0.04;
  });

  return (
    <group>
      <Icosahedron args={[1.55, 6]}>
        <MeshDistortMaterial
          color="#b80712"
          distort={0.42}
          speed={1.6}
          roughness={0.12}
          metalness={0.85}
          emissive="#e50914"
          emissiveIntensity={0.35}
        />
      </Icosahedron>

      <Icosahedron ref={shell} args={[2.05, 1]}>
        <meshBasicMaterial color="#ff4d57" wireframe transparent opacity={0.2} />
      </Icosahedron>
    </group>
  );
}

/** Small shards that orbit the core and drift on hover. */
function Shards() {
  const shards = useMemo(
    () => [
      { position: [3.1, 1.4, -1.2], scale: 0.42, speed: 1.6 },
      { position: [-3.4, -1.1, -0.8], scale: 0.32, speed: 1.2 },
      { position: [2.2, -2.1, 0.6], scale: 0.26, speed: 2.1 },
      { position: [-2.6, 2.0, -1.8], scale: 0.36, speed: 1.4 },
    ],
    []
  );

  return (
    <>
      {shards.map((shard, i) => (
        <Float
          key={i}
          speed={shard.speed}
          rotationIntensity={1.4}
          floatIntensity={1.8}
        >
          <mesh position={shard.position as [number, number, number]}>
            <octahedronGeometry args={[shard.scale, 0]} />
            <meshStandardMaterial
              color="#ff1744"
              roughness={0.15}
              metalness={0.8}
              emissive="#e50914"
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** Parallax wrapper: the whole scene leans toward the pointer. */
function Stage() {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const compact = viewport.width < 7;

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.35,
      0.035
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.25,
      0.035
    );
  });

  return (
    <group ref={group} scale={compact ? 0.68 : 1}>
      <Core />
      <OrbitRings />
      <Shards />
      <Particles count={compact ? 450 : 900} />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 5, 6]} intensity={90} color="#e50914" />
      <pointLight position={[-6, -4, 3]} intensity={55} color="#ff4d57" />
      <spotLight position={[0, 8, 4]} angle={0.5} intensity={60} color="#ffffff" />
      <Suspense fallback={null}>
        <Stage />
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
