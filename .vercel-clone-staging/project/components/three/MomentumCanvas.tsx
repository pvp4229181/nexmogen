"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Float, Preload } from "@react-three/drei";
import * as THREE from "three";

const VALUES = [0.68, 0.96, 1.34, 1.18, 1.92, 2.42, 3.08];
const BASE_Y = -1.55;

type Segment = {
  length: number;
  rotation: THREE.Quaternion;
};

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function MeasurementGrid() {
  const positions = useMemo(() => {
    const lines: number[] = [];

    for (let x = -3.25; x <= 3.25; x += 0.65) {
      lines.push(x, BASE_Y, -0.72, x, BASE_Y, 0.72);
    }

    for (let z = -0.72; z <= 0.72; z += 0.36) {
      lines.push(-3.25, BASE_Y, z, 3.25, BASE_Y, z);
    }

    return new Float32Array(lines);
  }, []);

  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ff4d57" transparent opacity={0.16} />
      </lineSegments>
      <mesh position={[0, BASE_Y - 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.7, 1.7]} />
        <meshBasicMaterial color="#190205" transparent opacity={0.32} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function GrowthGraph() {
  const chart = useRef<THREE.Group>(null);
  const bars = useRef<Array<THREE.Group | null>>([]);
  const segments = useRef<Array<THREE.Group | null>>([]);
  const nodes = useRef<Array<THREE.Mesh | null>>([]);
  const arrow = useRef<THREE.Mesh>(null);

  const points = useMemo(
    () =>
      VALUES.map(
        (height, index) =>
          new THREE.Vector3(-2.42 + index * 0.82, BASE_Y + height + 0.2, 0.08)
      ),
    []
  );

  const lineSegments = useMemo<Segment[]>(
    () =>
      points.slice(0, -1).map((point, index) => {
        const direction = points[index + 1].clone().sub(point);
        return {
          length: direction.length(),
          rotation: new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.normalize()
          ),
        };
      }),
    [points]
  );

  const arrowRotation = useMemo(() => {
    const direction = points.at(-1)!.clone().sub(points.at(-2)!).normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );
  }, [points]);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    bars.current.forEach((bar, index) => {
      if (!bar) return;
      const progress = THREE.MathUtils.clamp((elapsed - index * 0.14) / 1.15, 0, 1);
      bar.scale.y = Math.max(0.001, easeOutCubic(progress));
    });

    segments.current.forEach((segment, index) => {
      if (!segment) return;
      const progress = THREE.MathUtils.clamp((elapsed - 0.55 - index * 0.18) / 0.65, 0, 1);
      segment.scale.y = Math.max(0.001, easeOutCubic(progress));
    });

    nodes.current.forEach((node, index) => {
      if (!node) return;
      const progress = THREE.MathUtils.clamp((elapsed - 0.7 - index * 0.18) / 0.35, 0, 1);
      const pulse = 1 + Math.sin(elapsed * 2.2 + index * 0.65) * 0.08;
      node.scale.setScalar(Math.max(0.001, easeOutCubic(progress) * pulse));
    });

    if (arrow.current) {
      const progress = THREE.MathUtils.clamp((elapsed - 1.75) / 0.45, 0, 1);
      arrow.current.scale.setScalar(Math.max(0.001, easeOutCubic(progress)));
    }

    if (chart.current) {
      chart.current.rotation.y = THREE.MathUtils.lerp(
        chart.current.rotation.y,
        -0.16 + state.pointer.x * 0.12,
        0.035
      );
      chart.current.rotation.x = THREE.MathUtils.lerp(
        chart.current.rotation.x,
        -0.08 - state.pointer.y * 0.07,
        0.035
      );
    }
  });

  return (
    <Float speed={1.15} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={chart} rotation={[-0.08, -0.16, -0.04]}>
        <MeasurementGrid />

        {VALUES.map((height, index) => (
          <group
            key={`${height}-${index}`}
            ref={(node) => {
              bars.current[index] = node;
            }}
            position={[-2.42 + index * 0.82, BASE_Y, 0]}
            scale={[1, 0.001, 1]}
          >
            <mesh position={[0, height / 2, 0]} castShadow>
              <boxGeometry args={[0.42, height, 0.54]} />
              <meshPhysicalMaterial
                color={index === VALUES.length - 1 ? "#ff3340" : "#c90813"}
                emissive={index > 3 ? "#e50914" : "#76040a"}
                emissiveIntensity={index > 3 ? 0.5 : 0.25}
                metalness={0.72}
                roughness={0.2}
                clearcoat={0.9}
              />
            </mesh>
            <mesh position={[0, height + 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.34, 0.46]} />
              <meshBasicMaterial color="#ff9298" transparent opacity={0.7} />
            </mesh>
          </group>
        ))}

        {lineSegments.map((segment, index) => (
          <group
            key={`${segment.length}-${index}`}
            ref={(node) => {
              segments.current[index] = node;
            }}
            position={points[index]}
            quaternion={segment.rotation}
            scale={[1, 0.001, 1]}
          >
            <mesh position={[0, segment.length / 2, 0]}>
              <cylinderGeometry args={[0.04, 0.04, segment.length, 10]} />
              <meshBasicMaterial color="#fff3f3" toneMapped={false} />
            </mesh>
          </group>
        ))}

        {points.map((point, index) => (
          <mesh
            key={`${point.x}-${point.y}`}
            ref={(node) => {
              nodes.current[index] = node;
            }}
            position={point}
            scale={0.001}
          >
            <sphereGeometry args={[0.095, 20, 20]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        ))}

        <mesh
          ref={arrow}
          position={points.at(-1)!.clone().add(new THREE.Vector3(0.12, 0.19, 0))}
          quaternion={arrowRotation}
          scale={0.001}
        >
          <coneGeometry args={[0.18, 0.46, 4]} />
          <meshPhysicalMaterial
            color="#ff3340"
            emissive="#e50914"
            emissiveIntensity={1}
            metalness={0.55}
            roughness={0.16}
          />
        </mesh>

        <mesh position={[-3.18, 0.25, -0.04]}>
          <boxGeometry args={[0.025, 3.7, 0.025]} />
          <meshBasicMaterial color="#ff4d57" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function Stage() {
  const { viewport } = useThree();
  return (
    <group scale={viewport.width < 7 ? 0.76 : 0.96} position={[0, 0.05, 0]}>
      <GrowthGraph />
    </group>
  );
}

export default function MomentumCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.35, 7.6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.75} />
      <pointLight position={[4, 5, 5]} intensity={72} color="#ff4d57" />
      <pointLight position={[-4, -1, 3]} intensity={36} color="#e50914" />
      <spotLight position={[0, 6, 4]} intensity={48} angle={0.5} color="#ffffff" />
      <Suspense fallback={null}>
        <Stage />
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
