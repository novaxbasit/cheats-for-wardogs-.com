import { getTranslations } from '../i18n';
import {
  DEFAULT_OG_GAMEPLAY_ALT,
  DEFAULT_OG_GAMEPLAY_HEIGHT,
  DEFAULT_OG_GAMEPLAY_IMAGE,
  DEFAULT_OG_GAMEPLAY_WIDTH,
} from './gameplayMedia';
import { SITE_DOMAIN as INDEXNOW_HOST_NAME, SITE_URL } from './site';
import { getPageSeoEntry } from './pageSeo';

export const SITE_ORIGIN = SITE_URL;

export const DEFAULT_OG_IMAGE = DEFAULT_OG_GAMEPLAY_IMAGE;

export const DEFAULT_OG_IMAGE_ALT = DEFAULT_OG_GAMEPLAY_ALT;

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

/** @example @handle */
export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Comma-separated profile URLs (X, YouTube, etc.) for Organization sameAs. */
export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function resolvePageSeo(pathname: string, locale?: string): { title: string; description: string } {
  const entry = getPageSeoEntry(pathname, locale);
  if (entry) return entry;
  const t = getTranslations(locale);
  return { title: t.site.title, description: t.site.description };
}

export function pageTitle(keyword: string, brand?: string, locale?: string): string {
  const t = getTranslations(locale);
  const brandName = brand ?? t.site.name;
  const suffix = ` | ${brandName}`;
  const max = 60;
  if (`${keyword}${suffix}`.length <= max) return `${keyword}${suffix}`;
  if (keyword.length <= max) return keyword;
  const cut = keyword.slice(0, max + 1);
  const clauseBreak = Math.max(...[...cut.matchAll(/[.?!:;,](?=\s)/g)].map((m) => m.index ?? -1), -1);
  const boundary = cut.lastIndexOf(' ');
  let trimmed =
    clauseBreak >= 30
      ? cut.slice(0, /[?!]/.test(cut[clauseBreak]) ? clauseBreak + 1 : clauseBreak)
      : boundary > 20
        ? cut.slice(0, boundary)
        : keyword.slice(0, max);
  const danglingWord =
    /[\s,;:.·|&-]+$|\s+(a|an|the|and|or|of|for|to|in|on|with|is|it|be|without|after|de|del|al|el|la|los|las|y|o|en|con|para|un|una|es|sin|der|die|das|und|oder|mit|für|von|im|ein|eine|ist|ob|ohne|nach|le|les|et|ou|du|des|à|au|pour|avec|sur|sans|après|est)$/iu;
  while (danglingWord.test(trimmed)) trimmed = trimmed.replace(danglingWord, '');
  return trimmed.trim();
}

export const DEFAULT_OG_IMAGE_WIDTH = DEFAULT_OG_GAMEPLAY_WIDTH;
export const DEFAULT_OG_IMAGE_HEIGHT = DEFAULT_OG_GAMEPLAY_HEIGHT;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;
