'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ZONE_GAP = 22;
const ZONES = 6;
const TRAVEL = ZONE_GAP * (ZONES - 1);

export default function WorldScene({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playback = useRef<((enabled: boolean) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const compact = width < 900 || !finePointer.matches;
    const pixelRatio = () => Math.min(
      window.devicePixelRatio || 1,
      width < 900 || !finePointer.matches ? 1 : 1.5,
      Math.sqrt(2_000_000 / (width * height)),
    );

    // 1. Scene, Camera, Renderer with Quiet Warm Luxury Tone
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0c, 24, 62);
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 70);
    camera.position.set(0, 0, 40);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });
      renderer.setPixelRatio(pixelRatio());
      renderer.setSize(width, height, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch (e) {
      console.warn('WebGL initialization failed in WorldScene:', e);
      return;
    }

    // Restrained ambient and directional lighting
    const ambientLight = new THREE.AmbientLight(0xfafafa, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 0.8);
    dirLight.position.set(3, 6, 5);
    scene.add(dirLight);

    // Subtle warm champagne & amber accent lights
    const lightA = new THREE.PointLight(0xf59e0b, 120, 42, 2);
    scene.add(lightA);

    const lightB = new THREE.PointLight(0xd97706, 80, 38, 2);
    scene.add(lightB);

    // Subtle Code Stream Data Particles (Restrained, low density)
    const particleCount = compact ? 220 : 450;
    const streamPositions = new Float32Array(particleCount * 3);
    const streamColors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color('#f59e0b'), // warm amber
      new THREE.Color('#d4d4d8'), // soft zinc
      new THREE.Color('#e09f54'), // warm champagne
      new THREE.Color('#71717a'), // muted slate
    ];

    for (let i = 0; i < particleCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 5 + Math.random() * 10;
      streamPositions[i * 3] = Math.cos(a) * r;
      streamPositions[i * 3 + 1] = Math.sin(a) * r * 0.6;
      streamPositions[i * 3 + 2] = 12 - Math.random() * (TRAVEL + 40);
      const c = palette[Math.floor(Math.random() * palette.length)];
      streamColors[i * 3] = c.r;
      streamColors[i * 3 + 1] = c.g;
      streamColors[i * 3 + 2] = c.b;
    }

    const streamGeo = new THREE.BufferGeometry();
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    streamGeo.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));

    const streamMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const streamPoints = new THREE.Points(streamGeo, streamMat);
    scene.add(streamPoints);

    // =========================================================================
    // SOFTWARE ARCHITECTURE MATERIALS (MINIMALIST, RESTRAINED, MATTE)
    // =========================================================================
    const nodeDarkMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.3,
      metalness: 0.8,
    });

    const nodeGlowAmber = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.6,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const edgeLineMat = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      emissive: 0x71717a,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.6,
    });

    type Vec3Tuple = [number, number, number] | readonly [number, number, number];

    // Helper to build a clean software edge between 2 nodes
    function createEdge(p1: Vec3Tuple, p2: Vec3Tuple, group: THREE.Group) {
      const v1 = new THREE.Vector3(p1[0], p1[1], p1[2]);
      const v2 = new THREE.Vector3(p2[0], p2[1], p2[2]);
      const dist = v1.distanceTo(v2);
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const orientation = new THREE.Matrix4();
      orientation.lookAt(v1, v2, new THREE.Vector3(0, 1, 0));

      const edge = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, dist, 6), edgeLineMat);
      edge.position.copy(mid);
      edge.quaternion.setFromRotationMatrix(orientation);
      edge.rotateX(Math.PI / 2);
      group.add(edge);
      return edge;
    }

    // =========================================================================
    // SOFTWARE ZONE 0: Abstract Syntax Tree (AST) & Compiler Lexical Parser
    // =========================================================================
    const zone0Group = new THREE.Group();
    zone0Group.position.set(3.4, 0.2, 0);
    scene.add(zone0Group);

    // Root AST Node: Program / FunctionDeclaration
    const astRoot = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 0), nodeGlowAmber);
    zone0Group.add(astRoot);
    const astRootCage = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 0), wireframeMat);
    zone0Group.add(astRootCage);

    // Syntax Child Nodes (BinaryExpression, Identifier, ReturnStatement)
    const astNodes: { pos: [number, number, number]; size: number }[] = [
      { pos: [-1.8, 1.4, -0.2], size: 0.32 },
      { pos: [1.8, 1.2, 0.2], size: 0.32 },
      { pos: [-2.6, -0.8, 0.3], size: 0.26 },
      { pos: [-0.9, -1.1, -0.2], size: 0.26 },
      { pos: [1.0, -1.2, 0.1], size: 0.26 },
      { pos: [2.5, -0.9, -0.3], size: 0.26 },
    ];

    astNodes.forEach(node => {
      const nMesh = new THREE.Mesh(new THREE.SphereGeometry(node.size, 14, 10), nodeDarkMat);
      nMesh.position.set(node.pos[0], node.pos[1], node.pos[2]);
      zone0Group.add(nMesh);
    });

    createEdge([0, 0, 0], astNodes[0].pos, zone0Group);
    createEdge([0, 0, 0], astNodes[1].pos, zone0Group);
    createEdge(astNodes[0].pos, astNodes[2].pos, zone0Group);
    createEdge(astNodes[0].pos, astNodes[3].pos, zone0Group);
    createEdge(astNodes[1].pos, astNodes[4].pos, zone0Group);
    createEdge(astNodes[1].pos, astNodes[5].pos, zone0Group);

    // =========================================================================
    // SOFTWARE ZONE 1: Execution Call Stack & Memory Scope Frames
    // =========================================================================
    const zone1Group = new THREE.Group();
    zone1Group.position.set(-3.5, 0, -ZONE_GAP);
    scene.add(zone1Group);

    // Stack Frames (GlobalScope -> handleRequest -> persist)
    const stackFrames = [
      { pos: [-1.2, 1.6, 0] as const, w: 2.2, h: 0.55, d: 0.8 },
      { pos: [-1.2, 0.8, 0] as const, w: 2.2, h: 0.55, d: 0.8 },
      { pos: [-1.2, 0.0, 0] as const, w: 2.2, h: 0.55, d: 0.8 },
      { pos: [-1.2, -0.8, 0] as const, w: 2.2, h: 0.55, d: 0.8 },
    ];

    stackFrames.forEach((frame, idx) => {
      const mat = idx === 0 ? nodeGlowAmber : nodeDarkMat;
      const fMesh = new THREE.Mesh(new THREE.BoxGeometry(frame.w, frame.h, frame.d), mat);
      fMesh.position.set(frame.pos[0], frame.pos[1], frame.pos[2]);
      zone1Group.add(fMesh);
    });

    // Heap Memory Allocated Blocks
    const heapBlocks = [
      { pos: [1.6, 1.0, -0.4], size: [1.2, 0.7, 0.9] },
      { pos: [2.0, -0.5, 0.2], size: [1.4, 0.8, 1.1] },
      { pos: [1.0, -1.3, -0.3], size: [0.9, 0.6, 0.8] },
    ];

    heapBlocks.forEach(b => {
      const bMesh = new THREE.Mesh(new THREE.BoxGeometry(b.size[0], b.size[1], b.size[2]), wireframeMat);
      bMesh.position.set(b.pos[0], b.pos[1], b.pos[2]);
      zone1Group.add(bMesh);
    });

    // =========================================================================
    // SOFTWARE ZONE 2: V8 Event Loop & Microtask Queue Orbit
    // =========================================================================
    const zone2Group = new THREE.Group();
    zone2Group.position.set(3.4, 0.3, -ZONE_GAP * 2);
    scene.add(zone2Group);

    // The Event Loop Ring
    const loopRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.035, 8, 64),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.8, metalness: 0.7 })
    );
    loopRing.rotation.x = Math.PI / 3;
    zone2Group.add(loopRing);

    // Microtask Queue Packets orbiting
    const microtaskA = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), nodeGlowAmber);
    const microtaskB = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), nodeDarkMat);
    const microtaskC = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), nodeDarkMat);
    zone2Group.add(microtaskA);
    zone2Group.add(microtaskB);
    zone2Group.add(microtaskC);

    // =========================================================================
    // SOFTWARE ZONE 3: Distributed Network API & RPC Pipeline
    // =========================================================================
    const zone3Group = new THREE.Group();
    zone3Group.position.set(-3.2, 0.2, -ZONE_GAP * 3);
    scene.add(zone3Group);

    const serviceNodes: { pos: [number, number, number]; label: string }[] = [
      { pos: [-1.8, 1.1, 0], label: 'Gateway' },
      { pos: [0.0, 1.8, -0.6], label: 'Auth' },
      { pos: [1.8, 0.8, 0.2], label: 'Database' },
      { pos: [-0.8, -1.0, 0.3], label: 'Cache' },
      { pos: [1.2, -1.2, -0.3], label: 'Worker' },
    ];

    serviceNodes.forEach(node => {
      const sMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.45, 6), nodeDarkMat);
      sMesh.position.set(node.pos[0], node.pos[1], node.pos[2]);
      zone3Group.add(sMesh);
    });

    createEdge(serviceNodes[0].pos, serviceNodes[1].pos, zone3Group);
    createEdge(serviceNodes[0].pos, serviceNodes[3].pos, zone3Group);
    createEdge(serviceNodes[1].pos, serviceNodes[2].pos, zone3Group);
    createEdge(serviceNodes[3].pos, serviceNodes[4].pos, zone3Group);
    createEdge(serviceNodes[4].pos, serviceNodes[2].pos, zone3Group);

    // Traveling API request packet
    const requestPacket = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), nodeGlowAmber);
    zone3Group.add(requestPacket);

    // =========================================================================
    // SOFTWARE ZONE 4: Git Commit DAG (Directed Acyclic Graph)
    // =========================================================================
    const zone4Group = new THREE.Group();
    zone4Group.position.set(3.2, 0.1, -ZONE_GAP * 4);
    scene.add(zone4Group);

    // Main Branch Commit Nodes
    const mainCommits = [
      [-3.0, 0, 0],
      [-1.5, 0, 0],
      [0.0, 0, 0],
      [1.5, 0, 0],
      [3.0, 0, 0],
    ] as const;

    mainCommits.forEach((pos, i) => {
      const cMesh = new THREE.Mesh(
        new THREE.SphereGeometry(i === mainCommits.length - 1 ? 0.32 : 0.24, 12, 8),
        i === mainCommits.length - 1 ? nodeGlowAmber : nodeDarkMat
      );
      cMesh.position.set(pos[0], pos[1], pos[2]);
      zone4Group.add(cMesh);
      if (i > 0) createEdge(mainCommits[i - 1], pos, zone4Group);
    });

    // Feature Branch Nodes (branch off commit 1, merge at commit 4)
    const featCommits = [
      [-0.8, 1.2, -0.3],
      [0.8, 1.2, -0.3],
    ] as const;

    featCommits.forEach(pos => {
      const fMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), nodeDarkMat);
      fMesh.position.set(pos[0], pos[1], pos[2]);
      zone4Group.add(fMesh);
    });

    createEdge(mainCommits[1], featCommits[0], zone4Group);
    createEdge(featCommits[0], featCommits[1], zone4Group);
    createEdge(featCommits[1], mainCommits[4], zone4Group);

    // =========================================================================
    // SOFTWARE ZONE 5: Cloud Container Runtime & Pod Deployment
    // =========================================================================
    const zone5Group = new THREE.Group();
    zone5Group.position.set(0, 0, -ZONE_GAP * 5 - 4);
    scene.add(zone5Group);

    // Pod cluster bounding wireframes
    const podBoxA = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.0, 2.0), wireframeMat);
    podBoxA.position.set(-1.8, 0, 0);
    zone5Group.add(podBoxA);

    const podBoxB = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.0, 2.0), wireframeMat);
    podBoxB.position.set(1.8, 0, 0);
    zone5Group.add(podBoxB);

    // Container runtime cores inside pods
    const containerCoreA = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), nodeDarkMat);
    containerCoreA.position.set(-1.8, 0, 0);
    zone5Group.add(containerCoreA);

    const containerCoreB = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), nodeGlowAmber);
    containerCoreB.position.set(1.8, 0, 0);
    zone5Group.add(containerCoreB);

    // =========================================================================
    // SCROLL INTERPOLATION & MOTION ENGINE
    // =========================================================================
    const zones = [zone0Group, zone1Group, zone2Group, zone3Group, zone4Group, zone5Group];
    let enabled = false;
    let inView = false;
    let contextLost = false;
    let scrollY = window.scrollY;
    let scrollRange = 0;
    let layoutDirty = true;
    let sizeDirty = true;
    let pointerX = 0;
    let pointerY = 0;

    const onScroll = () => { scrollY = window.scrollY; };
    const onPointerMove = (event: PointerEvent) => {
      if (!enabled || !inView || document.hidden || !finePointer.matches || width < 900) return;
      pointerX = (event.clientX / width) * 2 - 1;
      pointerY = -(event.clientY / height) * 2 + 1;
    };
    const onResize = () => {
      sizeDirty = true;
      layoutDirty = true;
      pointerX = 0;
      pointerY = 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);
    const layoutObserver = new ResizeObserver(() => { layoutDirty = true; });
    layoutObserver.observe(document.documentElement);
    layoutObserver.observe(document.body);
    const sizeObserver = new ResizeObserver(onResize);
    sizeObserver.observe(canvas);

    let animId = 0;
    let previous: number | null = null;
    let elapsed = 0;
    let startZ = 40;

    const animate = (time: number) => {
      animId = 0;
      if (!enabled || !inView || document.hidden || contextLost) {
        previous = null;
        return;
      }
      const delta = previous === null ? 0 : Math.min((time - previous) / 1000, 0.05);
      previous = time;
      elapsed += delta;

      if (sizeDirty) {
        width = Math.max(1, canvas.clientWidth);
        height = Math.max(1, canvas.clientHeight);
      }
      if (layoutDirty) {
        scrollRange = Math.max(0, document.documentElement.scrollHeight - height);
        layoutDirty = false;
      }
      if (sizeDirty) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(pixelRatio());
        renderer.setSize(width, height, false);
        sizeDirty = false;
      }

      const scrollProgress = scrollRange > 0 ? THREE.MathUtils.clamp(scrollY / scrollRange, 0, 1) : 0;
      startZ = THREE.MathUtils.damp(startZ, 8, 5, delta);
      const targetZ = startZ - scrollProgress * TRAVEL;

      const breathX = Math.sin(elapsed * 0.12) * 0.2;
      const breathY = Math.cos(elapsed * 0.1) * 0.15;
      const camTargetX = pointerX * 1.0 + breathX;
      const camTargetY = pointerY * 0.5 + breathY;

      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 8, delta);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, camTargetX, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camTargetY, 4, delta);
      camera.lookAt(0, 0, camera.position.z - 12);

      lightA.position.x = THREE.MathUtils.damp(lightA.position.x, pointerX * 5, 4.5, delta);
      lightA.position.y = THREE.MathUtils.damp(lightA.position.y, pointerY * 4, 4.5, delta);
      lightA.position.z = camera.position.z - 4;

      streamPoints.rotation.z += delta * 0.008;

      // Distance culling
      for (const zone of zones) {
        const distance = camera.position.z - zone.position.z;
        zone.visible = distance > -6 && distance < 55;
      }

      // Software Micro-motions
      if (zone0Group.visible) {
        zone0Group.rotation.y += delta * 0.12;
        astRootCage.rotation.x += delta * 0.15;
      }
      if (zone1Group.visible) {
        zone1Group.rotation.y = Math.sin(elapsed * 0.2) * 0.08;
      }
      if (zone2Group.visible) {
        loopRing.rotation.z += delta * 0.4;
        const angleA = elapsed * 0.8;
        const angleB = angleA + (Math.PI * 2) / 3;
        const angleC = angleA + (Math.PI * 4) / 3;
        microtaskA.position.set(Math.cos(angleA) * 2.0, Math.sin(angleA) * 1.0, Math.sin(angleA) * 0.8);
        microtaskB.position.set(Math.cos(angleB) * 2.0, Math.sin(angleB) * 1.0, Math.sin(angleB) * 0.8);
        microtaskC.position.set(Math.cos(angleC) * 2.0, Math.sin(angleC) * 1.0, Math.sin(angleC) * 0.8);
      }
      if (zone3Group.visible) {
        const t = (elapsed * 0.6) % 1;
        requestPacket.position.x = -1.8 + t * 3.6;
        requestPacket.position.y = 1.1 + Math.sin(t * Math.PI) * 0.5;
      }
      if (zone4Group.visible) {
        zone4Group.rotation.y = Math.sin(elapsed * 0.15) * 0.06;
      }
      if (zone5Group.visible) {
        containerCoreA.rotation.y += delta * 0.25;
        containerCoreB.rotation.y -= delta * 0.3;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    const syncPlayback = () => {
      if (enabled && inView && !document.hidden && !contextLost) {
        if (!animId) {
          previous = null;
          scrollY = window.scrollY;
          layoutDirty = true;
          animId = requestAnimationFrame(animate);
        }
      } else {
        cancelAnimationFrame(animId);
        animId = 0;
        previous = null;
      }
    };

    playback.current = (value) => { enabled = value; syncPlayback(); };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    visibilityObserver.observe(canvas);
    document.addEventListener('visibilitychange', syncPlayback);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      canvas.style.opacity = '0';
      syncPlayback();
    };
    const onContextRestored = () => {
      contextLost = false;
      canvas.style.opacity = '';
      sizeDirty = true;
      syncPlayback();
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    return () => {
      playback.current = null;
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();
      layoutObserver.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach(m => m.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => { playback.current?.(active); }, [active]);

  return <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />;
}
