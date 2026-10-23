import type { SiteLocale } from '../../i18n/locales';
import type { ForumPost } from './types';
import { forumCategories as forumCategoriesEn, forumPosts as forumPostsEn } from '../forum';
import esForum from './locales/es.json';
import deForum from './locales/de.json';
import frForum from './locales/fr.json';

type ForumPack = { categories: typeof forumCategoriesEn; posts: ForumPost[] };

const byLocale: Record<Exclude<SiteLocale, 'en'>, ForumPack> = {
  es: esForum as ForumPack,
  de: deForum as ForumPack,
  fr: frForum as ForumPack,
};

export function getForumCategories(locale: SiteLocale) {
  if (locale === 'en') return forumCategoriesEn;
  const localized = byLocale[locale]?.categories;
  return localized && localized.length > 0 ? localized : forumCategoriesEn;
}

export function getForumPosts(locale: SiteLocale): ForumPost[] {
  if (locale === 'en') return forumPostsEn;
  const localized = byLocale[locale]?.posts;
  if (localized && localized.length > 0) return localized;
  return forumPostsEn;
}

export function getForumPost(slug: string, locale: SiteLocale): ForumPost | undefined {
  return getForumPosts(locale).find((p) => p.slug === slug);
}

export function getForumPostsBySlugs(slugs: string[], locale: SiteLocale = 'en'): ForumPost[] {
  return slugs
    .map((slug) => getForumPost(slug, locale))
    .filter((p): p is ForumPost => Boolean(p));
}
