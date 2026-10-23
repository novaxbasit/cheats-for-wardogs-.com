import fs from 'node:fs';
import path from 'node:path';
import { blogPostsEn } from '../src/data/blog/posts/en-articles.ts';
import { forumPostsEn } from '../src/data/forum/posts/en-threads.ts';

const root = process.cwd();
const outDir = path.resolve(root, '..', '_site-copy-library');
const outFile = path.join(outDir, 'cheatsforwardogs.com.md');

const enTs = fs.readFileSync(path.join(root, 'src/i18n/en.ts'), 'utf8');
const pageSeoBlock = enTs.match(/pageSeo:\s*\{[\s\S]*?\n  \},/)?.[0] ?? '';
const heroBlock = enTs.match(/hero:\s*\{[\s\S]*?\n  \},/)?.[0] ?? '';
const cheatsBlock = enTs.match(/cheats:\s*\{[\s\S]*?\n  \},/)?.[0] ?? '';
const productsItemsBlock = enTs.match(/products:\s*\{[\s\S]*?items:\s*\[[\s\S]*?\],\s*\n/s)?.[0] ?? '';


function bodyToText(blocks) {
  const out = [];
  for (const block of blocks ?? []) {
    if (block.type === 'p') out.push(block.text);
    if (block.type === 'h2') out.push(`\n### ${block.text}\n`);
    if (block.type === 'h3') out.push(`\n#### ${block.text}\n`);
    if (block.type === 'ul') out.push(...block.items.map((i) => `- ${i}`));
  }
  return out.join('\n\n');
}

const lines = [
  '# cheatsforwardogs.com — final English copy',
  '',
  `Exported: ${new Date().toISOString().slice(0, 10)}`,
  '',
  '## Core page SEO (`src/i18n/en.ts` pageSeo)',
  '',
  pageSeoBlock.replace(/^\s+/gm, '').trim(),
  '',
  '## Homepage hero (Part 6)',
  '',
  heroBlock.replace(/^\s+/gm, '').trim(),
  '',
  '## Main product card (Part 6 cheats.items)',
  '',
  cheatsBlock.replace(/^\s+/gm, '').trim(),
  '',
  '## Utility catalog cards (Part 6 products.items)',
  '',
  productsItemsBlock.replace(/^\s+/gm, '').trim(),
  '',
];

for (const post of blogPostsEn) {
  lines.push(`## Blog: ${post.title}`, '');
  lines.push(`Slug: ${post.slug}`);
  lines.push(`Meta title: ${post.metaTitle}`);
  lines.push(`Meta description: ${post.metaDescription}`);
  lines.push('', post.desc, '', bodyToText(post.body), '', '---', '');
}

for (const thread of forumPostsEn) {
  lines.push(`## Forum: ${thread.title}`, '');
  lines.push(`Slug: ${thread.slug}`);
  lines.push(`Category: ${thread.category}`);
  lines.push(`Excerpt: ${thread.excerpt}`);
  lines.push('', ...(thread.body ?? []), '', '---', '');
}

const catalog = fs.readFileSync(path.join(root, 'src/data/catalogCopy.ts'), 'utf8');
const catalogEn = catalog.match(/en:\s*\{[\s\S]*?\n  \},/)?.[0] ?? '';
lines.push('## Products hub (`catalogCopy.ts` en)', '', catalogEn.trim(), '');

const faqTs = fs.readFileSync(path.join(root, 'src/data/faq.ts'), 'utf8');
const siteFaqs = faqTs.match(/export const siteFaqs[\s\S]*?^\];/m)?.[0] ?? '';
lines.push('## Site FAQs (`faq.ts` siteFaqs)', '', siteFaqs.trim(), '');

const pagesBlock = enTs.match(/pages:\s*\{[\s\S]*?\n  \},\n  pageSeo:/m)?.[0] ?? '';
lines.push('## Site pages copy (`en.ts` pages)', '', pagesBlock.replace(/^\s+/gm, '').trim(), '');

const legalBlock = enTs.match(/legalPages:\s*\{[\s\S]*?\n  \},\n/s)?.[0] ?? '';
lines.push('## Legal pages (`en.ts` legalPages)', '', legalBlock.replace(/^\s+/gm, '').trim(), '');

const productsPage = enTs.match(/products:\s*\{[\s\S]*?\n  \},\n  cheats:/m)?.[0] ?? '';
lines.push('## Products page UI (`en.ts` products)', '', productsPage.replace(/^\s+/gm, '').trim(), '');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, lines.join('\n'), 'utf8');
console.log(`Wrote ${outFile} (${(fs.statSync(outFile).size / 1024).toFixed(1)} KB)`);
