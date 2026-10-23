import type { SiteLocale } from '../../i18n/locales';
import type { BlogPostFull } from './types';
import { blogPosts as blogPostsEn } from './posts';
import esBlog from './locales/es.json';
import deBlog from './locales/de.json';
import frBlog from './locales/fr.json';

const byLocale: Record<Exclude<SiteLocale, 'en'>, BlogPostFull[]> = {
  es: esBlog as BlogPostFull[],
  de: deBlog as BlogPostFull[],
  fr: frBlog as BlogPostFull[],
};

function sortBlogPosts(posts: BlogPostFull[]): BlogPostFull[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostsForLocale(locale: SiteLocale): BlogPostFull[] {
  if (locale === 'en') return sortBlogPosts(blogPostsEn);
  const localized = byLocale[locale];
  if (localized && localized.length > 0) return sortBlogPosts(localized);
  return sortBlogPosts(blogPostsEn);
}

export function getBlogPost(slug: string, locale: SiteLocale): BlogPostFull | undefined {
  return getBlogPostsForLocale(locale).find((p) => p.slug === slug);
}
