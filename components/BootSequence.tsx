'use client';
import Icon from './ui/Icon';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { experienceCopy } from '@/lib/data';
const SESSION_KEY = 'biswodip-experience-seen';
export default function BootSequence() {
  const [visible, setVisible] = useState(false); const [stage, setStage] = useState(0);
  const finish = useCallback(() => {
    setVisible(false);
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* Storage can be disabled. */ }
  }, []);
  useEffect(() => {
    // Content and fonts remain available behind this short, optional overlay.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch { /* Still skippable. */ }
    setVisible(true);
    const timers = [window.setTimeout(() => setStage(1), 340), window.setTimeout(() => setStage(2), 720), window.setTimeout(finish, 1050)];
    const skip = () => finish();
    window.addEventListener('keydown', skip, { once: true }); reduced.addEventListener('change', skip);
    return () => { timers.forEach(clearTimeout); window.removeEventListener('keydown', skip); reduced.removeEventListener('change', skip); };
  }, [finish]);
  return <AnimatePresence>{visible && <motion.div className="boot-sequence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
    <span className="boot-monogram" aria-hidden="true">b<span>.</span></span>
    <motion.p key={stage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.12 }}>{experienceCopy.boot[stage]}</motion.p>
    <div className="boot-track" aria-hidden="true"><span /></div>
    <button onClick={finish} type="button">Skip intro <Icon name="arrowUpRight" /></button>
  </motion.div>}</AnimatePresence>;
}
