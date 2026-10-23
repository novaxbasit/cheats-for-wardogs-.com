import {
  HWID_SPOOFER_PATH,
  PRODUCT_BASE,
  PRODUCTS_HUB_PATH,
  SKIN_CHANGER_PATH,
  UGC_PATH,
} from '../config/site';
import { CHEATS_PRIMARY_SLUG, UTILITY_PRODUCT_PATHS, type UtilityProductSlug } from '../config/catalog';

/** Normalize internal paths to match trailingSlash: 'always' and canonical URLs. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [beforeHash, hash = ''] = path.split('#');
  const [pathname, query = ''] = beforeHash.split('?');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  const withQuery = query ? `${normalized}?${query}` : normalized;
  return hash ? `${withQuery}#${hash}` : withQuery;
}

const legacyProductRoot = '/products/dota-2-cheats';
const legacyIsleProduct = '/products/the-isle-novaxware-cheats';
const legacyWardogsProduct = '/products/wardogs-cheats';

/** Former product URLs → `/cheats/` (301 targets match scripts/redirects.mjs). */
export const LEGACY_PATH_MAP: Record<string, string> = {
  '/cheats': PRODUCT_BASE,
  '/cheats/lite': PRODUCT_BASE,
  '/cheats/lite/': PRODUCT_BASE,
  '/cheats/pro': PRODUCT_BASE,
  '/cheats/pro/': PRODUCT_BASE,
  '/cheats/elite': PRODUCT_BASE,
  '/cheats/elite/': PRODUCT_BASE,
  [legacyProductRoot]: PRODUCT_BASE,
  [`${legacyProductRoot}/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/lite`]: PRODUCT_BASE,
  [`${legacyProductRoot}/lite/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/pro`]: PRODUCT_BASE,
  [`${legacyProductRoot}/pro/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/elite`]: PRODUCT_BASE,
  [`${legacyProductRoot}/elite/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/utilities`]: HWID_SPOOFER_PATH,
  [`${legacyProductRoot}/utilities/`]: HWID_SPOOFER_PATH,
  [`${legacyProductRoot}/hwid-spoofer`]: HWID_SPOOFER_PATH,
  [`${legacyProductRoot}/hwid-spoofer/`]: HWID_SPOOFER_PATH,
  [`${legacyProductRoot}/ugc`]: UGC_PATH,
  [`${legacyProductRoot}/ugc/`]: UGC_PATH,
  [`${legacyProductRoot}/account-recovery`]: UGC_PATH,
  [`${legacyProductRoot}/account-recovery/`]: UGC_PATH,
  [`${legacyProductRoot}/skin-changer`]: SKIN_CHANGER_PATH,
  [`${legacyProductRoot}/skin-changer/`]: SKIN_CHANGER_PATH,
  [`${legacyProductRoot}/unlock-all`]: PRODUCT_BASE,
  [`${legacyProductRoot}/unlock-all/`]: PRODUCT_BASE,
  [legacyIsleProduct]: PRODUCT_BASE,
  [`${legacyIsleProduct}/`]: PRODUCT_BASE,
  [legacyWardogsProduct]: PRODUCT_BASE,
  [`${legacyWardogsProduct}/`]: PRODUCT_BASE,
  '/product': PRODUCT_BASE,
  '/product/': PRODUCT_BASE,
  '/product/lite': PRODUCT_BASE,
  '/product/lite/': PRODUCT_BASE,
  '/product/pro': PRODUCT_BASE,
  '/product/pro/': PRODUCT_BASE,
  '/product/elite': PRODUCT_BASE,
  '/product/elite/': PRODUCT_BASE,
  '/cheats/compare': '/blog/',
  '/cheats/compare/': '/blog/',
  '/product/compare': '/blog/',
  '/product/compare/': '/blog/',
  '/contact': '/support/',
  '/contact/': '/support/',
};

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/go/')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  pathname = LEGACY_PATH_MAP[pathname] ?? pathname;

  return withTrailingSlash(pathname) + hash;
}

export const ROUTES = {
  home: '/',
  blog: '/blog/',
  forum: '/forum/',
  products: PRODUCT_BASE,
  productsHub: PRODUCTS_HUB_PATH,
  cheats: PRODUCT_BASE,
  productsElite: PRODUCT_BASE,
  hwidSpoofer: HWID_SPOOFER_PATH,
  ugc: UGC_PATH,
  skinChanger: SKIN_CHANGER_PATH,
  faq: '/faq/',
  terms: '/terms/',
  about: '/about/',
  support: '/support/',
  privacy: '/privacy/',
} as const;

export function blogPostPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function productPath(slug: string): string {
  if (slug === CHEATS_PRIMARY_SLUG || slug === 'dota-2-cheats') {
    return PRODUCT_BASE;
  }
  const utilityPath = UTILITY_PRODUCT_PATHS[slug as UtilityProductSlug];
  if (utilityPath) return utilityPath;
  return `${PRODUCT_BASE}${slug}/`;
}
