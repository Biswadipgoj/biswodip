'use client';

import {
  siReact, siNextdotjs, siTypescript, siTailwindcss, siThreedotjs, siWebgl,
  siFramer, siRedux, siVuedotjs, siNuxt, siSvelte, siSocketdotio, siStorybook,
  siGsap, siNodedotjs, siExpress, siPython, siFastapi, siGraphql, siApachekafka,
  siRabbitmq, siJsonwebtokens, siKubernetes, siGo, siRust, siSpringboot,
  siGooglecloud, siEthereum, siDocker, siGithubactions, siCloudflare, siLinux,
  siGnubash, siNginx, siTerraform, siGrafana, siArgo, siJenkins, siGitlab,
  siAnsible, siPostgresql, siMysql, siMongodb, siRedis, siPrisma, siDrizzle,
  siJest, siVitest, siGit, siElasticsearch, siApachespark, siSnowflake,
  siGooglebigquery, siCypress, siNeo4j, siWebpack, siVite, siSupabase, siTurborepo,
} from 'simple-icons';

type IconData = {
  path: string;
  hex: string;
  title: string;
};

// Explicit imports keep the rest of the 3,000+ logo catalogue out of the client.
const icons: Record<string, IconData> = {
  siReact, siNextdotjs, siTypescript, siTailwindcss, siThreedotjs, siWebgl,
  siFramer, siRedux, siVuedotjs, siNuxt, siSvelte, siSocketdotio, siStorybook,
  siGsap, siNodedotjs, siExpress, siPython, siFastapi, siGraphql, siApachekafka,
  siRabbitmq, siJsonwebtokens, siKubernetes, siGo, siRust, siSpringboot,
  siGooglecloud, siEthereum, siDocker, siGithubactions, siCloudflare, siLinux,
  siGnubash, siNginx, siTerraform, siGrafana, siArgo, siJenkins, siGitlab,
  siAnsible, siPostgresql, siMysql, siMongodb, siRedis, siPrisma, siDrizzle,
  siJest, siVitest, siGit, siElasticsearch, siApachespark, siSnowflake,
  siGooglebigquery, siCypress, siNeo4j, siWebpack, siVite, siSupabase, siTurborepo,
};

// Custom SVG paths for tools not present in simple-icons or brand-customized
const CUSTOM_ICONS: Record<string, IconData> = {
  aws: {
    title: 'Amazon Web Services',
    hex: 'FF9900',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7h2v2.5z',
  },
  grpc: {
    title: 'gRPC',
    hex: '244C5A',
    path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  playwright: {
    title: 'Playwright',
    hex: '2EAD33',
    path: 'M18.8 6.5C17.5 4.5 15 3 12 3 7 3 3 7 3 12c0 2.5 1 4.8 2.7 6.4l-1.4 1.4C2.3 17.8 1 15 1 12 1 5.9 5.9 1 12 1c3.7 0 7 1.9 8.9 4.8l-2.1.7zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z',
  },
  microfrontends: {
    title: 'Micro-frontends',
    hex: '8B5CF6',
    path: 'M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z',
  },
  systemarchitecture: {
    title: 'System Architecture',
    hex: 'E34F26',
    path: 'M12 2L2 7l10 5 10-5-10-5zm0 18l-8-4v-6l8 4 8-4v6l-8 4z',
  },
};

// Map friendly tech names to simple-icons keys or custom keys
const TECH_MAP: Record<string, string | IconData> = {
  // Frontend
  'react': 'siReact',
  'react & next.js': 'siReact',
  'next.js': 'siNextdotjs',
  'typescript': 'siTypescript',
  'tailwind css': 'siTailwindcss',
  'three.js': 'siThreedotjs',
  'three.js / webgl': 'siThreedotjs',
  'webgl': 'siWebgl',
  'framer motion': 'siFramer',
  'redux': 'siRedux',
  'redux & zustand': 'siRedux',
  'zustand': 'siRedux',
  'vue.js': 'siVuedotjs',
  'vue.js & nuxt': 'siVuedotjs',
  'nuxt': 'siNuxt',
  'svelte': 'siSvelte',
  'sveltekit': 'siSvelte',
  'websockets': 'siSocketdotio',
  'websockets & rtc': 'siSocketdotio',
  'micro-frontends': CUSTOM_ICONS.microfrontends,
  'storybook': 'siStorybook',
  'gsap': 'siGsap',

  // Backend
  'node.js': 'siNodedotjs',
  'node.js & express': 'siNodedotjs',
  'express': 'siExpress',
  'python': 'siPython',
  'python & fastapi': 'siPython',
  'fastapi': 'siFastapi',
  'rest': 'siGraphql',
  'rest & graphql': 'siGraphql',
  'graphql': 'siGraphql',
  'kafka': 'siApachekafka',
  'kafka & rabbitmq': 'siApachekafka',
  'rabbitmq': 'siRabbitmq',
  'jwt': 'siJsonwebtokens',
  'jwt & oauth2': 'siJsonwebtokens',
  'microservices': 'siKubernetes',
  'go (golang)': 'siGo',
  'go': 'siGo',
  'rust': 'siRust',
  'spring boot': 'siSpringboot',
  'grpc': CUSTOM_ICONS.grpc,
  'grpc & protobuf': CUSTOM_ICONS.grpc,
  'serverless': 'siGooglecloud',
  'serverless / lambdas': 'siGooglecloud',
  'web3': 'siEthereum',
  'web3 & contracts': 'siEthereum',

  // DevOps & Cloud
  'docker': 'siDocker',
  'docker & compose': 'siDocker',
  'ci/cd pipelines': 'siGithubactions',
  'ci/cd': 'siGithubactions',
  'aws': CUSTOM_ICONS.aws,
  'aws & cloudflare': 'siCloudflare',
  'cloudflare': 'siCloudflare',
  'kubernetes': 'siKubernetes',
  'kubernetes (k8s)': 'siKubernetes',
  'linux': 'siLinux',
  'linux & shell': 'siLinux',
  'shell': 'siGnubash',
  'nginx': 'siNginx',
  'nginx & proxy': 'siNginx',
  'terraform': 'siTerraform',
  'terraform & iac': 'siTerraform',
  'gcp': 'siGooglecloud',
  'gcp & azure': 'siGooglecloud',
  'grafana': 'siGrafana',
  'grafana & metrics': 'siGrafana',
  'argocd': 'siArgo',
  'jenkins': 'siJenkins',
  'jenkins & gitlab': 'siJenkins',
  'gitlab': 'siGitlab',
  'ansible': 'siAnsible',

  // Data & Tooling
  'postgresql': 'siPostgresql',
  'postgresql & mysql': 'siPostgresql',
  'mysql': 'siMysql',
  'mongodb': 'siMongodb',
  'mongodb & redis': 'siMongodb',
  'redis': 'siRedis',
  'prisma': 'siPrisma',
  'prisma & drizzle': 'siPrisma',
  'drizzle': 'siDrizzle',
  'jest': 'siJest',
  'jest & vitest': 'siJest',
  'vitest': 'siVitest',
  'git': 'siGit',
  'git & monorepos': 'siGit',
  'system architecture': CUSTOM_ICONS.systemarchitecture,
  'elasticsearch': 'siElasticsearch',
  'apache spark': 'siApachespark',
  'spark': 'siApachespark',
  'snowflake': 'siSnowflake',
  'snowflake / bigquery': 'siSnowflake',
  'bigquery': 'siGooglebigquery',
  'playwright': CUSTOM_ICONS.playwright,
  'playwright & cypress': 'siCypress',
  'cypress': 'siCypress',
  'neo4j': 'siNeo4j',
  'webpack': 'siWebpack',
  'webpack & vite': 'siWebpack',
  'vite': 'siVite',
  'supabase': 'siSupabase',
  'turborepo': 'siTurborepo',
};

export function getTechDetails(name: string): { path: string; color: string; title: string } {
  const clean = name.toLowerCase().trim();
  const entry = TECH_MAP[clean];

  if (entry) {
    if (typeof entry === 'object') {
      return { path: entry.path, color: '#' + entry.hex, title: entry.title };
    }
    const icon = icons[entry];
    if (icon) {
      // Fix black hex color on dark mode
      const color = icon.hex === '000000' ? '#ffffff' : '#' + icon.hex;
      return { path: icon.path, color, title: icon.title };
    }
  }

  // Fallback icon
  return {
    path: 'M12 2L2 7l10 5 10-5-10-5zm0 18l-8-4v-6l8 4 8-4v6l-8 4z',
    color: '#38bdf8',
    title: name,
  };
}

export default function TechIcon({
  name,
  size = 28,
  className = '',
  colorOverride,
}: {
  name: string;
  size?: number;
  className?: string;
  colorOverride?: string;
}) {
  const { path, color, title } = getTechDetails(name);
  const finalColor = colorOverride || color;

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={`tech-icon inline-block shrink-0 transition-transform duration-300 ${className}`}
      style={{ color: finalColor }}
    >
      <path d={path} />
    </svg>
  );
}
