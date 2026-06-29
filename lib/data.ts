/**
 * Central content source for the portfolio.
 *
 * Everything visitor-facing is defined here so the site stays content-driven:
 * personal info, navigation, skills, projects, journey, stats and socials.
 * This is the single layer an admin panel / CMS would write to.
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
    'I work end to end: research, design, engineering and delivery. Over 15+ real solutions, I have learned that great software is equal parts crisp interface, solid engineering and a clear understanding of the business problem underneath. That bridge — between code and outcomes — is exactly where I want to keep building.',
} as const;

export const stats = [
  { value: 15, suffix: '+', label: 'Solutions delivered' },
  { value: 2024, suffix: '', label: 'B.Tech CSE', plain: true },
  { value: 100, suffix: '%', label: 'Ship rate' },
  { value: 8, suffix: '+', label: 'Core technologies' },
] as const;

export const nav = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
] as const;

export type Skill = {
  name: string;
  level: number; // 0 - 100
  color: string;
};

export const skillGroups: { title: string; tint: string; skills: Skill[] }[] = [
  {
    title: 'Frontend & Experience',
    tint: 'from-aurora-cyan to-aurora-blue',
    skills: [
      { name: 'React / Next.js', level: 92, color: '#22d3ee' },
      { name: 'TypeScript', level: 88, color: '#3b82f6' },
      { name: 'Tailwind CSS', level: 90, color: '#38bdf8' },
      { name: 'Three.js / R3F', level: 80, color: '#8b5cf6' },
    ],
  },
  {
    title: 'Engineering & Backend',
    tint: 'from-aurora-violet to-aurora-pink',
    skills: [
      { name: 'Node.js', level: 85, color: '#34d399' },
      { name: 'REST APIs', level: 86, color: '#a78bfa' },
      { name: 'Databases', level: 82, color: '#f472b6' },
      { name: 'Python', level: 78, color: '#fbbf24' },
    ],
  },
  {
    title: 'Delivery & Analysis',
    tint: 'from-aurora-emerald to-aurora-gold',
    skills: [
      { name: 'Product Thinking', level: 88, color: '#34d399' },
      { name: 'Requirements Analysis', level: 84, color: '#fbbf24' },
      { name: 'Deployment / DevOps', level: 80, color: '#22d3ee' },
      { name: 'UX & Design', level: 83, color: '#f472b6' },
    ],
  },
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
    tags: ['Next.js', 'TypeScript', 'Real-time', 'Responsive UI'],
    features: [
      'Instant, low-latency interactions',
      'Modern reactive component architecture',
      'Mobile-first responsive layout',
      'Deployed & live on Vercel',
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
    tags: ['Next.js', 'TypeScript', 'UX Design', 'Web App'],
    features: [
      'Guided, friction-free planning flow',
      'Clean, content-first interface',
      'Smooth, considered transitions',
      'Deployed & live on Vercel',
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
    body: 'Graduated and went all-in as an independent developer, building and shipping 15+ real solutions end to end.',
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
