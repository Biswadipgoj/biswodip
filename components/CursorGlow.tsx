'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useExperience } from './ExperienceProvider';
export default function CursorGlow() {
  const { spatial } = useExperience();
  const px = useMotionValue(-600); const py = useMotionValue(-600);
  const x = useSpring(px, { damping: 30, stiffness: 160 }); const y = useSpring(py, { damping: 30, stiffness: 160 });
  useEffect(() => {
    if (!spatial) return;
    const move = (event: PointerEvent) => { px.set(event.clientX - 160); py.set(event.clientY - 160); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [spatial, px, py]);
  return spatial ? <motion.div className="cursor-glow" aria-hidden="true" style={{ x, y }} /> : null;
}
