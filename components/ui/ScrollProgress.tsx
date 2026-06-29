'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Slim colorful progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left"
    >
      <div
        className="h-full w-full"
        style={{ background: 'linear-gradient(90deg,#22d3ee,#3b82f6,#8b5cf6,#f472b6,#fbbf24)' }}
      />
    </motion.div>
  );
}
