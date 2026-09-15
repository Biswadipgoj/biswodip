export interface CraftSpec {
  complexity: string;
  category: string;
  role: string;
  tradeoff: string;
  codeSnippet: string;
}

export const CRAFT_SPECS: Record<string, CraftSpec> = {
  // Layer 01: Client Runtime
  'React & Next.js': {
    complexity: 'O(1) Virtual DOM Reconciliation',
    category: 'Client Runtime Architecture',
    role: 'Server-Side Rendering (SSR) & Streaming Server Components (RSC)',
    tradeoff: 'Hydration boundary overhead vs immediate First Contentful Paint (FCP)',
    codeSnippet: `// Next.js App Router · Zero-Bundle Server Component
export default async function SystemsPage() {
  const telemetry = await fetchTelemetry({ next: { revalidate: 60 } });
  return <Suspense fallback={<Shimmer />}><DataGrid data={telemetry} /></Suspense>;
}`,
  },
  'TypeScript': {
    complexity: 'O(V+E) Type Graph Invariant Check',
    category: 'Compiler & Type Safety',
    role: 'Compile-Time Invariant Verification & Zero Undefined Exceptions',
    tradeoff: 'Marginal build step delay vs elimination of production runtime null-pointer faults',
    codeSnippet: `// Type-Level Finite State Machine Invariant
type InvariantState = 'BOOTING' | 'ARMED' | 'DISPATCHED';
type Transition<Current extends InvariantState, Next extends InvariantState> =
  Current extends 'BOOTING' ? (Next extends 'ARMED' ? Next : never) : never;`,
  },
  'Tailwind CSS': {
    complexity: 'O(1) Utility Class Lookup (JIT)',
    category: 'Design System Engineering',
    role: 'Atomic CSS Generation & Zero Runtime Layout Recalculation',
    tradeoff: 'HTML markup density vs complete elimination of global CSS specificity clashes',
    codeSnippet: `@layer utilities {
  .specular-glass {
    backdrop-filter: blur(24px) saturate(180%);
    background: rgba(15, 23, 42, 0.75);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15);
  }
}`,
  },
  'Three.js / WebGL': {
    complexity: 'O(1) Hardware GPU Draw Call Queue',
    category: 'Spatial Graphics & GPU Pipeline',
    role: 'Vertex/Fragment Shader Pipelines & 3D Mathematical Projection',
    tradeoff: 'GPU memory consumption vs photorealistic interactive spatial depth',
    codeSnippet: `// Custom Fragment Shader Pipeline
const material = new THREE.ShaderMaterial({
  vertexShader: \`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }\`,
  fragmentShader: \`uniform float uTime; varying vec2 vUv; void main() { gl_FragColor = vec4(vUv, sin(uTime) * 0.5 + 0.5, 1.0); }\`
});`,
  },
  'Framer Motion': {
    complexity: 'O(1) GPU Composited Transforms',
    category: 'Parametric Animation Engine',
    role: 'Hardware-Accelerated transform3d Transitions & Physics Springs',
    tradeoff: 'Bundle weight (32KB gzip) vs fluid, non-blocking parametric motion orchestration',
    codeSnippet: `// Spring-physics parametric transform
const spring = useSpring(useTransform(cursorX, [0, 1], [-24, 24]), {
  stiffness: 400,
  damping: 28,
  mass: 0.5
});`,
  },
  'Redux & Zustand': {
    complexity: 'O(1) Selector Subscription Memoization',
    category: 'Predictable State Management',
    role: 'Deterministic Unidirectional State Flow & DevTools Time Travel',
    tradeoff: 'State schema boilerplate vs absolute consistency across distributed UI trees',
    codeSnippet: `// Atomic Zustand Store with Middleware
export const useTelemetryStore = create<TelemetryState>()(
  subscribeWithSelector((set) => ({
    latencyMs: 12,
    setLatency: (ms) => set({ latencyMs: ms })
  }))
);`,
  },
  'Vue.js & Nuxt': {
    complexity: 'O(1) Proxy-based Dependency Tracking',
    category: 'Client Runtime Architecture',
    role: 'Universal SSR & Automatic Code Splitting',
    tradeoff: 'Template compiler constraint vs ultra-intuitive declarative data-binding',
    codeSnippet: `<script setup lang="ts">
const { data: nodes } = await useAsyncData('cluster', () => fetchClusterStatus());
</script>`,
  },
  'SvelteKit': {
    complexity: 'O(1) Ahead-of-Time Compile (Zero VDOM)',
    category: 'Compiled UI Architecture',
    role: 'Vanishing Runtime with Reactive Suffix Invariants',
    tradeoff: 'Ecosystem size vs unmatched runtime raw execution speed',
    codeSnippet: `// Svelte 5 Rune State Invariant
let clusterHealth = $state('OPTIMAL');
let p99 = $derived(calculateP99(metrics));`,
  },
  'WebSockets & RTC': {
    complexity: 'O(1) Full-Duplex TCP/UDP Socket Frame',
    category: 'Real-Time Protocol Engineering',
    role: 'Persistent Low-Overhead Event Streaming (RFC 6455)',
    tradeoff: 'Server stateful connection limits vs sub-millisecond bidirectional reactivity',
    codeSnippet: `const socket = new WebSocket('wss://api.biswodip.dev/v1/topology');
socket.binaryType = 'arraybuffer';
socket.onmessage = (event) => unpackBinaryTelemetry(event.data);`,
  },
  'Micro-frontends': {
    complexity: 'O(1) Module Federation Chunk Resolution',
    category: 'Decoupled Enterprise UI Architecture',
    role: 'Runtime Host/Remote Dynamic Loading via Webpack Federation',
    tradeoff: 'Initial shared dependency coordination vs zero-block deploy velocity',
    codeSnippet: `new ModuleFederationPlugin({
  name: 'dashboard_host',
  remotes: { telemetryRemote: 'telemetryRemote@https://cdn.biswodip.dev/remoteEntry.js' }
});`,
  },
  'Storybook': {
    complexity: 'O(1) Component Isolation Sandbox',
    category: 'Component-Driven Development',
    role: 'Isolated Component Sandboxing & Accessibility Compliance',
    tradeoff: 'Setup overhead vs rock-solid cross-browser visual fidelity',
    codeSnippet: `export const HighContrastState: Story = {
  args: { variant: 'specular', highContrast: true, telemetryActive: true }
};`,
  },
  'GSAP': {
    complexity: 'O(1) RequestAnimationFrame High-Res Tick',
    category: 'High-Performance Timeline Engine',
    role: 'Complex Multi-Stage SVG & Canvas Timeline Sequencing',
    tradeoff: 'Imperative syntax vs absolute deterministic tween sequencing',
    codeSnippet: `const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });
tl.from('.origami-flap', { rotateX: 90, stagger: 0.05 });`,
  },

  // Layer 02: Distributed Backend & APIs
  'Node.js & Express': {
    complexity: 'O(1) Event Loop (libuv epoll)',
    category: 'Distributed Server Runtime',
    role: 'Non-blocking Asynchronous I/O Microservices',
    tradeoff: 'Single-thread CPU ceiling vs massive high-concurrency connection throughput',
    codeSnippet: `// Hardened Express Middleware Stack
const app = express();
app.use(helmet()).use(compression()).use(cors({ origin: 'https://biswodip.dev' }));
app.get('/healthz', (req, res) => res.status(200).json({ status: 'UP' }));`,
  },
  'Python & FastAPI': {
    complexity: 'O(1) Asyncio Task Scheduling & Pydantic',
    category: 'Asynchronous API Framework',
    role: 'High-Throughput Typed REST & AI Service Endpoints',
    tradeoff: 'Python interpreter GIL vs unparalleled async typed developer velocity',
    codeSnippet: `from fastapi import FastAPI, Depends
app = FastAPI(title="Topology Dispatch")
@app.get("/metrics", response_model=ClusterMetric)
async def read_metrics(token: str = Depends(verify_jwt)):
    return await query_timeseries_db()`,
  },
  'REST & GraphQL': {
    complexity: 'O(1) REST Path Lookup / O(N) AST Resolve',
    category: 'API Contract Design',
    role: 'Declarative Data Fetching & Strict Schema Contracts',
    tradeoff: 'N+1 query resolution risk vs complete frontend query flexibility',
    codeSnippet: `type Query {
  clusterNode(id: ID!): ClusterNode
  systemHealth(region: String!): HealthReport!
}`,
  },
  'Kafka & RabbitMQ': {
    complexity: 'O(1) Sequential Disk Write & Offset Read',
    category: 'Distributed Message Broker',
    role: 'Fault-Tolerant Log Partitioning & Asynchronous Pub/Sub',
    tradeoff: 'Cluster management complexity vs unstoppable horizontal message durability',
    codeSnippet: `// Kafka Partitioned Consumer Stream
await consumer.connect();
await consumer.subscribe({ topic: 'telemetry.events', fromBeginning: false });
await consumer.run({ eachMessage: async ({ message }) => processTelemetry(message) });`,
  },
  'JWT & OAuth2': {
    complexity: 'O(1) HMAC-SHA256 Cryptographic Verification',
    category: 'Identity & Access Management',
    role: 'Cryptographically Signed Stateless Bearer Tokens & PKCE Flow',
    tradeoff: 'Token revocation complexity vs zero database lookup on each API request',
    codeSnippet: `// Stateless EdDSA Token Verification
const verified = await jwtVerify(token, publicKey, {
  issuer: 'urn:biswodip:auth',
  audience: 'urn:biswodip:api'
});`,
  },
  'Microservices': {
    complexity: 'O(1) Service Mesh RPC Routing',
    category: 'Distributed Systems Architecture',
    role: 'Decoupled Domain Services & Database-Per-Service Pattern',
    tradeoff: 'Network latency & distributed tracing overhead vs independent deployment teams',
    codeSnippet: `// gRPC Service Client with Circuit Breaker
const client = new TopologyServiceClient('mesh.internal:50051', credentials.createInsecure());`,
  },
  'Go (Golang)': {
    complexity: 'O(1) Goroutine M:N User-Space Scheduling',
    category: 'Systems & Concurrency Engineering',
    role: 'Blazing Fast Concurrent Microservices & Network Proxies',
    tradeoff: 'Less expressive type hierarchy vs unmatched memory footprint & binary speed',
    codeSnippet: `func handleStream(ch <-chan Telemetry) {
    for metric := range ch {
        go processMetricWorker(metric)
    }
}`,
  },
  'Rust': {
    complexity: 'O(1) Compile-Time Borrow Checker (Zero Cost)',
    category: 'Systems & Memory Safety',
    role: 'Memory-Safe High-Throughput Native Engines & WebAssembly Modules',
    tradeoff: 'Steeper compile-time borrow check learning curve vs bulletproof zero memory corruption',
    codeSnippet: `pub fn process_packet(buffer: &[u8]) -> Result<PacketHeader, ParseError> {
    if buffer.len() < 16 { return Err(ParseError::Incomplete); }
    Ok(PacketHeader::decode(&buffer[..16]))
}`,
  },
  'Spring Boot': {
    complexity: 'O(1) Dependency Injection Container (IoC)',
    category: 'Enterprise Backend Engineering',
    role: 'Robust Java Enterprise Services & Distributed Transaction Management',
    tradeoff: 'JVM startup memory baseline vs enterprise mature ecosystem reliability',
    codeSnippet: `@RestController
@RequestMapping("/api/v2/clusters")
public class ClusterController {
    @GetMapping public ResponseEntity<ClusterStatus> getStatus() { ... }
}`,
  },
  'gRPC & Protobuf': {
    complexity: 'O(1) Binary Wire Format Serialization',
    category: 'High-Performance Inter-Service RPC',
    role: 'Strict Typed Protobuf Wire Protocol & Bi-Directional Streaming',
    tradeoff: 'Human-unreadable binary packets vs orders of magnitude lower CPU serialization cost',
    codeSnippet: `syntax = "proto3";
service TelemetryEngine {
  rpc StreamMetrics (StreamRequest) returns (stream MetricPacket);
}`,
  },
  'Serverless / Lambdas': {
    complexity: 'O(1) Cold-Start Ephemeral Container Fork',
    category: 'Event-Driven Cloud Compute',
    role: 'Event-Triggered Ephemeral Compute Units & Edge Functions',
    tradeoff: 'Cold start latency (100–300ms) vs zero server maintenance and infinite scalability',
    codeSnippet: `export const handler = async (event: APIGatewayProxyEvent) => {
  return { statusCode: 200, body: JSON.stringify({ message: "Processed" }) };
};`,
  },
  'Web3 & Contracts': {
    complexity: 'O(1) Cryptographic State Root Merkle Proof',
    category: 'Decentralized Protocol Engineering',
    role: 'Smart Contract Protocol Integration & Cryptographic Signatures',
    tradeoff: 'Block finality latency vs decentralized zero-counterparty trust',
    codeSnippet: `function verifyAttestation(bytes32 hash, bytes calldata sig) external view returns (bool) {
    return ECDSA.recover(hash, sig) == trustedIssuer;
}`,
  },

  // Layer 03: DevOps & Cloud Infrastructure
  'Docker & Compose': {
    complexity: 'O(1) Linux Kernel Namespace & Cgroup Slice',
    category: 'Containerization & OCI Standard',
    role: 'Immutable Container Packaging & Multi-Stage Layer Caching',
    tradeoff: 'Storage layer duplication vs absolute environment parity from dev to prod',
    codeSnippet: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build`,
  },
  'CI/CD Pipelines': {
    complexity: 'O(V+E) Directed Acyclic Graph Pipeline',
    category: 'Continuous Delivery Engineering',
    role: 'Automated Lint, Test, Security Scanning, and Deployment Triggers',
    tradeoff: 'Pipeline execution minutes vs zero broken builds reaching live production',
    codeSnippet: `name: Ship Production
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test:e2e`,
  },
  'AWS & Cloudflare': {
    complexity: 'O(1) Anycast BGP Routing to Edge PoPs',
    category: 'Global Edge & Cloud Infrastructure',
    role: 'Multi-Region Content Delivery & Distributed DDoS Mitigation',
    tradeoff: 'Egress bandwidth costs vs unbeatable global performance and resilience',
    codeSnippet: `export default {
  async fetch(request, env) {
    return new Response("Edge Response from Kolkata PoP", { status: 200 });
  }
};`,
  },
  'Kubernetes (K8s)': {
    complexity: 'O(1) Reconciliation Loop Control Loop',
    category: 'Container Orchestration & Clustering',
    role: 'Automated Pod Scheduling, Rolling Updates, and Service Discovery',
    tradeoff: 'Control plane operational complexity vs bulletproof cluster self-healing',
    codeSnippet: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef: { apiVersion: 'apps/v1', kind: 'Deployment', name: 'api-deployment' }
  minReplicas: 3
  maxReplicas: 30`,
  },
  'Linux & Shell': {
    complexity: 'O(1) POSIX System Calls & Kernel Buffers',
    category: 'Operating System & Kernel Engineering',
    role: 'Host Performance Tuning, Systemd Services, and Shell Automation',
    tradeoff: 'Manual configuration risk vs complete low-level control over CPU/memory bounds',
    codeSnippet: `#!/usr/bin/env bash
set -euo pipefail
ps aux --sort=-%mem | head -n 10`,
  },
  'Nginx & Proxy': {
    complexity: 'O(1) Event-Driven Asynchronous Connection Loop',
    category: 'Edge Reverse Proxy & Load Balancer',
    role: 'TLS Termination, Rate Limiting, and Upstream Load Balancing',
    tradeoff: 'Static configuration file reloads vs near-zero proxy latency',
    codeSnippet: `server {
    listen 443 ssl http2;
    server_name biswodip.dev;
    ssl_protocols TLSv1.2 TLSv1.3;
    location / { proxy_pass http://upstream_cluster; }
}`,
  },
  'Terraform & IaC': {
    complexity: 'O(V+E) Infrastructure Graph Dependency Resolution',
    category: 'Declarative Cloud Provisioning',
    role: 'Reproducible Multi-Cloud Architecture with State Locking',
    tradeoff: 'State file drift management vs completely automated cloud creation',
    codeSnippet: `resource "aws_eks_cluster" "primary" {
  name     = "biswodip-production-mesh"
  version  = "1.30"
  role_arn = aws_iam_role.cluster.arn
}`,
  },
  'GCP & Azure': {
    complexity: 'O(1) Multi-Region Cloud Resource Allocation',
    category: 'Enterprise Cloud Infrastructure',
    role: 'Managed BigQuery, GKE, and Cloud Run Enterprise Deployments',
    tradeoff: 'Cloud vendor abstraction vs seamless managed platform velocity',
    codeSnippet: `gcloud run deploy api-service --image gcr.io/biswodip/api:latest --region asia-south1`,
  },
  'Grafana & Metrics': {
    complexity: 'O(1) Prometheus Time-Series Vector Lookups',
    category: 'System Observability & Monitoring',
    role: 'Real-Time Metric Aggregation, Distributed Tracing, and Alerting',
    tradeoff: 'Time-series storage ingestion cost vs instant incident detection and resolution',
    codeSnippet: `sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100`,
  },
  'ArgoCD': {
    complexity: 'O(1) GitOps Reconciliation Controller',
    category: 'GitOps Continuous Delivery',
    role: 'Declarative Kubernetes Deployment Synced Directly from Git Repositories',
    tradeoff: 'Strict Git approval gates vs complete audit trail and instant rollbacks',
    codeSnippet: `apiVersion: argoproj.io/v1alpha1
kind: Application
spec:
  source: { repoURL: 'https://github.com/biswodip/gitops.git', path: 'manifests' }`,
  },
  'Jenkins & GitLab': {
    complexity: 'O(V+E) Multi-Branch Pipeline Orchestration',
    category: 'Enterprise CI/CD Automation',
    role: 'Robust Pipeline Automation & Security Vulnerability Scanning',
    tradeoff: 'Build server maintenance vs deep enterprise workflow compliance',
    codeSnippet: `pipeline {
  agent any
  stages { stage('Build & Verify') { steps { sh 'npm test' } } }
}`,
  },
  'Ansible': {
    complexity: 'O(N) SSH Idempotent Playbook Execution',
    category: 'Infrastructure Automation',
    role: 'Idempotent Fleet Provisioning & Zero-Agent Server Hardening',
    tradeoff: 'SSH roundtrip execution latency vs zero installed agent daemon overhead',
    codeSnippet: `- name: Configure Production Nodes
  hosts: cluster
  tasks:
    - name: Ensure docker is running
      systemd: name=docker state=started enabled=yes`,
  },

  // Layer 04: Data Engineering & Tooling
  'PostgreSQL & MySQL': {
    complexity: 'O(log n) B-Tree Index Search / ACID',
    category: 'Relational Database Management (RDBMS)',
    role: 'Multi-Tenant Data Isolation, Foreign Key Integrity, and ACID Transactions',
    tradeoff: 'Vertical scaling constraints vs absolute relational consistency guarantees',
    codeSnippet: `-- Strict Tenant Isolation Invariant
ALTER TABLE customer_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON customer_data
  FOR ALL USING (tenant_id = current_setting('request.jwt.claim.tenant_id', true));`,
  },
  'MongoDB & Redis': {
    complexity: 'O(1) In-Memory Key-Value & Document Hash Map',
    category: 'NoSQL & Distributed Caching',
    role: 'High-Throughput Session Stores, Distributed Locks, and Document Storage',
    tradeoff: 'RAM capacity limits vs blazing 100k+ operations/second throughput',
    codeSnippet: `// Distributed Redlock Pattern
const acquired = await redis.set('lock:cluster:migration', workerId, 'NX', 'PX', 5000);
if (acquired) { /* execute atomic task */ }`,
  },
  'Prisma & Drizzle': {
    complexity: 'O(1) TypeScript AST Query Generation',
    category: 'Database ORM & Query Builder',
    role: 'Compile-Time Schema Migrations & Auto-Generated Typed Query Clients',
    tradeoff: 'Lightweight query abstraction overhead vs zero SQL injection and syntax errors',
    codeSnippet: `const result = await db.select().from(users).where(eq(users.role, 'ADMIN'));`,
  },
  'Jest & Vitest': {
    complexity: 'O(N) Parallel Worker Thread Test Runner',
    category: 'Automated Testing Framework',
    role: 'Automated Regression Gates & Isolated Test Mocking',
    tradeoff: 'Test authoring investment vs zero breaking regressions delivered to clients',
    codeSnippet: `describe('PaymentInvariant', () => {
  it('prevents double-spend via idempotency key', async () => {
    expect(await processIdempotent(key)).toBeDefined();
  });
});`,
  },
  'Git & Monorepos': {
    complexity: 'O(1) SHA-256 DAG Commit Graph Traversal',
    category: 'Version Control & Monorepo Architecture',
    role: 'Immutable History Tracking & Incremental Monorepo Computation',
    tradeoff: 'Monorepo tooling discipline vs single source of truth and cross-package sharing',
    codeSnippet: `{ "pipeline": { "build": { "dependsOn": ["^build"], "outputs": [".next/**"] } } }`,
  },
  'System Architecture': {
    complexity: 'O(1) High-Availability CAP Tradeoff Analysis',
    category: 'Enterprise Architectural Strategy',
    role: 'Distributed Consensus, Fault Tolerance, and Business Requirements Mapping',
    tradeoff: 'Architectural upfront research vs avoiding multimillion-dollar refactoring later',
    codeSnippet: `// System Architectural Blueprint
[Client Edge] ➔ [Cloudflare Anycast] ➔ [K8s Ingress] ➔ [gRPC Cluster] ➔ [Postgres RLS]`,
  },
  'Elasticsearch': {
    complexity: 'O(1) Inverted Index & Lucene Search Lookups',
    category: 'Distributed Search & Analytics Engine',
    role: 'Faceted Full-Text Search, Logstash Aggregations, and Anomaly Detection',
    tradeoff: 'Heavy JVM heap memory footprint vs instantaneous multi-field text queries',
    codeSnippet: `{ "query": { "bool": { "must": [{ "match": { "system": "distributed" } }] } } }`,
  },
  'Apache Spark': {
    complexity: 'O(N) Resilient Distributed Datasets (RDD) Graph',
    category: 'Big Data & Distributed Computing',
    role: 'Batch Processing & Distributed ETL Transformation Pipelines',
    tradeoff: 'Cluster memory overhead vs high-throughput parallel map-reduce processing',
    codeSnippet: `val telemetryDF = spark.read.parquet("s3://data-lake/metrics/")
val p99 = telemetryDF.groupBy("region").agg(expr("percentile_approx(latency, 0.99)"))`,
  },
  'Snowflake / BigQuery': {
    complexity: 'O(1) Columnar Storage Parquet Vectorization',
    category: 'Cloud Data Warehousing & Analytics',
    role: 'Enterprise SQL Analytics & Serverless Large-Scale Data Warehousing',
    tradeoff: 'Query compute scanning costs vs lightning-fast analytical ad-hoc aggregations',
    codeSnippet: `SELECT region, APPROX_QUANTILES(p99_latency, 100)[OFFSET(99)] FROM \`analytics.logs\` GROUP BY 1;`,
  },
  'Playwright & Cypress': {
    complexity: 'O(1) Chromium DevTools Protocol (CDP) Control',
    category: 'End-to-End Test Automation',
    role: 'Full Browser Emulation, Mobile Testing, and Regression Prevention',
    tradeoff: 'End-to-end execution time vs 100% confidence in actual user journeys',
    codeSnippet: `test('smooth scroll past skills without sticking', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#skills')).toBeVisible();
});`,
  },
  'Neo4j': {
    complexity: 'O(1) Index-Free Adjacency Pointer Hops',
    category: 'Graph Database Management',
    role: 'Complex Connected Data, Fraud Detection, and Knowledge Graph Lookups',
    tradeoff: 'Unsuited for tabular range scans vs unmatched performance in deep relational graphs',
    codeSnippet: `MATCH (u:User)-[:AUTHORIZES]->(r:Role)-[:HAS_PERMISSION]->(p:Permission)
WHERE u.id = $userId RETURN p.name`,
  },
  'Webpack & Vite': {
    complexity: 'O(1) Native ES Modules (ESM) HMR Update',
    category: 'Module Bundler & Build Tooling',
    role: 'Code Splitting, Tree-Shaking, and Asset Optimization Pipeline',
    tradeoff: 'Configuration complexity vs blazing fast local iteration and micro-bundles',
    codeSnippet: `export default defineConfig({
  plugins: [react()],
  build: { target: 'esnext', rollupOptions: { treeshake: true } }
});`,
  },
};

// Fallback generator for any custom tech
export function getCraftSpec(name: string): CraftSpec {
  return (
    CRAFT_SPECS[name] || {
      complexity: 'O(1) High-Efficiency Execution',
      category: 'Software Engineering Tooling',
      role: 'Production Architecture Component',
      tradeoff: 'Optimized for high-concurrency enterprise workloads',
      codeSnippet: `// Production Component: ${name}\nexport const systemModule = { status: 'OPTIMAL', layer: 'CSE' };`,
    }
  );
}
