"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { useExperience } from './ExperienceProvider';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  className = "",
  speed = 0.5 
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { spatial } = useExperience();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Moves the image slower or faster based on speed
  const y = useTransform(scrollYProgress, [0, 1], [`-${40 * speed}%`, `${40 * speed}%`]);

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden rounded-2xl glass ${className}`}
    >
      <motion.div 
        style={{ y: spatial ? y : 0 }} 
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <Image
          src={src} 
          alt={alt} 
          fill
          sizes="(max-width: 899px) 90vw, 50vw"
          className="w-full h-full object-cover opacity-80 mix-blend-screen"
        />
      </motion.div>
    </div>
  );
}
