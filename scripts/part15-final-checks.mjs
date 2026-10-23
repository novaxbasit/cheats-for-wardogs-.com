import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const failures = [];

const LOCALES = ['', 'es', 'de', 'fr'];
const PRODUCT_PATHS = ['/cheats/', '/hwid-spoofer/', '/ugc/', '/skin-changer/'];

function readHtml(rel) {
  const base = rel.replace(/^\//, '').replace(/\/$/, '');
  const file = path.join(dist, base, 'index.html');
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  return '';
}

function localePath(locale, p) {
  if (!locale) return p;
  return `/${locale}${p === '/' ? '/' : p}`;
}

for (const locale of LOCALES) {
  for (const p of PRODUCT_PATHS) {
    const rel = localePath(locale, p);
    const html = readHtml(rel);
    if (!html) failures.push(`missing ${rel}`);
    else if (!html.includes('/go/')) failures.push(`no /go/ on ${rel}`);
  }
}

for (const locale of LOCALES) {
  const home = readHtml(localePath(locale, '/'));
  if (!home) failures.push(`missing home ${locale || 'en'}`);
  if (home && !home.includes('brand-logo')) failures.push(`logo missing ${locale || 'en'}`);
  if (home && !home.includes('favicon')) failures.push(`favicon link missing ${locale || 'en'}`);
}

const terms = readHtml('/terms/');
const checkout = readHtml('/checkout/');
if (!terms.includes('noindex')) failures.push('terms not noindex');
if (checkout && !checkout.includes('noindex')) failures.push('checkout not noindex');

const notFound = fs.readFileSync(path.join(dist, '404.html'), 'utf8');
if (!/404|not found/i.test(notFound)) failures.push('404 page content weak');

const heroSnippets = {
  '/': 'Player ESP, aimbot, and radar tools',
  '/cheats/': 'Configure aiming assists, player ESP, and radar',
  '/hwid-spoofer/': 'disk',
  '/ugc/': 'UGC',
  '/skin-changer/': 'client-side',
};
for (const [p, snip] of Object.entries(heroSnippets)) {
  const html = readHtml(p);
  if (!html.toLowerCase().includes(snip.toLowerCase())) failures.push(`hero snippet missing on ${p}: ${snip}`);
}

const goDir = path.join(root, 'public/go');
const goConfig = fs.readFileSync(path.join(root, 'src/config/checkout-redirects.mjs'), 'utf8');
for (const slug of ['wardogs', 'hwid-spoofer', 'skin-changer', 'ugc']) {
  const html = fs.readFileSync(path.join(goDir, slug, 'index.html'), 'utf8');
  const m = html.match(/content="0;url=([^"]+)"/);
  if (!m) failures.push(`go/${slug} missing refresh url`);
  else {
    const url = m[1];
    if (!goConfig.includes(url)) failures.push(`go/${slug} url not in config: ${url}`);
  }
  if (/href="https:\/\/zadeyo/.test(html)) failures.push(`go/${slug} has zadeyo href`);
}

const brandFiles = fs.readdirSync(path.join(root, 'public/images/brand'));
for (const f of brandFiles) {
  if (/isle|tarkov|eft/i.test(f)) failures.push(`old brand filename ${f}`);
}

const rss = fs.readFileSync(path.join(dist, 'rss.xml'), 'utf8');
if (!rss.includes('<link>https://cheatsforwardogs.com')) failures.push('rss link wrong');

const blogCount = fs.readdirSync(path.join(dist, 'blog')).filter((d) =>
  fs.existsSync(path.join(dist, 'blog', d, 'index.html')),
).length;
if (blogCount !== 7) failures.push(`blog count ${blogCount}`);

const forumCount = fs.readdirSync(path.join(dist, 'forum')).filter((d) =>
  fs.existsSync(path.join(dist, 'forum', d, 'index.html')),
).length;
if (forumCount !== 12) failures.push(`forum count ${forumCount}`);

console.log(JSON.stringify({ ok: failures.length === 0, failures }, null, 2));
process.exit(failures.length ? 1 : 0);
