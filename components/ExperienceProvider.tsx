'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
const Experience = createContext({ ready: false, animated: false, spatial: false, paused: false, toggle: () => {} });
export function useExperience() { return useContext(Experience); }
export default function ExperienceProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(media.matches);
    update();
    setReady(true);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const animated = ready && !reduced && !paused && !hidden;
  const spatial = animated && finePointer;
  return <Experience.Provider value={{ ready, animated, spatial, paused: paused || !!reduced, toggle: () => setPaused(value => !value) }}>
    <MotionConfig reducedMotion={animated ? 'user' : 'always'} transition={{ type: 'spring', stiffness: 150, damping: 24 }}>
      <div className={animated ? 'experience' : 'experience motion-paused'}>{children}</div>
    </MotionConfig>
  </Experience.Provider>;
}
