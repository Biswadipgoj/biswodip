"use client";

import { motion, Variants } from "motion/react";

export default function HeroSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[rgb(var(--accent))]/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        className="text-center px-4 z-10"
      >
        <motion.div variants={item} className="mb-4">
          <span className="inline-block py-1 px-3 rounded-full glass-dark text-sm font-medium tracking-widest text-white/80 uppercase">
            Computer Science Engineer
          </span>
        </motion.div>

        <motion.h1 
          variants={item} 
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-tight"
        >
          Engineering <br />
          <span className="text-gradient-accent">Scalable</span> <br />
          Solutions
        </motion.h1>

        <motion.p 
          variants={item}
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-sans font-light"
        >
          Translating complex computer science concepts into elegant, highly-optimized, and immersive web experiences.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
      </motion.div>
    </section>
  );
}
