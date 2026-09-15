'use client';

import { Component, useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useExperience } from '../ExperienceProvider';

/* The universe is heavy and browser-only — stream it in after first paint.
   Until it arrives (and forever, under reduced motion) the CSS aurora
   backdrop in the layout carries the scene. */
const WorldScene = dynamic(() => import('@/components/scene/WorldScene'), {
  ssr: false,
  loading: () => null,
});

class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('WorldScene canvas caught error, gracefully falling back to CSS aurora:', error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Mounts the persistent 3D world as a fixed layer behind the entire page.
 * Every section floats above this one continuous universe — the camera
 * travels through it as you scroll, so the site never reads as flat pages.
 */
export default function WorldCanvas() {
  const { animated } = useExperience();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!animated || ready) return;
    // Defer WebGL setup, but keep the mounted scene when motion is paused.
    if ('requestIdleCallback' in window) {
      const idle = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(idle);
    }
    const timer = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(timer);
  }, [animated, ready]);

  if (!ready) return null;

  return (
    // z-0 (not negative) so the canvas layer composites reliably everywhere;
    // the page content mounts after it in the DOM and therefore paints above.
    <div className="world-canvas pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <SceneErrorBoundary>
        <WorldScene active={animated} />
      </SceneErrorBoundary>
    </div>
  );
}
