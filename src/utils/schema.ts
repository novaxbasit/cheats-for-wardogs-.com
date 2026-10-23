import type { FaqItem } from '../i18n/types';
import type { SiteLocale } from '../i18n/locales';
import { schemaLanguage } from '../i18n/localeTags';
import { SITE_NAME, SUPPORT_EMAIL } from '../config/site';
import { BRAND_LOGO_SCHEMA } from '../config/brand';
import { SITE_ORIGIN, absoluteAssetUrl, canonicalUrl, getOrganizationSameAs } from '../config/seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

type SchemaLocale = SiteLocale | undefined;

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function websiteSchema(locale?: SchemaLocale, description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    inLanguage: schemaLanguage(locale),
    description:
      description ??
      'Wardogs cheats with aimbot, player ESP, item ESP, and radar options for Wardogs on Windows.',
  };
}

export function organizationSchema(locale?: SchemaLocale) {
  const sameAs = getOrganizationSameAs();
  const languages =
    locale === 'es'
      ? ['Spanish', 'English']
      : locale === 'de'
        ? ['German', 'English']
        : locale === 'fr'
          ? ['French', 'English']
          : ['English'];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: absoluteAssetUrl(BRAND_LOGO_SCHEMA),
    email: SUPPORT_EMAIL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        url: canonicalUrl('/support/'),
        availableLanguage: languages,
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  url: string;
  locale?: SchemaLocale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: schemaLanguage(input.locale),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function itemListSchema(input: { name: string; items: { name: string; url: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: input.name,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url),
    })),
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  url: string;
  locale?: SchemaLocale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: schemaLanguage(input.locale),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function faqPageSchema(items: FaqItem[], locale?: SchemaLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: schemaLanguage(locale),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function discussionForumPostingSchema(input: {
  name: string;
  text: string;
  url: string;
  author: string;
  comments: number;
  locale?: SchemaLocale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: input.name,
    articleBody: input.text,
    url: schemaPageUrl(input.url),
    inLanguage: schemaLanguage(input.locale),
    author: { '@type': 'Person', name: input.author },
    commentCount: input.comments,
    isPartOf: { '@type': 'CollectionPage', name: `${SITE_NAME} Community Forum`, url: canonicalUrl('/forum/') },
  };
}

function offerUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return canonicalUrl(path);
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  offerUrl: string;
  image?: string;
  sku?: string;
  locale?: SchemaLocale;
  priceUsd?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    inLanguage: schemaLanguage(input.locale),
    sku: input.sku ?? input.url.replace(/\//g, '-'),
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    ...(input.image ? { image: absoluteAssetUrl(input.image) } : {}),
    offers: {
      '@type': 'Offer',
      url: offerUrl(input.offerUrl),
      priceCurrency: 'USD',
      ...(input.priceUsd != null ? { price: input.priceUsd } : {}),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  };
}

function schemaPageUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return canonicalUrl(url);
}

export function articleSchema(input: {
  name: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  locale?: SchemaLocale;
}) {
  const pageUrl = schemaPageUrl(input.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.name,
    description: input.description,
    url: pageUrl,
    image: absoluteAssetUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: schemaLanguage(input.locale),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteAssetUrl(BRAND_LOGO_SCHEMA),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}

export function parseBlogDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return new Date().toISOString().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}
