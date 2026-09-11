'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

type ScrollScene3DProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
};

export default function ScrollScene3D({
  children,
  className = '',
  intensity = 1,
  perspective = 1200,
}: ScrollScene3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [70 * intensity, -70 * intensity]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10 * intensity, 0, -10 * intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective }}
    >
      <motion.div
        className="relative"
        style={{
          y,
          rotateX,
          scale,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}