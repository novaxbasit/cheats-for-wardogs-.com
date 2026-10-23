import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const failures = [];

const PROTECTED = {
  'public/images/hwid-spoofer/hwid-spoofer-uefi-spoof-panel.webp':
    '4EA9DC578017E6E7AEA6D5F4630877D4D8DB743A45064E632BD497E0981EF1F5',
  'public/images/hwid-spoofer/hwid-spoofer-uefi-spoof-panel-400.webp':
    'AB1EFC0D66DAB171E7C6E8414F3F8C5B0120723646366B4F706F32D969DA7F8D',
  'public/images/hwid-spoofer/hwid-spoofer-uefi-spoof-panel-640.webp':
    '43EB8F69897CD1528083A70F66AEFA47AAFDBEE8895AF5842AC486D63C74D19A',
  'public/images/hwid-spoofer/hwid-spoofer-uefi-spoof-panel-800.webp':
    'A00C73B6F90E7E697227B9BEECEC11EFFD6B2C78D84693BE16BE8BFA460BA395',
  'public/images/hwid-spoofer/hwid-spoofer-uefi-spoof-panel-960.webp':
    '670A74B6A005221E5C8FBD434B575D740FFBF2AC3DB7BD6E67E894C491D4EEC0',
  'public/images/hwid-spoofer/hwid-spoofer-serial-check-panel.webp':
    '917253BE3D72A5A4C637CCF0A3DE6C8CBAC4314EC30BACD19D0262736D94FEC7',
  'public/images/hwid-spoofer/hwid-spoofer-serial-check-panel-400.webp':
    '5D43315B4A729CF3311BC499EFFA2944C55E2227E365083FDAFC8B044DFB9367',
  'public/images/hwid-spoofer/hwid-spoofer-serial-check-panel-640.webp':
    'BCBA00E91BB3F3EE89359888F0CC4C35BF29FE329F03EC7796C5FBF5DA538002',
  'public/images/hwid-spoofer/hwid-spoofer-serial-check-panel-800.webp':
    '0F51C129AA2FB8F22E29BC9116CFAD26F0816CBCC2C7AF2EA57A86A71CC7360D',
  'public/images/hwid-spoofer/hwid-spoofer-serial-check-panel-960.webp':
    'C89E68B3BA42B4A592A3750872117A60C4DA7D1D71DEBF742EFE04F4AB8DA77F',
  'public/images/ugc/ugc.webp': '27B6464780686530B0DDED9F540306799E7E8C5D182CF1DF9F7B52D499F7CB5E',
  'public/images/ugc/ugc-400.webp': 'C5E4909955DD9039CFD9D2E0FF8690A46BD8E5F51412A481963051C0ADD2FD36',
  'public/images/ugc/ugc-640.webp': 'B0C4EC638D9F1A0E6D641D40927EC1BE030FE8B1E2457CB276A3214A8FDA157B',
  'public/images/ugc/ugc-800.webp': '929846E8EEB9ECEBB385E773B08827EE8A2393DAB8BC7062F7801374DBC24410',
  'public/images/ugc/ugc-960.webp': '9DCE826F808D179F855F64A79C94FBE57C4D55C0859CBDCD8E0F681EC9812D35',
  'public/images/skin-changer/skin-changer.webp':
    'BBDD41D4EC2E01240E69E89B0FEE8FBBC93B65FA55E50B028E650AA714286ECE',
  'public/images/skin-changer/skin-changer-400.webp':
    '53A83E7DD5A97F8AC3E0C2C1FAA14290F978D3B09DD41BD522654F0692DF7E26',
  'public/images/skin-changer/skin-changer-640.webp':
    'FD69D8A4B776B1DA1BCE80186F3AF8FA9AB42FF547A454367C65C3ECF8726026',
  'public/images/skin-changer/skin-changer-800.webp':
    '131756F0FB621492CDD01F1D5BD2E7C655BC53A855DD35C8534FB0EF8698C906',
  'public/images/skin-changer/skin-changer-960.webp':
    '2738F1B11116F8802DA321D78FEA321CF08D3B0F14E102FA9FA8547A57D86612',
};

for (const [rel, expected] of Object.entries(PROTECTED)) {
  const file = path.join(root, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(file)) {
    failures.push(`MISSING protected media: ${rel}`);
    continue;
  }
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase();
  if (hash !== expected) failures.push(`CHECKSUM ${rel}: got ${hash}`);
}

const utilityPhrases = [
  'The Isle HWID Spoofer',
  'Fly Hack & God Mode',
  'Evrima',
  'eft-esp-menu-jungle',
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (/\.(ts|astro|json|md|mjs)$/i.test(e.name)) files.push(p);
  }
  return files;
}

const srcText = walk(path.join(root, 'src'))
  .concat(walk(path.join(root, 'public')).filter((f) => !f.includes('images')))
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n');

for (const phrase of utilityPhrases) {
  if (srcText.includes(phrase)) failures.push(`UTILITY ORIGINAL SURVIVOR: ${phrase.slice(0, 60)}...`);
}

const robots = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://cheatsforwardogs.com/sitemap.xml')) {
  failures.push('robots.txt sitemap line wrong');
}
if (!robots.includes('Disallow: /go/')) failures.push('robots missing /go/ disallow');

const rss = fs.readFileSync(path.join(dist, 'rss.xml'), 'utf8');
if (!rss.includes('https://cheatsforwardogs.com')) failures.push('RSS missing cheatsforwardogs.com');

const sm = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
if (sm.includes('/go/') || sm.includes('/privacy/') || sm.includes('/terms/')) {
  failures.push('sitemap contains non-indexable URL');
}
const smCount = (sm.match(/<loc>/g) ?? []).length;
if (smCount !== 120) failures.push(`sitemap URL count ${smCount} expected 120`);

function decodeHtml(s) {
  return (s ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function readHtml(rel) {
  const file = path.join(dist, rel.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  const alt = path.join(dist, rel.replace(/^\//, ''));
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  if (fs.existsSync(alt)) return fs.readFileSync(alt, 'utf8');
  return '';
}

const corePages = [
  { path: '/', title: 'Wardogs Cheats | Aimbot, ESP and Radar on PC', h1: 'Wardogs Cheats for PC' },
  {
    path: '/cheats/',
    title: 'Wardogs Hacks | Menu Modules and Checkout Plans',
    h1: 'Wardogs Hacks for Windows',
  },
  {
    path: '/hwid-spoofer/',
    title: 'Wardogs HWID Spoofer | Rotate Disk and MAC IDs',
    h1: 'HWID Spoofer for Wardogs PCs',
  },
  {
    path: '/ugc/',
    title: 'Wardogs Account Recovery | UGC Appeal Automation',
    h1: 'Account Recovery Workflows with UGC',
  },
  {
    path: '/skin-changer/',
    title: 'Wardogs Skin Changer | Local Weapon and Outfit Skins',
    h1: 'Client Skin Changer for Supported Titles',
  },
];

const titles = new Set();
const descs = new Set();
for (const page of corePages) {
  const html = readHtml(page.path);
  if (!html) {
    failures.push(`missing dist HTML ${page.path}`);
    continue;
  }
  const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1]);
  const desc = decodeHtml(html.match(/<meta name="description" content="([^"]*)"/i)?.[1]);
  const ogT = decodeHtml(html.match(/<meta property="og:title" content="([^"]*)"/i)?.[1]);
  const twT = decodeHtml(html.match(/<meta name="twitter:title" content="([^"]*)"/i)?.[1]);
  const ogD = decodeHtml(html.match(/<meta property="og:description" content="([^"]*)"/i)?.[1]);
  const twD = decodeHtml(html.match(/<meta name="twitter:description" content="([^"]*)"/i)?.[1]);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim(),
  );
  if (title !== page.title) failures.push(`${page.path} title mismatch: ${title}`);
  if (ogT !== page.title || twT !== page.title) failures.push(`${page.path} social title mismatch`);
  if (desc !== ogD || desc !== twD) failures.push(`${page.path} description mismatch across tags`);
  if (h1s.length !== 1) failures.push(`${page.path} h1 count ${h1s.length}`);
  else if (!h1s[0].includes(page.h1)) failures.push(`${page.path} h1 text ${h1s[0]}`);
  if (titles.has(title)) failures.push(`duplicate title ${title}`);
  titles.add(title);
  if (descs.has(desc)) failures.push(`duplicate description`);
  descs.add(desc);
  if (html.match(/https?:\/\/zadeyo\.com/g)?.length) {
    const inGo = html.includes('/go/');
    if (!inGo || html.match(/href="https:\/\/zadeyo/g)) failures.push(`${page.path} referral in visible href`);
  }
}

const buyHtml = [
  readHtml('/cheats/'),
  readHtml('/hwid-spoofer/'),
  readHtml('/ugc/'),
  readHtml('/skin-changer/'),
].join('');
if (!/href="\/go\/wardogs(\/|")/.test(buyHtml)) failures.push('main product missing /go/ CTA');
if (!/href="\/go\/hwid-spoofer\//.test(buyHtml)) failures.push('hwid missing /go/ CTA');

const goConfig = fs.readFileSync(path.join(root, 'src/config/checkout-redirects.mjs'), 'utf8');
const expectedUrls = [
  'https://zadeyo.com/go/BASIT?to=%2Fproducts%2Fwardogs',
  'https://zadeyo.com/go/BASIT?to=%2Fproducts%2Fhwid-spoofer',
  'https://zadeyo.com/go/BASIT?to=%2Fproducts%2Fskin-changer',
  'https://zadeyo.com/go/BASIT?to=%2Fproducts%2Fugc',
];
for (const u of expectedUrls) {
  if (!goConfig.includes(u)) failures.push(`checkout config missing ${u}`);
}

const staleGameplay = [
  'public/images/gameplay/eft-esp-menu-jungle.webp',
  'public/images/gameplay/the-isle',
];
for (const rel of staleGameplay) {
  const abs = path.join(root, rel);
  if (fs.existsSync(abs)) failures.push(`old gameplay asset remains: ${rel}`);
}

const privacy = readHtml('/privacy/');
if (!privacy.includes('noindex')) failures.push('privacy not noindex');

console.log(JSON.stringify({ ok: failures.length === 0, failures, protectedChecked: Object.keys(PROTECTED).length, sitemapUrls: smCount }, null, 2));
process.exit(failures.length ? 1 : 0);
