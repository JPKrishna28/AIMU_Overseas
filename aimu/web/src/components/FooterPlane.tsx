"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural low-poly airliner built from primitives — no external GLB, no
 * licensing concerns. Rendered with studio HDRI lighting + a soft contact
 * shadow so it reads as a real 3D object rather than a flat illustration.
 */
function Airliner() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  const fuselage = new THREE.MeshStandardMaterial({
    color: "#f4f6fb",
    metalness: 0.35,
    roughness: 0.35,
  });
  const accent = new THREE.MeshStandardMaterial({
    color: "#2f5fc7",
    metalness: 0.4,
    roughness: 0.3,
  });
  const glass = new THREE.MeshStandardMaterial({
    color: "#12204a",
    metalness: 0.6,
    roughness: 0.1,
  });
  const engineMat = new THREE.MeshStandardMaterial({
    color: "#c7d0e3",
    metalness: 0.7,
    roughness: 0.25,
  });

  return (
    <group ref={group} rotation={[0.15, 0.6, -0.08]} scale={1.15}>
      {/* fuselage */}
      <mesh material={fuselage} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.42, 3.4, 12, 24]} />
      </mesh>
      {/* nose cone */}
      <mesh material={fuselage} position={[2.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <coneGeometry args={[0.42, 0.7, 24]} />
      </mesh>
      {/* cockpit glass */}
      <mesh material={glass} position={[1.72, 0.12, 0]} scale={[0.5, 0.28, 0.4]}>
        <sphereGeometry args={[0.42, 20, 20]} />
      </mesh>
      {/* belly accent stripe */}
      <mesh material={accent} rotation={[0, 0, Math.PI / 2]} scale={[1.01, 1, 1.01]} position={[0, -0.18, 0]}>
        <capsuleGeometry args={[0.42, 3.0, 8, 20]} />
      </mesh>

      {/* main wings */}
      <mesh material={fuselage} position={[0, -0.08, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.1, 0.08, 4.6]} />
      </mesh>
      {/* wing sweep tips */}
      <mesh material={accent} position={[-0.35, -0.06, 2.5]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.9]} />
      </mesh>
      <mesh material={accent} position={[-0.35, -0.06, -2.5]} rotation={[0, -0.4, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.9]} />
      </mesh>

      {/* engines */}
      <mesh material={engineMat} position={[0.1, -0.42, 1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.8, 20]} />
      </mesh>
      <mesh material={engineMat} position={[0.1, -0.42, -1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.8, 20]} />
      </mesh>
      <mesh material={glass} position={[0.5, -0.42, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 20]} />
      </mesh>
      <mesh material={glass} position={[0.5, -0.42, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 20]} />
      </mesh>

      {/* tail fin */}
      <mesh material={accent} position={[-1.9, 0.55, 0]} rotation={[0, 0, 0.35]} castShadow>
        <boxGeometry args={[0.9, 1.1, 0.09]} />
      </mesh>
      {/* horizontal stabilisers */}
      <mesh material={fuselage} position={[-1.95, 0.05, 0]} castShadow>
        <boxGeometry args={[0.7, 0.07, 1.9]} />
      </mesh>
    </group>
  );
}

export function FooterPlane({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4.5, 2.2, 6.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <hemisphereLight args={["#dfe8ff", "#1b2a4a", 0.8]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 4]} intensity={1.5} castShadow />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#8fb0ff" />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
            <Airliner />
          </Float>
        </Suspense>
        <ContactShadows position={[0, -1.6, 0]} opacity={0.4} scale={12} blur={2.6} far={4} />
      </Canvas>
    </div>
  );
}
