/**
 * Build de/fr locale packs by pivoting from completed es translations (es -> de/fr).
 * Run: node scripts/part12/pivot-translate-locales.mjs
 * Env: PART12_PIVOT_LOCALES=de,fr  PART12_PIVOT_STEPS=blog,forum,products,faq,catalog,dictionary,pageSeo
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import translate from 'google-translate-api-x';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const cacheDir = join(root, 'scripts/part12/.cache-pivot');
mkdirSync(cacheDir, { recursive: true });

const EM_DASH = /\u2014|\u2013|—|–/g;
const FORBIDDEN = /\b(undetected|guaranteed|trusted|protected|EFTCHEATS)\b/gi;

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(h >>> 0);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function pivotTranslate(text, from, to) {
  if (!text.trim()) return text;
  const cacheFile = join(cacheDir, `${from}-${to}-${hash(text)}.txt`);
  try {
    return readFileSync(cacheFile, 'utf8');
  } catch {
    /* miss */
  }
  let out;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await translate(text.slice(0, 4500), { from, to });
      out = res.text;
      break;
    } catch {
      await sleep(1500 * (attempt + 1));
    }
  }
  if (!out) {
    console.warn(`pivot kept source (${from}): ${text.slice(0, 50)}`);
    return text;
  }
  out = out.replace(EM_DASH, ', ').replace(FORBIDDEN, '');
  writeFileSync(cacheFile, out, 'utf8');
  await sleep(80);
  return out;
}

function patchDictionary(locale, dict) {
  dict.site.name = '{siteName}';
  dict.site.domain = '{siteDomain}';
  dict.ui.homeAria =
    locale === 'es'
      ? 'Inicio {siteName}'
      : locale === 'de'
        ? '{siteName} Startseite'
        : 'Accueil {siteName}';
  dict.ui.languageNames = { en: 'English', es: 'Español', de: 'Deutsch', fr: 'Français' };
  return dict;
}

const SKIP_KEYS = new Set([
  'href',
  'id',
  'icon',
  'bento',
  'variant',
  'categoryTone',
  'slug',
  'date',
  'published',
  'image',
  'sourcePath',
  'type',
  'num',
  'score',
  'commentsCount',
  'upvotes',
  'featured',
  'readTime',
  'tag',
  'author',
  'imageWidth',
  'imageHeight',
]);

const pivotMemo = new Map();

async function pivotDeep(esValue, from, to) {
  if (typeof esValue === 'string') {
    const key = `${from}\0${to}\0${esValue}`;
    if (pivotMemo.has(key)) return pivotMemo.get(key);
    const out = await pivotTranslate(esValue, from, to);
    pivotMemo.set(key, out);
    return out;
  }
  if (Array.isArray(esValue)) {
    const arr = [];
    for (const item of esValue) arr.push(await pivotDeep(item, from, to));
    return arr;
  }
  if (esValue && typeof esValue === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(esValue)) {
      out[k] = SKIP_KEYS.has(k) ? v : await pivotDeep(v, from, to);
    }
    return out;
  }
  return esValue;
}

function readJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), 'utf8'));
}

function writeJson(rel, data) {
  writeFileSync(join(root, rel), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function stepEnabled(name) {
  const only = process.env.PART12_PIVOT_STEPS?.split(',').map((s) => s.trim()).filter(Boolean);
  if (!only?.length) return true;
  return only.includes(name);
}

async function main() {
  const targets = (process.env.PART12_PIVOT_LOCALES ?? 'de,fr').split(',').map((s) => s.trim());
  for (const to of targets) {
    pivotMemo.clear();
    console.log(`\n=== pivot es -> ${to} ===`);
    if (stepEnabled('dictionary')) {
      console.log('dictionary...');
      const esDict = readJson('src/i18n/dictionaries/es.json');
      let dict = await pivotDeep(esDict, 'es', to);
      dict = patchDictionary(to, dict);
      writeJson(`src/i18n/dictionaries/${to}.json`, dict);
    }
    if (stepEnabled('pageSeo')) {
      console.log('pageSeo...');
      const esSeo = readJson('src/i18n/pageSeo/es.json');
      writeJson(`src/i18n/pageSeo/${to}.json`, await pivotDeep(esSeo, 'es', to));
    }
    if (stepEnabled('blog')) {
      console.log('blog...');
      const esBlog = readJson('src/data/blog/locales/es.json');
      writeJson(`src/data/blog/locales/${to}.json`, await pivotDeep(esBlog, 'es', to));
    }
    if (stepEnabled('forum')) {
      console.log('forum...');
      const esForum = readJson('src/data/forum/locales/es.json');
      writeJson(`src/data/forum/locales/${to}.json`, await pivotDeep(esForum, 'es', to));
    }
    if (stepEnabled('products')) {
      console.log('products...');
      const esProducts = readJson('src/data/products/locales/es.json');
      writeJson(`src/data/products/locales/${to}.json`, await pivotDeep(esProducts, 'es', to));
    }
    if (stepEnabled('faq')) {
      console.log('faq...');
      const esFaq = readJson('src/data/faq/locales/es.json');
      writeJson(`src/data/faq/locales/${to}.json`, await pivotDeep(esFaq, 'es', to));
    }
    if (stepEnabled('catalog')) {
      console.log('catalog...');
      const esCatalog = readJson('src/data/catalogCopy/locales/es.json');
      writeJson(`src/data/catalogCopy/locales/${to}.json`, await pivotDeep(esCatalog, 'es', to));
    }
  }
  console.log('\nPivot locale packs written.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
