'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
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
// PROCEDURAL CANVAS TEXTURE: Living IDE + 120 FPS Telemetry & 100+ Live Actions
// -----------------------------------------------------------------------------
function useLivingScreenTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 800;
    const ctx = canvas.getContext('2d')!;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    let tick = 0;

    // Rich IDE code lines (Systems architecture & distributed consensus)
    const codeLines = [
      '// Biswodip Goj — Distributed Architecture Kernel v3.0',
      'import { RaftCluster, MicrotaskEngine } from "@biswodip/core";',
      'import { RowLevelSecurity, BTreeIndex } from "@biswodip/db";',
      '',
      'export class ArchitectureKernel implements IProductionRuntime {',
      '  private readonly cluster = new RaftCluster({ quorum: 3 });',
      '  private readonly v8Queue = new MicrotaskEngine({ targetFps: 120 });',
      '',
      '  public async boot(): Promise<RuntimeStatus> {',
      '    // 1. Establish Raft Consensus across distributed nodes',
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
      '// Kernel initialization initiated at 120 FPS...'
    ];

    const update = () => {
      tick++;

      // 1. Main Background: Deep obsidian glass
      ctx.fillStyle = '#050814';
      ctx.fillRect(0, 0, 1280, 800);

      // Subtle cyber grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 1280; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 800);
        ctx.stroke();
      }
      for (let y = 0; y < 800; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1280, y);
        ctx.stroke();
      }

      // 2. Global Top App Bar (macOS Chrome)
      ctx.fillStyle = '#080d22';
      ctx.fillRect(0, 0, 1280, 52);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.strokeRect(0, 0, 1280, 52);

      // Window Control Dots
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(28, 26, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(52, 26, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(76, 26, 8, 0, Math.PI * 2);
      ctx.fill();

      // Top Tab Titles
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('kernel.ts [120 FPS STREAM]', 120, 32);

      ctx.fillStyle = '#64748b';
      ctx.fillText('raft_consensus.rs', 380, 32);
      ctx.fillText('distributed_queue.go', 560, 32);

      // Top Right Status Badges
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = '#34d399';
      ctx.fillText('● 120 FPS VERIFIED', 1080, 32);

      // 3. Vertical Divider separating Left (Code IDE) from Right (Telemetry & Actions)
      const splitX = 680;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      ctx.moveTo(splitX, 52);
      ctx.lineTo(splitX, 800);
      ctx.stroke();

      // -----------------------------------------------------------------------
      // LEFT PANE: Systems Architecture Code Editor
      // -----------------------------------------------------------------------
      ctx.font = '18px monospace';
      const visibleLines = Math.min(codeLines.length, 25);
      const activeExecutingLine = Math.floor(tick / 24) % codeLines.length;

      for (let i = 0; i < visibleLines; i++) {
        const y = 92 + i * 27;

        // Line number
        ctx.fillStyle = i === activeExecutingLine ? '#38bdf8' : '#334155';
        ctx.fillText(String(i + 1).padStart(2, '0'), 20, y);

        // Active line execution highlight bar
        if (i === activeExecutingLine) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
          ctx.fillRect(52, y - 20, splitX - 60, 26);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(52, y - 20, 3, 26);
        }

        // Code text with syntax coloring
        const line = codeLines[i];
        if (line.startsWith('//')) {
          ctx.fillStyle = '#64748b';
        } else if (line.includes('class') || line.includes('export') || line.includes('import') || line.includes('return') || line.includes('async')) {
          ctx.fillStyle = '#c084fc';
        } else if (line.includes('private') || line.includes('public') || line.includes('readonly') || line.includes('const')) {
          ctx.fillStyle = '#818cf8';
        } else if (line.includes('"') || line.includes("'")) {
          ctx.fillStyle = '#34d399';
        } else if (line.includes('new ') || line.includes('RaftCluster') || line.includes('MicrotaskEngine')) {
          ctx.fillStyle = '#38bdf8';
        } else {
          ctx.fillStyle = '#e2e8f0';
        }
        ctx.fillText(line, 64, y);
      }

      // Smooth blinking caret
      if (Math.floor(tick / 20) % 2 === 0) {
        const caretY = 92 + (activeExecutingLine % visibleLines) * 27;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(64 + (codeLines[activeExecutingLine]?.length || 0) * 10.8, caretY - 18, 10, 22);
      }

      // -----------------------------------------------------------------------
      // RIGHT PANE: 120 FPS System Telemetry & 100+ Live Streaming Actions
      // -----------------------------------------------------------------------
      // Telemetry Header
      ctx.fillStyle = '#080e26';
      ctx.fillRect(splitX, 52, 1280 - splitX, 42);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.strokeRect(splitX, 52, 1280 - splitX, 42);

      ctx.font = 'bold 15px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('LIVE EXECUTION TELEMETRY · 100+ CS ACTIONS', splitX + 18, 78);

      // Oscilloscope / Real-time Undulating Waveform (120 FPS Harmonic Wave)
      ctx.fillStyle = '#060a1c';
      ctx.fillRect(splitX + 16, 106, 568, 74);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.strokeRect(splitX + 16, 106, 568, 74);

      ctx.beginPath();
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      for (let x = 0; x < 568; x += 3) {
        const waveY =
          143 +
          Math.sin((x + tick * 6) * 0.035) * 16 +
          Math.sin((x * 2 - tick * 4) * 0.02) * 8;
        if (x === 0) ctx.moveTo(splitX + 16 + x, waveY);
        else ctx.lineTo(splitX + 16 + x, waveY);
      }
      ctx.stroke();

      // Wave overlay metrics
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = '#34d399';
      ctx.fillText('THROUGHPUT: 1.4M msg/sec', splitX + 28, 126);
      ctx.fillStyle = '#c084fc';
      ctx.fillText('V8 TICK: 0.08ms', splitX + 240, 126);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('HEAP: 42.4MB', splitX + 410, 126);

      // Action Stream Header
      const actionCount = ACTIONS_LIST.length;
      const currentActionIndex = Math.floor(tick / 4); // Advances rapidly (action rolls continuously)
      ctx.fillStyle = '#09102c';
      ctx.fillRect(splitX + 16, 192, 568, 32);
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(
        `ACTION STREAM · #${String((currentActionIndex % 9999) + 1).padStart(4, '0')} (${actionCount} UNIQUE ACTIONS)`,
        splitX + 26,
        213
      );

      // Streaming Actions List (Displays 14 rows rolling upwards smoothly)
      const visibleActionRows = 14;
      ctx.font = '14px monospace';

      for (let r = 0; r < visibleActionRows; r++) {
        const idx = (currentActionIndex + r) % actionCount;
        const act = ACTIONS_LIST[idx];
        const rowY = 250 + r * 37;

        // Subtle row striping
        ctx.fillStyle = r % 2 === 0 ? 'rgba(15, 23, 42, 0.45)' : 'rgba(30, 41, 59, 0.25)';
        ctx.fillRect(splitX + 16, rowY - 20, 568, 30);

        // Action ID
        ctx.fillStyle = '#64748b';
        ctx.fillText(String(idx + 1).padStart(3, '0'), splitX + 24, rowY);

        // Category Tag Badge
        ctx.fillStyle = act.color;
        ctx.fillRect(splitX + 62, rowY - 15, 68, 20);
        ctx.fillStyle = '#020617';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(act.tag.padEnd(6, ' '), splitX + 70, rowY - 1);

        // Action Message
        ctx.font = '13px monospace';
        ctx.fillStyle = '#e2e8f0';
        const truncatedMsg = act.msg.length > 44 ? act.msg.slice(0, 42) + '…' : act.msg;
        ctx.fillText(truncatedMsg, splitX + 140, rowY);
      }

      // Bottom Status Footer in screen
      ctx.fillStyle = '#080d22';
      ctx.fillRect(0, 764, 1280, 36);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.strokeRect(0, 764, 1280, 36);
      ctx.font = '13px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('● BISWODIP ARCHITECTURE RUNTIME · ULUBERIA NODE · ZERO MEMORY LEAKS · 120 FPS FLUID', 24, 787);

      // CRT Scanline sheen sweeping down
      ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
      const scanY = (tick * 5) % 800;
      ctx.fillRect(0, scanY, 1280, 45);

      texture.needsUpdate = true;
    };

    return { texture, update };
  }, []);
}

// -----------------------------------------------------------------------------
// 3D COMPUTER HARDWARE MESH ASSEMBLY
// Sleek Studio Display, RGB Wave Keyboard, Stand Halo, and 4 Orbiting CS Objects
// -----------------------------------------------------------------------------
function ComputerMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const screenMesh = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const keyLightRef = useRef<THREE.PointLight>(null);
  const screenData = useLivingScreenTexture();

  // Floating Computer Science Software Objects orbiting the workstation
  const csSoftwareObjects = useMemo(
    () => [
      { pos: [-3.3, 1.8, 0.9], color: '#38bdf8', label: 'AST_NODE', geom: 'octahedron' },
      { pos: [3.4, 1.4, -0.6], color: '#818cf8', label: 'RING_BUFFER', geom: 'torus' },
      { pos: [-3.0, -1.2, -0.5], color: '#34d399', label: 'CONSENSUS', geom: 'icosahedron' },
      { pos: [3.2, -1.3, 0.8], color: '#f43f5e', label: 'EVENT_LOOP', geom: 'ring' },
    ],
    []
  );

  useFrame((state) => {
    if (screenData) screenData.update();

    if (groupRef.current) {
      // Fluid pointer-driven perspective tilt
      const targetRotY = state.pointer.x * 0.32;
      const targetRotX = -state.pointer.y * 0.22;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);

      // 120 FPS smooth levitation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.6) * 0.08;
    }

    // Pulsing illuminated stand halo
    if (haloRef.current) {
      haloRef.current.rotation.z += 0.015;
    }

    // Pulsing RGB keyboard illumination wave
    if (keyLightRef.current) {
      keyLightRef.current.intensity = 3 + Math.sin(state.clock.elapsedTime * 3) * 1.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* -------------------------------------------------------------------
          1. SLEEK STUDIO DISPLAY MONITOR
         ------------------------------------------------------------------- */}
      {/* Dark Titanium Monitor Chassis */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[4.9, 3.15, 0.16]} />
        <meshStandardMaterial color="#0c1021" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Monitor Chamfered Outer Bezel Rim */}
      <mesh position={[0, 0.65, -0.01]}>
        <boxGeometry args={[4.98, 3.23, 0.12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.88} roughness={0.25} />
      </mesh>

      {/* The Active Glowing Monitor Screen (Living Canvas Texture) */}
      {screenData && (
        <mesh ref={screenMesh} position={[0, 0.65, 0.088]}>
          <planeGeometry args={[4.74, 2.98]} />
          <meshBasicMaterial map={screenData.texture} toneMapped={false} />
        </mesh>
      )}

      {/* Monitor Glass Specular Sheen Layer */}
      <mesh position={[0, 0.65, 0.092]}>
        <planeGeometry args={[4.74, 2.98]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.06} />
      </mesh>

      {/* Outer Cyan Screen Accent Glow Wire */}
      <mesh position={[0, 0.65, 0.082]}>
        <planeGeometry args={[4.8, 3.04]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.25} />
      </mesh>

      {/* -------------------------------------------------------------------
          2. STAND NECK & ILLUMINATED BASEPLATE
         ------------------------------------------------------------------- */}
      {/* Precision Stand Neck */}
      <mesh position={[0, -1.0, -0.18]} rotation={[0.12, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 1.35, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Baseplate Solid Metallic Chassis */}
      <mesh position={[0, -1.72, 0]}>
        <boxGeometry args={[1.9, 0.06, 1.4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Baseplate Ambient Illuminated Halo Ring */}
      <mesh ref={haloRef} position={[0, -1.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.02, 16, 48]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* -------------------------------------------------------------------
          3. MECHANICAL RGB KEYBOARD
         ------------------------------------------------------------------- */}
      <group position={[0, -1.68, 1.15]} rotation={[-0.12, 0, 0]}>
        {/* Keyboard Chassis */}
        <mesh>
          <boxGeometry args={[3.3, 0.14, 1.25]} />
          <meshStandardMaterial color="#070b16" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Backlit Keybed Glow */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[3.1, 0.05, 1.08]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0ea5e9"
            emissiveIntensity={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Individual Key Rows (Simulated Mechanical Matrix) */}
        {[-0.36, -0.18, 0, 0.18, 0.36].map((rowZ, r) => (
          <mesh key={r} position={[0, 0.11, rowZ]}>
            <boxGeometry args={[2.98, 0.04, 0.12]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Dynamic Light above Keyboard */}
        <pointLight
          ref={keyLightRef}
          position={[0, 0.35, 0]}
          intensity={3}
          color="#38bdf8"
          distance={1.8}
          decay={2}
        />
      </group>

      {/* -------------------------------------------------------------------
          4. PRECISION HAPTIC GLASS TRACKPAD
         ------------------------------------------------------------------- */}
      <mesh position={[1.98, -1.68, 1.1]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.75, 0.04, 0.95]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Trackpad Glow Edge */}
      <mesh position={[1.98, -1.65, 1.1]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.77, 0.02, 0.97]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </mesh>

      {/* -------------------------------------------------------------------
          5. ORBITING 3D COMPUTER SCIENCE SOFTWARE OBJECTS
         ------------------------------------------------------------------- */}
      {csSoftwareObjects.map((obj, i) => (
        <Float key={i} speed={2.2 + i * 0.5} rotationIntensity={0.8} floatIntensity={1.0}>
          <group position={obj.pos as [number, number, number]}>
            {obj.geom === 'octahedron' && (
              <mesh>
                <octahedronGeometry args={[0.32, 0]} />
                <meshStandardMaterial
                  color={obj.color}
                  emissive={obj.color}
                  emissiveIntensity={1.4}
                  metalness={0.8}
                  roughness={0.1}
                />
              </mesh>
            )}
            {obj.geom === 'torus' && (
              <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.26, 0.08, 16, 32]} />
                <meshStandardMaterial
                  color={obj.color}
                  emissive={obj.color}
                  emissiveIntensity={1.2}
                  metalness={0.85}
                  roughness={0.1}
                />
              </mesh>
            )}
            {obj.geom === 'icosahedron' && (
              <mesh>
                <icosahedronGeometry args={[0.28, 0]} />
                <meshStandardMaterial
                  color={obj.color}
                  emissive={obj.color}
                  emissiveIntensity={1.5}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            )}
            {obj.geom === 'ring' && (
              <mesh rotation={[0.4, 0.4, 0]}>
                <torusGeometry args={[0.3, 0.04, 16, 32]} />
                <meshStandardMaterial
                  color={obj.color}
                  emissive={obj.color}
                  emissiveIntensity={1.8}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            )}
          </group>
        </Float>
      ))}

      {/* -------------------------------------------------------------------
          6. DUAL ATMOSPHERIC BACKLIGHT GLOWS (Cyan & Violet)
         ------------------------------------------------------------------- */}
      <pointLight position={[0, 0.9, -0.7]} intensity={22} color="#38bdf8" distance={7} decay={2} />
      <pointLight position={[0, -1.0, 1.4]} intensity={10} color="#c084fc" distance={4} decay={2} />
    </group>
  );
}

// -----------------------------------------------------------------------------
// EXPORT DEFAULT COMPUTER3D COMPONENT
// -----------------------------------------------------------------------------
export default function Computer3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="w-full h-[470px] sm:h-[530px] lg:h-[590px] relative">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-4, -2, -2]} intensity={1.3} color="#0284c7" />

        <ComputerMesh />
      </Canvas>
    </div>
  );
}
