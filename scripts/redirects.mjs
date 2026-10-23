/** Static path redirects (301). Keys are pathname without query/hash. */
const LOCALES = ['es', 'de', 'fr'];
const LEGACY_PRODUCT = '/products/dota-2-cheats';
const LEGACY_EFT_PRODUCT = '/products/escape-from-tarkov-cheats';
const LEGACY_ISLE_PRODUCT = '/products/the-isle-novaxware-cheats';
const LEGACY_WARDOGS_PRODUCT = '/products/wardogs-cheats';
const PRODUCT_HOME = '/cheats/';

function addLocaleRedirects(map, fromPath, toPath) {
  map.set(fromPath, toPath);
  for (const locale of LOCALES) {
    map.set(`/${locale}${fromPath}`, `/${locale}${toPath}`);
  }
}

export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/product', PRODUCT_HOME],
  ['/product/', PRODUCT_HOME],
  ['/cheats/compare', '/blog/'],
  ['/cheats/compare/', '/blog/'],
  ['/product/compare', '/blog/'],
  ['/product/compare/', '/blog/'],
  [`${LEGACY_PRODUCT}`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/`, PRODUCT_HOME],
  [`${LEGACY_EFT_PRODUCT}`, PRODUCT_HOME],
  [`${LEGACY_EFT_PRODUCT}/`, PRODUCT_HOME],
  [`${LEGACY_ISLE_PRODUCT}`, PRODUCT_HOME],
  [`${LEGACY_ISLE_PRODUCT}/`, PRODUCT_HOME],
  [`${LEGACY_WARDOGS_PRODUCT}`, PRODUCT_HOME],
  [`${LEGACY_WARDOGS_PRODUCT}/`, PRODUCT_HOME],
  ['/wardogs-cheats', PRODUCT_HOME],
  ['/wardogs-cheats/', PRODUCT_HOME],
  ['/cheats/lite', PRODUCT_HOME],
  ['/cheats/lite/', PRODUCT_HOME],
  ['/cheats/pro', PRODUCT_HOME],
  ['/cheats/pro/', PRODUCT_HOME],
  ['/cheats/elite', PRODUCT_HOME],
  ['/cheats/elite/', PRODUCT_HOME],
  ['/product/lite', PRODUCT_HOME],
  ['/product/lite/', PRODUCT_HOME],
  ['/product/pro', PRODUCT_HOME],
  ['/product/pro/', PRODUCT_HOME],
  ['/product/elite', PRODUCT_HOME],
  ['/product/elite/', PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/lite`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/lite/`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/pro`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/pro/`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/elite`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/elite/`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/utilities`, '/hwid-spoofer/'],
  [`${LEGACY_PRODUCT}/utilities/`, '/hwid-spoofer/'],
  [`${LEGACY_PRODUCT}/hwid-spoofer`, '/hwid-spoofer/'],
  [`${LEGACY_PRODUCT}/hwid-spoofer/`, '/hwid-spoofer/'],
  [`${LEGACY_PRODUCT}/ugc`, '/ugc/'],
  [`${LEGACY_PRODUCT}/ugc/`, '/ugc/'],
  [`${LEGACY_PRODUCT}/skin-changer`, '/skin-changer/'],
  [`${LEGACY_PRODUCT}/skin-changer/`, '/skin-changer/'],
  [`${LEGACY_PRODUCT}/unlock-all`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/unlock-all/`, PRODUCT_HOME],
  [`${LEGACY_PRODUCT}/account-recovery`, '/ugc/'],
  [`${LEGACY_PRODUCT}/account-recovery/`, '/ugc/'],
  ['/sitemap-index.xml', '/sitemap.xml'],
  ['/sitemap-0.xml', '/sitemap.xml'],
]);

for (const [from, to] of [...PATH_REDIRECTS.entries()]) {
  if (from.startsWith('/es/') || from.startsWith('/de/') || from.startsWith('/fr/') || from.startsWith('/en/')) continue;
  addLocaleRedirects(PATH_REDIRECTS, from, to);
  // /en/ is not a locale prefix. Send it to the final URL in one hop, including the slashed form.
  PATH_REDIRECTS.set(`/en${from}`, to);
  if (!from.endsWith('/')) PATH_REDIRECTS.set(`/en${from}/`, to);
}

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
