'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<'div'> & {
  /** entry delay in seconds (use for manual staggering) */
  delay?: number;
  /** travel distance on the Y axis */
  y?: number;
  /** start slightly scaled-down for a premium "settle" feel */
  scale?: boolean;
};

/**
 * A reusable scroll-reveal wrapper — fades + lifts (and optionally settles
 * from a small scale) when it enters the viewport. The single building block
 * behind the site's cinematic, scene-by-scene reveals.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  scale = false,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers any direct <motion> children using the shared variants. */
export function RevealGroup({
  children,
  stagger = 0.1,
  ...rest
}: HTMLMotionProps<'div'> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside <RevealGroup>. */
export const revealItem = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};
