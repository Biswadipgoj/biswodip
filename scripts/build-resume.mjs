import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';

// Public portfolio content is the only source for the downloadable resume.
const source = readFileSync('lib/data.ts', 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const { personal, projects, education, schooling, experience, stack, socials } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
mkdirSync('artifacts/resume', { recursive: true });
writeFileSync('artifacts/resume/content.json', JSON.stringify({ personal, projects, education, schooling, experience, stack, socials }));
execFileSync('python', ['scripts/build-resume.py'], { stdio: 'inherit' });
