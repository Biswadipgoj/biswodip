'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { constellation, shipped } from '@/lib/data';

/**
 * SOLAR SYSTEM ARSENAL — Highly immersive 3D orbital mechanics
 */

const TAB_COLORS = ['#22d3ee', '#a78bfa', '#2496ed', '#34d399'] as const;

// Orbital configs - giving each system a unique feel
const ORBIT_CFG = [
  { rx: 240, ry: 80, tilt: 0.65, speed: 0.004, name: 'Frontend System' },   // Wider orbit
  { rx: 220, ry: 90, tilt: 0.72, speed: 0.0035, name: 'Backend System' },  // Steeper tilt
  { rx: 260, ry: 75, tilt: 0.58, speed: 0.005, name: 'DevOps System' },  // Faster, flatter
  { rx: 230, ry: 85, tilt: 0.68, speed: 0.0045, name: 'Data System' },   // Balanced
] as const;

const SIZE = 600; // Increased size for a grander feel
const CX = SIZE / 2;
const CY = SIZE / 2;

type Craft = { name: string; vibe: string; color: string; icon: string };

function OrbitalSystem({
  crafts,
  tabColor,
  cfgIdx,
}: {
  crafts: Craft[];
  tabColor: string;
  cfgIdx: number;
}) {
  const chipEls  = useRef<(HTMLDivElement | null)[]>([]);
  const trailEls = useRef<(HTMLDivElement | null)[]>([]);
  const anglesRef = useRef<number[]>([]);
  const pausedRef = useRef<number | null>(null);
  const rafRef    = useRef<number>(0);

  chipEls.current = [];
  trailEls.current = [];

  useEffect(() => {
    // Distribute planets evenly
    anglesRef.current = crafts.map((_, i) => (i / crafts.length) * Math.PI * 2);
  }, [crafts]);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const { rx, ry, tilt, speed } = ORBIT_CFG[cfgIdx];
    const projRy = ry * Math.cos(tilt); 

    const loop = () => {
      const angles = anglesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      for (let i = 0; i < angles.length; i++) {
        if (pausedRef.current !== i) angles[i] += speed;
      }

      const pts = angles.map((a, i) => {
        // Vary the radius slightly for each planet so they aren't on the exact same ring
        const radiusOffset = (i % 3 === 0 ? 0 : i % 2 === 0 ? -20 : 20);
        const currentRx = rx + radiusOffset;
        const currentRy = projRy + (radiusOffset * Math.cos(tilt));

        const cosA = Math.cos(a);
        const sinA = Math.sin(a);
        let sx    = CX + cosA * currentRx;
        let sy    = CY + sinA * currentRy;
        const z     = sinA * Math.sin(tilt);
        const depth = (z + 1) / 2;

        // Tangent direction (backward along the travel path) for the comet trail
        const velX = -sinA * currentRx;
        const velY =  cosA * currentRy;
        const tailDeg = Math.atan2(-velY, -velX) * (180 / Math.PI);

        // Physics: Repel from mouse
        if (mouseActive) {
          const dx = sx - mx;
          const dy = sy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 140;
          if (dist < repelRadius && dist > 0) {
            const force = Math.pow((repelRadius - dist) / repelRadius, 2) * 40;
            sx += (dx / dist) * force;
            sy += (dy / dist) * force;
          }
        }

        return { i, sx, sy, z, depth, tailDeg };
      });

      pts.sort((a, b) => a.z - b.z);

      pts.forEach(({ i, sx, sy, depth, tailDeg }) => {
        const el = chipEls.current[i];
        if (!el) return;
        const paused  = pausedRef.current === i;
        const scale   = paused ? 1.2 : 0.6 + depth * 0.6;
        const opacity = paused ? 1    : 0.3 + depth * 0.7;
        el.style.transform = `translate(${sx}px, ${sy}px) translate(-50%,-50%) scale(${scale})`;
        el.style.opacity   = String(opacity.toFixed(2));
        el.style.zIndex    = paused ? '200' : String(Math.round(depth * 100));

        if (paused) {
          el.classList.add('is-paused');
        } else {
          el.classList.remove('is-paused');
        }

        const trail = trailEls.current[i];
        if (trail) {
          trail.style.transform = `translate(${sx}px, ${sy}px) rotate(${tailDeg}deg) scaleX(${paused ? 0.3 : 0.55 + depth * 0.65})`;
          trail.style.opacity   = paused ? '0' : String((0.1 + depth * 0.32).toFixed(2));
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [crafts, cfgIdx]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const { rx, ry, tilt } = ORBIT_CFG[cfgIdx];
  const projRy = ry * Math.cos(tilt);

  return (
    <div 
      ref={containerRef}
      className="relative select-none flex items-center justify-center" 
      style={{ width: SIZE, height: SIZE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* ── Background Deep Space Elements ── */}
      <div className="absolute inset-0 pointer-events-none rounded-full" style={{
        background: `radial-gradient(circle at center, ${tabColor}08 0%, transparent 70%)`
      }} />

      {/* ── Orbital Rings ── */}
      <svg className="pointer-events-none absolute inset-0" width={SIZE} height={SIZE} overflow="visible" aria-hidden>
        {/* Render a few distinct rings to make it look like a system */}
        {[rx - 20, rx, rx + 20].map((r, idx) => (
           <ellipse key={idx} cx={CX} cy={CY} rx={r} ry={r * Math.cos(tilt)}
           fill="none" stroke={tabColor} strokeWidth={idx === 1 ? "1.5" : "0.5"} strokeOpacity={idx === 1 ? "0.2" : "0.08"}
           strokeDasharray={idx === 1 ? "4 8" : "none"} />
        ))}

        {/* Radar sector spokes — carve the disc into 8 scan sectors */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const a = (idx / 8) * Math.PI * 2;
          const outer = rx + 24;
          const inner = outer - 42;
          const x1 = CX + Math.cos(a) * inner;
          const y1 = CY + Math.sin(a) * inner * Math.cos(tilt);
          const x2 = CX + Math.cos(a) * outer;
          const y2 = CY + Math.sin(a) * outer * Math.cos(tilt);
          return (
            <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={tabColor} strokeWidth="0.5" strokeOpacity="0.14" strokeDasharray="1.5 4" />
          );
        })}
        {/* Sector tick nodes at the sweep's outer edge */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const a = (idx / 8) * Math.PI * 2;
          const r = rx + 24;
          const x = CX + Math.cos(a) * r;
          const y = CY + Math.sin(a) * r * Math.cos(tilt);
          return <circle key={idx} cx={x} cy={y} r="1.6" fill={tabColor} fillOpacity="0.4" />;
        })}
      </svg>

      {/* ── Radar sweep beam — a living scan rotating through the sectors ── */}
      <div
        className="orbit-sweep-clip pointer-events-none absolute rounded-full overflow-hidden"
        style={{
          width: (rx + 24) * 2,
          height: (rx + 24) * 2 * Math.cos(tilt),
          left: CX,
          top: CY,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="orbit-sweep"
          style={
            {
              width: (rx + 24) * 3,
              height: (rx + 24) * 3,
              left: '50%',
              top: '50%',
              '--sweep-c': tabColor,
              '--sweep-speed': `${(0.004 / ORBIT_CFG[cfgIdx].speed) * 8}s`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* ── Comet trails — one per planet, oriented along its travel path ── */}
      <div className="absolute inset-0 pointer-events-none">
        {crafts.map((craft, i) => (
          <div
            key={craft.name + '-trail'}
            ref={el => { trailEls.current[i] = el; }}
            className="tech-planet-trail"
            style={{ '--tc': craft.color } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── The Central Star ── */}
      <div className="solar-center" style={{ '--star-color': tabColor } as React.CSSProperties}>
        {/* Core */}
        <div className="w-24 h-24 rounded-full relative overflow-hidden" style={{
          background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${tabColor} 40%, #000000 100%)`,
          boxShadow: `
            0 0 40px ${tabColor}aa, 
            0 0 80px ${tabColor}66, 
            0 0 150px ${tabColor}33,
            inset -10px -10px 20px rgba(0,0,0,0.8)
          `
        }}>
          {/* Surface texture/swirls (simulated with CSS) */}
          <div className="absolute inset-0 rounded-full mix-blend-overlay opacity-40" style={{
            background: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 4px, rgba(255,255,255,0.1) 5px, transparent 6px)'
          }} />
        </div>
      </div>

      {/* ── Orbiting Planets (Tech) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {crafts.map((craft, i) => (
          <div
            key={craft.name}
            ref={el => { chipEls.current[i] = el; }}
            className="tech-planet-wrapper pointer-events-auto"
            onMouseEnter={() => { pausedRef.current = i; }}
            onMouseLeave={() => { pausedRef.current = null; }}
          >
            <div className="tech-planet" style={{ '--c': craft.color } as React.CSSProperties}>
               <span className="tech-planet-icon" dangerouslySetInnerHTML={{ __html: craft.icon.replace(/width="[0-9]+"/, 'width="24"').replace(/height="[0-9]+"/, 'height="24"') }}></span>
               
               {/* Holographic HUD */}
               <div className="tech-planet-hud">
                  <span className="hud-title">{craft.name}</span>
                  <span className="hud-desc">{craft.vibe}</span>
                  
                  {/* Decorative sci-fi elements */}
                  <div className="mt-2 flex gap-1">
                    {[1,2,3].map(bar => (
                       <div key={bar} className="h-1 bg-white/20 rounded-full flex-1 overflow-hidden">
                          <div className="h-full bg-current w-full animate-pulse" style={{ color: craft.color, animationDelay: `${bar * 0.2}s` }} />
                       </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */
export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef    = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // There are 'constellation.length' (4) tabs.
    const newTab = Math.min(
      constellation.length - 1,
      Math.max(0, Math.floor(latest * constellation.length))
    );
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  });

  const orbit    = constellation[activeTab];
  const tabColor = TAB_COLORS[activeTab];

  /* Cursor spotlight — direct DOM, no state */
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const sp = spotRef.current;
    const s  = sectionRef.current;
    if (!sp || !s) return;
    const r = s.getBoundingClientRect();
    sp.style.left = `${e.clientX - r.left}px`;
    sp.style.top  = `${e.clientY - r.top}px`;
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative"
      style={{ height: '400vh' }}
    >
      <div 
        className="sticky top-0 min-h-screen overflow-hidden flex flex-col justify-center py-10 md:py-32"
        onMouseMove={onMove}
      >
      {/* ── Ambience ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg className="absolute inset-0 h-full w-full opacity-[0.038]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-skills" x="0" y="0" width="56" height="64" patternUnits="userSpaceOnUse">
              <path d="M28 0L56 16v32L28 64 0 48V16z" fill="none" stroke="white" strokeWidth="0.55" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-skills)" />
        </svg>
        {/* Colour bloom that follows active tab */}
        <div
          className="absolute left-1/2 md:left-1/4 top-1/2 md:top-1/4 h-[400px] md:h-[700px] w-[400px] md:w-[700px] -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 rounded-full blur-[100px] md:blur-[160px] transition-all duration-700"
          style={{ background: `${tabColor}0d` }}
        />
        {/* Cursor spotlight (desktop only mostly) */}
        <div
          ref={spotRef}
          className="hidden md:block absolute z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-700"
          style={{ background: `radial-gradient(circle, ${tabColor}12 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-center">
        
        <div className="flex flex-col lg:grid lg:grid-cols-[260px,1fr] gap-6 lg:gap-16 items-center lg:items-center">

          {/* ═══════════════════════════════════════ */}
          {/* LEFT / TOP — identity + vertical tab list */}
          {/* ═══════════════════════════════════════ */}
          <div className="w-full flex flex-col md:block order-2 lg:order-1 mt-auto lg:mt-0 z-20">
            <div className="hidden lg:flex mb-3 items-center gap-2">
              <span className="h-px w-6 transition-colors duration-500" style={{ background: tabColor }} />
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.28em] transition-colors duration-500" style={{ color: tabColor }}>
                // tech.stack
              </span>
            </div>

            <h2 className="text-center lg:text-left mb-2 md:mb-2 font-display text-[2.2rem] md:text-[clamp(2.8rem,5vw,4.5rem)] font-extrabold leading-[0.88] tracking-tighter text-white">
              THE
              <br className="hidden lg:block" />
              <span className="ml-2 lg:ml-0 transition-all duration-500" style={{ color: tabColor, textShadow: `0 0 55px ${tabColor}55` }}>
                ORBIT
              </span>
            </h2>
            <p className="hidden lg:block mb-10 max-w-[220px] text-sm leading-relaxed text-slate-500">
              24 battle-tested tools orbiting across 4 domains. Hover any planet to pause and inspect.
            </p>

            {/* Vertical timeline */}
            <div className="relative mt-2 md:mt-0">
              {/* Static connector line */}
              <div className="absolute left-[7px] top-3 bottom-3 w-px bg-white/[0.07]" />
              {/* Active progress glow */}
              <div
                className="pointer-events-none absolute left-[7px] w-px transition-all duration-500"
                style={{
                  background: `linear-gradient(180deg, ${tabColor}, transparent)`,
                  boxShadow: `0 0 8px ${tabColor}`,
                  top: `calc(${(activeTab / 4) * 100}% + 8px)`,
                  height: '26%',
                }}
              />

              <div className="space-y-0 md:space-y-0.5">
                {constellation.map((o, i) => {
                  const active = i === activeTab;
                  const col = TAB_COLORS[i];
                  return (
                    <button
                      key={o.ring}
                      onClick={() => setActiveTab(i)}
                      className="group relative flex w-full items-start gap-4 rounded-xl py-2 md:py-3 pl-6 pr-4 text-left outline-none transition-all duration-200 focus-visible:ring-1 focus-visible:ring-white/20"
                      style={{ background: active ? `${col}0e` : 'transparent' }}
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute left-[4px] top-[15px] md:top-[19px] h-[7px] w-[7px] rounded-full border-[1.5px] transition-all duration-300"
                        style={{
                          borderColor: active ? col : 'rgba(255,255,255,0.18)',
                          background: active ? col : 'transparent',
                          boxShadow: active ? `0 0 9px ${col}` : 'none',
                        }}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span
                            className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.22em] transition-colors duration-300"
                            style={{ color: active ? col : 'rgba(255,255,255,0.2)' }}
                          >
                            0{i + 1}
                          </span>
                          <span
                            className="font-bold text-[0.75rem] md:text-[0.78rem] transition-colors duration-300"
                            style={{ color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
                          >
                            {o.ring}
                          </span>
                        </div>
                        <AnimatePresence>
                          {active && (
                            <motion.p
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 3 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden text-[0.6rem] md:text-[0.62rem] leading-snug text-slate-500"
                            >
                              {o.caption}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════ */}
          {/* RIGHT / MIDDLE — 3D orbital display    */}
          {/* ═══════════════════════════════════════ */}
          <div className="w-full order-1 lg:order-2 flex items-center justify-center flex-1 h-[320px] md:h-auto overflow-visible relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute md:relative transform scale-[0.55] sm:scale-[0.65] lg:scale-100 origin-center"
              >
                <OrbitalSystem
                  crafts={orbit.crafts}
                  tabColor={tabColor}
                  cfgIdx={activeTab}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>

        {/* ── Marquee ── */}
        <div className="relative mt-8 md:mt-20 overflow-hidden opacity-50 md:opacity-100">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-24"
            style={{ background: 'linear-gradient(to right, #080a10, transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-24"
            style={{ background: 'linear-gradient(to left, #080a10, transparent)' }} />
          <div className="skills-marquee flex gap-10 whitespace-nowrap py-1">
            {[...shipped, ...shipped].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-[0.65rem] md:text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/20">
                <span className="h-px w-4" style={{ background: TAB_COLORS[i % 4] }} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
