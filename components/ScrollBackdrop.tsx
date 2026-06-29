'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * A living, scroll-reactive background: soft neon-pastel colour orbs that
 * drift on their own and parallax as you scroll, layered over the CSS aurora.
 * Transform/opacity only — cheap to composite on every device.
 */

type Orb = {
  size: number;
  color: string;
  top: string;
  left: string;
  drift: number; // parallax strength (negative = moves up faster)
  delay: number;
  dur: number;
};

const ORBS: Orb[] = [
  { size: 560, color: 'rgba(99,102,241,0.55)', top: '-6%', left: '-4%', drift: -120, delay: 0, dur: 16 },
  { size: 520, color: 'rgba(34,211,238,0.50)', top: '8%', left: '70%', drift: 90, delay: 1.5, dur: 18 },
  { size: 480, color: 'rgba(236,72,153,0.50)', top: '52%', left: '-8%', drift: -70, delay: 0.8, dur: 20 },
  { size: 600, color: 'rgba(139,92,246,0.45)', top: '64%', left: '64%', drift: 140, delay: 2.2, dur: 22 },
  { size: 420, color: 'rgba(52,211,153,0.45)', top: '38%', left: '38%', drift: -50, delay: 1.1, dur: 19 },
];

function FloatingOrb({ orb, progress }: { orb: Orb; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const y = useTransform(progress, [0, 1], [0, orb.drift]);
  const ys = useSpring(y, { stiffness: 60, damping: 25, mass: 0.6 });

  return (
    <motion.span
      aria-hidden
      style={{
        y: ys,
        width: orb.size,
        height: orb.size,
        top: orb.top,
        left: orb.left,
        background: `radial-gradient(circle at 50% 50%, ${orb.color}, transparent 70%)`,
      }}
      className="absolute rounded-full blur-[60px] will-change-transform"
      animate={{
        x: [0, 28, -22, 0],
        scale: [1, 1.08, 0.96, 1],
        opacity: [0.75, 1, 0.85, 0.75],
      }}
      transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function ScrollBackdrop() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // a gentle global hue/brightness shift as you travel through the story
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 14, 26]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg) saturate(1.08)`);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ filter }}
      className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden"
    >
      {ORBS.map((orb, i) => (
        <FloatingOrb key={i} orb={orb} progress={scrollYProgress} />
      ))}
    </motion.div>
  );
}
