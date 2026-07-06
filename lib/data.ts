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
  { id: 'skills', label: 'Orbit' },
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
 * The skill constellation — instead of bars and percentages, every craft is a
 * star in one of three orbits around the core. Each carries a `vibe`: the
 * honest, human line for how that tool and I get along.
 */
export type Craft = {
  name: string;
  vibe: string;
  color: string;
};

export type Orbit = {
  ring: string;
  caption: string;
  tint: string;
  crafts: Craft[];
};

export const constellation: Orbit[] = [
  {
    ring: 'Inner orbit',
    caption: 'Gravity-locked — the instruments I reach for every single day',
    tint: 'from-aurora-cyan to-aurora-blue',
    crafts: [
      { name: 'React & Next.js', vibe: 'Home turf. Every build starts here.', color: '#22d3ee' },
      { name: 'TypeScript', vibe: 'My second language — arguably my first.', color: '#3b82f6' },
      { name: 'Tailwind CSS', vibe: 'Paints interfaces at the speed of thought.', color: '#38bdf8' },
      { name: 'Three.js', vibe: 'Turns a scroll wheel into space travel.', color: '#8b5cf6' },
    ],
  },
  {
    ring: 'Middle orbit',
    caption: 'The engine rooms — quiet machinery behind loud interfaces',
    tint: 'from-aurora-violet to-aurora-pink',
    crafts: [
      { name: 'Node.js', vibe: 'Keeps the lights on while the UI shows off.', color: '#34d399' },
      { name: 'REST APIs', vibe: 'Fluent in request, response and everything between.', color: '#a78bfa' },
      { name: 'Databases', vibe: 'Where the truth lives — I keep it tidy.', color: '#f472b6' },
      { name: 'Python', vibe: 'A calm scalpel for gnarly problems.', color: '#fbbf24' },
    ],
  },
  {
    ring: 'Outer orbit',
    caption: 'The long view — where code meets the business it serves',
    tint: 'from-aurora-emerald to-aurora-gold',
    crafts: [
      { name: 'Product thinking', vibe: 'Asks “why” long before “how”.', color: '#34d399' },
      { name: 'Requirements analysis', vibe: 'Turns vague wishes into buildable lists.', color: '#fbbf24' },
      { name: 'Deployment', vibe: 'From “works on my machine” to works everywhere.', color: '#22d3ee' },
      { name: 'UX & design', vibe: 'Makes software feel like it likes you back.', color: '#f472b6' },
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
};

export const projects: Project[] = [
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
    name: 'Trip',
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
