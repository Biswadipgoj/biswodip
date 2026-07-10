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
  role: 'Independent Software Developer',
  aspiration: 'Aspiring Business Analyst',
  tagline: 'I design, build, deploy & deliver real software.',
  intro:
    'Independent software developer and aspiring business analyst from West Bengal, India. I turn ambiguous ideas into shipped products — from the first wireframe to a deployed, used-in-the-wild application.',
  about:
    'I work end to end: research, design, engineering and delivery. Across every real solution I have shipped, I have learned that great software is equal parts crisp interface, solid engineering and a clear understanding of the business problem underneath. That bridge — between code and outcomes — is exactly where I want to keep building.',
} as const;

/**
 * Story-facts — the numbers that matter, told as a story
 * (no dry percentages, no spec-sheet stats).
 */
export const facts = [
  { figure: '15+', label: 'Ideas turned real', detail: 'researched, designed, built & delivered' },
  { figure: '0', label: 'Builds left unfinished', detail: 'everything I start reaches its users' },
  { figure: '2', label: 'Journeys through CSE', detail: 'diploma, then a B.Tech on top' },
  { figure: '∞', label: 'Curiosity on tap', detail: 'the one resource that never runs out' },
] as const;

export const nav = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Work' },
  { id: 'impact', label: 'Impact' },
  { id: 'journey', label: 'Journey' },
  { id: 'github', label: 'GitHub' },
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
    metric: 'End to end',
    title: 'Idea → shipped',
    body: 'I take products the whole distance — research, design, build and deploy — so nothing stalls in a half-finished prototype.',
    accent: '#22d3ee',
  },
  {
    metric: 'Battle-tested',
    title: 'Built for production',
    body: 'Clean, typed, maintainable engineering that survives real users, real traffic and real change requests.',
    accent: '#8b5cf6',
  },
  {
    metric: 'Zero ghosts',
    title: 'Outcome-first',
    body: 'Every interface choice traces back to a business goal. No abandoned repos, no half-built demos — if I start it, it ships.',
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

export const constellation: Orbit[] = [
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

/** The marquee ribbon — things I ship, not a parts list. */
export const shipped = [
  'Interfaces',
  'Dashboards',
  'Storefronts',
  'Prototypes',
  'Pipelines',
  'Portals',
  'Experiences',
  'Products',
  'Ideas',
  'Outcomes',
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
};

export const projects: Project[] = [
  {
    name: 'Erpixa',
    blurb: 'Business management, finally without the bloat.',
    description:
      'A modular, open-source ERP platform built for small and mid-sized businesses that are tired of paying for features they never touch. Erpixa onboards your team, detects your business type, and assembles a custom workspace — CRM, Sales, Inventory, Accounting, HR, Projects, Manufacturing, Helpdesk, Marketing — activating only what you actually need. Backed by Postgres Row-Level Security for true multi-tenant data isolation and a live KPI engine that computes every metric from real data, never from mocks.',
    url: 'https://erpixa.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/Erpixa',
    accent: '#8b5cf6',
    accentSoft: 'rgba(139,92,246,0.16)',
    tags: ['Modular by design', 'Enterprise-grade security', 'Live on the internet'],
    features: [
      '9 business modules activated per business type',
      'Postgres RLS — tenant isolation at the database layer',
      'Live KPI engine computed from real aggregates',
      'React 19 + TypeScript + Supabase serverless stack',
    ],
  },
  {
    name: 'TelePoint',
    blurb: 'Real-time communication, reimagined.',
    description:
      'A sleek communication platform focused on instant, friction-free connection. Built for speed with a modern reactive stack and a clean, responsive interface that works everywhere.',
    url: 'https://telepoint-topaz.vercel.app/',
    accent: '#22d3ee',
    accentSoft: 'rgba(34,211,238,0.16)',
    tags: ['Instant by design', 'Feels native everywhere', 'Live on the internet'],
    features: [
      'Instant, low-latency interactions',
      'Modern reactive component architecture',
      'Mobile-first responsive layout',
      'Deployed & live right now',
    ],
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
      'Deployed & live right now',
    ],
    previewImage: '/trip-preview.png',
  },
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
