'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';

// ----------------------------------------------------
// 1. Grid Generation Logic
// ----------------------------------------------------
const R = 2.5; // Radius of a single hexagon
const RINGS = 8; // Number of rings (creates a large macro-hexagon)

function generateHexGrid() {
  const centers: THREE.Vector3[] = [];
  for (let q = -RINGS; q <= RINGS; q++) {
    for (let r = -RINGS; r <= RINGS; r++) {
      if (Math.abs(q + r) <= RINGS) {
        // Pointy-topped hexagons
        let cx = R * Math.sqrt(3) * (r + q / 2);
        let cy = R * 1.5 * q;
        centers.push(new THREE.Vector3(cx, cy, 0));
      }
    }
  }

  const edgesMap = new Map<string, { p1: THREE.Vector3; p2: THREE.Vector3; dist: number; mid: THREE.Vector3 }>();
  const nodesMap = new Map<string, { pos: THREE.Vector3; dist: number }>();

  centers.forEach((c) => {
    for (let i = 0; i < 6; i++) {
      let a1 = i * (Math.PI / 3) + Math.PI / 6;
      let a2 = ((i + 1) % 6) * (Math.PI / 3) + Math.PI / 6;
      let p1 = new THREE.Vector3(c.x + R * Math.cos(a1), c.y + R * Math.sin(a1), 0);
      let p2 = new THREE.Vector3(c.x + R * Math.cos(a2), c.y + R * Math.sin(a2), 0);

      // Nodes
      let k1 = Math.round(p1.x * 10) + ',' + Math.round(p1.y * 10);
      if (!nodesMap.has(k1)) nodesMap.set(k1, { pos: p1, dist: p1.length() });
      
      let k2 = Math.round(p2.x * 10) + ',' + Math.round(p2.y * 10);
      if (!nodesMap.has(k2)) nodesMap.set(k2, { pos: p2, dist: p2.length() });

      // Edges
      let midX = (p1.x + p2.x) / 2;
      let midY = (p1.y + p2.y) / 2;
      let key = Math.round(midX * 10) + ',' + Math.round(midY * 10);
      if (!edgesMap.has(key)) {
        let mid = new THREE.Vector3(midX, midY, 0);
        edgesMap.set(key, { p1, p2, mid, dist: mid.length() });
      }
    }
  });

  return {
    nodes: Array.from(nodesMap.values()),
    edges: Array.from(edgesMap.values()),
  };
}

// ----------------------------------------------------
// 2. Instanced Nodes (Spheres)
// ----------------------------------------------------
function HexNodes({ nodes }: { nodes: { pos: THREE.Vector3; dist: number }[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    nodes.forEach((node, i) => {
      // Add slight depth variation based on distance or random to make it look organic
      const zOffset = Math.sin(node.pos.x * 0.2 + node.pos.y * 0.2) * 2.0;
      dummy.position.set(node.pos.x, node.pos.y, zOffset);
      
      // Random scale for variety
      const scale = 0.5 + Math.random() * 0.8;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Randomize colors slightly (Cyan-Green tones)
      const color = new THREE.Color();
      const isCyan = Math.random() > 0.5;
      color.set(isCyan ? '#00e5ff' : '#00ff66');
      meshRef.current!.setColorAt(i, color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [nodes]);

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1.0;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      {/* Premium Glass Material */}
      <meshPhysicalMaterial
        transmission={0.95}
        opacity={1}
        metalness={0.1}
        roughness={0.1}
        ior={1.5}
        thickness={2.0}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </instancedMesh>
  );
}

// ----------------------------------------------------
// 3. Instanced Edges (Glowing Cylinders)
// ----------------------------------------------------
function HexEdges({ edges }: { edges: { p1: THREE.Vector3; p2: THREE.Vector3; mid: THREE.Vector3 }[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    
    edges.forEach((edge, i) => {
      const zOffset1 = Math.sin(edge.p1.x * 0.2 + edge.p1.y * 0.2) * 2.0;
      const zOffset2 = Math.sin(edge.p2.x * 0.2 + edge.p2.y * 0.2) * 2.0;
      
      const p1 = new THREE.Vector3(edge.p1.x, edge.p1.y, zOffset1);
      const p2 = new THREE.Vector3(edge.p2.x, edge.p2.y, zOffset2);
      
      const distance = p1.distanceTo(p2);
      const position = p1.clone().add(p2).divideScalar(2);
      
      dummy.position.copy(position);
      // Align cylinder with the edge
      dummy.lookAt(p2);
      // Cylinder is created along Y axis by default, rotate it to align with Z (lookAt direction)
      dummy.rotateX(Math.PI / 2);
      dummy.scale.set(1, distance, 1);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      const color = new THREE.Color();
      // Glow color
      color.set('#00bfff'); // Deep cyan
      meshRef.current!.setColorAt(i, color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [edges]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1.0;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, edges.length]}>
      <cylinderGeometry args={[0.03, 0.03, 1, 6]} />
      {/* Glowing material */}
      <meshBasicMaterial toneMapped={false} color="#00ffcc" />
    </instancedMesh>
  );
}

// ----------------------------------------------------
// 4. Floating Dust Particles
// ----------------------------------------------------
function Particles() {
  const count = 400;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40 - 5
      );
      const scale = Math.random() * 0.15;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} toneMapped={false} />
    </instancedMesh>
  );
}

// ----------------------------------------------------
// 5. Main Scene Assembly
// ----------------------------------------------------
function Scene() {
  const { nodes, edges } = useMemo(() => generateHexGrid(), []);
  const groupRef = useRef<THREE.Group>(null);

  // Parallax mouse effect
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Slow continuous rotation (like a wheel)
      groupRef.current.rotation.z = t * 0.05;
      
      // Mouse parallax
      const mx = (state.pointer.x * Math.PI) / 10;
      const my = (state.pointer.y * Math.PI) / 10;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx, 0.05);
    }
  });

  return (
    <>
      <color attach="background" args={['#040914']} />
      
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#00ffcc" />
      <directionalLight position={[-10, -10, -10]} intensity={1.0} color="#0088ff" />
      
      {/* Studio Environment for reflections */}
      <Environment preset="city" />

      {/* Main Structure */}
      <group ref={groupRef}>
        <HexEdges edges={edges} />
        <HexNodes nodes={nodes} />
      </group>
      
      <Particles />

      {/* Cinematic Post-Processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
        <DepthOfField focusDistance={0.015} focalLength={0.15} bokehScale={6} />
        <Vignette eskil={false} offset={0.1} darkness={1.0} />
      </EffectComposer>
    </>
  );
}

// ----------------------------------------------------
// 6. Exported Component
// ----------------------------------------------------
export default function ThreeHexagonBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-[#040914]" />;

  return (
    <div className="absolute inset-0 z-0 bg-[#040914] overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 50], fov: 45 }}
        gl={{ antialias: false, alpha: false }} // postprocessing handles AA better
        dpr={[1, 1.5]} // cap dpr for performance
      >
        <Scene />
        <Preload all />
      </Canvas>
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#040914]/90 via-[#040914]/40 to-transparent pointer-events-none z-10" />
    </div>
  );
}
