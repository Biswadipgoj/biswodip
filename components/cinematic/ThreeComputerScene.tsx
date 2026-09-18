'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeComputerSceneProps {
  className?: string;
}

export default function ThreeComputerScene({ className = '' }: ThreeComputerSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // WebGL Renderer with High Performance & 120fps capability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch (e) {
      console.error('WebGL init error', e);
      return;
    }

    const scene = new THREE.Scene();

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // ── Refined Studio Lighting (Clean Titanium / Azure Accent) ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const azureRim = new THREE.DirectionalLight(0x00d2ff, 3.0);
    azureRim.position.set(-5, 3, -2);
    scene.add(azureRim);

    const fillLight = new THREE.PointLight(0x38bdf8, 2.0, 15);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Workstation Root Group
    const workstation = new THREE.Group();
    scene.add(workstation);

    // ── Materials ──
    const titaniumChassis = new THREE.MeshStandardMaterial({
      color: 0xc4cee6, // Sleek Apple-grade titanium silver
      metalness: 0.88,
      roughness: 0.20,
    });

    const darkBezel = new THREE.MeshStandardMaterial({
      color: 0x2e3a62, // Frosted sapphire glass bezel
      metalness: 0.65,
      roughness: 0.30,
    });

    const circuitGold = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x443000,
      emissiveIntensity: 0.3,
    });

    const azureEmissive = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
    });

    // Helper to build boxes
    function createBox(
      w: number,
      h: number,
      d: number,
      mat: THREE.Material,
      x = 0,
      y = 0,
      z = 0,
      parent = workstation
    ) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    }

    // 1. Monitor Assembly
    const monitorGroup = new THREE.Group();
    workstation.add(monitorGroup);

    // Monitor Outer Bezel & Back Housing
    createBox(4.4, 2.9, 0.12, titaniumChassis, 0, 0.9, -0.04, monitorGroup);
    createBox(4.3, 2.8, 0.14, darkBezel, 0, 0.9, 0, monitorGroup);

    // ── LIVE CODE ANIMATED CANVAS TEXTURE ──
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 1024;
    codeCanvas.height = 680;
    const ctx = codeCanvas.getContext('2d')!;

    const codeLines = [
      '// TelePoint Distributed WebSocket Mesh (v3.2)',
      'import { SocketMesh, Protocol } from "@cse/runtime";',
      'import { PrismaClient } from "@prisma/client";',
      '',
      'export class MeshBroker {',
      '  private channels = new Map<string, Channel>();',
      '  private prisma = new PrismaClient();',
      '',
      '  async broadcastFrame(event: SocketEvent): Promise<PacketAck> {',
      '    const channel = this.channels.get(event.roomId);',
      '    if (!channel) throw new ChannelNotFoundError();',
      '',
      '    // Sub-42ms atomic frame dispatch with CRC32',
      '    const frame = Protocol.encode(event.payload, { crc32: true });',
      '    await channel.dispatch(frame);',
      '',
      '    // Asynchronous append-only audit persistence to Postgres',
      '    return await this.prisma.auditLog.create({',
      '      data: { eventId: event.id, latencyMs: 14.2 }',
      '    });',
      '  }',
      '}',
      '// [KERNEL: ONLINE] [MEM: 38.4MB] [LATENCY: 14.2ms]'
    ];

    let typedLineIndex = 0;
    let typedCharIndex = 0;
    let cursorBlink = true;
    let lastTypeTime = 0;

    const drawCodeScreen = () => {
      // Background: Luminous sapphire editor with subtle gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, codeCanvas.height);
      bgGrad.addColorStop(0, '#1c2548');
      bgGrad.addColorStop(1, '#25325c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, codeCanvas.width, codeCanvas.height);

      // Terminal Titlebar
      ctx.fillStyle = '#2e3b68';
      ctx.fillRect(0, 0, codeCanvas.width, 42);

      // Window Control Dots
      ctx.fillStyle = '#ff5f56';
      ctx.beginPath();
      ctx.arc(24, 21, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath();
      ctx.arc(44, 21, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#27c93f';
      ctx.beginPath();
      ctx.arc(64, 21, 6, 0, Math.PI * 2);
      ctx.fill();

      // Title
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.fillText('telepoint-mesh-broker.ts — CSE Runtime Engine', 100, 26);

      // Status Badge
      ctx.fillStyle = '#00d2ff';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('● 120 FPS THREE.JS', codeCanvas.width - 170, 26);

      // Code text area
      ctx.font = '16px "JetBrains Mono", monospace';
      const lineHeight = 25;
      const startY = 75;

      for (let i = 0; i <= typedLineIndex && i < codeLines.length; i++) {
        const fullLine = codeLines[i];
        const displayLine = i === typedLineIndex ? fullLine.substring(0, typedCharIndex) : fullLine;

        // Line number
        ctx.fillStyle = '#64748b';
        ctx.fillText((i + 1).toString().padStart(2, '0'), 20, startY + i * lineHeight);

        // Syntax highlighting
        if (displayLine.startsWith('//')) {
          ctx.fillStyle = '#94a3b8'; // Comment
        } else if (displayLine.includes('import') || displayLine.includes('export') || displayLine.includes('class') || displayLine.includes('return') || displayLine.includes('async') || displayLine.includes('await')) {
          ctx.fillStyle = '#38bdf8'; // Keywords (Electric Azure)
        } else if (displayLine.includes('broadcastFrame') || displayLine.includes('encode') || displayLine.includes('dispatch') || displayLine.includes('create')) {
          ctx.fillStyle = '#fb7185'; // Methods (Sunset Coral)
        } else if (displayLine.includes('Channel') || displayLine.includes('SocketEvent') || displayLine.includes('PacketAck') || displayLine.includes('PrismaClient') || displayLine.includes('SocketMesh')) {
          ctx.fillStyle = '#fcd34d'; // Types (Amber)
        } else if (displayLine.includes('"') || displayLine.includes("'")) {
          ctx.fillStyle = '#34d399'; // Strings (Emerald)
        } else {
          ctx.fillStyle = '#ffffff'; // Normal identifier
        }

        ctx.fillText(displayLine, 60, startY + i * lineHeight);

        // Draw cursor
        if (i === typedLineIndex && cursorBlink) {
          const textWidth = ctx.measureText(displayLine).width;
          ctx.fillStyle = '#00d2ff';
          ctx.fillRect(62 + textWidth, startY + i * lineHeight - 14, 8, 18);
        }
      }

      // Bottom Terminal Status Strip
      const bottomY = codeCanvas.height - 35;
      ctx.fillStyle = '#2e3b68';
      ctx.fillRect(0, bottomY, codeCanvas.width, 35);

      ctx.fillStyle = '#34d399';
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillText('✓ TS ENGINE COMPILED', 20, bottomY + 22);

      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('WS: 0.0.0.0:8080 · LATENCY: 14.2ms · ZERO REGRESSIONS', 210, bottomY + 22);
    };

    drawCodeScreen();

    const screenTexture = new THREE.CanvasTexture(codeCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });

    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.16, 2.66), screenMaterial);
    screenMesh.position.set(0, 0.9, 0.08);
    monitorGroup.add(screenMesh);

    // Stand & Base
    createBox(0.24, 1.2, 0.16, titaniumChassis, 0, -0.7, -0.2, monitorGroup);
    createBox(1.6, 0.08, 1.1, titaniumChassis, 0, -1.32, -0.1, monitorGroup);

    // 2. Hardware Compute Layer (Motherboard & Silicon)
    const logicCoreGroup = new THREE.Group();
    logicCoreGroup.position.set(0, -1.3, 0.9);
    workstation.add(logicCoreGroup);

    // Motherboard PCB (Dark Slate with Gold traces)
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0f141e,
      metalness: 0.6,
      roughness: 0.35,
    });
    createBox(3.4, 0.08, 1.5, pcbMat, 0, 0, 0, logicCoreGroup);

    // CPU Die in center
    createBox(0.68, 0.06, 0.68, circuitGold, -0.5, 0.07, 0, logicCoreGroup);
    createBox(0.58, 0.04, 0.58, azureEmissive, -0.5, 0.12, 0, logicCoreGroup);

    // RAM Modules
    const ramMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.2,
    });
    createBox(0.1, 0.24, 0.85, ramMat, 0.3, 0.14, -0.2, logicCoreGroup);
    createBox(0.1, 0.24, 0.85, ramMat, 0.55, 0.14, -0.2, logicCoreGroup);

    // GPU Compute Unit
    createBox(1.15, 0.28, 0.65, titaniumChassis, 0.75, 0.16, 0.3, logicCoreGroup);

    // Subtle Data Particles
    const particlesCount = 40;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse pointer parallax
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = mouseX * 0.22;
      targetRotX = -mouseY * 0.14;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Dynamic typing ticker
      if (timestamp - lastTypeTime > 80) {
        lastTypeTime = timestamp;
        cursorBlink = !cursorBlink;

        if (typedLineIndex < codeLines.length) {
          const targetLine = codeLines[typedLineIndex];
          if (typedCharIndex < targetLine.length) {
            typedCharIndex += 2;
            if (typedCharIndex > targetLine.length) typedCharIndex = targetLine.length;
          } else {
            typedLineIndex++;
            typedCharIndex = 0;
          }
        } else {
          if (Math.random() < 0.015) {
            typedLineIndex = 0;
            typedCharIndex = 0;
          }
        }

        drawCodeScreen();
        screenTexture.needsUpdate = true;
      }

      // Smooth damping
      workstation.rotation.y = THREE.MathUtils.lerp(workstation.rotation.y, targetRotY - 0.1, 0.06);
      workstation.rotation.x = THREE.MathUtils.lerp(workstation.rotation.x, targetRotX + 0.05, 0.06);

      // Subtle idle hover
      workstation.position.y = Math.sin(elapsedTime * 1.2) * 0.04;

      // Particle rotation
      particleSystem.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      renderer.dispose();
      screenTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
