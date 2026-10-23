import fs from 'node:fs';
const h = fs.readFileSync('dist/index.html', 'utf8');
const links = [...h.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map((m) => [
  m[1],
  m[2]
    .replace(/<span style="position:absolute[\s\S]*?<\/span>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim(),
]);
const byText = new Map();
for (const [href, text] of links) {
  const k = text.toLowerCase();
  if (!k) continue;
  if (!byText.has(k)) byText.set(k, []);
  byText.get(k).push(href);
}
console.log(
  [...byText]
    .filter(([, urls]) => urls.length > 1)
    .map(([t, urls]) => ({ text: t, count: urls.length, hrefs: urls })),
);
