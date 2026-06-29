'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, TorusKnot, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* Device tier — keep the experience buttery on phones & laptops alike */
/* by scaling particle count, pixel ratio and post-processing.         */
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

/* ------------------------------------------------------------------ */
/* Drifting, pointer-reactive particle field.                          */
/* ------------------------------------------------------------------ */
function Particles({ count }: { count: number }) {
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
      new THREE.Color('#fbbf24'),
    ];
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // clamp delta so a dropped frame can't cause a jarring jump
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y += d * 0.04;
    ref.current.rotation.x += d * 0.012;
    const { x, y } = state.pointer;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.6, 0.04);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y * 0.4, 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Hero centerpiece. High tier gets a real glass transmission crystal; */
/* low tier gets a vibrant, far cheaper iridescent solid.              */
/* ------------------------------------------------------------------ */
function Crystal({ tier }: { tier: Tier }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y += d * 0.25;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.pointer.y * 0.4, 0.05);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, state.pointer.x * 0.4, 0.05);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <Icosahedron ref={ref} args={[1.55, tier === 'low' ? 0 : 0]} position={[0, 0, 0]}>
        {tier === 'high' ? (
          <MeshTransmissionMaterial
            thickness={0.9}
            roughness={0.06}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.6}
            anisotropy={0.4}
            distortion={0.4}
            distortionScale={0.4}
            temporalDistortion={0.2}
            color="#cfe6ff"
            background={new THREE.Color('#eaf2ff')}
          />
        ) : (
          <meshStandardMaterial
            color="#7dd3fc"
            metalness={0.65}
            roughness={0.18}
            emissive="#6366f1"
            emissiveIntensity={0.35}
            flatShading
          />
        )}
      </Icosahedron>
    </Float>
  );
}

/* Metallic accents orbiting the crystal. */
function Accents({ tier }: { tier: Tier }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += Math.min(delta, 0.05) * 0.1;
  });
  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.4} floatIntensity={1.4}>
        <TorusKnot args={[0.5, 0.16, tier === 'low' ? 90 : 160, tier === 'low' ? 16 : 24]} position={[3.1, 1.2, -1]}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.18} emissive="#5b21b6" emissiveIntensity={0.35} />
        </TorusKnot>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={1.2}>
        <mesh position={[-3.3, -1, -0.5]} rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[0.7, 0.07, 18, tier === 'low' ? 48 : 80]} />
          <meshStandardMaterial color="#22d3ee" metalness={0.8} roughness={0.2} emissive="#0891b2" emissiveIntensity={0.4} />
        </mesh>
      </Float>
      <Float speed={1.9} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[2.6, -1.6, 0.6]}>
          <icosahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.25} emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.6}>
        <mesh position={[-2.4, 1.6, 0.4]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#34d399" metalness={0.7} roughness={0.25} emissive="#059669" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

/* Lights that chase the pointer for reactive, colorful highlights. */
function ReactiveLights() {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const { x, y } = state.pointer;
    if (a.current) {
      a.current.position.x = THREE.MathUtils.lerp(a.current.position.x, x * 6, 0.06);
      a.current.position.y = THREE.MathUtils.lerp(a.current.position.y, y * 4, 0.06);
    }
    if (b.current) {
      b.current.position.x = THREE.MathUtils.lerp(b.current.position.x, -x * 6, 0.06);
      b.current.position.y = THREE.MathUtils.lerp(b.current.position.y, -y * 4, 0.06);
    }
  });
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight ref={a} position={[5, 4, 4]} intensity={120} color="#22d3ee" distance={30} />
      <pointLight ref={b} position={[-5, -3, 3]} intensity={110} color="#ec4899" distance={30} />
      <pointLight position={[0, 5, -4]} intensity={70} color="#8b5cf6" distance={30} />
      <directionalLight position={[3, 6, 5]} intensity={1.1} color="#ffffff" />
    </>
  );
}

/* Subtle scroll-driven camera dolly. */
function ScrollCamera() {
  const { camera } = useThree();
  useFrame(() => {
    const y = typeof window !== 'undefined' ? window.scrollY : 0;
    const t = Math.min(y / 900, 1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7 + t * 2.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, t * 1.2, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* A lightweight, fully static fallback (reduced motion / no WebGL). */
function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(60% 60% at 30% 35%, rgba(34,211,238,0.5), transparent 70%),' +
          'radial-gradient(55% 55% at 72% 40%, rgba(139,92,246,0.5), transparent 70%),' +
          'radial-gradient(60% 60% at 50% 85%, rgba(236,72,153,0.45), transparent 70%)',
      }}
      aria-hidden
    />
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<Tier>('high');
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setTier(detectTier());
    setReduced(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  // Pause rendering entirely once the hero scrolls off-screen — saves the
  // GPU/CPU (and battery) on every device while you read the rest of the page.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  if (!mounted) return <div className="absolute inset-0 animate-pulse-glow" aria-hidden />;
  if (reduced) return <StaticFallback />;

  const particleCount = tier === 'low' ? 420 : 1100;

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        dpr={tier === 'low' ? [1, 1.3] : [1, 1.7]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: tier === 'high', alpha: true, powerPreference: 'high-performance' }}
      >
        <ReactiveLights />
        <Crystal tier={tier} />
        <Accents tier={tier} />
        <Particles count={particleCount} />
        <ScrollCamera />
        {tier === 'high' && (
          <EffectComposer multisampling={2}>
            <Bloom mipmapBlur intensity={0.8} luminanceThreshold={0.18} luminanceSmoothing={0.5} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
