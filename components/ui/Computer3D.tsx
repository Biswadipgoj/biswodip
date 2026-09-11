'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// 120+ AUTHENTIC COMPUTER SCIENCE RUNTIME & DISTRIBUTED SYSTEMS ACTIONS
// Pure Recruiter-Grade Engineering: JIT, AST, RAFT, SIMD, ACID, EPOLL, QUIC, RLS
// -----------------------------------------------------------------------------
const ACTIONS_LIST = [
  { tag: 'JIT', msg: 'TurboFan optimize: Hot loop $traverseBTree (deopt=0, speedup=4.8x)', color: '#c084fc' },
  { tag: 'AST', msg: 'Parse: AST_FUNC_DECL "DistributedConsensus" at line 14:1', color: '#38bdf8' },
  { tag: 'MEM', msg: 'Zero-copy ArrayBuffer allocation: 0x7ffd90 -> 128KB arena chunk', color: '#34d399' },
  { tag: 'RAFT', msg: 'Leader heartbeat acknowledged by node-east-1 (latency: 0.22ms)', color: '#22d3ee' },
  { tag: 'GC', msg: 'Concurrent mark completed: 14.8MB reclaimed in 0.06ms pause', color: '#f472b6' },
  { tag: 'NET', msg: 'TCP_CORK segment flushed: 1460 bytes over TLS 1.3 AES-GCM', color: '#818cf8' },
  { tag: 'DAG', msg: 'Topological sort resolved: 48 dependency modules strictly acyclic', color: '#fbbf24' },
  { tag: 'V8', msg: 'Microtask queue drained: 32 unresolved promises committed', color: '#34d399' },
  { tag: 'CACHE', msg: 'L1/L2 data cache hit ratio: 99.82% (stride prefetch active)', color: '#38bdf8' },
  { tag: 'HTTP3', msg: 'QUIC frame 0x06 stream opened with bidirectional flow control', color: '#c084fc' },
  { tag: 'SQL', msg: 'PostgreSQL index scan chosen on tenant_id (cost 0.12..3.45)', color: '#f472b6' },
  { tag: 'RLS', msg: 'Row-Level Security predicate verified: tenant_id = ctx.tenantId', color: '#22d3ee' },
  { tag: 'SIMD', msg: 'AVX-512 8-lane 64-bit float multiply executed in 14ns', color: '#fbbf24' },
  { tag: 'EPOLL', msg: 'Non-blocking I/O event loop polled: 18 ready descriptors', color: '#34d399' },
  { tag: 'SEC', msg: 'Ed25519 signature verified for asymmetric JWT bearer token', color: '#38bdf8' },
  { tag: 'RING', msg: 'Lock-free ring buffer atomic CAS enqueue (capacity 65536)', color: '#818cf8' },
  { tag: 'SHARD', msg: 'Consistent hashing ring mapped key 0xae41 to partition 04', color: '#c084fc' },
  { tag: 'WASM', msg: 'WebAssembly JIT linear memory grow +4 pages (256KB total)', color: '#f472b6' },
  { tag: 'TLS', msg: 'Session ticket TLS resumption completed in 0-RTT', color: '#22d3ee' },
  { tag: 'MERKLE', msg: 'Merkle DAG root hash verified: 0x8a1b2c4d... authenticated', color: '#34d399' },
  { tag: 'QUEUE', msg: 'V8 JobQueue scavenge tick: 0 microtasks deferred', color: '#fbbf24' },
  { tag: 'IPC', msg: 'SharedMemory domain socket IPC handshake established', color: '#818cf8' },
  { tag: 'B-TREE', msg: 'B+ Tree node split: page 4092 balanced, depth remains 3', color: '#38bdf8' },
  { tag: 'PROTO', msg: 'Protobuf binary decode: 4.2M msgs/sec throughput benchmark', color: '#c084fc' },
  { tag: 'QUORUM', msg: 'Distributed quorum 3/3 consensus locked on term 49021', color: '#22d3ee' },
  { tag: 'REDUCER', msg: 'State transition applied: pure deterministic dispatch in 0.01ms', color: '#34d399' },
  { tag: 'EVENT', msg: 'Reactor pattern: event loop cycle latency < 0.08ms', color: '#f472b6' },
  { tag: 'SOCKET', msg: 'WebSocket RFC 6455 frame binary ping/pong rtt: 0.18ms', color: '#fbbf24' },
  { tag: 'KERNEL', msg: 'eBPF network packet filter program bytecode verified safe', color: '#818cf8' },
  { tag: 'COMPILER', msg: 'Intermediate Representation (IR) SSA phi nodes pruned', color: '#38bdf8' },
  { tag: 'REG', msg: 'Register allocator: linear scan allocated 16 physical registers', color: '#c084fc' },
  { tag: 'WAL', msg: 'Write-Ahead Log fsync completed: transaction 98402 durable', color: '#22d3ee' },
  { tag: 'INDEX', msg: 'GiST spatial index tree rebalanced: bounding box query O(log N)', color: '#34d399' },
  { tag: 'PAGING', msg: 'Virtual memory translation lookaside buffer (TLB) hit 99.1%', color: '#fbbf24' },
  { tag: 'BRANCH', msg: 'Branch target buffer prediction: 0 pipeline mispredictions', color: '#818cf8' },
  { tag: 'ASYNC', msg: 'Async generator pipeline yielded 10,000 stream chunks', color: '#f472b6' },
  { tag: 'COROUTINE', msg: 'Fiber context switch overhead: 22 nanoseconds', color: '#38bdf8' },
  { tag: 'SHUTTLE', msg: 'Thread pool work-stealing scheduler dequeued 64 tasks', color: '#c084fc' },
  { tag: 'MUTEX', msg: 'Futex lock uncontended: acquired via single atomic XCHG', color: '#22d3ee' },
  { tag: 'DECOMP', msg: 'Zstandard dictionary decompression stream: 2.8 GB/sec', color: '#34d399' },
  { tag: 'CIPHER', msg: 'ChaCha20-Poly1305 AEAD authenticated tag verified', color: '#fbbf24' },
  { tag: 'DIFF', msg: 'VDOM tree reconciliation diff: 0 layout thrashing cycles', color: '#818cf8' },
  { tag: 'CSSOM', msg: 'Subpixel paint geometry calculation skipped (clean cache)', color: '#38bdf8' },
  { tag: 'GPU', msg: 'WebGL 2.0 command buffer batch submitted to draw queue', color: '#c084fc' },
  { tag: 'SHADER', msg: 'GLSL fragment shader compiled: 0 linking warnings', color: '#22d3ee' },
  { tag: 'GEO', msg: 'Parametric bezier cubic curve sampled at 120 FPS precision', color: '#34d399' },
  { tag: 'HASH', msg: 'MurmurHash3 128-bit key hashing: 0 collisions detected', color: '#f472b6' },
  { tag: 'POOL', msg: 'Connection pool leased socket #14 (active: 8, idle: 24)', color: '#fbbf24' },
  { tag: 'RATE', msg: 'Token bucket rate limiter: 10,000 req/s bucket refilled', color: '#818cf8' },
  { tag: 'AUTH', msg: 'OAuth 2.1 PKCE code verifier SHA-256 match validated', color: '#38bdf8' },
  { tag: 'INGRESS', msg: 'Reverse proxy multiplexer forwarded payload to worker 3', color: '#c084fc' },
  { tag: 'EGRESS', msg: 'Zero-copy sendfile() transmitted 4.2MB static asset', color: '#22d3ee' },
  { tag: 'METRIC', msg: 'Prometheus counter scraped: system_uptime_seconds = 984021', color: '#34d399' },
  { tag: 'TRACER', msg: 'Distributed trace OpenTelemetry span exported with ID 0x3f9a', color: '#f472b6' },
  { tag: 'BLOOM', msg: 'Bloom filter checked: key is definitely not in SSTable', color: '#fbbf24' },
  { tag: 'LSM', msg: 'LSM-Tree compaction level 0 to level 1 completed (180MB)', color: '#818cf8' },
  { tag: 'SNAPPY', msg: 'Columnar compression ratio: 4.8:1 on Parquet payload', color: '#38bdf8' },
  { tag: 'KAFKA', msg: 'Distributed event partition offset 48201 committed', color: '#c084fc' },
  { tag: 'GRPC', msg: 'gRPC HTTP/2 stream END_STREAM received cleanly', color: '#22d3ee' },
  { tag: 'CIRCUIT', msg: 'Circuit breaker state: CLOSED (failure rate 0.00%)', color: '#34d399' },
  { tag: 'BALANCER', msg: 'Consistent weighted round-robin picked backend-node-02', color: '#f472b6' },
  { tag: 'REPLICA', msg: 'Postgres streaming replication lag: 0 bytes (sync)', color: '#fbbf24' },
  { tag: 'ISOLATION', msg: 'Serializable snapshot isolation: 0 write skew anomalies', color: '#818cf8' },
  { tag: 'DEADLOCK', msg: 'Deadlock detection cycle graph: 0 cycles detected', color: '#38bdf8' },
  { tag: 'SCHEMA', msg: 'Database migration applied with zero downtime lock timeout', color: '#c084fc' },
  { tag: 'HEURISTIC', msg: 'Query planner chosen cost: 1.04 vs sequential 842.10', color: '#22d3ee' },
  { tag: 'BUFFER', msg: 'Ring buffer tail wrapped atomically without mutex lock', color: '#34d399' },
  { tag: 'WATCHDOG', msg: 'Process supervisor heartbeat ping acknowledged (PID 4920)', color: '#f472b6' },
  { tag: 'SWAP', msg: 'Zero swap paging detected: 100% resident memory set (RSS)', color: '#fbbf24' },
  { tag: 'HUGEPAGE', msg: 'Transparent huge pages enabled: 2MB page size allocated', color: '#818cf8' },
  { tag: 'NUMA', msg: 'NUMA node affinity set to core 0..7 (local memory access)', color: '#38bdf8' },
  { tag: 'FPU', msg: 'Floating point AVX unit pipeline saturation at 94.2%', color: '#c084fc' },
  { tag: 'DRAIN', msg: 'Graceful drain connection pool before pod rebalance', color: '#22d3ee' },
  { tag: 'GITOPS', msg: 'ArgoCD sync completed: Git commit SHA matches live cluster', color: '#34d399' },
  { tag: 'CONTAINER', msg: 'OCI image rootfs read-only overlayfs mount active', color: '#f472b6' },
  { tag: 'NAMESPACES', msg: 'Linux cgroups v2 memory limit enforced: 512MB quota', color: '#fbbf24' },
  { tag: 'SECCOMP', msg: 'Syscall profile active: 48 permitted kernel calls', color: '#818cf8' },
  { tag: 'CAPABILITY', msg: 'Dropped all Linux root capabilities except CAP_NET_BIND', color: '#38bdf8' },
  { tag: 'DNS', msg: 'DNS-over-HTTPS resolution for internal mesh in 0.8ms', color: '#c084fc' },
  { tag: 'RESOLVER', msg: 'SRV record discovery found 3 healthy service instances', color: '#22d3ee' },
  { tag: 'SIDE-CAR', msg: 'Service mesh proxy mTLS certificate renewed (24h TTL)', color: '#34d399' },
  { tag: 'ENVOY', msg: 'Envoy dynamic cluster endpoint discovery (EDS) updated', color: '#f472b6' },
  { tag: 'LATENCY', msg: 'p99 request latency: 1.84ms | p99.9 request latency: 3.12ms', color: '#fbbf24' },
  { tag: 'BANDWIDTH', msg: 'Network throughput: 1.48 Gbps sustained zero drop rate', color: '#818cf8' },
  { tag: 'ZERO-COPY', msg: 'vmsplice() pipe transfer completed without user-space copy', color: '#38bdf8' },
  { tag: 'MMAP', msg: 'Memory-mapped file backing store synced to NVMe SSD', color: '#c084fc' },
  { tag: 'INODE', msg: 'Filesystem inode lookup cached in dentry cache (hit)', color: '#22d3ee' },
  { tag: 'SYSFS', msg: 'Kernel sysfs telemetry exported to runtime agent', color: '#34d399' },
  { tag: 'SCHED', msg: 'CFS scheduler allocated 100ms quantum to process priority -5', color: '#f472b6' },
  { tag: 'AFFINITY', msg: 'CPU thread affinity pinned to physical hyperthread thread 0', color: '#fbbf24' },
  { tag: 'ATOMIC', msg: 'std::atomic_compare_exchange_strong succeeded on pointer', color: '#818cf8' },
  { tag: 'BARRIER', msg: 'Memory fence acquire/release barrier ordered store ops', color: '#38bdf8' },
  { tag: 'CORRECT', msg: 'Property-based invariant test suite passed: 10,000 runs', color: '#c084fc' },
  { tag: 'MUTATION', msg: 'Mutation testing score: 98.6% surviving mutants: 0', color: '#22d3ee' },
  { tag: 'FUZZ', msg: 'AFL++ fuzzer generated 1.2M inputs: 0 crashes found', color: '#34d399' },
  { tag: 'CONCURRENCY', msg: 'ThreadSanitizer (TSan) run: 0 data races reported', color: '#f472b6' },
  { tag: 'LEAK', msg: 'AddressSanitizer (ASan) memory scan: 0 bytes leaked', color: '#fbbf24' },
  { tag: 'TYPES', msg: 'TypeScript strict null checks: 0 type assertions (100% sound)', color: '#818cf8' },
  { tag: 'ESLINT', msg: 'AST linter static analysis: 0 warnings across 120 files', color: '#38bdf8' },
  { tag: 'BUNDLE', msg: 'Tree-shaking eliminated 41 unused exports (size -34KB)', color: '#c084fc' },
  { tag: 'CHUNKING', msg: 'Granular code split created 8 edge-cached chunks', color: '#22d3ee' },
  { tag: 'PRELOAD', msg: 'Resource hint <link rel="modulepreload"> dispatched to client', color: '#34d399' },
  { tag: 'FONT', msg: 'Variable font font-display: swap with unicode-range subsetting', color: '#f472b6' },
  { tag: 'WEBP', msg: 'Lossless WebP image decoded via hardware SIMD decoder in 1.1ms', color: '#fbbf24' },
  { tag: 'HYDRATION', msg: 'React selective streaming hydration completed without mismatch', color: '#818cf8' },
  { tag: 'RSC', msg: 'React Server Component wire protocol streamed 4KB payload', color: '#38bdf8' },
  { tag: 'ACTION', msg: 'Server Action executed idempotently with encrypted CSRF token', color: '#c084fc' },
  { tag: 'COOKIE', msg: 'HttpOnly Secure SameSite=Lax session cookie issued', color: '#22d3ee' },
  { tag: 'CORS', msg: 'Strict CORS origin whitelist verified: access-control-allow-origin', color: '#34d399' },
  { tag: 'CSP', msg: 'Content-Security-Policy nonces validated on script tag', color: '#f472b6' },
  { tag: 'HSTS', msg: 'HTTP Strict Transport Security max-age=31536000 preload confirmed', color: '#fbbf24' },
  { tag: '120FPS', msg: 'Frame time locked at 8.33ms (120 FPS buttery smooth playback)', color: '#22d3ee' },
];

// -----------------------------------------------------------------------------
// ULTRA-HIGH RESOLUTION (2048 x 1280) LIVING RETINA SCREEN TEXTURE
// Crystal-clear syntax highlighting, real-time wave telemetry, high contrast
// -----------------------------------------------------------------------------
function createLivingScreenTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1280;
  const ctx = canvas.getContext('2d')!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  let tick = 0;

  const codeLines = [
    '// Biswodip Goj — Distributed Architecture Kernel v4.2',
    'import { RaftCluster, MicrotaskEngine } from "@biswodip/core";',
    'import { RowLevelSecurity, BTreeIndex } from "@biswodip/db";',
    'import { TelemetryStream, JITOptimizer } from "@biswodip/runtime";',
    '',
    'export class ArchitectureKernel implements IProductionRuntime {',
    '  private readonly cluster = new RaftCluster({ quorum: 3 });',
    '  private readonly v8Queue = new MicrotaskEngine({ targetFps: 120 });',
    '  private readonly jit = new JITOptimizer({ tiering: "TurboFan" });',
    '',
    '  public async boot(): Promise<RuntimeStatus> {',
    '    // 1. Establish Raft Quorum across distributed nodes',
    '    const consensus = await this.cluster.verifyConsensus({',
    '      heartbeatMs: 15,',
    '      faultTolerance: "Byzantine-Fault-Tolerant",',
    '      persistence: "NVMe Write-Ahead Log"',
    '    });',
    '',
    '    // 2. Hydrate multi-tenant Row-Level Security barriers',
    '    await RowLevelSecurity.enforceStrictIsolation();',
    '',
    '    // 3. Lock event loop timing to 120 FPS invariant',
    '    this.v8Queue.onTick((latency) => {',
    '      assert(latency < 8.33, "Frame budget preserved at 120 FPS");',
    '    });',
    '',
    '    return { status: "ONLINE", modules: 48, buildHealth: "100%" };',
    '  }',
    '}',
    '// Status: Kernel operational at 120 FPS · 0.02ms Jitter'
  ];

  const update = () => {
    tick++;
    const W = 2048;
    const H = 1280;

    // Background Canvas
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, W, H);

    // Subtle Grid Blueprint Overlay
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < W; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Top Chrome Window Bar
    ctx.fillStyle = '#0a0f26';
    ctx.fillRect(0, 0, W, 76);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 76);
    ctx.lineTo(W, 76);
    ctx.stroke();

    // Window Dots
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(42, 38, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(76, 38, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(110, 38, 10, 0, Math.PI * 2); ctx.fill();

    // Chrome Titles (Large, Ultra-Crisp, High-Contrast)
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('⚡ BISWODIP GOJ — ARCHITECTURAL RUNTIME KERNEL [120 FPS]', 160, 46);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('NODE: ULUBERIA (22.4735° N, 88.1077° E)', W - 490, 46);

    // Split Layout
    const splitX = 1060;

    // LEFT PANE: Editor
    ctx.fillStyle = '#060b1e';
    ctx.fillRect(0, 76, splitX, H - 140);

    // Editor Tab Header
    ctx.fillStyle = '#0f1738';
    ctx.fillRect(0, 76, splitX, 48);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('📁 ARCHITECTURE_KERNEL.TS [SYSTEMS ENGINE]', 32, 107);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('STRICT: TRUE · ZERO RUNTIME OVERHEAD', splitX - 380, 107);

    // Code Lines (Bold, 20px, Vivid Neon Colors for Extreme Contrast)
    ctx.font = 'bold 19px monospace';
    codeLines.forEach((line, idx) => {
      const y = 164 + idx * 36;
      ctx.fillStyle = '#64748b';
      ctx.fillText(String(idx + 1).padStart(2, '0'), 24, y);

      if (line.startsWith('//')) {
        ctx.fillStyle = '#38bdf8';
      } else if (
        line.includes('import') ||
        line.includes('export') ||
        line.includes('class') ||
        line.includes('private') ||
        line.includes('public') ||
        line.includes('const') ||
        line.includes('await') ||
        line.includes('return')
      ) {
        ctx.fillStyle = '#c084fc';
      } else if (line.includes('"') || line.includes("'")) {
        ctx.fillStyle = '#34d399';
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.fillText(line, 74, y);
    });

    // Vertical Divider
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(splitX, 76);
    ctx.lineTo(splitX, H - 64);
    ctx.stroke();

    // RIGHT PANE: Telemetry & Live Hardware Stream
    ctx.fillStyle = '#040714';
    ctx.fillRect(splitX, 76, W - splitX, H - 140);

    // Telemetry Tab Header
    ctx.fillStyle = '#0f1738';
    ctx.fillRect(splitX, 76, W - splitX, 48);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('📊 LIVE KERNEL TELEMETRY & 120+ SYSTEM EVENTS', splitX + 28, 107);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('120.0 FPS · 0.02ms JITTER', W - 280, 107);

    // Live Oscilloscope Waveform at the top of right pane
    ctx.fillStyle = '#070d22';
    ctx.fillRect(splitX + 24, 140, W - splitX - 48, 80);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.strokeRect(splitX + 24, 140, W - splitX - 48, 80);

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const waveW = W - splitX - 48;
    for (let x = 0; x < waveW; x += 4) {
      const freq1 = Math.sin((x + tick * 6) * 0.04);
      const freq2 = Math.cos((x - tick * 3) * 0.02) * 0.5;
      const y = 180 + (freq1 + freq2) * 22;
      if (x === 0) ctx.moveTo(splitX + 24 + x, y);
      else ctx.lineTo(splitX + 24 + x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('EVENT_LOOP_THROUGHPUT: 4.8M OPS/SEC', splitX + 38, 162);

    // Telemetry Events List
    const activeActionsCount = 13;
    const baseActionIndex = Math.floor(tick / 16) % ACTIONS_LIST.length;

    for (let i = 0; i < activeActionsCount; i++) {
      const actIdx = (baseActionIndex + i) % ACTIONS_LIST.length;
      const act = ACTIONS_LIST[actIdx];
      const rowY = 254 + i * 70;

      ctx.fillStyle = i % 2 === 0 ? 'rgba(15, 23, 42, 0.75)' : 'rgba(30, 41, 59, 0.55)';
      ctx.fillRect(splitX + 24, rowY - 32, W - splitX - 48, 60);

      // Timestamp offset
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 15px monospace';
      const timeOffset = (activeActionsCount - i) * 12;
      ctx.fillText(`+${timeOffset}ms`, splitX + 36, rowY);

      // Tag Pill Badge
      ctx.fillStyle = act.color;
      ctx.fillRect(splitX + 110, rowY - 22, 90, 30);
      ctx.fillStyle = '#020617';
      ctx.font = 'black 15px monospace';
      ctx.fillText(act.tag.padEnd(7, ' '), splitX + 120, rowY - 2);

      // Message text
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#f8fafc';
      const truncatedMsg = act.msg.length > 56 ? act.msg.slice(0, 54) + '…' : act.msg;
      ctx.fillText(truncatedMsg, splitX + 218, rowY);
    }

    // Bottom Status Bar
    ctx.fillStyle = '#070c20';
    ctx.fillRect(0, H - 64, W, 64);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.strokeRect(0, H - 64, W, 64);

    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('● SYSTEM STATUS: PRODUCTION ONLINE · ULUBERIA CLUSTER · ZERO LEAKS · 120 FPS FLUID', 32, H - 24);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('HARDWARE ACCELERATED · WEBGL 2.0 ACTIVE', W - 430, H - 24);

    // Laser Scanline overlay
    ctx.fillStyle = 'rgba(56, 189, 248, 0.035)';
    const scanY = (tick * 6) % H;
    ctx.fillRect(0, scanY, W, 50);

    texture.needsUpdate = true;
  };

  return { texture, update, dispose: () => texture.dispose() };
}

// -----------------------------------------------------------------------------
// LUMINOUS 3D WORKSTATION (Pure Three.js WebGL, 120 FPS, Hardware Accelerated)
// -----------------------------------------------------------------------------
export default function Computer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 530;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
    } catch (e) {
      console.warn('WebGL not supported or initialization failed in Computer3D:', e);
      return;
    }

    // 2. Luminous Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(4, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 1.6);
    dirLight2.position.set(-5, -2, -2);
    scene.add(dirLight2);

    // Intense screen glow on environment
    const pointLightScreen = new THREE.PointLight(0x38bdf8, 28, 8, 2);
    pointLightScreen.position.set(0, 0.9, -0.6);
    scene.add(pointLightScreen);

    // Keyboard and chassis ambient accent
    const pointLightChassis = new THREE.PointLight(0xc084fc, 14, 5, 2);
    pointLightChassis.position.set(0, -1.0, 1.4);
    scene.add(pointLightChassis);

    // 3. Workstation Hardware Assembly Group
    const workstationGroup = new THREE.Group();
    scene.add(workstationGroup);

    // Monitor Titanium Outer Bezel (Polished specular finish)
    const monitorChassis = new THREE.Mesh(
      new THREE.BoxGeometry(4.94, 3.18, 0.18),
      new THREE.MeshStandardMaterial({
        color: 0x0c1328,
        metalness: 0.95,
        roughness: 0.12,
      })
    );
    monitorChassis.position.set(0, 0.65, 0);
    workstationGroup.add(monitorChassis);

    // Monitor Outer Bezel Chamfer Rim
    const bezelRim = new THREE.Mesh(
      new THREE.BoxGeometry(5.02, 3.26, 0.14),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.92,
        roughness: 0.18,
      })
    );
    bezelRim.position.set(0, 0.65, -0.015);
    workstationGroup.add(bezelRim);

    // Active Screen Texture (2048 x 1280 High DPI)
    const screenData = createLivingScreenTexture();
    if (screenData) {
      const screenMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(4.78, 3.02),
        new THREE.MeshBasicMaterial({ map: screenData.texture, toneMapped: false })
      );
      screenMesh.position.set(0, 0.65, 0.092);
      workstationGroup.add(screenMesh);
    }

    // Physical Glass Specular Sheen Layer
    const sheen = new THREE.Mesh(
      new THREE.PlaneGeometry(4.78, 3.02),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.05,
      })
    );
    sheen.position.set(0, 0.65, 0.096);
    workstationGroup.add(sheen);

    // Neon Backlight Halo behind monitor
    const backlightHalo = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 3.4),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.22,
      })
    );
    backlightHalo.position.set(0, 0.65, -0.11);
    workstationGroup.add(backlightHalo);

    // Stand Neck (Anodized Dark Chrome)
    const standNeck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.2, 1.38, 32),
      new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.98,
        roughness: 0.08,
      })
    );
    standNeck.position.set(0, -1.0, -0.18);
    standNeck.rotation.x = 0.12;
    workstationGroup.add(standNeck);

    // Heavy Metal Baseplate
    const baseplate = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.08, 1.45),
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.95,
        roughness: 0.15,
      })
    );
    baseplate.position.set(0, -1.72, 0);
    workstationGroup.add(baseplate);

    // Glowing Neon Halo Base Ring
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.68, 0.024, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    halo.position.set(0, -1.67, 0);
    halo.rotation.x = -Math.PI / 2;
    workstationGroup.add(halo);

    // Mechanical Keyboard Assembly
    const kbGroup = new THREE.Group();
    kbGroup.position.set(0, -1.68, 1.18);
    kbGroup.rotation.x = -0.12;
    workstationGroup.add(kbGroup);

    const kbChassis = new THREE.Mesh(
      new THREE.BoxGeometry(3.35, 0.15, 1.28),
      new THREE.MeshStandardMaterial({ color: 0x070b16, metalness: 0.85, roughness: 0.2 })
    );
    kbGroup.add(kbChassis);

    // RGB Keycap Glow Underbed
    const kbGlow = new THREE.Mesh(
      new THREE.BoxGeometry(3.15, 0.06, 1.12),
      new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x0ea5e9,
        emissiveIntensity: 1.2,
        roughness: 0.1,
      })
    );
    kbGlow.position.y = 0.085;
    kbGroup.add(kbGlow);

    // Five Rows of Keycaps with Distinct Specular Edges
    [-0.38, -0.19, 0, 0.19, 0.38].forEach((rowZ) => {
      const row = new THREE.Mesh(
        new THREE.BoxGeometry(3.02, 0.05, 0.13),
        new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          metalness: 0.8,
          roughness: 0.22,
        })
      );
      row.position.set(0, 0.12, rowZ);
      kbGroup.add(row);
    });

    const keyLight = new THREE.PointLight(0x38bdf8, 4.5, 2.2, 2);
    keyLight.position.set(0, 0.4, 0);
    kbGroup.add(keyLight);

    // Precision Glass Trackpad
    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.04, 0.98),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.95, roughness: 0.08 })
    );
    trackpad.position.set(2.05, -1.68, 1.12);
    trackpad.rotation.x = -0.12;
    workstationGroup.add(trackpad);

    const trackpadGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.02, 1.0),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 })
    );
    trackpadGlow.position.set(2.05, -1.65, 1.12);
    trackpadGlow.rotation.x = -0.12;
    workstationGroup.add(trackpadGlow);

    // Floating CS Holographic Spatial Objects
    const csGroup = new THREE.Group();
    workstationGroup.add(csGroup);

    // 1. Cyan Octahedron (AST / Compiler Node)
    const cs1 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.34, 0),
      new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: 1.8,
        metalness: 0.85,
        roughness: 0.1,
      })
    );
    cs1.position.set(-3.4, 1.85, 0.9);
    csGroup.add(cs1);

    // 2. Violet Torus (Distributed Raft Quorum Ring)
    const cs2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.09, 16, 32),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xa855f7,
        emissiveIntensity: 1.6,
        metalness: 0.9,
        roughness: 0.1,
      })
    );
    cs2.position.set(3.5, 1.45, -0.6);
    csGroup.add(cs2);

    // 3. Emerald Icosahedron (Postgres RLS / ACID Token)
    const cs3 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 1.9,
        metalness: 0.9,
        roughness: 0.1,
      })
    );
    cs3.position.set(-3.1, -1.25, -0.5);
    csGroup.add(cs3);

    // 4. Rose/Solar Ring (Event Bus Invariant)
    const cs4 = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.05, 16, 32),
      new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0xf43f5e,
        emissiveIntensity: 2.0,
        metalness: 0.92,
        roughness: 0.1,
      })
    );
    cs4.position.set(3.3, -1.35, 0.85);
    csGroup.add(cs4);

    // Mouse pointer listener with damping
    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Resize Observer for fluid responsiveness
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        }
      }
    });
    resizeObserver.observe(container);

    // 60-120 FPS Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (screenData) screenData.update();

      // Tactile physical tilt on mouse move
      const targetRotY = pointerX * 0.35;
      const targetRotX = -pointerY * 0.24;
      workstationGroup.rotation.y = THREE.MathUtils.lerp(workstationGroup.rotation.y, targetRotY, 0.06);
      workstationGroup.rotation.x = THREE.MathUtils.lerp(workstationGroup.rotation.x, targetRotX, 0.06);

      // Living floating breathing animation
      workstationGroup.position.y = Math.sin(elapsed * 1.5) * 0.09;

      halo.rotation.z += 0.018;
      keyLight.intensity = 4.0 + Math.sin(elapsed * 3.2) * 1.5;

      cs1.rotation.y += 0.022;
      cs1.rotation.x += 0.014;
      cs2.rotation.x += 0.026;
      cs2.rotation.y += 0.018;
      cs3.rotation.z += 0.02;
      cs3.rotation.x += 0.012;
      cs4.rotation.x += 0.024;
      cs4.rotation.z += 0.016;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      screenData?.dispose();
      renderer.dispose();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[440px] rounded-3xl bg-slate-950/90 border border-cyan-500/30 flex items-center justify-center backdrop-blur-xl">
        <div className="animate-pulse text-cyan-400 font-mono text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>INITIALIZING 120 FPS DISTRIBUTED KERNEL...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-[470px] sm:h-[530px] lg:h-[590px] relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
