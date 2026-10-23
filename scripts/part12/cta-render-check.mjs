import puppeteer from 'puppeteer-core';

const urls = (process.argv[2] || 'http://127.0.0.1:4173/fr/cheats/').split(',');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function extract(html) {
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["']/gi)].map((m) => m[1]);
  return links;
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--disable-gpu'],
});
try {
  for (const url of urls) {
    const res = await fetch(url);
    const raw = extract(await res.text());
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
    const rendered = extract(await page.content());
    const go = rendered.filter((h) => h.includes('/go/') || h.includes('zadeyo'));
    const added = rendered.filter((h) => !raw.includes(h) && (h.includes('/go/') || h.includes('zadeyo')));
    console.log(JSON.stringify({ url, status: res.status, goHrefs: [...new Set(go)], goAddedAfterRender: added }, null, 2));
    await page.close();
  }
} finally {
  await browser.close();
}
