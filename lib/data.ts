/**
 * Central content source for the portfolio.
 *
 * Everything visitor-facing is defined here so the site stays content-driven:
 * personal info, navigation, the skill constellation, projects, journey,
 * story-facts and socials. This is the single layer a CMS would write to.
 */

export const personal = {
  name: 'Biswodip Goj',
  firstName: 'Biswodip',
  lastName: 'Goj',
  email: 'biswadipgoj@gmail.com',
  location: 'Uluberia, West Bengal, India',
  education: 'B.Tech CSE (2021–2024) · Diploma in CSE (2018–2021)',
  role: 'Full-Stack Software Engineer',
  aspiration: 'Business-analysis aware',
  tagline: 'Full-stack software, designed and shipped.',
  intro:
    'Full-stack software engineer from West Bengal, India. I build and ship web applications end to end — interfaces, APIs, databases and deployment — with a working interest in the business problems behind them.',
  about:
    'I work across the whole stack: interface, application logic, API and database, then the deployment that puts it in front of people. Across Erpixa, NanoLink, Nexora and the rest of the work here, I have built business tooling, real-time features and data-backed products. I care about clear architecture, typed code and interfaces that hold up under real use, and I am steadily deepening my business-analysis skills alongside engineering.',
} as const;

export const heroCopy = {
  headline: ['Full-stack software,', 'built to ship.'],
  description: personal.intro,
  chips: ['Frontend', 'Backend & APIs', 'Databases', 'Cloud & DevOps'],
  projectCta: 'View the work',
  contactCta: 'Get in touch',
  skipCta: 'Skip to projects',
  rail: 'Frontend · Backend · Data · Infrastructure',
  illustrationNote: 'Illustrative software architecture demo. Not live project telemetry.',
  sceneLabel: 'Architecture demo',
  sourceLabel: 'Example module',
  sourceFile: 'service.ts',
  code: [
    [['tok-com', '// Illustrative architecture example, not project source']],
    [['tok-key', 'async function '], ['tok-fn', 'handleRequest'], ['tok-punc', '(input: '], ['tok-var', 'Request'], ['tok-punc', ') {']],
    [['tok-key', '  const '], ['tok-var', 'data'], ['tok-punc', ' = '], ['tok-fn', 'validate'], ['tok-punc', '('], ['tok-var', 'input'], ['tok-punc', ');']],
    [['tok-key', '  const '], ['tok-var', 'saved'], ['tok-punc', ' = '], ['tok-key', 'await '], ['tok-fn', 'persist'], ['tok-punc', '('], ['tok-var', 'data'], ['tok-punc', ');']],
    [['tok-key', '  return '], ['tok-fn', 'respond'], ['tok-punc', '('], ['tok-var', 'saved'], ['tok-punc', ');']],
    [['tok-punc', '}']],
  ],
  terminal: [
    { text: '$ run service --check', cls: '' },
    { text: 'demo: validate incoming payload', cls: 'term-hi' },
    { text: 'demo: persist to database', cls: '' },
    { text: 'demo: return typed response', cls: '' },
    { text: 'Illustration only; no live service executed.', cls: '' },
  ],
  modules: [
    { name: 'interface', width: '88%', color: '#7c3aed' },
    { name: 'api', width: '76%', color: '#0f766e' },
    { name: 'database', width: '68%', color: '#9d174d' },
    { name: 'deploy', width: '84%', color: '#1d4ed8' },
  ],
} as const;

export const processCopy = {
  eyebrow: 'How I approach a build',
  title: 'From requirement to running software.',
  note: 'A working engineering approach, described honestly.',
  stages: [
    { title: 'Understand', body: 'Start from the requirement and the people who will use it. Pin down what the system must actually do.', code: 'requirement -> scope' },
    { title: 'Architect', body: 'Decide the data model, the API surface and the boundaries between client, server and storage.', code: 'scope -> design' },
    { title: 'Build', body: 'Implement with typed code, reviewable components and tests on the paths that matter most.', code: 'design -> implementation' },
    { title: 'Ship', body: 'Deploy, watch how it behaves in real use, and iterate on what the users and the data tell you.', code: 'build -> deploy -> iterate' },
  ],
} as const;

/**
 * Story-facts — the numbers that matter, told as a story
 * (no dry percentages, no spec-sheet stats).
 */
export const facts = [
  { figure: '5', label: 'Shipped projects', detail: 'full-stack web applications, deployed and live' },
  { figure: '3', label: 'Full-stack layers', detail: 'frontend, backend and databases, plus deployment' },
  { figure: '2', label: 'CSE qualifications', detail: 'a diploma, then a B.Tech on top' },
  { figure: '5', label: 'Live deployments', detail: 'every project here runs in production' },
] as const;

export const nav = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Work' },
  { id: 'impact', label: 'Impact' },
  { id: 'journey', label: 'Journey' },
  { id: 'pipeline', label: 'Process' },
  { id: 'contact', label: 'Contact' },
] as const;

/** Impact / value highlights shown before the final CTA. */
export type Impact = {
  metric: string;
  title: string;
  body: string;
  accent: string;
};

export const impacts: Impact[] = [
  {
    metric: 'Architecture',
    title: 'Design before code',
    body: 'Decide the data model, the API boundaries and the component structure before reaching for a library.',
    accent: '#22d3ee',
  },
  {
    metric: 'Reliability',
    title: 'Typed, tested, reviewable',
    body: 'TypeScript across the stack, tests on the paths that matter, and code another engineer can pick up.',
    accent: '#8b5cf6',
  },
  {
    metric: 'Delivery',
    title: 'Ship, then iterate',
    body: 'Deploy it, watch how real usage behaves, and improve from evidence rather than assumptions.',
    accent: '#f472b6',
  },
];

/**
 * The tech stack — real CSE tools, organized into four layers.
 * Each carries a `vibe`: the honest, human line for how that tool and I get along.
 */
export type Craft = {
  name: string;
  vibe: string;
  color: string;
  icon: string; // emoji / short symbol for the floating badge
};

export type Orbit = {
  ring: string;
  caption: string;
  tint: string;
  crafts: Craft[];
};

const skillCatalogue: Orbit[] = [
  {
    ring: 'Frontend',
    caption: 'Pixel-perfect interfaces, reactive UIs, and immersive 3D experiences',
    tint: 'from-aurora-cyan to-aurora-blue',
    crafts: [
      { name: 'React & Next.js', vibe: 'Home turf. SSR, SSG, RSC — all of it.', color: '#22d3ee', icon: '⚛️' },
      { name: 'TypeScript', vibe: 'Typed or it didn\'t ship. Full stop.', color: '#3b82f6', icon: 'TS' },
      { name: 'Tailwind CSS', vibe: 'Design-system speed with total control.', color: '#38bdf8', icon: '🌊' },
      { name: 'Three.js / WebGL', vibe: 'Turns a browser into an immersive world.', color: '#8b5cf6', icon: '🧊' },
      { name: 'Framer Motion', vibe: 'Every UI deserves to feel alive.', color: '#f472b6', icon: '✨' },
      { name: 'Redux & Zustand', vibe: 'Global state managed with precision.', color: '#e34f26', icon: '📦' },
      { name: 'Vue.js & Nuxt', vibe: 'Versatile, reactive, and highly expressive.', color: '#34d399', icon: '🟢' },
      { name: 'SvelteKit', vibe: 'Zero-runtime overhead. Pure speed.', color: '#e34f26', icon: '🔥' },
      { name: 'WebSockets & RTC', vibe: 'Real-time collaborative interfaces.', color: '#fbbf24', icon: '⚡' },
      { name: 'Micro-frontends', vibe: 'Decoupled UI architecture at scale.', color: '#a78bfa', icon: '🧩' },
      { name: 'Storybook', vibe: 'UI component driven development.', color: '#f472b6', icon: '📖' },
      { name: 'GSAP', vibe: 'High-performance complex animations.', color: '#34d399', icon: '🎬' },
    ],
  },
  {
    ring: 'Backend & APIs',
    caption: 'Scalable server-side systems, real-time data, and clean REST/GraphQL contracts',
    tint: 'from-aurora-violet to-aurora-pink',
    crafts: [
      { name: 'Node.js & Express', vibe: 'Fast, event-driven, production-proven.', color: '#34d399', icon: '🟢' },
      { name: 'Python & FastAPI', vibe: 'Async, typed, and stupidly fast to build.', color: '#fbbf24', icon: '🐍' },
      { name: 'REST & GraphQL', vibe: 'Fluent in every flavour of API design.', color: '#a78bfa', icon: '🔗' },
      { name: 'Kafka & RabbitMQ', vibe: 'Asynchronous, event-driven messaging.', color: '#22d3ee', icon: '⚡' },
      { name: 'JWT & OAuth2', vibe: 'Auth done right — secure, stateless, clean.', color: '#f472b6', icon: '🔐' },
      { name: 'Microservices', vibe: 'Decoupled services that scale independently.', color: '#2496ed', icon: '🧩' },
      { name: 'Go (Golang)', vibe: 'High concurrency, compiled, brutal performance.', color: '#22d3ee', icon: '🐹' },
      { name: 'Rust', vibe: 'Memory safety without garbage collection.', color: '#e34f26', icon: '🦀' },
      { name: 'Spring Boot', vibe: 'Enterprise-grade Java backend architecture.', color: '#34d399', icon: '🍃' },
      { name: 'gRPC & Protobuf', vibe: 'Ultra-fast inter-service communication.', color: '#3b82f6', icon: '🚄' },
      { name: 'Serverless / Lambdas', vibe: 'Infinite scale, zero maintenance.', color: '#fbbf24', icon: '☁️' },
      { name: 'Web3 & Contracts', vibe: 'Decentralized protocol integrations.', color: '#8b5cf6', icon: '⛓️' },
    ],
  },
  {
    ring: 'DevOps & Cloud',
    caption: 'From local machine to global infrastructure — automated all the way',
    tint: 'from-[#2496ed] to-aurora-violet',
    crafts: [
      { name: 'Docker & Compose', vibe: 'Containers: the great environment equalizer.', color: '#2496ed', icon: '🐳' },
      { name: 'CI/CD Pipelines', vibe: 'Push → test → deploy. Automated. Always.', color: '#f472b6', icon: '⚙️' },
      { name: 'AWS & Cloudflare', vibe: 'Architecting scalable cloud infrastructure.', color: '#a78bfa', icon: '☁️' },
      { name: 'Kubernetes (K8s)', vibe: 'Orchestrating robust, self-healing clusters.', color: '#22d3ee', icon: '☸️' },
      { name: 'Linux & Shell', vibe: 'SSH in, fix it, ship it. No GUI needed.', color: '#fbbf24', icon: '🐧' },
      { name: 'Nginx & Proxy', vibe: 'The gateway that keeps everything running.', color: '#34d399', icon: '🌐' },
      { name: 'Terraform & IaC', vibe: 'Infrastructure defined entirely as code.', color: '#8b5cf6', icon: '🏗️' },
      { name: 'GCP & Azure', vibe: 'Multi-cloud strategy and deployment.', color: '#3b82f6', icon: '☁️' },
      { name: 'Grafana & Metrics', vibe: 'System observability and live analytics.', color: '#f472b6', icon: '📊' },
      { name: 'ArgoCD', vibe: 'GitOps continuous delivery for Kubernetes.', color: '#2496ed', icon: '🐙' },
      { name: 'Jenkins & GitLab', vibe: 'Enterprise automation and delivery.', color: '#e34f26', icon: '🤖' },
      { name: 'Ansible', vibe: 'Configuration management at scale.', color: '#22d3ee', icon: '📜' },
    ],
  },
  {
    ring: 'Data & Tooling',
    caption: 'Databases, testing, and the tools that keep codebases healthy and fast',
    tint: 'from-aurora-emerald to-aurora-gold',
    crafts: [
      { name: 'PostgreSQL & MySQL', vibe: 'Relational data — indexed, trusted, fast.', color: '#34d399', icon: '🗄️' },
      { name: 'MongoDB & Redis', vibe: 'Document stores and blazing-fast caching.', color: '#fbbf24', icon: '🍃' },
      { name: 'Prisma & Drizzle', vibe: 'Type-safe ORM — database as code.', color: '#8b5cf6', icon: '💎' },
      { name: 'Jest & Vitest', vibe: 'Tests that catch bugs before users do.', color: '#f472b6', icon: '🧪' },
      { name: 'Git & Monorepos', vibe: 'Every commit tells a story. Mine are clean.', color: '#22d3ee', icon: '🌿' },
      { name: 'System Architecture', vibe: 'Designing for high availability and scale.', color: '#e34f26', icon: '📐' },
      { name: 'Elasticsearch', vibe: 'High-speed search and log aggregation.', color: '#22d3ee', icon: '🔍' },
      { name: 'Apache Spark', vibe: 'Big data processing and analytics.', color: '#f472b6', icon: '⚡' },
      { name: 'Snowflake / BigQuery', vibe: 'Cloud data warehousing architecture.', color: '#3b82f6', icon: '❄️' },
      { name: 'Playwright & Cypress', vibe: 'End-to-end testing for critical paths.', color: '#34d399', icon: '🎭' },
      { name: 'Neo4j', vibe: 'Graph databases for complex relationships.', color: '#a78bfa', icon: '🕸️' },
      { name: 'Webpack & Vite', vibe: 'Lightning fast bundlers and build tools.', color: '#fbbf24', icon: '⚡' },
    ],
  },
];

// Narrative order: Frontend -> Backend & APIs -> DevOps & Cloud -> Data & Tooling.
export const constellation: Orbit[] = [skillCatalogue[0], skillCatalogue[1], skillCatalogue[2], skillCatalogue[3]];

/** Areas represented in the portfolio. */
export const shipped = [
  'Interfaces',
  'APIs',
  'Databases',
  'Real-time features',
  'Dashboards',
  'Deployment',
  'Design systems',
  'Testing',
];

export type Project = {
  name: string;
  blurb: string;
  description: string;
  url: string;
  repo?: string;
  accent: string;
  accentSoft: string;
  tags: string[];
  features: string[];
  previewImage?: string;
  embedAllowed?: boolean;
  techStack?: string[];
};

const projectCatalogue: Project[] = [
  {
    name: 'Erpixa',
    blurb: 'Business management, finally without the bloat.',
    description:
      'A modular, open-source ERP platform built for small and mid-sized businesses that are tired of paying for features they never touch. Erpixa onboards your team, detects your business type, and assembles a custom workspace — CRM, Sales, Inventory, Accounting, HR, Projects, Manufacturing, Helpdesk, Marketing — activating only what you actually need. Backed by Postgres Row-Level Security for true multi-tenant data isolation and a live KPI engine that computes every metric from real data, never from mocks.',
    url: 'https://erpixa.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/Erpixa',
    accent: '#8b5cf6',
    accentSoft: 'rgba(139,92,246,0.16)',
    previewImage: '/previews/erpixa.webp',
    tags: ['Modular by design', 'Tenant-safe data', 'Live on the internet'],
    features: [
      '9 business modules activated per business type',
      'Postgres RLS — tenant isolation at the database layer',
      'KPI engine computed from stored records',
      'React 19 + TypeScript + Supabase serverless stack',
    ],
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
  },
  {
    name: 'TelePoint',
    blurb: 'Real-time communication, reimagined.',
    description:
      'A sleek communication platform focused on instant, friction-free connection. Built for speed with a modern reactive stack and a clean, responsive interface that works everywhere.',
    url: 'https://telepoint-topaz.vercel.app/',
    accent: '#22d3ee',
    accentSoft: 'rgba(34,211,238,0.16)',
    previewImage: '/previews/telepoint.webp',
    tags: ['Instant by design', 'Feels native everywhere', 'Live on the internet'],
    features: [
      'Instant, low-latency interactions',
      'Modern reactive component architecture',
      'Mobile-first responsive layout',
      'Live deployment you can try',
    ],
    techStack: ['Next.js', 'WebSockets', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Tripmate',
    blurb: 'Plan journeys that feel effortless.',
    description:
      'A travel planning experience that turns scattered ideas into a clear, beautiful itinerary. Thoughtful flows, smooth transitions and a focus on getting people from idea to plan fast.',
    url: 'https://trip-mu-coral.vercel.app/',
    accent: '#f472b6',
    accentSoft: 'rgba(244,114,182,0.16)',
    tags: ['Idea → itinerary', 'Designed to delight', 'Live on the internet'],
    features: [
      'Guided, friction-free planning flow',
      'Clean, content-first interface',
      'Smooth, considered transitions',
      'Live deployment you can try',
    ],
    previewImage: '/previews/tripmate.webp',
    techStack: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    name: 'NanoLink',
    blurb: 'Shorten any link. Share it anywhere.',
    description:
      'A fast, smart URL shortener built for product engineers. Paste a long link, get a clean short one in one click — with password-protected links, expiry and burn-after-read, custom aliases instead of random codes, and per-link click analytics from a real dashboard.',
    url: 'https://nanl.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/nl',
    accent: '#34d399',
    accentSoft: 'rgba(52,211,153,0.16)',
    previewImage: '/previews/nanolink.webp',
    tags: ['Privacy-first links', 'Analytics built in', 'Live on the internet'],
    features: [
      'Password protection, expiry & burn-after-read',
      'Custom aliases instead of random codes',
      'Per-link click analytics dashboard',
      'Free, no account needed to start',
      'Next.js + Prisma + PostgreSQL stack',
    ],
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Nexora',
    blurb: 'Plan the work, watch it move, finish it together.',
    description:
      'A calm command center for planning, tracking and shipping work. Board, list and personal task views, a keyboard-first command palette (⌘K), drag-to-move cards with live column counts, and instant multi-user sync — isolated per workspace, running on web, Windows and Android.',
    url: 'https://nexora-xi-rust.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/nexora',
    accent: '#fbbf24',
    accentSoft: 'rgba(251,191,36,0.16)',
    previewImage: '/previews/nexora.webp',
    tags: ['Kanban that moves fast', 'Keyboard-first', 'Live on the internet'],
    features: [
      'Board, list and personal task views',
      'Command palette — plan without touching the mouse',
      'Instant multi-user sync, isolated per workspace',
      'Runs on web, Windows and Android',
      'Next.js + TypeScript + Supabase stack',
      'Electron for Windows; Capacitor for Android',
    ],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
  },
];

// Business-data work leads the list; interface-led projects follow.
export const projects: Project[] = [
  projectCatalogue[0], // Erpixa
  projectCatalogue[3], // NanoLink
  projectCatalogue[4], // Nexora
  projectCatalogue[1], // TelePoint
  projectCatalogue[2], // Tripmate
];


export type JourneyStep = {
  year: string;
  title: string;
  body: string;
  accent: string;
};

export const journey: JourneyStep[] = [
  {
    year: '2018 – 2021',
    title: 'Diploma in Computer Science & Engineering',
    body: 'Where it began. Three years of fundamentals — programming, systems and the thrill of watching an idea turn into something you can actually click.',
    accent: '#22d3ee',
  },
  {
    year: '2021 – 2024',
    title: 'B.Tech in Computer Science & Engineering',
    body: 'Levelled up from diploma to B.Tech, going deeper into engineering while shipping working software for real people — deploying, maintaining and iterating on live products.',
    accent: '#8b5cf6',
  },
  {
    year: '2024',
    title: 'B.Tech CSE, complete',
    body: 'Graduated and went all-in as an independent developer, building and shipping real solutions end to end.',
    accent: '#34d399',
  },
  {
    year: 'Now',
    title: 'Engineer + analyst',
    body: 'Pairing hands-on engineering with business analysis — translating real-world problems into software that moves the needle.',
    accent: '#fbbf24',
  },
];

export const socials = [
  { label: 'GitHub', handle: '@Biswadipgoj', url: 'https://github.com/Biswadipgoj' },
  { label: 'Email', handle: personal.email, url: `mailto:${personal.email}` },
  { label: 'Location', handle: 'Uluberia, WB, India', url: 'https://maps.google.com/?q=Uluberia,West+Bengal,India' },
];

export const github = {
  username: 'Biswadipgoj',
  url: 'https://github.com/Biswadipgoj',
  blurb: 'Open source, experiments and the projects behind the products. Everything I build lives here.',
};

export const experienceCopy = {
  about: {
    title: 'Context, discipline and how I think about software.',
  },
  skills: {
    title: 'Frontend, backend, data and infrastructure.',
    description:
      'The full stack I work across — the interfaces, APIs, databases and deployment tooling behind the applications on this page.',
  },
  projects: {
    title: 'Selected builds, shipped and live.',
    description:
      'Five independent applications. Each one is deployed and each one solved a different kind of problem.',
  },
  github: {
    title: 'Code is open by default. The work speaks for itself.',
    link: 'Explore my GitHub',
  },
  journey: {
    title: 'From diploma fundamentals to real builds.',
    description: 'A timeline of deliberate practice, continuous learning, and hands-on delivery.',
  },
  impact: {
    title: 'How I engineer.',
    description: 'The principles that shape how the software gets designed, built and shipped.',
  },
  contact: {
    title: 'Let’s build something that ships.',
    description:
      'A full-stack build, a frontend problem, an API, a database-backed application or an internal tool — tell me what you are trying to build.',
    formNote: 'I typically respond within 24 hours.',
  },
  boot: [
    'Loading portfolio...',
    'Preparing projects...',
    'Almost ready...',
  ],
};

