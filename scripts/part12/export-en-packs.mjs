/**
 * Export English locale packs for Part 12 translation.
 * Run from repo root: node scripts/part12/export-en-packs.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const u = (rel) => pathToFileURL(join(root, rel)).href;
const outDir = join(root, 'scripts/part12');

function writeJson(name, data) {
  writeFileSync(join(outDir, name), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

const { en } = await import(u('src/i18n/en.ts'));
const { blogPostsEn } = await import(u('src/data/blog/posts/en-articles.ts'));
const { forumPostsEn } = await import(u('src/data/forum/posts/en-threads.ts'));
const { forumCategories } = await import(u('src/data/forum.ts'));
const { siteFaqs } = await import(u('src/data/faq.ts'));
const { getProductCopyBundle } = await import(u('src/data/products/exportCopy.ts'));
await import(u('src/data/products.ts'));

const { pageSeo, ...dict } = en;
writeJson('_en-dict-export.json', dict);
writeJson('_en-pageSeo-export.json', pageSeo);
writeJson('_en-blog-export.json', blogPostsEn);
writeJson('_en-forum-export.json', forumPostsEn);
writeJson('_en-forum-categories-export.json', forumCategories);

const productBundle = getProductCopyBundle();
writeJson('_en-product-copy.json', productBundle);

const faqExport = siteFaqs.map((row) => ({
  id: row.id,
  q: row.q,
  a: row.a,
}));
mkdirSync(join(root, 'src/data/faq/locales'), { recursive: true });
writeJson('_en-faq-export.json', faqExport);

const { getCatalogCopy } = await import(u('src/data/catalogCopy.ts'));
writeJson('_en-catalog-export.json', getCatalogCopy('en'));

console.log('Exported EN packs to scripts/part12/');
