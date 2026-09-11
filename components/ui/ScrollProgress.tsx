'use client';
import { motion, useScroll } from 'motion/react';
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: scrollYProgress }} />;
}
