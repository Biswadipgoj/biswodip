'use client';
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useExperience } from '../ExperienceProvider';
/** Scroll owns this wrapper; hover tilt lives on a separate child. */
export default function Depth({ children, className = '', distance = 36 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { spatial } = useExperience();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const transform = useTransform(scrollYProgress, [0, 1], [`translate3d(0,${distance}px,0)`, `translate3d(0,${-distance}px,0)`]);
  return <div ref={ref} className={`depth-anchor ${className}`}><motion.div className="depth-layer" style={{ transform: spatial ? transform : 'none' }}>{children}</motion.div></div>;
}
