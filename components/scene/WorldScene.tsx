'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* THE WORLD                                                           */
/* One persistent universe behind the whole page. The camera flies     */
/* forward along a corridor of "zones" (one per story beat) as you     */
/* scroll, so the site reads as a journey through space rather than a  */
/* stack of flat sections.                                             */
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

/* Zone layout: spacing between story beats along -z. */
const ZONE_GAP = 22;
const ZONES = 6; // hero · about · orbit · work · journey · finale
const TRAVEL = ZONE_GAP * (ZONES - 1);

/* Atmosphere color per zone — background + fog lerp between these. */
const ZONE_TINTS = [
  new THREE.Color('#221d4d'), // hero — indigo dusk
  new THREE.Color('#171f3d'), // about — deep blue
  new THREE.Color('#251743'), // orbit — violet
  new THREE.Color('#101c33'), // work — midnight cyan
  new THREE.Color('#1d1533'), // journey — plum
  new THREE.Color('#2a1440'), // finale — magenta night
];

/* Shared scroll progress (0..1 across the whole document). */
function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return progress;
}

/* ------------------------------------------------------------------ */
/* Camera: dollies along the corridor with scroll, sways toward the    */
/* pointer, and eases everything so the flight feels weightless.       */
/* ------------------------------------------------------------------ */
function FlightCamera({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame((state) => {
    const p = progress.current;
    const targetZ = 8 - p * TRAVEL;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 1.4, 0.04);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      state.pointer.y * 0.9 + Math.sin(p * Math.PI * 2) * 0.6,
      0.04,
    );
    camera.lookAt(0, 0, camera.position.z - 12);
  });
  return null;
}

/* Atmosphere: background + fog colors drift between zone tints. */
function Atmosphere({ progress }: { progress: React.MutableRefObject<number> }) {
  const { scene } = useThree();
  const bg = useMemo(() => ZONE_TINTS[0].clone(), []);
  useEffect(() => {
    scene.background = bg;
    scene.fog = new THREE.Fog(bg, 14, 46);
    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene, bg]);
  useFrame(() => {
    const p = progress.current * (ZONE_TINTS.length - 1);
    const i = Math.min(Math.floor(p), ZONE_TINTS.length - 2);
    const t = p - i;
    bg.copy(ZONE_TINTS[i]).lerp(ZONE_TINTS[i + 1], t);
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(bg);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Star corridor: a long tube of drifting particles along the flight   */
/* path so there is always depth around the camera.                    */
/* ------------------------------------------------------------------ */
function StarCorridor({ count }: { count: number }) {
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
      // ring-shaped cross-section so the middle stays clear for content
      const angle = Math.random() * Math.PI * 2;
      const radius = 4.5 + Math.random() * 9;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
      positions[i * 3 + 2] = 14 - Math.random() * (TRAVEL + 40);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += Math.min(delta, 0.05) * 0.015;
    const { x, y } = state.pointer;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.5, 0.03);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y * 0.35, 0.03);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
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

/* Soft nebula glows floating along the corridor. */
function Nebulae() {
  const texture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    if (ctx) {
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, 'rgba(255,255,255,0.5)');
      g.addColorStop(0.4, 'rgba(255,255,255,0.2)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  /* Kept well off the flight path (|x| ≥ 10) so the camera never flies
     through a cloud's bright core and washes out the whole viewport. */
  const clouds = useMemo(
    () => [
      { pos: [-11, 4, -6] as const, scale: 11, color: '#3b82f6', opacity: 0.14 },
      { pos: [12, -4, -18] as const, scale: 12, color: '#8b5cf6', opacity: 0.15 },
      { pos: [-12, -3, -40] as const, scale: 12, color: '#22d3ee', opacity: 0.12 },
      { pos: [11, 5, -58] as const, scale: 11, color: '#ec4899', opacity: 0.13 },
      { pos: [-11, 4, -80] as const, scale: 12, color: '#34d399', opacity: 0.1 },
      { pos: [11, -4, -102] as const, scale: 12, color: '#ec4899', opacity: 0.14 },
    ],
    [],
  );

  return (
    <>
      {clouds.map((cl, i) => (
        <sprite key={i} position={[...cl.pos]} scale={[cl.scale, cl.scale, 1]}>
          <spriteMaterial
            map={texture}
            color={cl.color}
            transparent
            opacity={cl.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* ZONE 0 — the hero crystal, pointer-reactive glass heart of the site */
/* ------------------------------------------------------------------ */
function HeroCrystal({ tier }: { tier: Tier }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y += d * 0.25;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.pointer.y * 0.5, 0.05);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, state.pointer.x * 0.5, 0.05);
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.7, 0]} />
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
      </mesh>
    </Float>
  );
}

function HeroSatellites({ tier }: { tier: Tier }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += Math.min(delta, 0.05) * 0.12;
  });
  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.4} floatIntensity={1.4}>
        <mesh position={[3.4, 1.4, -1]}>
          <torusKnotGeometry args={[0.5, 0.16, tier === 'low' ? 90 : 160, tier === 'low' ? 16 : 24]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.18} emissive="#5b21b6" emissiveIntensity={0.35} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={1.2}>
        <mesh position={[-3.6, -1.2, -0.5]} rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[0.75, 0.07, 18, tier === 'low' ? 48 : 80]} />
          <meshStandardMaterial color="#22d3ee" metalness={0.8} roughness={0.2} emissive="#0891b2" emissiveIntensity={0.4} />
        </mesh>
      </Float>
      <Float speed={1.9} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[2.8, -1.8, 0.6]}>
          <icosahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.25} emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.6}>
        <mesh position={[-2.6, 1.8, 0.4]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#34d399" metalness={0.7} roughness={0.25} emissive="#059669" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* ZONE 2 — the skill constellation: three tilted rings with orbiting  */
/* star-nodes, mirroring the DOM "Orbit" section it sits behind.       */
/* ------------------------------------------------------------------ */
function OrbitRing({
  radius,
  tilt,
  speed,
  color,
  nodes,
}: {
  radius: number;
  tilt: number;
  speed: number;
  color: string;
  nodes: number;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += Math.min(delta, 0.05) * speed;
  });
  const points = useMemo(
    () =>
      Array.from({ length: nodes }, (_, i) => {
        const a = (i / nodes) * Math.PI * 2;
        return [Math.cos(a) * radius, Math.sin(a) * radius, 0] as const;
      }),
    [nodes, radius],
  );
  return (
    <group rotation={[tilt, 0.35, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.02, 12, 96]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} transparent opacity={0.55} />
      </mesh>
      <group ref={group}>
        {points.map((p, i) => (
          <mesh key={i} position={[...p]}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ConstellationZone() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += Math.min(delta, 0.05) * 0.06;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.25, 0.03);
  });
  return (
    <group position={[0, 0, -ZONE_GAP * 2]} ref={group}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial color="#f6f8fc" emissive="#a78bfa" emissiveIntensity={1.1} roughness={0.2} />
        </mesh>
      </Float>
      <OrbitRing radius={2.2} tilt={1.05} speed={0.32} color="#22d3ee" nodes={4} />
      <OrbitRing radius={3.2} tilt={0.75} speed={-0.22} color="#8b5cf6" nodes={4} />
      <OrbitRing radius={4.2} tilt={1.35} speed={0.15} color="#fbbf24" nodes={4} />
    </group>
  );
}

/* ZONE 1 — twin halo rings for the "about" passage. */
function HaloZone() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (a.current) {
      a.current.rotation.x += d * 0.25;
      a.current.rotation.y += d * 0.15;
    }
    if (b.current) {
      b.current.rotation.x -= d * 0.18;
      b.current.rotation.y -= d * 0.22;
    }
  });
  return (
    <group position={[0, 0, -ZONE_GAP]}>
      <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.9}>
        <mesh ref={a} position={[-3.4, 1.4, 0]}>
          <torusGeometry args={[1.5, 0.08, 16, 80]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.85} roughness={0.2} emissive="#1d4ed8" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh ref={b} position={[3.6, -1.2, -2]}>
          <torusGeometry args={[1.1, 0.06, 16, 72]} />
          <meshStandardMaterial color="#34d399" metalness={0.85} roughness={0.2} emissive="#047857" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

/* ZONE 3 — floating glass panes: windows into the shipped work. */
function WorkZone({ tier }: { tier: Tier }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.15, 0.03);
    group.current.children.forEach((child, i) => {
      child.rotation.y += Math.min(delta, 0.05) * (i % 2 ? 0.12 : -0.1);
    });
  });
  const panes = [
    { pos: [-4.6, 1.4, 0] as const, color: '#22d3ee' },
    { pos: [4.6, -0.8, -2] as const, color: '#f472b6' },
    { pos: [0, 3, -4] as const, color: '#8b5cf6' },
  ];
  return (
    <group position={[0, 0, -ZONE_GAP * 3]} ref={group}>
      {panes.map((pane, i) => (
        <Float key={i} speed={1.2 + i * 0.3} rotationIntensity={0.4} floatIntensity={1}>
          <mesh position={[...pane.pos]} rotation={[0, i % 2 ? -0.5 : 0.5, 0.08]}>
            <boxGeometry args={[2.2, 1.4, 0.06]} />
            <meshStandardMaterial
              color={pane.color}
              metalness={0.9}
              roughness={0.12}
              emissive={pane.color}
              emissiveIntensity={tier === 'high' ? 0.45 : 0.6}
              transparent
              opacity={0.55}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ZONE 4 — a spiral of glowing waypoints: the journey so far. */
function JourneyZone() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += Math.min(delta, 0.05) * 0.08;
  });
  const beads = useMemo(() => {
    const palette = ['#22d3ee', '#8b5cf6', '#34d399', '#fbbf24'];
    return Array.from({ length: 14 }, (_, i) => {
      const t = i / 13;
      const a = t * Math.PI * 3;
      return {
        pos: [Math.cos(a) * (2.2 + t * 2.4), Math.sin(a) * (1.6 + t * 1.6), -t * 8] as const,
        color: palette[i % palette.length],
        size: 0.16 + t * 0.14,
      };
    });
  }, []);
  return (
    <group position={[0, 0, -ZONE_GAP * 4]} ref={group}>
      {beads.map((bead, i) => (
        <Float key={i} speed={1 + (i % 3) * 0.4} rotationIntensity={0.2} floatIntensity={0.7}>
          <mesh position={[...bead.pos]}>
            <sphereGeometry args={[bead.size, 14, 14]} />
            <meshStandardMaterial color={bead.color} emissive={bead.color} emissiveIntensity={1.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ZONE 5 — the finale portal the camera sails into. */
function PortalZone() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (outer.current) outer.current.rotation.z += d * 0.3;
    if (inner.current) inner.current.rotation.z -= d * 0.45;
  });
  return (
    <group position={[0, 0, -ZONE_GAP * 5 - 6]}>
      <mesh ref={outer}>
        <torusGeometry args={[4.4, 0.12, 16, 100]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={1.2} metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh ref={inner} rotation={[0, 0, 1]}>
        <torusGeometry args={[3.4, 0.08, 16, 90]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.2} metalness={0.8} roughness={0.15} />
      </mesh>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#fdf4ff" emissive="#f0abfc" emissiveIntensity={1.6} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

/* Pointer-chasing lights so hovering anywhere repaints the world. */
function ReactiveLights() {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);
  const { camera } = useThree();
  useFrame((state) => {
    const { x, y } = state.pointer;
    const z = camera.position.z;
    if (a.current) {
      a.current.position.set(
        THREE.MathUtils.lerp(a.current.position.x, x * 7, 0.06),
        THREE.MathUtils.lerp(a.current.position.y, y * 5, 0.06),
        z - 4,
      );
    }
    if (b.current) {
      b.current.position.set(
        THREE.MathUtils.lerp(b.current.position.x, -x * 7, 0.06),
        THREE.MathUtils.lerp(b.current.position.y, -y * 5, 0.06),
        z - 8,
      );
    }
  });
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight ref={a} position={[5, 4, 4]} intensity={130} color="#22d3ee" distance={34} />
      <pointLight ref={b} position={[-5, -3, 0]} intensity={120} color="#ec4899" distance={34} />
      <directionalLight position={[3, 6, 5]} intensity={0.9} color="#ffffff" />
    </>
  );
}

/* Follows the camera so each zone is lit as you arrive. */
function TravelLight() {
  const ref = useRef<THREE.PointLight>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (ref.current) ref.current.position.set(0, 2, camera.position.z - 6);
  });
  return <pointLight ref={ref} intensity={90} color="#8b5cf6" distance={26} />;
}

export default function WorldScene() {
  const [tier, setTier] = useState<Tier>('high');
  const progress = useScrollProgress();

  useEffect(() => {
    setTier(detectTier());
  }, []);

  const starCount = tier === 'low' ? 700 : 1600;

  return (
    <Canvas
      dpr={tier === 'low' ? [1, 1.3] : [1, 1.7]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: tier === 'high', alpha: false, powerPreference: 'high-performance' }}
    >
      <Atmosphere progress={progress} />
      <FlightCamera progress={progress} />
      <ReactiveLights />
      <TravelLight />
      <StarCorridor count={starCount} />
      <Nebulae />

      {/* the six story beats along the corridor */}
      <group>
        <HeroCrystal tier={tier} />
        <HeroSatellites tier={tier} />
      </group>
      <HaloZone />
      <ConstellationZone />
      <WorkZone tier={tier} />
      <JourneyZone />
      <PortalZone />

      {tier === 'high' && (
        <EffectComposer multisampling={2}>
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.18} luminanceSmoothing={0.5} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
