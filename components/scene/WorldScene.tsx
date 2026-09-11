'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ZONE_GAP = 22;
const ZONES = 6;
const TRAVEL = ZONE_GAP * (ZONES - 1);

export default function WorldScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
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
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
    } catch (e) {
      console.warn('WebGL not supported or initialization failed in WorldScene:', e);
      return;
    }

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
    dirLight.position.set(3, 6, 5);
    scene.add(dirLight);

    const lightA = new THREE.PointLight(0x22d3ee, 140, 38, 2);
    scene.add(lightA);

    const lightB = new THREE.PointLight(0x8b5cf6, 130, 38, 2);
    scene.add(lightB);

    const travelLight = new THREE.PointLight(0x2496ed, 90, 28, 2);
    scene.add(travelLight);

    // 3. Binary Data Stream Particles
    const particleCount = 600;
    const streamPositions = new Float32Array(particleCount * 3);
    const streamColors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#34d399'),
      new THREE.Color('#fbbf24'),
    ];

    for (let i = 0; i < particleCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 9;
      streamPositions[i * 3] = Math.cos(a) * r;
      streamPositions[i * 3 + 1] = Math.sin(a) * r * 0.65;
      streamPositions[i * 3 + 2] = 14 - Math.random() * (TRAVEL + 40);
      const c = palette[Math.floor(Math.random() * palette.length)];
      streamColors[i * 3] = c.r;
      streamColors[i * 3 + 1] = c.g;
      streamColors[i * 3 + 2] = c.b;
    }

    const streamGeo = new THREE.BufferGeometry();
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    streamGeo.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));

    const streamMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const streamPoints = new THREE.Points(streamGeo, streamMat);
    scene.add(streamPoints);

    // =========================================================================
    // CS ZONE 0: Abstract Syntax Tree (AST) & Virtual Machine Kernel
    // =========================================================================
    const zone0Group = new THREE.Group();
    scene.add(zone0Group);

    // Kernel VM Octahedron
    const vmMat = new THREE.MeshStandardMaterial({
      color: 0x0b1329,
      emissive: 0x1d4ed8,
      emissiveIntensity: 1.2,
      metalness: 0.9,
      roughness: 0.2,
    });
    const vmMesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.1, 0), vmMat);
    vmMesh.position.set(0, 0.3, 0);
    zone0Group.add(vmMesh);

    // Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.03, 16, 64),
      new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 1.8, metalness: 0.8, roughness: 0.1 })
    );
    ring1.position.set(0, 0.3, 0);
    ring1.rotation.set(Math.PI / 3, 0, 0);
    zone0Group.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.02, 16, 64),
      new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0xc084fc, emissiveIntensity: 1.6, metalness: 0.8, roughness: 0.1 })
    );
    ring2.position.set(0, 0.3, 0);
    ring2.rotation.set(-Math.PI / 4, Math.PI / 4, 0);
    zone0Group.add(ring2);

    // AST Nodes
    const astNodes = [
      { pos: [0, 1.8, 0], color: 0x22d3ee, size: 0.45 },
      { pos: [-2.0, 0.5, 0.2], color: 0x38bdf8, size: 0.38 },
      { pos: [2.0, 0.5, -0.2], color: 0x818cf8, size: 0.38 },
      { pos: [-3.1, -0.9, 0.3], color: 0x34d399, size: 0.32 },
      { pos: [-1.0, -0.9, 0.1], color: 0xa78bfa, size: 0.32 },
      { pos: [1.0, -0.9, -0.1], color: 0xfbbf24, size: 0.32 },
      { pos: [3.1, -0.9, -0.3], color: 0xf472b6, size: 0.32 },
    ];

    astNodes.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(node.pos[0], node.pos[1], node.pos[2]);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(node.size, 20, 20),
        new THREE.MeshStandardMaterial({ color: node.color, emissive: node.color, emissiveIntensity: 1.6, metalness: 0.3, roughness: 0.2 })
      );
      nodeGroup.add(core);

      const hull = new THREE.Mesh(
        new THREE.IcosahedronGeometry(node.size * 1.35, 0),
        new THREE.MeshStandardMaterial({ color: node.color, wireframe: true, transparent: true, opacity: 0.4 })
      );
      nodeGroup.add(hull);

      zone0Group.add(nodeGroup);
    });

    // Directed Syntax Edges
    const astEdges = [
      [astNodes[0].pos, astNodes[1].pos],
      [astNodes[0].pos, astNodes[2].pos],
      [astNodes[1].pos, astNodes[3].pos],
      [astNodes[1].pos, astNodes[4].pos],
      [astNodes[2].pos, astNodes[5].pos],
      [astNodes[2].pos, astNodes[6].pos],
    ];

    astEdges.forEach(([start, end]) => {
      const p1 = new THREE.Vector3(...start);
      const p2 = new THREE.Vector3(...end);
      const dist = p1.distanceTo(p2);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const orientation = new THREE.Matrix4();
      orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));

      const edgeMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.028, 0.028, dist, 8),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.2, transparent: true, opacity: 0.7 })
      );
      edgeMesh.position.copy(mid);
      edgeMesh.quaternion.setFromRotationMatrix(orientation);
      edgeMesh.rotateX(Math.PI / 2);
      zone0Group.add(edgeMesh);
    });

    // =========================================================================
    // CS ZONE 1: Binary Search Tree / DAG
    // =========================================================================
    const zone1Group = new THREE.Group();
    zone1Group.position.set(0, 0, -ZONE_GAP);
    scene.add(zone1Group);

    const bstNodes = [
      { pos: [0, 2.0, 0], color: 0x22d3ee },
      { pos: [-2.2, 0.6, -0.3], color: 0x38bdf8 },
      { pos: [2.2, 0.6, -0.3], color: 0x818cf8 },
      { pos: [-3.4, -0.9, -0.6], color: 0x34d399 },
      { pos: [-1.1, -0.9, -0.6], color: 0xa78bfa },
      { pos: [1.1, -0.9, -0.6], color: 0xfbbf24 },
      { pos: [3.4, -0.9, -0.6], color: 0xf472b6 },
    ];

    bstNodes.forEach((node) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 16, 16),
        new THREE.MeshStandardMaterial({ color: node.color, emissive: node.color, emissiveIntensity: 1.3, roughness: 0.2, metalness: 0.7 })
      );
      mesh.position.set(node.pos[0], node.pos[1], node.pos[2]);
      zone1Group.add(mesh);
    });

    const bstEdges = [
      [bstNodes[0].pos, bstNodes[1].pos],
      [bstNodes[0].pos, bstNodes[2].pos],
      [bstNodes[1].pos, bstNodes[3].pos],
      [bstNodes[1].pos, bstNodes[4].pos],
      [bstNodes[2].pos, bstNodes[5].pos],
      [bstNodes[2].pos, bstNodes[6].pos],
    ];

    bstEdges.forEach(([start, end]) => {
      const p1 = new THREE.Vector3(...start);
      const p2 = new THREE.Vector3(...end);
      const dist = p1.distanceTo(p2);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const orientation = new THREE.Matrix4();
      orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));

      const edgeMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, dist, 8),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.9, transparent: true, opacity: 0.75 })
      );
      edgeMesh.position.copy(mid);
      edgeMesh.quaternion.setFromRotationMatrix(orientation);
      edgeMesh.rotateX(Math.PI / 2);
      zone1Group.add(edgeMesh);
    });

    // =========================================================================
    // CS ZONE 2: Call Stack & Memory Heap
    // =========================================================================
    const zone2Group = new THREE.Group();
    zone2Group.position.set(0, 0, -ZONE_GAP * 2);
    scene.add(zone2Group);

    const stackFrames = [
      { pos: [-3.0, 1.6, 0], color: 0x22d3ee },
      { pos: [-3.0, 0.5, 0], color: 0x38bdf8 },
      { pos: [-3.0, -0.6, 0], color: 0x818cf8 },
      { pos: [-3.0, -1.7, 0], color: 0xa78bfa },
    ];

    stackFrames.forEach((frame) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.75, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: frame.color, emissiveIntensity: 0.65, metalness: 0.8, roughness: 0.2 })
      );
      mesh.position.set(frame.pos[0], frame.pos[1], frame.pos[2]);
      zone2Group.add(mesh);
    });

    const heapChunks = [
      { pos: [2.8, 1.2, -0.5], s: [1.6, 0.8, 1.2], color: 0x34d399, wire: false },
      { pos: [3.2, -0.8, -0.2], s: [1.8, 1.0, 1.4], color: 0xfbbf24, wire: true },
      { pos: [1.5, -1.8, -0.8], s: [1.2, 0.7, 1.0], color: 0xf472b6, wire: false },
    ];

    heapChunks.forEach((chunk) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(chunk.s[0], chunk.s[1], chunk.s[2]),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: chunk.color, emissiveIntensity: 0.85, metalness: 0.7, roughness: 0.25, wireframe: chunk.wire })
      );
      mesh.position.set(chunk.pos[0], chunk.pos[1], chunk.pos[2]);
      zone2Group.add(mesh);
    });

    // =========================================================================
    // CS ZONE 3: Microservices Mesh Cluster
    // =========================================================================
    const zone3Group = new THREE.Group();
    zone3Group.position.set(0, 0, -ZONE_GAP * 3);
    scene.add(zone3Group);

    const pods = [
      { pos: [-4.2, 0.8, 0], color: 0x38bdf8 },
      { pos: [0, 1.8, -1.2], color: 0x8b5cf6 },
      { pos: [4.2, 0.8, 0], color: 0x34d399 },
      { pos: [-2.0, -1.4, -0.8], color: 0xfbbf24 },
      { pos: [2.0, -1.4, -0.8], color: 0xf472b6 },
    ];

    pods.forEach((pod) => {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 1.0, 6),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: pod.color, emissiveIntensity: 0.75, metalness: 0.85, roughness: 0.18 })
      );
      mesh.position.set(pod.pos[0], pod.pos[1], pod.pos[2]);
      zone3Group.add(mesh);
    });

    const meshPacket = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 2.0 })
    );
    zone3Group.add(meshPacket);

    // =========================================================================
    // CS ZONE 4: Git Commit DAG
    // =========================================================================
    const zone4Group = new THREE.Group();
    zone4Group.position.set(0, 0, -ZONE_GAP * 4);
    scene.add(zone4Group);

    const commits = [
      { pos: [-4.0, 0, 0], color: 0x22d3ee, scale: 0.35 },
      { pos: [-2.0, 0, 0], color: 0x22d3ee, scale: 0.35 },
      { pos: [0.0, 0, 0], color: 0x22d3ee, scale: 0.35 },
      { pos: [2.0, 0, 0], color: 0x22d3ee, scale: 0.35 },
      { pos: [4.0, 0, 0], color: 0x22d3ee, scale: 0.45 },
      { pos: [-1.0, 1.4, -0.4], color: 0x8b5cf6, scale: 0.32 },
      { pos: [1.0, 1.4, -0.4], color: 0x8b5cf6, scale: 0.32 },
      { pos: [3.0, 0.8, -0.2], color: 0xa78bfa, scale: 0.32 },
      { pos: [0.5, -1.3, -0.4], color: 0x34d399, scale: 0.3 },
      { pos: [2.5, -0.7, -0.2], color: 0x34d399, scale: 0.3 },
    ];

    commits.forEach((c) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(c.scale, 14, 14),
        new THREE.MeshStandardMaterial({ color: c.color, emissive: c.color, emissiveIntensity: 1.2, metalness: 0.7, roughness: 0.2 })
      );
      mesh.position.set(c.pos[0], c.pos[1], c.pos[2]);
      zone4Group.add(mesh);
    });

    // =========================================================================
    // CS ZONE 5: Cloud Ingress Gateway
    // =========================================================================
    const zone5Group = new THREE.Group();
    zone5Group.position.set(0, 0, -ZONE_GAP * 5 - 6);
    scene.add(zone5Group);

    const gatewayRings = [
      new THREE.Mesh(new THREE.TorusGeometry(4.8, 0.08, 12, 80), new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 1.3, metalness: 0.8, roughness: 0.15 })),
      new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.065, 12, 80), new THREE.MeshStandardMaterial({ color: 0x2496ed, emissive: 0x2496ed, emissiveIntensity: 1.3, metalness: 0.8, roughness: 0.15 })),
      new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.05, 12, 80), new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 1.3, metalness: 0.8, roughness: 0.15 })),
    ];
    gatewayRings[1].rotation.x = 0.3;
    gatewayRings[2].rotation.x = 0.8;
    gatewayRings.forEach((r) => zone5Group.add(r));

    const coreMesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.1, 0),
      new THREE.MeshStandardMaterial({ color: 0xf0f9ff, emissive: 0x22d3ee, emissiveIntensity: 1.6, roughness: 0.1, metalness: 0.6, flatShading: true })
    );
    zone5Group.add(coreMesh);

    // Scroll & Pointer tracking
    let scrollProgress = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e: MouseEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Window Resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();
    let startZ = 40;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      // Camera flight
      if (startZ > 8) {
        startZ = THREE.MathUtils.lerp(startZ, 8, delta * 4.5);
      }
      const targetZ = startZ - scrollProgress * TRAVEL;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.055);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerX * 1.2, 0.035);
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        pointerY * 0.7 + Math.sin(scrollProgress * Math.PI * 2) * 0.5,
        0.035
      );
      camera.lookAt(0, 0, camera.position.z - 12);

      // Light tracking
      lightA.position.x = THREE.MathUtils.lerp(lightA.position.x, pointerX * 7, 0.05);
      lightA.position.y = THREE.MathUtils.lerp(lightA.position.y, pointerY * 5, 0.05);
      lightA.position.z = camera.position.z - 4;

      lightB.position.x = THREE.MathUtils.lerp(lightB.position.x, -pointerX * 7, 0.05);
      lightB.position.y = THREE.MathUtils.lerp(lightB.position.y, -pointerY * 5, 0.05);
      lightB.position.z = camera.position.z - 8;

      travelLight.position.set(0, 2, camera.position.z - 6);

      // Particles
      streamPoints.rotation.z += delta * 0.008;

      // Zone animations
      zone0Group.rotation.y += delta * 0.15;
      zone1Group.rotation.y += delta * 0.12;
      zone2Group.rotation.y += delta * 0.08;
      zone3Group.rotation.y = THREE.MathUtils.lerp(zone3Group.rotation.y, pointerX * 0.2, 0.03);

      const packetT = (elapsed * 0.6) % 1;
      meshPacket.position.x = -4.2 + packetT * 8.4;
      meshPacket.position.y = 0.8 + Math.sin(packetT * Math.PI * 2) * 0.7;

      zone4Group.rotation.z += delta * 0.03;

      gatewayRings[0].rotation.z += delta * 0.22;
      gatewayRings[1].rotation.z -= delta * 0.32;
      gatewayRings[2].rotation.z += delta * 0.16;
      coreMesh.rotation.y += delta * 0.4;
      coreMesh.rotation.x += delta * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
