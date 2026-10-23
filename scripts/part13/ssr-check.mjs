const checks = [
  { url: 'http://127.0.0.1:4173/', h1: 'Wardogs Cheats', snip: 'aimbot', link: '/cheats/' },
  {
    url: 'http://127.0.0.1:4173/cheats/',
    h1: 'Wardogs Hacks for Windows',
    snip: '$35',
    link: '/go/wardogs',
  },
  {
    url: 'http://127.0.0.1:4173/hwid-spoofer/',
    h1: 'HWID Spoofer for Wardogs PCs',
    snip: 'disk',
    link: '/go/hwid-spoofer',
  },
  {
    url: 'http://127.0.0.1:4173/blog/wardogs-cheats-buyers-guide/',
    h1: "Wardogs Cheats Buyer",
    snip: 'checklist',
    link: '/cheats/',
  },
];

const out = [];
for (const c of checks) {
  const h = await (await fetch(c.url)).text();
  const h1 = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim(),
  );
  const links = [...h.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  out.push({
    url: c.url,
    hasH1: h1.some((x) => x.includes(c.h1)),
    h1,
    hasSnip: h.toLowerCase().includes(c.snip),
    hasLink: links.some((l) => l.includes(c.link)),
    zadeyoInHref: links.some((l) => l.includes('zadeyo')),
  });
}
console.log(JSON.stringify({ ok: out.every((r) => r.hasH1 && r.hasSnip && r.hasLink && !r.zadeyoInHref), results: out }, null, 2));
