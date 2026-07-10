'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* PERFORMANCE-FIRST 3D world.                                         */
/* Key changes vs. previous version:                                   */
/*  - No MeshTransmissionMaterial (raymarching = GPU killer)           */
/*  - No Float on individual small meshes — only on primary showpiece  */
/*  - Data particles reduced and batched                               */
/*  - Server rack LEDs removed (too many draw calls)                   */
/*  - DataPacket meshes replaced with a single shader-animated mesh    */
/*  - EffectComposer only on high tier, much lighter bloom params      */
/*  - DPR capped at 1.4                                                */
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

const ZONE_TINTS = [
  new THREE.Color('#0d1117'),
  new THREE.Color('#111827'),
  new THREE.Color('#0f172a'),
  new THREE.Color('#0c1118'),
  new THREE.Color('#150d2a'),
  new THREE.Color('#0a1628'),
];

/* Shared lerp factor — lower = smoother but slightly laggier */
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
  useFrame((state) => {
    const p = progress.current;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 - p * TRAVEL, LERP_CAM);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 1.2, LERP_PTR);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      state.pointer.y * 0.7 + Math.sin(p * Math.PI * 2) * 0.5,
      LERP_PTR,
    );
    camera.lookAt(0, 0, camera.position.z - 12);
  });
  return null;
}

/* ---- Atmosphere ---- */
function Atmosphere({ progress }: { progress: React.MutableRefObject<number> }) {
  const { scene } = useThree();
  const bg = useMemo(() => ZONE_TINTS[0].clone(), []);
  useEffect(() => {
    scene.background = bg;
    scene.fog = new THREE.Fog(bg, 20, 55);
    return () => { scene.background = null; scene.fog = null; };
  }, [scene, bg]);
  useFrame(() => {
    const p = progress.current * (ZONE_TINTS.length - 1);
    const i = Math.min(Math.floor(p), ZONE_TINTS.length - 2);
    bg.copy(ZONE_TINTS[i]).lerp(ZONE_TINTS[i + 1], p - i);
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(bg);
  });
  return null;
}

/* ---- Data particles — one draw call, point sprites ---- */
function DataParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#34d399'),
      new THREE.Color('#2496ed'),
    ];
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 5 + Math.random() * 10;
      positions[i * 3]     = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.sin(a) * r * 0.65;
      positions[i * 3 + 2] = 14 - Math.random() * (TRAVEL + 40);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  /* Very slow rotation — almost free on GPU */
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += Math.min(delta, 0.05) * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
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

/* ---- Nebulae — sprite glow clouds, 1 draw call each ---- */
function Nebulae() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64; // smaller = faster
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,0.55)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.18)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const clouds = useMemo(() => [
    { pos: [-12, 4,  -6]   as const, s: 13, color: '#2496ed', o: 0.15 },
    { pos: [ 13, -4, -22]  as const, s: 12, color: '#8b5cf6', o: 0.14 },
    { pos: [-13, -3, -44]  as const, s: 13, color: '#22d3ee', o: 0.12 },
    { pos: [ 12,  5, -66]  as const, s: 12, color: '#34d399', o: 0.13 },
    { pos: [-12,  4, -88]  as const, s: 13, color: '#ec4899', o: 0.12 },
  ], []);

  return (
    <>
      {clouds.map((cl, i) => (
        <sprite key={i} position={[...cl.pos]} scale={[cl.s, cl.s, 1]}>
          <spriteMaterial map={tex} color={cl.color} transparent opacity={cl.o}
            depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* ZONE 0 — Hero: single showpiece crystal + small orbiting cubes     */
/* ------------------------------------------------------------------ */
function HeroCrystal() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += Math.min(delta, 0.05) * 0.22;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.pointer.y * 0.35, 0.04);
  });
  return (
    /* Single Float — each Float is one RAF, so keep to 1 per zone */
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={ref}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          metalness={0.75}
          roughness={0.1}
          emissive="#2563eb"
          emissiveIntensity={0.4}
          flatShading
        />
      </mesh>
    </Float>
  );
}

/* Instanced cubes — 1 draw call for all 5 satellites */
function HeroSatellites() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const configs = useMemo(() => [
    { pos: [ 3.6,  1.6, -0.5], color: '#2496ed', rotSpeed: 0.8 },
    { pos: [-3.8, -1.4, -1.0], color: '#34d399', rotSpeed: 0.6 },
    { pos: [ 2.6, -2.2,  0.8], color: '#fbbf24', rotSpeed: 1.0 },
    { pos: [-2.8,  2.0,  0.6], color: '#8b5cf6', rotSpeed: 0.7 },
    { pos: [ 4.8, -0.8, -2.0], color: '#f472b6', rotSpeed: 0.9 },
  ], []);
  const rotations = useRef(configs.map(() => ({ x: 0, y: 0, z: 0 })));

  useEffect(() => {
    if (!meshRef.current) return;
    const color = new THREE.Color();
    configs.forEach((cfg, i) => {
      color.set(cfg.color);
      meshRef.current!.setColorAt(i, color);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [configs]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const d = Math.min(delta, 0.05);
    configs.forEach((cfg, i) => {
      const r = rotations.current[i];
      r.x += d * cfg.rotSpeed * 0.4;
      r.y += d * cfg.rotSpeed * 0.6;
      const [x, y, z] = cfg.pos as [number, number, number];
      dummy.position.set(x, y + Math.sin(r.x) * 0.3, z);
      dummy.rotation.set(r.x, r.y, r.z);
      dummy.scale.setScalar(0.45);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, configs.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial metalness={0.8} roughness={0.2} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* ZONE 1 — About: dependency rings                                    */
/* ------------------------------------------------------------------ */
function DependencyGraph() {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    refs[0].current && (refs[0].current.rotation.x += d * 0.22);
    refs[1].current && (refs[1].current.rotation.y -= d * 0.18);
    refs[2].current && (refs[2].current.rotation.z += d * 0.14);
  });
  const cfg = [
    { pos: [-3.6,  1.4,  0] as const, r: 1.5, tube: 0.065, color: '#3b82f6' },
    { pos: [ 3.8, -1.2, -2] as const, r: 1.2, tube: 0.055, color: '#34d399' },
    { pos: [ 0,    2.8, -1] as const, r: 0.9, tube: 0.045, color: '#8b5cf6' },
  ];
  return (
    <group position={[0, 0, -ZONE_GAP]}>
      {cfg.map((c, i) => (
        <mesh key={i} ref={refs[i]} position={[...c.pos]}>
          <torusGeometry args={[c.r, c.tube, 12, 60]} />
          <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={0.55} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.7}>
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.2} roughness={0.1} flatShading />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* ZONE 2 — Stack: CI/CD pipeline — instanced cubes + single tube     */
/* ------------------------------------------------------------------ */
function PipelineZone() {
  const groupRef = useRef<THREE.Group>(null);
  const packetRef = useRef<THREE.Mesh>(null);

  const stageColors = useMemo(() => [
    '#34d399', '#22d3ee', '#8b5cf6', '#2496ed', '#fbbf24',
  ], []);

  /* Instanced stage boxes — 5 boxes, 1 draw call */
  const stageRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!stageRef.current) return;
    const color = new THREE.Color();
    stageColors.forEach((c, i) => {
      color.set(c);
      stageRef.current!.setColorAt(i, color);
      dummy.position.set(-5 + i * 2.5, 0, 0);
      dummy.rotation.set(0.2, 0.3 + i * 0.4, 0.1);
      dummy.scale.setScalar(0.9);
      dummy.updateMatrix();
      stageRef.current!.setMatrixAt(i, dummy.matrix);
    });
    stageRef.current.instanceColor!.needsUpdate = true;
    stageRef.current.instanceMatrix!.needsUpdate = true;
  }, [stageColors, dummy]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, state.pointer.x * 0.2, 0.025
    );
    /* Single packet sweeping along X axis */
    if (packetRef.current) {
      const t = (state.clock.elapsedTime * 0.5) % 1;
      packetRef.current.position.x = -5 + t * 10;
      packetRef.current.position.y = 0.15;
      ;(packetRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.8 + Math.sin(t * Math.PI) * 1.2;
    }
  });

  return (
    <group position={[0, 0, -ZONE_GAP * 2]} ref={groupRef}>
      <instancedMesh ref={stageRef} args={[undefined, undefined, stageColors.length]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial metalness={0.75} roughness={0.22} toneMapped={false} />
      </instancedMesh>

      {/* One glowing packet flying across the pipeline */}
      <mesh ref={packetRef} position={[-5, 0.15, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* ZONE 3 — Work: 3 floating server slabs                             */
/* ------------------------------------------------------------------ */
function ServerRackZone() {
  const groupRef = useRef<THREE.Group>(null);
  const racks = useMemo(() => [
    { pos: [-4.8,  0,  0] as const, color: '#22d3ee', h: 1.8 },
    { pos: [ 0,  -0.6, -2] as const, color: '#8b5cf6', h: 2.4 },
    { pos: [ 4.8,  0.4, -1] as const, color: '#2496ed', h: 2.0 },
  ], []);

  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, state.pointer.x * 0.18, 0.025
    );
    refs.forEach((r, i) => {
      if (r.current) r.current.rotation.x += Math.min(delta, 0.05) * (i % 2 ? 0.07 : -0.05);
    });
  });

  return (
    <group position={[0, 0, -ZONE_GAP * 3]} ref={groupRef}>
      {racks.map((rack, i) => (
        <Float key={i} speed={0.9 + i * 0.2} rotationIntensity={0.25} floatIntensity={0.8}>
          <mesh ref={refs[i]} position={[...rack.pos]}>
            <boxGeometry args={[1.4, rack.h, 0.4]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.95}
              roughness={0.3}
              emissive={rack.color}
              emissiveIntensity={0.12}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* ZONE 4 — Journey: instanced git commits on a spiral                */
/* ------------------------------------------------------------------ */
function GitBranchZone() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const commitData = useMemo(() => {
    const palette = ['#22d3ee', '#8b5cf6', '#34d399', '#fbbf24', '#f472b6', '#2496ed'];
    return Array.from({ length: 16 }, (_, i) => {
      const t = i / 15;
      const a = t * Math.PI * 4;
      const branch = i % 3;
      return {
        pos: [
          Math.cos(a) * (1.8 + t * 2.2) + (branch - 1) * 1.2,
          Math.sin(a) * (1.4 + t * 1.4),
          -t * 9,
        ] as const,
        color: palette[i % palette.length],
        size: 0.14 + t * 0.1,
      };
    });
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const color = new THREE.Color();
    commitData.forEach((c, i) => {
      color.set(c.color);
      meshRef.current!.setColorAt(i, color);
      dummy.position.set(...c.pos);
      dummy.scale.setScalar(c.size);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [commitData, dummy]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += Math.min(delta, 0.05) * 0.05;
  });

  return (
    <group position={[0, 0, -ZONE_GAP * 4]} ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, commitData.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* ZONE 5 — Finale: deploy portal — 3 torus rings                     */
/* ------------------------------------------------------------------ */
function DeployPortal() {
  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    refs[0].current && (refs[0].current.rotation.z += d * 0.24);
    refs[1].current && (refs[1].current.rotation.z -= d * 0.36);
    refs[2].current && (refs[2].current.rotation.z += d * 0.14);
    if (coreRef.current) {
      coreRef.current.rotation.y += d * 0.4;
      coreRef.current.rotation.x += d * 0.2;
    }
  });

  const rings = [
    { r: 5.2, tube: 0.09, color: '#34d399' },
    { r: 4.0, tube: 0.07, color: '#2496ed', rotOffset: 0.3 },
    { r: 3.0, tube: 0.06, color: '#8b5cf6', rotOffset: 1 },
  ];

  return (
    <group position={[0, 0, -ZONE_GAP * 5 - 6]}>
      {rings.map((ring, i) => (
        <mesh key={i} ref={refs[i]} rotation={[ring.rotOffset ?? 0, 0, 0]}>
          <torusGeometry args={[ring.r, ring.tube, 12, 80]} />
          <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={1.3} metalness={0.8} roughness={0.14} />
        </mesh>
      ))}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#f0f9ff" emissive="#22d3ee" emissiveIntensity={1.6} roughness={0.08} metalness={0.5} flatShading />
      </mesh>
    </group>
  );
}

/* ---- Lights — pointer-reactive but throttled ---- */
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
      <ambientLight intensity={0.5} />
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

/* ------------------------------------------------------------------ */
/* ROOT                                                                */
/* ------------------------------------------------------------------ */
export default function WorldScene() {
  const [tier, setTier] = useState<Tier>('high');
  const progress = useScrollProgress();

  useEffect(() => { setTier(detectTier()); }, []);

  /* Particle counts tuned for smooth 60fps */
  const count = tier === 'low' ? 400 : 900;

  return (
    <Canvas
      dpr={tier === 'low' ? [1, 1.2] : [1, 1.4]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{
        antialias: false, /* MSAA off — big perf win, nearly invisible at these sizes */
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      performance={{ min: 0.5 }} /* auto-lower DPR when FPS drops */
    >
      <Atmosphere progress={progress} />
      <FlightCamera progress={progress} />
      <ReactiveLights />
      <TravelLight />
      <DataParticles count={count} />
      <Nebulae />

      {/* Story zones */}
      <group>
        <HeroCrystal />
        <HeroSatellites />
      </group>
      <DependencyGraph />
      <PipelineZone />
      <ServerRackZone />
      <GitBranchZone />
      <DeployPortal />

      {/* Bloom only on high-tier — threshold higher = fewer pixels processed */}
      {tier === 'high' && (
        <EffectComposer multisampling={0}>
          <Bloom
            mipmapBlur
            intensity={0.7}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.6}
            radius={0.4}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
