/**
 * Fix translator-damaged markdown links and a few product-name mistranslations.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '../..');
const dirs = [
  'src/data/blog/locales',
  'src/data/forum/locales',
  'src/data/faq/locales',
  'src/i18n/dictionaries',
  'src/i18n/pageSeo',
  'src/data/products/locales',
  'src/data/catalogCopy/locales',
];

const hrefMap = {
  '/cambiadordepiel': '/skin-changer',
  '/cambiador-de-piel': '/skin-changer',
  '/changeur-de-peau': '/skin-changer',
  '/skinwechsler': '/skin-changer',
};

function fixText(text) {
  let out = text;
  out = out.replaceAll('tricheurs Wardogs', 'cheats Wardogs');
  out = out.replaceAll('tricheurs WARDOGS', 'cheats Wardogs');
  out = out.replaceAll('tricheur Wardogs', 'cheat Wardogs');
  out = out.replaceAll('Chiens de garde', 'Wardogs');
  out = out.replaceAll('tricheurs des gardiens', 'cheats Wardogs');
  out = out.replaceAll('Wardogs-Betrügern', 'Wardogs-Cheats');
  out = out.replaceAll('Betrügeranzügen', 'Cheat-Paketen');
  out = out.replaceAll('tramposos de Wardogs', 'trucos de Wardogs');
  out = out.replace(/[\u2018\u2019\u201A]/g, "'");
  out = out.replace(/[\u201C\u201D]/g, '"');
  out = out.replace(/\u00A0/g, ' ');
  out = out.replace(/\]\(([^)]+)\)/g, (_, url) => {
    const compact = url.replace(/\s+/g, '');
    return `](${hrefMap[compact] ?? compact})`;
  });
  return out;
}

function walk(value) {
  if (typeof value === 'string') return fixText(value);
  if (Array.isArray(value)) return value.map(walk);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = k === 'href' || k === 'slug' || k === 'sourcePath' || k === 'image' ? v : walk(v);
    }
    return out;
  }
  return value;
}

for (const rel of dirs) {
  for (const name of readdirSync(join(root, rel))) {
    if (!name.endsWith('.json')) continue;
    const file = join(root, rel, name);
    const data = JSON.parse(readFileSync(file, 'utf8'));
    writeFileSync(file, `${JSON.stringify(walk(data), null, 2)}\n`);
    console.log('fixed', `${rel}/${name}`);
  }
}
