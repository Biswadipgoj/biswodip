"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const GEOMETRY_TYPES = [
  "torusKnot",
  "torus",
  "icosahedron",
  "octahedron",
  "dodecahedron",
  "tetrahedron",
] as const;

const ACCENT_COLORS = [
  "#22d3ee",
  "#a855f7",
  "#10b981",
  "#f59e0b",
  "#f472b6",
  "#fb923c",
  "#3b82f6",
] as const;

function CodeParticleField() {
  const count = useMemo(() => 800, []);
  const positionsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const charsRef = useRef<string[] | null>(null);
  
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const chars: string[] = [];
    
    const charSet = "{}[]();<>=+-*/&|^%$#@!~`";
    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = 0.5 + Math.random() * 1.5;
      
      const colorIdx = Math.floor(Math.random() * ACCENT_COLORS.length);
      const color = new THREE.Color(ACCENT_COLORS[colorIdx]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      
      chars.push(charSet[Math.floor(Math.random() * charSet.length)]);
    }
    
    positionsRef.current = positions;
    velocitiesRef.current = velocities;
    charsRef.current = chars;
    
    return { positions, sizes, colors, chars };
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  const scrollProgress = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current || !positionsRef.current || !velocitiesRef.current) return;
    
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" 
      ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) 
      : 1;
    scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const velocities = velocitiesRef.current;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3] * delta * 60;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;
      
      const dist = Math.sqrt(
        positions[i * 3] ** 2 + 
        positions[i * 3 + 1] ** 2 + 
        positions[i * 3 + 2] ** 2
      );
      
      if (dist > 40) {
        const radius = 15 + Math.random() * 25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    
    ref.current.rotation.y += delta * 0.02 * (1 + scrollProgress.current * 2);
    ref.current.rotation.x = Math.sin(scrollProgress.current * Math.PI * 2) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={particleData.positions} itemSize={3} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-size" array={particleData.sizes} itemSize={1} />
        <bufferAttribute attach="attributes-color" array={particleData.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={1}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GeometricStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const structuresRef = useRef<THREE.Mesh[]>([]);
  const scrollProgress = useRef(0);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    time.current += delta;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" 
      ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) 
      : 1;
    scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    groupRef.current.rotation.y += delta * 0.03 * (1 + scrollProgress.current);
    groupRef.current.rotation.x = Math.sin(scrollProgress.current * Math.PI * 3) * 0.2;
    groupRef.current.position.y = Math.sin(time.current * 0.3) * 0.5 - scrollProgress.current * 3;
    
    structuresRef.current.forEach((mesh, i) => {
      if (!mesh.userData.originalPosition) return;
      
      const baseRotation = mesh.userData.baseRotation;
      const orbitRadius = mesh.userData.orbitRadius;
      const orbitSpeed = mesh.userData.orbitSpeed;
      const orbitAngle = mesh.userData.orbitAngle + time.current * orbitSpeed * (1 + scrollProgress.current * 3);
      
      mesh.position.x = mesh.userData.originalPosition.x + Math.cos(orbitAngle) * orbitRadius * (1 + scrollProgress.current * 0.5);
      mesh.position.z = mesh.userData.originalPosition.z + Math.sin(orbitAngle) * orbitRadius * (1 + scrollProgress.current * 0.5);
      mesh.position.y = mesh.userData.originalPosition.y + Math.sin(time.current * 0.5 + i) * 0.3;
      
      mesh.rotation.x += delta * mesh.userData.rotSpeed.x;
      mesh.rotation.y += delta * mesh.userData.rotSpeed.y;
      mesh.rotation.z += delta * mesh.userData.rotSpeed.z;
      
      const scale = 1 + Math.sin(time.current * 2 + i) * 0.05 * (1 + scrollProgress.current);
      mesh.scale.setScalar(scale);
    });
  });

  const structures = useMemo(() => {
    const structs: any[] = [];
    for (let i = 0; i < 12; i++) {
      const type = GEOMETRY_TYPES[i % GEOMETRY_TYPES.length];
      const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
      const size = 0.4 + Math.random() * 0.6;
      
      const radius = 3 + Math.random() * 5;
      const theta = (i / 12) * Math.PI * 2 + Math.random() * 0.5;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (Math.random() - 0.5) * 4;
      const z = radius * Math.cos(phi);
      
      structs.push({
        type,
        color,
        size,
        position: [x, y, z],
        orbitRadius: 0.5 + Math.random() * 1.5,
        orbitSpeed: 0.1 + Math.random() * 0.3,
        orbitAngle: Math.random() * Math.PI * 2,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
          z: (Math.random() - 0.5) * 0.5,
        },
      });
    }
    return structs;
  }, []);

  return (
    <group ref={groupRef}>
      {structures.map((s, i) => {
        let geometry: any;
        switch (s.type) {
          case "torusKnot":
            geometry = <torusKnotGeometry args={[s.size, s.size * 0.3, 64, 16, 2, 3]} />;
            break;
          case "torus":
            geometry = <torusGeometry args={[s.size, s.size * 0.25, 16, 64]} />;
            break;
          case "icosahedron":
            geometry = <icosahedronGeometry args={[s.size, 1]} />;
            break;
          case "octahedron":
            geometry = <octahedronGeometry args={[s.size, 1]} />;
            break;
          case "dodecahedron":
            geometry = <dodecahedronGeometry args={[s.size, 1]} />;
            break;
          case "tetrahedron":
            geometry = <tetrahedronGeometry args={[s.size, 1]} />;
            break;
        }
        
        return (
          <mesh
            key={i}
            position={s.position}
            ref={(el) => { if (el) structuresRef.current[i] = el; }}
            userData={{
              originalPosition: new THREE.Vector3(...s.position),
              baseRotation: new THREE.Euler(),
              orbitRadius: s.orbitRadius,
              orbitSpeed: s.orbitSpeed,
              orbitAngle: s.orbitAngle,
              rotSpeed: s.rotSpeed,
            }}
          >
            {geometry}
            <meshPhysicalMaterial
              color={s.color}
              metalness={0.7}
              roughness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.1}
              iridescence={0.8}
              iridescenceIOR={1.3}
              iridescenceThicknessRange={[100, 400]}
              envMapIntensity={1.5}
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function AlgorithmLines() {
  const ref = useRef<THREE.LineSegments>(null);
  const scrollProgress = useRef(0);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    time.current += delta;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" 
      ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) 
      : 1;
    scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    ref.current.rotation.y += delta * 0.015;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time.current * 3 + i * 0.1) * 0.002 * (1 + scrollProgress.current);
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  const lineData = useMemo(() => {
    const positions = new Float32Array(200 * 2 * 3);
    const colors = new Float32Array(200 * 2 * 3);
    
    for (let i = 0; i < 200; i++) {
      const x1 = (Math.random() - 0.5) * 30;
      const y1 = (Math.random() - 0.5) * 20;
      const z1 = (Math.random() - 0.5) * 30;
      
      const len = 0.5 + Math.random() * 2;
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      
      const x2 = x1 + dir.x * len;
      const y2 = y1 + dir.y * len;
      const z2 = z1 + dir.z * len;
      
      positions[i * 6] = x1;
      positions[i * 6 + 1] = y1;
      positions[i * 6 + 2] = z1;
      positions[i * 6 + 3] = x2;
      positions[i * 6 + 4] = y2;
      positions[i * 6 + 5] = z2;
      
      const colorIdx = Math.floor(Math.random() * ACCENT_COLORS.length);
      const color = new THREE.Color(ACCENT_COLORS[colorIdx]);
      const alpha = 0.3 + Math.random() * 0.4;
      
      for (let j = 0; j < 2; j++) {
        colors[i * 6 + j * 3] = color.r * alpha;
        colors[i * 6 + j * 3 + 1] = color.g * alpha;
        colors[i * 6 + j * 3 + 2] = color.b * alpha;
      }
    }
    return { positions, colors };
  }, []);

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={lineData.positions} itemSize={3} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-color" array={lineData.colors} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function DataGrid() {
  const ref = useRef<THREE.GridHelper>(null);
  const scrollProgress = useRef(0);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    time.current += delta;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" 
      ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) 
      : 1;
    scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    ref.current.position.y = -8 - scrollProgress.current * 10;
    ref.current.material.opacity = 0.1 + scrollProgress.current * 0.15;
    
    const color1 = new THREE.Color(ACCENT_COLORS[0]);
    const color2 = new THREE.Color(ACCENT_COLORS[1]);
    const color = color1.clone().lerp(color2, (Math.sin(time.current) + 1) / 2);
    ref.current.material.color.set(color);
  });

  return (
    <gridHelper
      ref={ref}
      args={[40, 40, "#22d3ee", "#a855f7"]}
      position={[0, -8, 0]}
    />
  );
}

function CentralCore() {
  const ref = useRef<THREE.Mesh>(null);
  const scrollProgress = useRef(0);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    time.current += delta;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" 
      ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) 
      : 1;
    scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    ref.current.rotation.y += delta * 0.1 * (1 + scrollProgress.current * 2);
    ref.current.rotation.x += delta * 0.05;
    ref.current.scale.setScalar(1 + Math.sin(time.current * 0.8) * 0.05 + scrollProgress.current * 0.3);
    
    const material = ref.current.material as THREE.MeshPhysicalMaterial;
    material.emissiveIntensity = 0.6 + Math.sin(time.current * 2) * 0.2 + scrollProgress.current * 0.4;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshPhysicalMaterial
        color="#0a0a1a"
        metalness={0.9}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.05}
        iridescence={1}
        iridescenceIOR={1.4}
        iridescenceThicknessRange={[200, 500]}
        envMapIntensity={2.5}
        emissive="#22d3ee"
        emissiveIntensity={0.6}
        wireframe={false}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function CoreRings() {
  const ref = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    time.current += delta;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" 
      ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) 
      : 1;
    scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    ref.current.children.forEach((ring, i) => {
      const speed = (i % 3 + 1) * 0.02;
      ring.rotation.z += delta * speed * (1 + scrollProgress.current * 2);
      ring.rotation.x = Math.sin(time.current * 0.5 + i) * 0.2;
      ring.scale.setScalar(1 + Math.sin(time.current * 0.7 + i * 2) * 0.03);
    });
  });

  return (
    <group ref={ref}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, (i * Math.PI) / 4]}
          scale={2 + i * 0.8}
        >
          <torusGeometry args={[0.05, 16, 128]} />
          <meshPhysicalMaterial
            color={ACCENT_COLORS[i % ACCENT_COLORS.length]}
            metalness={0.8}
            roughness={0.1}
            clearcoat={1}
            transparent
            opacity={0.4 - i * 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function StudioScene({
  exploded,
  paused,
  onReady,
}: {
  exploded: boolean;
  paused: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      frameloop={paused ? "demand" : "always"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 18], fov: 55 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      fallback={<div className="fixed inset-0 bg-[rgb(var(--bg-deep))]" />}
      onCreated={onReady}
    >
      <color attach="background" args={["#060612"]} />
      
      <fog attach="fog" args={["#060612", 18, 90]} />
      
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[-10, 10, -10]} intensity={2.2} color="#22d3ee" />
      <directionalLight position={[0, -10, 0]} intensity={1.4} color="#a855f7" />
      <pointLight position={[0, 5, 10]} intensity={6} color="#10b981" decay={2} />
      
      <Suspense fallback={null}>
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={10} color="#22d3ee" position={[0, 10, -5]} rotation={[Math.PI / 2, 0, 0]} scale={[20, 10, 1]} />
          <Lightformer intensity={8} color="#a855f7" position={[-10, 0, 5]} rotation={[0, Math.PI / 2, 0]} scale={[15, 8, 1]} />
          <Lightformer intensity={7} color="#10b981" position={[10, 5, 5]} rotation={[0, -Math.PI / 2, 0]} scale={[12, 6, 1]} />
        </Environment>
        
        <CodeParticleField />
        <AlgorithmLines />
        <DataGrid />
        <GeometricStructure />
        <CentralCore />
        <CoreRings />
      </Suspense>
    </Canvas>
  );
}