'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { useExperience } from '../ExperienceProvider';

export default function Computer3D({ image, label }: { image: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { animated, spatial } = useExperience();
  const motionRef = useRef({ animated, spatial });
  const refreshRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    motionRef.current = { animated, spatial };
    refreshRef.current();
  }, [animated, spatial]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    setReady(false);
    setFailed(false);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } catch {
      setFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    const workstation = new THREE.Group();
    workstation.rotation.set(-0.04, -0.14, 0);
    scene.add(workstation);
    scene.add(new THREE.HemisphereLight(0xffeedd, 0x2d1f19, 2.6));
    const key = new THREE.DirectionalLight(0xfff7ed, 3.2);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xf59e0b, 2.4);
    rim.position.set(-4, 1, -2);
    scene.add(rim);

    const metal = new THREE.MeshStandardMaterial({ color: 0x3d3029, metalness: 0.75, roughness: 0.25 });
    const chassis = new THREE.MeshStandardMaterial({ color: 0x1f1714, metalness: 0.65, roughness: 0.3 });
    const keys = new THREE.MeshStandardMaterial({ color: 0x4a3b34, metalness: 0.3, roughness: 0.45 });
    const accent = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    function box(width: number, height: number, depth: number, material: THREE.Material, x: number, y: number, z: number) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
      mesh.position.set(x, y, z);
      workstation.add(mesh);
      return mesh;
    }

    box(5.12, 3.5, 0.18, metal, 0, 0.65, -0.03);
    box(5.02, 3.4, 0.2, chassis, 0, 0.65, 0);
    box(0.24, 1.15, 0.26, metal, 0, -1.35, -0.2);
    box(1.8, 0.09, 1.25, metal, 0, -1.94, -0.1);
    box(3.3, 0.14, 1.12, chassis, -0.25, -1.91, 1.24);
    for (let row = 0; row < 5; row += 1) {
      box(3.02, 0.06, 0.13, keys, -0.25, -1.8, 0.86 + row * 0.19);
    }
    box(0.74, 0.06, 0.9, metal, 1.95, -1.89, 1.24);
    box(0.24, 0.025, 0.012, accent, 0, -1.0, 0.11);

    let disposed = false;
    let contextLost = false;
    let visible = true;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;

    const render = (time: number) => {
      frame = 0;
      if (disposed || contextLost || !visible || document.hidden) return;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      if (motionRef.current.animated) {
        elapsed += delta;
        const damping = 1 - Math.exp(-7 * delta);
        const x = motionRef.current.spatial ? pointerX : 0;
        const y = motionRef.current.spatial ? pointerY : 0;
        workstation.rotation.y = THREE.MathUtils.lerp(workstation.rotation.y, -0.14 + x * 0.08, damping);
        workstation.rotation.x = THREE.MathUtils.lerp(workstation.rotation.x, -0.04 - y * 0.05, damping);
        workstation.position.y = Math.sin(elapsed * 0.7) * 0.02;
      }
      renderer.render(scene, camera);
      if (motionRef.current.animated) frame = requestAnimationFrame(render);
    };

    // Redraw once when static; only schedule continuous frames while visible and enabled.
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      render(performance.now());
    };
    refreshRef.current = refresh;

    const texture = new THREE.TextureLoader().load(image, loaded => {
      if (disposed) { loaded.dispose(); return; }
      loaded.colorSpace = THREE.SRGBColorSpace;
      loaded.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      refresh();
      setReady(true);
    }, undefined, () => {
      if (!disposed) { setFailed(true); contextLost = true; cancelAnimationFrame(frame); }
    });
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 3.2),
      new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
    );
    screen.position.set(0, 0.65, 0.105);
    workstation.add(screen);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
      // Fit both monitor and keyboard, including the small pointer tilt, at every aspect ratio.
      camera.position.set(0, 0.15, Math.max(2.6 / Math.tan(halfFov), 3.05 / (Math.tan(halfFov) * camera.aspect)) + 0.8);
      camera.lookAt(0, 0.15, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      refresh();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      refresh();
    });
    visibilityObserver.observe(container);

    const move = (event: PointerEvent) => {
      if (!motionRef.current.spatial || event.pointerType !== 'mouse') return;
      const rect = container.getBoundingClientRect();
      pointerX = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
      pointerY = THREE.MathUtils.clamp(1 - (event.clientY - rect.top) / rect.height * 2, -1, 1);
    };
    const reset = () => { pointerX = 0; pointerY = 0; };
    const lost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
      setFailed(true);
    };
    container.addEventListener('pointermove', move, { passive: true });
    container.addEventListener('pointerleave', reset);
    container.addEventListener('pointercancel', reset);
    canvas.addEventListener('webglcontextlost', lost);
    document.addEventListener('visibilitychange', refresh);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      refreshRef.current = () => {};
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      container.removeEventListener('pointermove', move);
      container.removeEventListener('pointerleave', reset);
      container.removeEventListener('pointercancel', reset);
      canvas.removeEventListener('webglcontextlost', lost);
      document.removeEventListener('visibilitychange', refresh);
      const materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
      });
      materials.forEach(material => material.dispose());
      texture.dispose();
      renderer.dispose();
    };
  }, [image]);

  return (
    <div ref={containerRef} role="img" aria-label={failed ? `${label} project screenshot` : `A three-dimensional workstation displaying a screenshot of ${label}`} className="hero-computer relative !h-full w-full">
      {(!ready || failed) && <Image src={image} alt="" fill priority sizes="(min-width: 981px) 600px, 90vw" className="rounded-xl object-contain" />}
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" style={{ visibility: ready && !failed ? 'visible' : 'hidden' }} />
    </div>
  );
}
