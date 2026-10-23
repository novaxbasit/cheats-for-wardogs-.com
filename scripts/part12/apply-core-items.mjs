/**
 * Merge Part 6 core item translations into locale dictionaries and pageSeo JSON.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const core = JSON.parse(readFileSync(join(root, 'scripts/part12/core-items-locale.json'), 'utf8'));

function writeJson(rel, data) {
  writeFileSync(join(root, rel), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

for (const locale of ['es', 'de', 'fr']) {
  const patch = core[locale];
  const dict = JSON.parse(readFileSync(join(root, `src/i18n/dictionaries/${locale}.json`), 'utf8'));
  dict.hero = { ...dict.hero, ...patch.hero };
  dict.cheats.items[0] = { ...dict.cheats.items[0], ...patch.cheats.items[0] };
  patch.products.items.forEach((row, i) => {
    dict.products.items[i] = { ...dict.products.items[i], ...row };
  });
  writeJson(`src/i18n/dictionaries/${locale}.json`, dict);

  const pageSeo = JSON.parse(readFileSync(join(root, `src/i18n/pageSeo/${locale}.json`), 'utf8'));
  for (const [path, meta] of Object.entries(patch.pageSeo)) {
    pageSeo[path] = { ...pageSeo[path], ...meta };
  }
  writeJson(`src/i18n/pageSeo/${locale}.json`, pageSeo);
  console.log(`Core items applied: ${locale}`);
}
