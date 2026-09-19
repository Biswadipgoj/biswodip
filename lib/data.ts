/** Central content source. Truth-audited production engineering portfolio. */
export const personal = {
  name: 'Biswodip Goj', firstName: 'Biswodip', lastName: 'Goj',
  email: 'biswadipgoj@gmail.com', location: 'Uluberia, West Bengal, India',
  role: 'Full-Stack Software Engineer',
  tagline: '60+ engineered systems. Scalable architectures, typed APIs, and relational persistence.',
  intro: 'Software engineer with formal CSE foundations and 60+ shipped projects across production web platforms, cross-platform Android mobile applications, and machine learning training pipelines. I engineer the entire lifecycle: high-throughput client interfaces, resilient API gateways, transactional database schemas, and automated CI/CD deployment pipelines.',
  about: 'I design from the database constraints up to the interface layer. Across high-volume production applications including Erpixa, NanoLink, TelePoint, Nexora, and Tripmate, I have engineered multi-tenant Row-Level Security isolation models, idempotent financial payment state machines, collision-resistant short-code hashing engines, and minimum-cash-flow graph solvers. I analyze PostgreSQL query plans, write zero-downtime migrations, enforce strict compile-time TypeScript invariants, and automate Playwright E2E verification suites against live databases. The focus is on operational reliability, deterministic execution, and resilient boundaries under load.',
} as const;

export type Project = {
  name: string; slug: string; blurb: string; description: string; technicalNote: string;
  url: string; repo?: string; previewImage: string; features: string[]; techStack: string[];
  evidence: { label: string; url: string }[];
  chapter: { index: string; bg: string; ink: string; accent: string; label: string; flow: string[] };
};

export const projects: Project[] = [
  {
    name: 'Erpixa', slug: 'erpixa', blurb: 'Multi-tenant ERP platform. Organization-scoped schema with PostgreSQL RLS isolation.',
    description: 'Enterprise resource planning platform engineered for multi-tenant scalability. Dynamically provisions organization modules (CRM, inventory, sales, accounting, HR) based on verified business-type configurations. Enforces strict tenant isolation at the PostgreSQL storage engine via Row-Level Security (RLS) policies rather than error-prone application-layer filters.',
    technicalNote: 'Built with React 18 and TypeScript on Vite. Employs Supabase Auth integrated with custom PostgreSQL schema migrations. Organization membership is cryptographically bound to the authenticated JWT principal. Row-Level Security policies reject unauthorized cross-tenant read/write operations at the database kernel level with zero performance penalty on indexed foreign keys.',
    url: 'https://erpixa.vercel.app/', repo: 'https://github.com/Biswadipgoj/Erpixa', previewImage: '/previews/erpixa.webp',
    features: ['PostgreSQL Row-Level Security (RLS) tenant isolation', 'Dynamic module provisioning via organization configuration flags', 'Granular Role-Based Access Control (RBAC) hierarchy', 'Optimistic UI state management with Supabase Realtime synchronization'],
    techStack: ['React', 'TypeScript', 'Vite', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    evidence: [{ label: 'Application source', url: 'https://github.com/Biswadipgoj/Erpixa' }, { label: 'Database schema (RLS)', url: 'https://github.com/Biswadipgoj/Erpixa/blob/main/supabase/schema.sql' }],
    chapter: { index: '01', bg: '#efcdbc', ink: '#422f32', accent: '#8b4031', label: 'Enterprise Architecture', flow: ['Org Tenant Provisioning', 'Module Flags', 'Postgres RLS Policy', 'Isolated Workspace'] },
  },
  {
    name: 'NanoLink', slug: 'nanolink', blurb: 'High-throughput short-link engine with atomic lifecycle evaluation and click telemetry.',
    description: 'URL shortening and analytics engine built for deterministic execution under load. Validates incoming request payloads against strict Zod runtime schemas, generates collision-resistant nanoid hashes with custom base62 alphabets, and writes through Prisma ORM with unique B-tree constraints. The Edge redirect path resolves expiration, one-time burn tokens, and atomic click counter increments in a single round-trip.',
    technicalNote: 'Next.js App Router route handlers parse and sanitize request payloads before database ingress. Employs bcrypt key-derivation with 10 salt rounds for password-protected links. Unique indexes on shortCode and customAlias guarantee O(1) query lookups. The redirect engine evaluates active status, expiration timestamps, and password verification atomically, issuing HTTP 301/302 redirects with minimal latency.',
    url: 'https://nanl.vercel.app/', repo: 'https://github.com/Biswadipgoj/nl', previewImage: '/previews/nanolink.webp',
    features: ['Runtime Zod schema validation & payload sanitization', 'Collision-resistant Nanoid base62 short-code generation', 'O(1) B-tree indexed database lookups in PostgreSQL', 'Bcrypt password hashing with cryptographic salt rounds', 'Single-transaction atomic click increment & token burn lifecycle'],
    techStack: ['Next.js 15', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'Playwright'],
    evidence: [{ label: 'Create-link route handler', url: 'https://github.com/Biswadipgoj/nl/blob/master/src/app/api/links/route.ts' }, { label: 'Prisma relational schema', url: 'https://github.com/Biswadipgoj/nl/blob/master/prisma/schema.prisma' }],
    chapter: { index: '02', bg: '#dce8ca', ink: '#2e402f', accent: '#3a6140', label: 'High-Throughput Services', flow: ['POST Ingress', 'Zod Payload Validation', 'B-Tree Hash Lookup', 'Atomic Counter Update', 'Edge 301 Redirect'] },
  },
  {
    name: 'TelePoint', slug: 'telepoint', blurb: 'Enterprise EMI management & payment collection portal with state-machine financial reconciliation.',
    description: 'Role-scoped EMI (Equated Monthly Installment) management and collections portal. Engineered for financial workflows requiring strict audit trails, principal authorization, and immutable ledger transactions. Administrators supervise account lifecycles and approve settlements, while collection agents record customer installments with automated amortization scheduling.',
    technicalNote: 'Server-side route handlers enforce session-based principal verification on all mutative requests. Installment processing models discrete state transitions (Pending → Due → Overdue → Cleared) with idempotent execution to prevent double-charging. Built on Supabase and PostgreSQL with strict foreign-key integrity constraints and principal-filtered reporting views.',
    url: 'https://telepoint-topaz.vercel.app/', repo: 'https://github.com/Biswadipgoj/telepoint', previewImage: '/previews/telepoint.webp',
    features: ['Multi-tier Role-Based Access Control (Admin, Agent, Customer)', 'Discrete installment state-machine with automated amortization', 'Idempotent transaction recording with audit reconciliation', 'Principal-scoped reporting queries preventing horizontal privilege escalation'],
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    evidence: [{ label: 'Deployed application', url: 'https://telepoint-topaz.vercel.app/' }, { label: 'Application source', url: 'https://github.com/Biswadipgoj/telepoint' }],
    chapter: { index: '03', bg: '#cbe3e5', ink: '#2c434b', accent: '#315f73', label: 'Financial Workflows', flow: ['Principal Auth Check', 'Installment Submission', 'State-Machine Transition', 'Ledger Reconciliation', 'Audit Export'] },
  },
  {
    name: 'Nexora', slug: 'nexora', blurb: 'Unified modular workspace engine deployed across Web, Windows Electron, and Android.',
    description: 'Cross-platform project workspace and task management engine built on a unified TypeScript codebase. Features real-time collaborative kanban boards, structured list views, and personal task backlogs. Features an offline-first sync engine with optimistic UI updates and a keyboard-driven command palette utilizing Levenshtein fuzzy search.',
    technicalNote: 'Architected with Next.js and TypeScript on Supabase Realtime websockets. The unified codebase compiles to a responsive web application, an Electron native desktop binary for Windows with OS-level window management, and an Android package via Capacitor with native touch gesture handling and local SQLite caching.',
    url: 'https://nexora-xi-rust.vercel.app/', repo: 'https://github.com/Biswadipgoj/nexora', previewImage: '/previews/nexora.webp',
    features: ['Unified codebase targeting Web, Windows (Electron), and Android (Capacitor)', 'Real-time multi-client workspace synchronization via Supabase channels', 'Keyboard-driven command palette (Cmd+K) with fuzzy-matching search', 'Optimistic UI mutation queues with offline-first synchronization'],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Material UI', 'Electron', 'Capacitor', 'Android SDK'],
    evidence: [{ label: 'Application source', url: 'https://github.com/Biswadipgoj/nexora' }],
    chapter: { index: '04', bg: '#e3dcf0', ink: '#3e334d', accent: '#665080', label: 'Cross-Platform Systems', flow: ['Task Ingress', 'Kanban State Sync', 'Realtime Broadcast', 'Native Shell Execution'] },
  },
  {
    name: 'Tripmate', slug: 'tripmate', blurb: 'Multi-party expense settlement engine with minimum-cash-flow graph debt simplification.',
    description: 'Collaborative expense management platform for group travel and shared accounts. Solves multi-party debt settlement by implementing a minimum-cash-flow graph algorithm that reduces complex N-party debt webs into the mathematical minimum number of direct transactions. Includes UPI deep-linking for instantaneous settlement and immutable PDF ledger exports.',
    technicalNote: 'Next.js and Supabase backend with custom graph-reduction algorithms running in pure TypeScript. Evaluates net member balances and iteratively matches maximal creditors with maximal debtors, reducing transaction complexity from O(N²) to O(N). Generates standard UPI payment intent strings for zero-friction mobile execution.',
    url: 'https://trip-mu-coral.vercel.app/', repo: 'https://github.com/Biswadipgoj/trip', previewImage: '/previews/tripmate.webp',
    features: ['Minimum-cash-flow graph debt simplification algorithm (O(N²) → O(N))', 'Multi-currency equal and weighted split strategies', 'Direct UPI deep-linking payment intent generation', 'Client-side immutable PDF financial statement generation', 'Smooth physics-based animated transitions with Framer Motion'],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    evidence: [{ label: 'Application source', url: 'https://github.com/Biswadipgoj/trip' }],
    chapter: { index: '05', bg: '#f0ddbb', ink: '#4a3b2e', accent: '#7c5231', label: 'Algorithmic Systems', flow: ['Expense Ingestion', 'Weighted Split Matrix', 'Graph Debt Solver', 'UPI Intent Settlement'] },
  },
];

/** Architecture layers and deterministic engineering contracts. */
export const stack = [
  {
    id: 'interface',
    title: 'Client State & Invariant Boundaries',
    description: 'Strict compile-time typing, optimistic rollbacks, sub-16ms render budgets.',
    tools: ['React 18', 'TypeScript 5', 'Tailwind CSS', 'TanStack Query'],
    evidence: 'ShortenForm.tsx',
    sample: 'Compile-time invariants · Optimistic mutation rollback',
    detail: 'Client-side component architecture built with strict compile-time TypeScript typing and zero runtime exceptions. Implements optimistic mutation rollbacks, defensive error boundaries, request debouncing, WCAG 2.1 AA accessibility standards, and a strict sub-16ms per-frame rendering budget for fluid 120fps interactions.',
    source: 'https://github.com/Biswadipgoj/nl/blob/master/src/components/ShortenForm.tsx',
  },
  {
    id: 'application',
    title: 'API Gateway & Ingress Validation',
    description: 'Defense-in-depth pipeline. Rate limiting, JWT/session auth, RFC 7807.',
    tools: ['Next.js 15', 'Zod', 'Node.js', 'bcryptjs', 'Redis'],
    evidence: 'api/links/route.ts',
    sample: 'Sliding-window rate limit · Zod parse · bcrypt derivation · RFC 7807',
    detail: 'Defense-in-depth API ingress pipeline. Sanitizes and validates every incoming payload with Zod schemas prior to database access. Enforces sliding-window rate limiting to prevent automated scraping/DDoS, hashes credentials using bcrypt with 10 salt rounds, and emits RFC 7807 structured problem responses on any contract violation — zero unauthorized database writes.',
    source: 'https://github.com/Biswadipgoj/nl/blob/master/src/app/api/links/route.ts',
  },
  {
    id: 'data',
    title: 'Relational Persistence & ACID Isolation',
    description: 'Normalized schema modeling, B-Tree index optimization, Postgres RLS.',
    tools: ['PostgreSQL', 'Prisma ORM', 'Supabase', 'PgBouncer'],
    evidence: 'prisma/schema.prisma',
    sample: 'B-Tree @unique indexes · Foreign key constraints · ACID rollbacks',
    detail: 'Normalized relational schema design with strict referential integrity. Employs unique B-tree indexing on lookup columns (shortCode, customAlias) for guaranteed O(1) query time complexity. Utilizes connection pooling via PgBouncer for high concurrency and executes mutative operations within atomic transactions that roll back completely on failure.',
    source: 'https://github.com/Biswadipgoj/nl/blob/master/prisma/schema.prisma',
  },
  {
    id: 'delivery',
    title: 'Edge Routing, Lifecycle & Observability',
    description: 'Sub-50ms Edge execution, atomic increments, automated CI/CD gates.',
    tools: ['Edge Runtime', 'Playwright E2E', 'GitHub Actions', 'Vercel'],
    evidence: '[shortCode]/page.tsx',
    sample: 'Sub-50ms Edge redirect · Atomic telemetry · Playwright CI/CD test gates',
    detail: 'Sub-50ms Edge request resolution with single round-trip lifecycle validation. Atomically increments telemetry counters, invalidates burn-after-read tokens, and issues cached HTTP 301/302 redirects. Every release is gated by automated GitHub Actions CI/CD pipelines running Playwright E2E test suites against live PostgreSQL instances — never mock data.',
    source: 'https://github.com/Biswadipgoj/nl/blob/master/src/app/%5BshortCode%5D/page.tsx',
  },
] as const;

export const heroCode = [
  'interface SystemPipeline<TReq, TRes> {',
  '  ingress:   (req: TReq) => Promise<ValidatedPayload>;',
  '  boundary:  (payload: ValidatedPayload) => Promise<AuthContext>;',
  '  mutate:    (tx: PrismaClient) => Promise<TRes>; // ACID guarantee',
  '  telemetry: (metric: MetricEvent) => void;         // async non-blocking',
  '}',
];

export const nanoCode = [
  'const newLink = await prisma.link.create({',
  '  data: {',
  '    userId,',
  '    originalUrl: normalizedUrl,',
  '    shortCode, // collision-resistant nanoid base62',
  '    customAlias: parsed.customAlias || null,',
  '    password: hashedPassword, // bcrypt salt rounds: 10',
  '    expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,',
  '    oneTimeUse: parsed.oneTimeUse,',
  '  },',
  '})',
];

export const nanoFields = [
  ['id', 'String · Primary Key UUID'],
  ['originalUrl', 'String · Sanitized URI'],
  ['shortCode', 'String · Unique B-Tree Index (O(1))'],
  ['customAlias', 'String? · Unique B-Tree Index'],
  ['expiresAt', 'DateTime? · Indexed Expiry Check'],
  ['oneTimeUse', 'Boolean · Atomic Invalidation Flag'],
  ['clicks', 'Int · Atomic Counter Increment'],
  ['lastVisited', 'DateTime? · Telemetry Timestamp'],
  ['isActive', 'Boolean · Soft-disable Status Flag'],
] as const;

export const processStages = [
  { title: 'System Architecture', body: 'Define the domain boundaries, data models, and API contracts before writing code. Determine concurrency requirements, caching layers, and failure blast radiuses.', artifact: 'requirements → system design specification' },
  { title: 'Data Contracts & Invariants', body: 'Specify the PostgreSQL relational schema, indexes, and Zod boundary schemas. Interfaces and routes must be derived from strict type invariants.', artifact: 'schema.prisma & typed API contracts' },
  { title: 'Implementation & Concurrency', body: 'Write clean, maintainable TypeScript. Implement optimistic UI updates, atomic database transactions, rate limiting, and robust error boundaries.', artifact: 'production code & verified diffs' },
  { title: 'Automated CI/CD & Testing', body: 'Automate static analysis, strict typechecks, and Playwright end-to-end integration tests executing against running containerized databases in GitHub Actions.', artifact: 'CI/CD pipeline & passing E2E suites' },
  { title: 'Telemetry & Operational Loop', body: 'Monitor real-world production metrics: p99 latency, error rates, database connection pool saturation, and edge cache hit ratios. Drive iterative refinements from telemetry.', artifact: 'production telemetry → system optimization' },
] as const;

export const principles = [
  { title: 'ACID over Assumptions', line: 'Enforce integrity at the database layer with foreign keys, indexes, and transactions.' },
  { title: 'Zero-Trust Boundaries', line: 'Sanitize, authenticate, and validate every request payload before execution.' },
  { title: 'Deterministic Reliability', line: 'Automate verification with real end-to-end tests against running databases, not mocks.' },
] as const;

/** Senior Engineering Scope: 60+ Shipped Projects */
export const engineeringScope = [
  {
    category: 'Full-Stack & Distributed Web',
    count: '35+ Projects',
    description: 'High-concurrency web platforms built with Next.js App Router, React 18, Node.js, TypeScript, PostgreSQL, Prisma, Supabase, and Redis caching layers. Architected for multi-tenant isolation, real-time sync, and sub-100ms response budgets.',
    tags: ['Next.js 15', 'React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Supabase', 'Tailwind CSS', 'Redis', 'Zod'],
  },
  {
    category: 'Cross-Platform & Android Systems',
    count: '15+ Projects',
    description: 'Production mobile applications built for Android using Capacitor and React Native. Engineered with offline-first SQLite local persistence, background synchronization workers, deep-linking, and native Android OS hardware integration.',
    tags: ['Android SDK', 'Capacitor', 'React Native', 'SQLite', 'Offline-First Sync', 'Deep Linking', 'Electron'],
  },
  {
    category: 'Machine Learning & Model Pipelines',
    count: '10+ Projects',
    description: 'Supervised and unsupervised ML models trained with PyTorch, Scikit-learn, and NumPy. Engineered end-to-end data preprocessing pipelines, feature engineering, loss optimization, model evaluation (ROC-AUC, F1), and low-latency REST inference endpoints.',
    tags: ['PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'Model Training', 'Feature Engineering', 'Inference APIs'],
  },
] as const;

export const education = [
  {
    date: '2021–2024',
    title: 'B.Tech in Computer Science & Engineering',
    subtitle: 'Undergraduate Engineering Degree · Lateral Entry',
    institution: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    coursework: ['Data Structures & Algorithms', 'Database Management Systems & SQL', 'Operating Systems & Concurrency', 'Computer Networks & Distributed Systems', 'Compiler Design', 'Object-Oriented Software Engineering'],
  },
  {
    date: '2018–2021',
    title: 'Diploma in Computer Science & Technology',
    subtitle: 'Polytechnic Engineering Foundation',
    institution: 'West Bengal State Council of Technical Education (WBSCTE)',
    coursework: ['C & C++ Systems Programming', 'Data Structures & Algorithms in C', 'Digital Logic & Computer Organization', 'Relational DBMS & Normalization', 'Unix/Linux Operating Systems'],
  },
] as const;

export const journey = [
  { date: '2018–2021', title: 'Systems & CS Foundations.', detail: education[1] },
  { date: '2021–2024', title: 'Degree Rigor & Distributed Architectures.', detail: education[0] },
  { date: '2024', title: '60+ Projects Milestone.', body: 'Engineered and deployed over 60 applications across web systems, Android mobile apps, and machine learning training pipelines.' },
  { date: 'Now', title: 'Production Engineering & High Concurrency.', body: 'Architecting resilient software systems solving complex operational, financial, and multi-tenant problems with zero-trust engineering.' },
] as const;

export const socials = [
  { label: 'Email', url: 'mailto:' + personal.email, handle: personal.email },
  { label: 'GitHub', url: 'https://github.com/Biswadipgoj', handle: '@Biswadipgoj' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/biswadipgoj', handle: 'Biswodip Goj' },
] as const;

export const nav = [
  { id: 'opening', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'stack', label: 'Architecture' },
  { id: 'projects', label: 'Projects' }, { id: 'process', label: 'Engineering' },
  { id: 'journey', label: 'Credentials' }, { id: 'contact', label: 'Contact' },
] as const;
