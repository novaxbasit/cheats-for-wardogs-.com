/**
 * Part 12: batch-translate EN locale exports to es/de/fr with placeholder protection.
 * Run: node scripts/part12/machine-translate-locales.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import translate from 'google-translate-api-x';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const cacheDir = join(root, 'scripts/part12/.cache');
mkdirSync(cacheDir, { recursive: true });

const FORBIDDEN = /\b(undetected|guaranteed|trusted|protected|EFTCHEATS)\b/gi;
const EM_DASH = /\u2014|\u2013|—|–/g;
const TOKEN_RE = /\{[^}]+\}|\/[a-z0-9-]+\//gi;

const EN_FORUM_CATEGORIES = [
  { name: 'General Discussion', tone: 'purple', icon: 'layers' },
  { name: 'Features & Questions', tone: 'blue', icon: 'tag' },
  { name: 'Updates & Status', tone: 'orange', icon: 'refresh' },
  { name: 'Safety & Account Questions', tone: 'green', icon: 'shieldCheck' },
  { name: 'Buying Advice', tone: 'purple', icon: 'tag' },
  { name: 'Help & Support', tone: 'green', icon: 'headphones' },
];

const CATEGORY_LABELS = {
  es: {
    'General Discussion': 'Discusión general',
    'Features & Questions': 'Funciones y preguntas',
    'Updates & Status': 'Actualizaciones y estado',
    'Safety & Account Questions': 'Seguridad y cuenta',
    'Buying Advice': 'Consejos de compra',
    'Help & Support': 'Ayuda y soporte',
  },
  de: {
    'General Discussion': 'Allgemeine Diskussion',
    'Features & Questions': 'Features und Fragen',
    'Updates & Status': 'Updates und Status',
    'Safety & Account Questions': 'Sicherheit und Konto',
    'Buying Advice': 'Kaufberatung',
    'Help & Support': 'Hilfe und Support',
  },
  fr: {
    'General Discussion': 'Discussion générale',
    'Features & Questions': 'Fonctionnalités et questions',
    'Updates & Status': 'Mises à jour et statut',
    'Safety & Account Questions': 'Sécurité et compte',
    'Buying Advice': 'Conseils d\'achat',
    'Help & Support': 'Aide et support',
  },
};

function protectTokens(text) {
  const tokens = [];
  const safe = text.replace(TOKEN_RE, (m) => {
    const id = `__SW${tokens.length}__`;
    tokens.push(m);
    return id;
  });
  return { safe, tokens };
}

function restoreTokens(text, tokens) {
  let out = text;
  tokens.forEach((tok, i) => {
    out = out.replaceAll(`__SW${i}__`, tok);
  });
  return out;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(h >>> 0);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateLingva(safe, to) {
  await sleep(350);
  const url =
    'https://lingva.ml/api/v1/en/' +
    encodeURIComponent(to) +
    '/' +
    encodeURIComponent(safe.slice(0, 1800));
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        await sleep(1200 * (attempt + 1));
        continue;
      }
      const data = await res.json();
      if (data.translation) return data.translation;
    } catch {
      await sleep(1200 * (attempt + 1));
    }
  }
  return null;
}

async function translateMyMemory(safe, to) {
  await sleep(400);
  const url =
    'https://api.mymemory.translated.net/get?q=' +
    encodeURIComponent(safe.slice(0, 480)) +
    '&langpair=en|' +
    encodeURIComponent(to);
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url);
    if (!res.ok) {
      await sleep(1500 * (attempt + 1));
      continue;
    }
    const data = await res.json();
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    await sleep(1500 * (attempt + 1));
  }
  const lingva = await translateLingva(safe, to);
  if (lingva) return lingva;
  throw new Error(`mymemory failed for ${safe.slice(0, 40)}`);
}

async function translateText(text, to) {
  if (!text.trim()) return text;
  const cacheFile = join(cacheDir, `${to}-${hash(text)}.txt`);
  try {
    return readFileSync(cacheFile, 'utf8');
  } catch {
    /* miss */
  }
  const { safe, tokens } = protectTokens(text);
  const engine = process.env.PART12_TRANSLATOR ?? 'google';
  let translated;
  if (engine === 'google-x') {
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        const res = await translate(safe, { from: 'en', to });
        translated = res.text;
        break;
      } catch (err) {
        if (attempt === 5) throw err;
        await sleep(2000 * (attempt + 1));
      }
    }
  } else if (engine === 'mymemory') {
    translated = await translateMyMemory(safe, to);
  } else {
    const url =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' +
      encodeURIComponent(to) +
      '&dt=t&q=' +
      encodeURIComponent(safe.slice(0, 4500));
    let json;
    let lastStatus = 0;
    for (let attempt = 0; attempt < 4; attempt++) {
      const res = await fetch(url);
      lastStatus = res.status;
      if (res.ok) {
        json = await res.json();
        break;
      }
      const backoff = res.status === 429 ? 3000 + 2000 * attempt : 500 * (attempt + 1);
      await sleep(backoff);
    }
    if (json) {
      translated = json[0].map((part) => part[0]).join('');
    } else {
      console.warn(`google ${lastStatus}, mymemory fallback: ${text.slice(0, 50)}`);
      translated = await translateMyMemory(safe, to);
    }
  }
  translated = restoreTokens(translated, tokens);
  translated = translated.replace(EM_DASH, ', ');
  translated = translated.replace(FORBIDDEN, '');
  writeFileSync(cacheFile, translated, 'utf8');
  await sleep(engine === 'google-x' ? 40 : engine === 'mymemory' ? 280 : 80);
  return translated;
}

let inFlight = 0;
const waiters = [];
const MAX_IN_FLIGHT = 5;

function withSlot(fn) {
  return new Promise((resolve, reject) => {
    const start = () => {
      inFlight += 1;
      fn().then(resolve, reject).finally(() => {
        inFlight -= 1;
        const next = waiters.shift();
        if (next) next();
      });
    };
    if (inFlight < MAX_IN_FLIGHT) start();
    else waiters.push(start);
  });
}

function stepEnabled(name) {
  const only = process.env.PART12_ONLY?.split(',').map((s) => s.trim()).filter(Boolean);
  if (!only?.length) return true;
  return only.includes(name);
}

const stringMemo = new Map();

async function translateDeep(value, to, skipKeys = new Set()) {
  if (typeof value === 'string') {
    const key = `${to}\0${value}`;
    if (stringMemo.has(key)) return stringMemo.get(key);
    const pending = withSlot(() => translateText(value, to));
    stringMemo.set(key, pending);
    const out = await pending;
    stringMemo.set(key, out);
    return out;
  }
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => translateDeep(item, to, skipKeys)));
  }
  if (value && typeof value === 'object') {
    const out = {};
    const entries = Object.entries(value);
    const translated = await Promise.all(
      entries.map(async ([k, v]) => {
        if (
          skipKeys.has(k) ||
          k === 'href' ||
          k === 'id' ||
          k === 'icon' ||
          k === 'bento' ||
          k === 'variant' ||
          k === 'categoryTone' ||
          k === 'slug' ||
          k === 'date' ||
          k === 'published' ||
          k === 'image' ||
          k === 'sourcePath' ||
          k === 'type' ||
          k === 'num' ||
          k === 'score' ||
          k === 'commentsCount' ||
          k === 'upvotes' ||
          k === 'featured' ||
          k === 'readTime' ||
          k === 'tag' ||
          k === 'author' ||
          k === 'imageWidth' ||
          k === 'imageHeight'
        ) {
          return [k, v];
        }
        return [k, await translateDeep(v, to, skipKeys)];
      }),
    );
    for (const [k, v] of translated) out[k] = v;
    return out;
  }
  return value;
}

const BLOG_TAG_LABELS = {
  es: {
    'Buyer Guides': 'Guias de compra',
    Guides: 'Guias',
    'Setup & Config': 'Configuracion',
    Safety: 'Seguridad',
    Features: 'Funciones',
    Updates: 'Actualizaciones',
    Community: 'Comunidad',
    Troubleshooting: 'Solucion de problemas',
  },
  de: {
    'Buyer Guides': 'Kaufratgeber',
    Guides: 'Ratgeber',
    'Setup & Config': 'Einrichtung',
    Safety: 'Sicherheit',
    Features: 'Features',
    Updates: 'Updates',
    Community: 'Community',
    Troubleshooting: 'Fehlerbehebung',
  },
  fr: {
    'Buyer Guides': 'Guides d achat',
    Guides: 'Guides',
    'Setup & Config': 'Configuration',
    Safety: 'Securite',
    Features: 'Fonctionnalites',
    Updates: 'Mises a jour',
    Community: 'Communaute',
    Troubleshooting: 'Depannage',
  },
};

const READ_TIME_SUFFIX = {
  es: ' min de lectura',
  de: ' Min. Lesezeit',
  fr: ' min de lecture',
};

function patchBlogLocale(locale, posts) {
  const tags = BLOG_TAG_LABELS[locale] ?? {};
  const suffix = READ_TIME_SUFFIX[locale] ?? ' min read';
  return posts.map((post) => ({
    ...post,
    tag: tags[post.tag] ?? post.tag,
    readTime: String(post.readTime).replace(/\s*min\s*read\s*$/i, suffix),
  }));
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

function localizedForumCategories(locale) {
  const labels = CATEGORY_LABELS[locale];
  const enCats = readJson(pack('_en-forum-categories-export.json'));
  return enCats.map((cat) => ({
    ...cat,
    name: labels[cat.name] ?? cat.name,
  }));
}

function remapForumPosts(posts, locale) {
  const labels = CATEGORY_LABELS[locale];
  return posts.map((post) => ({
    ...post,
    category: labels[post.category] ?? post.category,
  }));
}

function readJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), 'utf8'));
}

function writeJson(rel, data) {
  writeFileSync(join(root, rel), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

async function translateFaqLocale(locale) {
  const enFaq = readJson(pack('_en-faq-export.json'));
  const out = [];
  for (const row of enFaq) {
    const linkParts = [];
    let idx = 0;
    const stripped = row.a.replace(/<a href="(\/[^"]+\/)">([^<]+)<\/a>/g, (_, href, label) => {
      const ph = `__LINK${idx}__`;
      linkParts.push({ ph, href, label });
      idx += 1;
      return ph;
    });
    let aTranslated = await translateText(stripped, locale);
    for (const { ph, href, label } of linkParts) {
      const labelTr = await translateText(label, locale);
      aTranslated = aTranslated.replace(ph, `<a href="${href}">${labelTr}</a>`);
    }
    out.push({
      id: row.id,
      q: await translateText(row.q, locale),
      a: aTranslated,
    });
  }
  writeJson(`src/data/faq/locales/${locale}.json`, out);
}

const pack = (name) => `scripts/part12/${name}`;

async function main() {
  const enDict = readJson(pack('_en-dict-export.json'));
  const enBlog = readJson(pack('_en-blog-export.json'));
  const enForum = readJson(pack('_en-forum-export.json'));
  const enProducts = readJson(pack('_en-product-copy.json'));
  const enPageSeo = readJson(pack('_en-pageSeo-export.json'));

  const locales = process.env.PART12_LOCALES
    ? process.env.PART12_LOCALES.split(',').map((s) => s.trim())
    : ['es', 'de', 'fr'];
  for (const locale of locales) {
    console.log(`\n=== ${locale.toUpperCase()} ===`);
    stringMemo.clear();
    if (process.env.PART12_SKIP_LOCALES?.split(',').includes(locale)) {
      console.log(`skip ${locale} (PART12_SKIP_LOCALES)`);
      continue;
    }

    if (stepEnabled('dictionary')) {
      console.log('dictionary...');
      let dict = await translateDeep(structuredClone(enDict), locale);
      dict = patchDictionary(locale, dict);
      writeJson(`src/i18n/dictionaries/${locale}.json`, dict);
    }

    if (stepEnabled('pageSeo')) {
      console.log('pageSeo...');
      writeJson(`src/i18n/pageSeo/${locale}.json`, await translateDeep(structuredClone(enPageSeo), locale));
    }

    if (stepEnabled('blog')) {
      console.log('blog...');
      const blogPosts = patchBlogLocale(
        locale,
        await translateDeep(structuredClone(enBlog), locale),
      );
      writeJson(`src/data/blog/locales/${locale}.json`, blogPosts);
    }

    if (stepEnabled('forum')) {
      console.log('forum...');
      const forumPosts = remapForumPosts(await translateDeep(structuredClone(enForum), locale), locale);
      writeJson(`src/data/forum/locales/${locale}.json`, {
        categories: localizedForumCategories(locale),
        posts: forumPosts,
      });
    }

    if (stepEnabled('products')) {
      console.log('products...');
      writeJson(`src/data/products/locales/${locale}.json`, await translateDeep(structuredClone(enProducts), locale));
    }

    if (stepEnabled('faq')) {
      console.log('faq...');
      await translateFaqLocale(locale);
    }

    if (stepEnabled('catalog')) {
      console.log('catalog...');
      const enCatalog = readJson(pack('_en-catalog-export.json'));
      writeJson(`src/data/catalogCopy/locales/${locale}.json`, await translateDeep(structuredClone(enCatalog), locale));
    }
  }
  console.log('\nAll locale packs written.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
