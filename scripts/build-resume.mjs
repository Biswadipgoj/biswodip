import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import sharp from 'sharp';
import { siGithub, siGmail } from 'simple-icons';

// Public portfolio content is the only source for the downloadable resume.
const source = readFileSync('lib/data.ts', 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const { personal, projects, education, schooling, experience, stack, socials, resumeCopy, supportPilot } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
mkdirSync('artifacts/resume', { recursive: true });
writeFileSync('artifacts/resume/content.json', JSON.stringify({ personal, projects, education, schooling, experience, stack, socials, resumeCopy, supportPilot: { name: supportPilot.name, demoUrl: supportPilot.demoUrl } }));

// Contact and link icons: brand marks in their own colours, generic glyphs in the résumé accent.
// Rendered at high resolution so they stay sharp when printed next to 8pt text.
const ACCENT = '#0f5e6e';
const brand = (path, hex) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${hex}" d="${path}"/></svg>`;
const glyph = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${ACCENT}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
// LinkedIn's "in" mark; simple-icons no longer ships it.
const linkedinPath = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
const icons = {
  github: brand(siGithub.path, siGithub.hex),
  linkedin: brand(linkedinPath, '0A66C2'),
  email: brand(siGmail.path, siGmail.hex),
  phone: glyph('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'),
  location: glyph('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),
  website: glyph('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
};
mkdirSync('artifacts/resume/icons', { recursive: true });
await Promise.all(Object.entries(icons).map(([name, svg]) =>
  sharp(Buffer.from(svg), { density: 1200 }).resize(160, 160).png().toFile(`artifacts/resume/icons/${name}.png`)));

execFileSync('python', ['scripts/build-resume.py'], { stdio: 'inherit' });

