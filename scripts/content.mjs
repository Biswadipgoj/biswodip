import fs from 'node:fs';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../lib/data.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
export const content = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
