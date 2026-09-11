import fs from 'node:fs';
import path from 'node:path';
const names = { arrowUpRight: 'arrow-up-right', arrowDown: 'arrow-down', arrowUp: 'arrow-up', repository: 'catalog', play: 'play', pause: 'pause', menu: 'menu', close: 'close', copy: 'copy' };
const bodies = {};
const collection = JSON.parse(fs.readFileSync('node_modules/@iconify-json/carbon/icons.json', 'utf8'));
for (const [key, name] of Object.entries(names)) {
  if (!collection.icons[name]) throw new Error(`Unknown Carbon icon: ${name}`);
  bodies[key] = collection.icons[name].body;
}
fs.writeFileSync('components/ui/Icon.tsx', `// Carbon icons (Apache-2.0), retrieved from Iconify. No runtime requests.\nconst paths = ${JSON.stringify(bodies, null, 2)} as const;\nexport default function Icon({ name, className = '' }: { name: keyof typeof paths; className?: string }) {\n  return <svg className={'icon ' + className} width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: paths[name] }} />;\n}\n`);
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!file.endsWith('.tsx') || file.endsWith('Icon.tsx')) continue;
    const old = fs.readFileSync(file, 'utf8');
    let next = old.replaceAll('<span aria-hidden="true">↗</span>', '<Icon name="arrowUpRight" />').replaceAll('<span aria-hidden="true">↓</span>', '<Icon name="arrowDown" />').replaceAll('<span aria-hidden="true">↑</span>', '<Icon name="arrowUp" />').replaceAll('<span className="repo-icon" aria-hidden="true">⌑</span>', '<Icon name="repository" className="repo-icon" />').replaceAll('<span aria-hidden="true">{paused ? \'▷\' : \'Ⅱ\'}</span>', '<Icon name={paused ? \'play\' : \'pause\'} />').replaceAll('<span aria-hidden="true">{open ? \'−\' : \'+\'}</span>', '<Icon name={open ? \'close\' : \'menu\'} />');
    if (old === next) continue;
    let relative = path.relative(path.dirname(file), 'components/ui/Icon').replaceAll('\\', '/');
    if (!relative.startsWith('.')) relative = './' + relative;
    const statement = `import Icon from '${relative}';\n`;
    next = next.startsWith("'use client';") ? next.replace("'use client';", "'use client';\n" + statement) : statement + next;
    fs.writeFileSync(file, next);
  }
}
walk('components');
console.log('Carbon icons saved and adopted.');
