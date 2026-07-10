'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** 
 * Playful, creative scroll progress that draws from both the left and right edges,
 * meeting perfectly in the center to form a single line when you reach the bottom.
 * Features an animated color-shifting gradient.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Add an animated gradient class to the global css or just inline a keyframe animation.
  // Tailwind supports arbitrary background positioning if we add an animate-gradient-pan class.
  // Since we already have 'animate-gradient-pan' defined in tailwind.config.ts!

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-1.5 flex justify-between pointer-events-none">
      {/* Left side drawing towards center */}
      <motion.div
        className="h-full w-1/2 origin-left bg-[length:200%_200%] animate-gradient-pan shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        style={{
          scaleX: smoothProgress,
          backgroundImage: 'linear-gradient(90deg, #22d3ee, #8b5cf6, #f472b6, #22d3ee)'
        }}
      />
      
      {/* Right side drawing towards center */}
      <motion.div
        className="h-full w-1/2 origin-right bg-[length:200%_200%] animate-gradient-pan shadow-[0_0_10px_rgba(244,114,182,0.5)]"
        style={{
          scaleX: smoothProgress,
          backgroundImage: 'linear-gradient(-90deg, #f472b6, #8b5cf6, #22d3ee, #f472b6)'
        }}
      />
      
      {/* Optional: Tiny glowing core in the very center that appears as they meet */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#fff] mix-blend-screen"
        style={{ 
          opacity: smoothProgress,
          scale: smoothProgress 
        }}
      />
    </div>
  );
}
