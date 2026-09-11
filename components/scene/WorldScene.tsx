'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* AUTHENTIC COMPUTER SCIENCE 3D SCROLLING WORLD                      */
/* Replaces random geometric cubes/crystals with recognizable CS      */
/* systems: Silicon CPU die, Binary Tree/DAG, Memory Stack/Heap,     */
/* Distributed Mesh, Git Commit DAG, and Cloud Ingress Gateway.        */
/* ------------------------------------------------------------------ */

type Tier = 'low' | 'high';

function detectTier(): Tier {
  if (typeof window === 'undefined') return 'high';
  const coarse = window.matchMedia?.('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  if (coarse || narrow || fewCores || (lowMem !== undefined && lowMem <= 4)) return 'low';
  return 'high';
}

const ZONE_GAP = 22;
const ZONES = 6;
const TRAVEL = ZONE_GAP * (ZONES - 1);

const LERP_CAM = 0.055;
const LERP_PTR = 0.035;

function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return progress;
}

/* ---- Camera ---- */
function FlightCamera({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const isReady = useRef(false);
  const startZ = useRef(40);

  useEffect(() => {
    setTimeout(() => { isReady.current = true; }, 300);
  }, []);

  useFrame((state, delta) => {
    const p = progress.current;
    if (isReady.current && startZ.current > 8) {
      startZ.current = THREE.MathUtils.lerp(startZ.current, 8, delta * 4.5);
    }
    const targetZ = startZ.current - p * TRAVEL;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, LERP_CAM);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 1.2, LERP_PTR);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      state.pointer.y * 0.7 + Math.sin(p * Math.PI * 2) * 0.5,
      LERP_PTR
    );
    camera.lookAt(0, 0, camera.position.z - 12);
  });
  return null;
}

/* ---- Binary Data Packet Particles ---- */
function BinaryDataStream({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#34d399'),
      new THREE.Color('#fbbf24'),
    ];
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 9;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.sin(a) * r * 0.65;
      positions[i * 3 + 2] = 14 - Math.random() * (TRAVEL + 40);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += Math.min(delta, 0.05) * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ================================================================== */
/* CS ZONE 0 (Hero): Abstract Syntax Tree (AST) & Software Runtime    */
/* Pure Computer Science & Software Engineering Structure             */
/* ================================================================== */
function AbstractSyntaxTreeZone() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Points>(null);

  // AST Software Nodes: Program Root -> Function/Class -> Expression/Tokens
  const astNodes = useMemo(() => [
    { pos: [0, 1.8, 0] as [number, number, number], role: 'ROOT_PROGRAM', color: '#22d3ee', size: 0.45 },
    { pos: [-2.0, 0.5, 0.2] as [number, number, number], role: 'ASYNC_FUNCTION', color: '#38bdf8', size: 0.38 },
    { pos: [2.0, 0.5, -0.2] as [number, number, number], role: 'SYSTEM_ARCH', color: '#818cf8', size: 0.38 },
    { pos: [-3.1, -0.9, 0.3] as [number, number, number], role: 'MAP_REDUCE', color: '#34d399', size: 0.32 },
    { pos: [-1.0, -0.9, 0.1] as [number, number, number], role: 'POSTGRES_RLS', color: '#a78bfa', size: 0.32 },
    { pos: [1.0, -0.9, -0.1] as [number, number, number], role: 'EVENT_STREAM', color: '#fbbf24', size: 0.32 },
    { pos: [3.1, -0.9, -0.3] as [number, number, number], role: 'PAYLOAD_DISPATCH', color: '#f472b6', size: 0.32 },
  ], []);

  // Directed syntax tree edges (parent-child compilation flow)
  const astEdges = useMemo(() => [
    [astNodes[0].pos, astNodes[1].pos],
    [astNodes[0].pos, astNodes[2].pos],
    [astNodes[1].pos, astNodes[3].pos],
    [astNodes[1].pos, astNodes[4].pos],
    [astNodes[2].pos, astNodes[5].pos],
    [astNodes[2].pos, astNodes[6].pos],
  ], [astNodes]);

  // Animated execution token particles traversing syntax tree
  const particleCount = 48;
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cyan = new THREE.Color('#38bdf8');
    const purple = new THREE.Color('#c084fc');
    for (let i = 0; i < particleCount; i++) {
      const c = i % 2 === 0 ? cyan : purple;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const d = Math.min(delta, 0.05);
    groupRef.current.rotation.y += d * 0.22;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.3,
      0.04
    );

    // Animate execution tokens flowing down syntax branches
    if (pulseRef.current) {
      const time = state.clock.getElapsedTime();
      const posAttr = pulseRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      astEdges.forEach((edge, edgeIdx) => {
        const [start, end] = edge;
        const particlesPerEdge = 8;
        for (let p = 0; p < particlesPerEdge; p++) {
          const idx = edgeIdx * particlesPerEdge + p;
          const t = (time * 0.6 + p / particlesPerEdge) % 1;
          arr[idx * 3] = THREE.MathUtils.lerp(start[0], end[0], t);
          arr[idx * 3 + 1] = THREE.MathUtils.lerp(start[1], end[1], t);
          arr[idx * 3 + 2] = THREE.MathUtils.lerp(start[2], end[2], t);
        }
      });
      posAttr.needsUpdate = true;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Central Software Virtual Machine Runtime Kernel */}
        <mesh position={[0, 0.3, 0]}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#0b1329"
            emissive="#1d4ed8"
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.2}
            wireframe={false}
          />
        </mesh>

        {/* Orbiting Lexer Token Stream Ring */}
        <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.6, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.8}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Secondary Software Thread Ring */}
        <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.9, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#c084fc"
            emissiveIntensity={1.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* AST Software Nodes */}
        {astNodes.map((node, i) => (
          <group key={i} position={node.pos}>
            {/* Luminous Node Core */}
            <mesh>
              <sphereGeometry args={[node.size, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={1.6}
                metalness={0.3}
                roughness={0.2}
              />
            </mesh>
            {/* Holographic Wireframe Outer Hull */}
            <mesh>
              <icosahedronGeometry args={[node.size * 1.35, 0]} />
              <meshStandardMaterial
                color={node.color}
                wireframe
                transparent
                opacity={0.4}
              />
            </mesh>
          </group>
        ))}

        {/* Directed Syntax Edges (Syntax Branch Links) */}
        {astEdges.map((edge, i) => {
          const [start, end] = edge;
          const p1 = new THREE.Vector3(start[0], start[1], start[2]);
          const p2 = new THREE.Vector3(end[0], end[1], end[2]);
          const dist = p1.distanceTo(p2);
          const mid = p1.clone().add(p2).multiplyScalar(0.5);
          const orientation = new THREE.Matrix4();
          orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));

          return (
            <mesh
              key={i}
              position={[mid.x, mid.y, mid.z]}
              onUpdate={(self) => {
                self.quaternion.setFromRotationMatrix(orientation);
                self.rotateX(Math.PI / 2);
              }}
            >
              <cylinderGeometry args={[0.028, 0.028, dist, 8]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#0284c7"
                emissiveIntensity={1.2}
                transparent
                opacity={0.7}
              />
            </mesh>
          );
        })}

        {/* Live Compilation Execution Tokens */}
        <points ref={pulseRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[particleData.colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.09}
            vertexColors
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </Float>
  );
}

/* ================================================================== */
/* CS ZONE 1 (About): Binary Search Tree / DAG Data Structure        */
/* ================================================================== */
function BinarySearchTreeZone() {
  const groupRef = useRef<THREE.Group>(null);

  // Nodes for a balanced binary search tree
  const treeNodes = useMemo(() => [
    { pos: [0, 2.0, 0], val: 'ROOT', color: '#22d3ee' },
    { pos: [-2.2, 0.6, -0.3], val: 'LEFT', color: '#38bdf8' },
    { pos: [2.2, 0.6, -0.3], val: 'RIGHT', color: '#818cf8' },
    { pos: [-3.4, -0.9, -0.6], val: 'L-L', color: '#34d399' },
    { pos: [-1.1, -0.9, -0.6], val: 'L-R', color: '#a78bfa' },
    { pos: [1.1, -0.9, -0.6], val: 'R-L', color: '#fbbf24' },
    { pos: [3.4, -0.9, -0.6], val: 'R-R', color: '#f472b6' },
  ], []);

  // Directed edges (parent to child pointers)
  const edges = useMemo(() => [
    [treeNodes[0].pos, treeNodes[1].pos],
    [treeNodes[0].pos, treeNodes[2].pos],
    [treeNodes[1].pos, treeNodes[3].pos],
    [treeNodes[1].pos, treeNodes[4].pos],
    [treeNodes[2].pos, treeNodes[5].pos],
    [treeNodes[2].pos, treeNodes[6].pos],
  ], [treeNodes]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += Math.min(delta, 0.05) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0, -ZONE_GAP]}>
      {/* Tree Nodes (Spheres with glowing data cores) */}
      {treeNodes.map((node, i) => (
        <mesh key={i} position={node.pos as [number, number, number]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1.3}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      ))}

      {/* Pointer Vector Edges (Connecting Cylinders) */}
      {edges.map(([start, end], i) => {
        const p1 = new THREE.Vector3(...start);
        const p2 = new THREE.Vector3(...end);
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        const len = p1.distanceTo(p2);
        const orientation = new THREE.Matrix4();
        orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));

        return (
          <mesh key={`edge-${i}`} position={mid} quaternion={new THREE.Quaternion().setFromRotationMatrix(orientation)}>
            <cylinderGeometry args={[0.035, 0.035, len, 8]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.9}
              transparent
              opacity={0.75}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ================================================================== */
/* CS ZONE 2 (Skills): Call Stack & Memory Heap Frames                */
/* ================================================================== */
function MemoryStackHeapZone() {
  const groupRef = useRef<THREE.Group>(null);

  // Stack Frames (Call Stack)
  const stackFrames = useMemo(() => [
    { pos: [-3.0, 1.6, 0] as const, label: 'ESP: 0x7FFF5FBFF4A0', color: '#22d3ee' },
    { pos: [-3.0, 0.5, 0] as const, label: 'EBP: 0x7FFF5FBFF480', color: '#38bdf8' },
    { pos: [-3.0, -0.6, 0] as const, label: 'FRAME_MAIN', color: '#818cf8' },
    { pos: [-3.0, -1.7, 0] as const, label: 'SAVED_RET_ADDR', color: '#a78bfa' },
  ], []);

  // Heap Allocation Chunks
  const heapChunks = useMemo(() => [
    { pos: [2.8, 1.2, -0.5] as const, s: [1.6, 0.8, 1.2] as const, color: '#34d399' },
    { pos: [3.2, -0.8, -0.2] as const, s: [1.8, 1.0, 1.4] as const, color: '#fbbf24' },
    { pos: [1.5, -1.8, -0.8] as const, s: [1.2, 0.7, 1.0] as const, color: '#f472b6' },
  ], []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += Math.min(delta, 0.05) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, -ZONE_GAP * 2]}>
      {/* Call Stack Frames */}
      {stackFrames.map((frame, i) => (
        <mesh key={`stack-${i}`} position={[...frame.pos]}>
          <boxGeometry args={[2.4, 0.75, 0.8]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive={frame.color}
            emissiveIntensity={0.65}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Heap Memory Chunks */}
      {heapChunks.map((chunk, i) => (
        <mesh key={`heap-${i}`} position={[...chunk.pos]}>
          <boxGeometry args={[...chunk.s]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive={chunk.color}
            emissiveIntensity={0.85}
            metalness={0.7}
            roughness={0.25}
            wireframe={i % 2 === 1}
          />
        </mesh>
      ))}

      {/* Stack-to-Heap Pointer Link */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.025, 0.025, 4.2, 8]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

/* ================================================================== */
/* CS ZONE 3 (Projects): Distributed Microservices Mesh Cluster       */
/* ================================================================== */
function MicroservicesMeshZone() {
  const groupRef = useRef<THREE.Group>(null);
  const packetRef = useRef<THREE.Mesh>(null);

  const pods = useMemo(() => [
    { pos: [-4.2, 0.8, 0] as const, color: '#38bdf8' },
    { pos: [0, 1.8, -1.2] as const, color: '#8b5cf6' },
    { pos: [4.2, 0.8, 0] as const, color: '#34d399' },
    { pos: [-2.0, -1.4, -0.8] as const, color: '#fbbf24' },
    { pos: [2.0, -1.4, -0.8] as const, color: '#f472b6' },
  ], []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.2,
      0.03
    );

    // Data packet traveling along RPC service mesh
    if (packetRef.current) {
      const t = (state.clock.elapsedTime * 0.6) % 1;
      packetRef.current.position.x = -4.2 + t * 8.4;
      packetRef.current.position.y = 0.8 + Math.sin(t * Math.PI * 2) * 0.7;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -ZONE_GAP * 3]}>
      {/* Service Pods (Hexagonal Prisms) */}
      {pods.map((pod, i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.2} floatIntensity={0.7}>
          <mesh position={[...pod.pos]}>
            <cylinderGeometry args={[0.7, 0.7, 1.0, 6]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive={pod.color}
              emissiveIntensity={0.75}
              metalness={0.85}
              roughness={0.18}
            />
          </mesh>
        </Float>
      ))}

      {/* Pulsing RPC Message Packet */}
      <mesh ref={packetRef} position={[-4.2, 0.8, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}

/* ================================================================== */
/* CS ZONE 4 (Journey): Git Commit DAG & Branch Merge Tree            */
/* ================================================================== */
function GitCommitDagZone() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Git commits on Main & Feature branches
  const commits = useMemo(() => [
    // Main Branch (Cyan)
    { pos: [-4.0, 0, 0] as const, color: '#22d3ee', scale: 0.35 },
    { pos: [-2.0, 0, 0] as const, color: '#22d3ee', scale: 0.35 },
    { pos: [0.0, 0, 0] as const, color: '#22d3ee', scale: 0.35 },
    { pos: [2.0, 0, 0] as const, color: '#22d3ee', scale: 0.35 },
    { pos: [4.0, 0, 0] as const, color: '#22d3ee', scale: 0.45 }, // Merge commit

    // Feature Branch (Purple)
    { pos: [-1.0, 1.4, -0.4] as const, color: '#8b5cf6', scale: 0.32 },
    { pos: [1.0, 1.4, -0.4] as const, color: '#8b5cf6', scale: 0.32 },
    { pos: [3.0, 0.8, -0.2] as const, color: '#a78bfa', scale: 0.32 },

    // Hotfix Branch (Emerald)
    { pos: [0.5, -1.3, -0.4] as const, color: '#34d399', scale: 0.3 },
    { pos: [2.5, -0.7, -0.2] as const, color: '#34d399', scale: 0.3 },
  ], []);

  useEffect(() => {
    if (!meshRef.current) return;
    const col = new THREE.Color();
    commits.forEach((c, i) => {
      col.set(c.color);
      meshRef.current!.setColorAt(i, col);
      dummy.position.set(c.pos[0], c.pos[1], c.pos[2]);
      dummy.scale.setScalar(c.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [commits, dummy]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += Math.min(delta, 0.05) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0, -ZONE_GAP * 4]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, commits.length]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial emissiveIntensity={1.2} metalness={0.7} roughness={0.2} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ================================================================== */
/* CS ZONE 5 (Deploy / Contact): Cloud Ingress Gateway                */
/* ================================================================== */
function IngressGatewayZone() {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    refs[0].current && (refs[0].current.rotation.z += d * 0.22);
    refs[1].current && (refs[1].current.rotation.z -= d * 0.32);
    refs[2].current && (refs[2].current.rotation.z += d * 0.16);
    if (coreRef.current) {
      coreRef.current.rotation.y += d * 0.4;
      coreRef.current.rotation.x += d * 0.2;
    }
  });

  const rings = [
    { r: 4.8, tube: 0.08, color: '#34d399' },
    { r: 3.6, tube: 0.065, color: '#2496ed', rotOffset: 0.3 },
    { r: 2.6, tube: 0.05, color: '#8b5cf6', rotOffset: 0.8 },
  ];

  return (
    <group position={[0, 0, -ZONE_GAP * 5 - 6]}>
      {rings.map((ring, i) => (
        <mesh key={i} ref={refs[i]} rotation={[ring.rotOffset ?? 0, 0, 0]}>
          <torusGeometry args={[ring.r, ring.tube, 12, 80]} />
          <meshStandardMaterial
            color={ring.color}
            emissive={ring.color}
            emissiveIntensity={1.3}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Production Deployment Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#f0f9ff"
          emissive="#22d3ee"
          emissiveIntensity={1.6}
          roughness={0.1}
          metalness={0.6}
          flatShading
        />
      </mesh>
    </group>
  );
}

/* ---- Ambient & Reactive Lighting ---- */
function ReactiveLights() {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  useFrame((state) => {
    const { x, y } = state.pointer;
    const z = camera.position.z;
    if (a.current) {
      a.current.position.x = THREE.MathUtils.lerp(a.current.position.x, x * 7, 0.05);
      a.current.position.y = THREE.MathUtils.lerp(a.current.position.y, y * 5, 0.05);
      a.current.position.z = z - 4;
    }
    if (b.current) {
      b.current.position.x = THREE.MathUtils.lerp(b.current.position.x, -x * 7, 0.05);
      b.current.position.y = THREE.MathUtils.lerp(b.current.position.y, -y * 5, 0.05);
      b.current.position.z = z - 8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight ref={a} intensity={140} color="#22d3ee" distance={38} decay={2} />
      <pointLight ref={b} intensity={130} color="#8b5cf6" distance={38} decay={2} />
      <directionalLight position={[3, 6, 5]} intensity={0.75} />
    </>
  );
}

function TravelLight() {
  const ref = useRef<THREE.PointLight>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (ref.current) ref.current.position.set(0, 2, camera.position.z - 6);
  });
  return <pointLight ref={ref} intensity={90} color="#2496ed" distance={28} decay={2} />;
}

export default function WorldScene() {
  const [tier, setTier] = useState<Tier>('high');
  const progress = useScrollProgress();

  useEffect(() => { setTier(detectTier()); }, []);

  const count = tier === 'low' ? 380 : 850;

  return (
    <Canvas
      dpr={tier === 'low' ? [1, 1.2] : [1, 1.4]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      performance={{ min: 0.5 }}
    >
      <FlightCamera progress={progress} />
      <ReactiveLights />
      <TravelLight />
      <BinaryDataStream count={count} />

      {/* 6 Authentic Computer Science Story Zones */}
      <AbstractSyntaxTreeZone />
      <BinarySearchTreeZone />
      <MemoryStackHeapZone />
      <MicroservicesMeshZone />
      <GitCommitDagZone />
      <IngressGatewayZone />

      {tier === 'high' && (
        <EffectComposer multisampling={0}>
          <Bloom
            mipmapBlur
            intensity={0.65}
            luminanceThreshold={0.28}
            luminanceSmoothing={0.6}
            radius={0.4}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
