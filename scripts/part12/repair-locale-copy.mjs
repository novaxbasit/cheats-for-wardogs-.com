/**
 * Restore the game name and strip dash characters translators insert.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '../..');
const roots = [
  'src/i18n/dictionaries',
  'src/i18n/pageSeo',
  'src/data/blog/locales',
  'src/data/forum/locales',
  'src/data/products/locales',
  'src/data/faq/locales',
  'src/data/catalogCopy/locales',
];

const replacements = [
  [/perros de guerra/gi, 'Wardogs'],
  [/Kriegshunde/g, 'Wardogs'],
  [/chiens de guerre/gi, 'Wardogs'],
  [/\u2014|\u2013/g, ', '],
  [/\]\s+\(/g, ']('],
];

function walk(value) {
  if (typeof value === 'string') {
    let out = value;
    for (const [re, next] of replacements) out = out.replace(re, next);
    return out;
  }
  if (Array.isArray(value)) return value.map(walk);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = walk(v);
    return out;
  }
  return value;
}

for (const rel of roots) {
  const dir = join(root, rel);
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.json')) continue;
    const only = process.env.REPAIR_LOCALES?.split(',').map((s) => s.trim());
    if (only?.length && !only.includes(name.replace(/\.json$/, ''))) continue;
    const file = join(dir, name);
    if (!statSync(file).isFile()) continue;
    const data = JSON.parse(readFileSync(file, 'utf8'));
    writeFileSync(file, `${JSON.stringify(walk(data), null, 2)}\n`, 'utf8');
    console.log('repaired', rel + '/' + name);
  }
}
