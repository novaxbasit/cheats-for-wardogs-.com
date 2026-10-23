/** Shared locale path rules for Astro middleware and scripts/serve.mjs */
import { resolvePathRedirect } from '../../scripts/redirects.mjs';

export const PREFIXED_LOCALES = ['es', 'de', 'fr'];

/** Collapse `/en/`, `/en/about/`, and `/en/en/..` to unprefixed English. */
export function stripEnglishLocalePrefix(pathname) {
  if (!pathname.startsWith('/en')) return null;

  let path = pathname;
  while (true) {
    if (path === '/en' || path === '/en/') return '/';
    if (path.startsWith('/en/')) {
      path = path.slice('/en'.length);
      if (!path) return '/';
      continue;
    }
    return path.startsWith('/') ? path : `/${path}`;
  }
}

/** `/es/go/..` → `/go/..` */
export function stripPrefixedLocaleFromGo(pathname) {
  for (const locale of PREFIXED_LOCALES) {
    const prefix = `/${locale}/go`;
    if (pathname === prefix || pathname === `${prefix}/`) return '/go/';
    if (pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(`/${locale}`.length);
    }
  }
  return null;
}

export function isPrefixedLocale(value) {
  return PREFIXED_LOCALES.includes(value);
}

/** Reject nested locale segments such as `/es/fr/about/`. */
export function hasNestedLocalePrefix(pathname) {
  const match = pathname.match(/^\/([^/]+)\/([^/]+)(\/|$)/);
  if (!match) return false;
  const first = match[1];
  const second = match[2];
  if (first === 'en' && isPrefixedLocale(second)) return true;
  if (isPrefixedLocale(first) && second === 'en') return true;
  return isPrefixedLocale(first) && isPrefixedLocale(second);
}

/**
 * @returns {{ status: 301, location: string } | { status: 404 } | null}
 */
/** True for the prerendered 404 documents. Serve these with HTTP 404, not 200. */
export function isErrorDocumentPath(pathname) {
  const bare = (pathname || '/').replace(/\/+$/, '') || '/';
  if (bare === '/404' || bare === '/404.html') return true;
  return /^\/(?:es|de|fr)\/404(?:\.html)?$/.test(bare);
}

export function resolveLocaleRoutingRedirect(pathname) {
  const unprefixedGo = stripPrefixedLocaleFromGo(pathname);
  if (unprefixedGo) {
    return { status: 301, location: unprefixedGo };
  }

  const englishCanonical = stripEnglishLocalePrefix(pathname);
  if (englishCanonical !== null) {
    const settled = resolvePathRedirect(englishCanonical) || englishCanonical;
    if (settled !== pathname) return { status: 301, location: settled };
  }

  if (hasNestedLocalePrefix(pathname)) {
    return { status: 404 };
  }

  return null;
}
