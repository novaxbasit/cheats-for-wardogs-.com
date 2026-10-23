import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

/** Eight-plus-word phrases from template-facts.md Section 2 (original utility copy). */
const PHRASES = [
  'Swap disk, MAC, and GPU identifiers when this PC keeps failing after a hardware ban, then run the bundled cleaner before you sign in again.',
  'Rotates disk serials, MAC addresses, GPU IDs and related fingerprints after a hardware ban, with a bundled trace cleaner.',
  'Rotate disk serials, MAC addresses, GPU IDs and related fingerprints after a hardware ban so this PC can authenticate again.',
  'Reach for it when alternate machines accept new logins but this one rejects them immediately.',
  'UGC maps each restriction to a custom appeal workflow and automates dispute steps so you are not copying the same ticket by hand.',
  'Unban & Governance Control (UGC): template appeals plus automated dispute filings for restricted logins on any platform.',
  'Load premium outfits and weapon finishes client-side in supported titles, then choose monthly or lifetime access from checkout.',
  'Lightweight client that applies premium weapon skins, outfits, and knife variants locally across major titles.',
  'Premium cosmetics without the microtransactions',
  'Hardware ID ban recovery across major anti-cheats',
  'Account recovery for any platform',
  'The Isle Account Recovery',
  'The Isle Skin Changer',
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (/\.(ts|astro|json|md|mjs|txt|xml)$/i.test(e.name)) files.push(p);
  }
  return files;
}

const corpus = walk(path.join(root, 'src'))
  .concat(walk(path.join(root, 'public')).filter((f) => !f.includes('images')))
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n');

const hits = [];
for (const phrase of PHRASES) {
  if (corpus.includes(phrase)) hits.push(phrase);
}

const ok = hits.length === 0;
console.log(JSON.stringify({ ok, hitCount: hits.length, hits }, null, 2));
process.exit(ok ? 0 : 1);
