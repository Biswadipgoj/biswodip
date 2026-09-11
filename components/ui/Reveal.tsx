'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useExperience } from '../ExperienceProvider';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Entrance direction — 'up' by default, or a 3D tilt-in from -Z. */
  variant?: 'up' | 'depth' | 'left' | 'right';
  style?: React.CSSProperties;
};

const offsets = {
  up: { y: 26, x: 0, z: 0, rotateX: 0, rotateY: 0 },
  depth: { y: 18, x: 0, z: -70, rotateX: 9, rotateY: 0 },
  left: { y: 0, x: -30, z: 0, rotateX: 0, rotateY: 8 },
  right: { y: 0, x: 30, z: 0, rotateX: 0, rotateY: -8 },
} as const;

/**
 * Scroll-triggered entrance with a premium settle. Uses transform + opacity +
 * a brief blur only; `once` keeps it cheap after the first reveal.
 */
export default function Reveal({ children, className = '', delay = 0, variant = 'up', style }: Props) {
  const { animated } = useExperience();
  const from = offsets[variant];
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={animated ? { opacity: 0, filter: 'blur(10px)', ...from } : false}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </motion.div>
  );
}
