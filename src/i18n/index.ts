import type { Translations } from './types';
import { DEFAULT_LOCALE, isSiteLocale, type SiteLocale } from './locales';
import { localizePath } from './paths';
import { finalizeLocaleDictionary } from './brandTokens';
import { en } from './en';
import esDictionary from './dictionaries/es.json';
import deDictionary from './dictionaries/de.json';
import frDictionary from './dictionaries/fr.json';
import esPageSeo from './pageSeo/es.json';
import dePageSeo from './pageSeo/de.json';
import frPageSeo from './pageSeo/fr.json';

/** Support link targets (including checkout) come from `en`, which reads them from config. */
function withEnglishSupportHrefs(dict: Omit<Translations, 'pageSeo'>): Omit<Translations, 'pageSeo'> {
  return {
    ...dict,
    support: {
      ...dict.support,
      channels: dict.support.channels.map((channel, i) => ({
        ...channel,
        href: en.support.channels[i]?.href ?? channel.href,
      })),
    },
  };
}

/** Keep footer explore links aligned with English routes on every locale (Part 3 defect fix). */
function withSharedFooterExplore(dict: Omit<Translations, 'pageSeo'>): Omit<Translations, 'pageSeo'> {
  const localizedByHref = new Map(dict.footer.exploreLinks.map((link) => [link.href, link]));
  return {
    ...dict,
    footer: {
      ...dict.footer,
      exploreLinks: en.footer.exploreLinks.map((link) => {
        const localized = localizedByHref.get(link.href);
        if (!localized) return link;
        return {
          ...link,
          label: localized.label,
          ariaLabel: localized.ariaLabel ?? link.ariaLabel,
          scrollTarget: localized.scrollTarget ?? link.scrollTarget,
        };
      }),
    },
  };
}

const dictionaries: Record<SiteLocale, Translations> = {
  en: finalizeLocaleDictionary(en),
  es: finalizeLocaleDictionary({
    ...withSharedFooterExplore(withEnglishSupportHrefs(esDictionary as Omit<Translations, 'pageSeo'>)),
    pageSeo: esPageSeo as Translations['pageSeo'],
  }),
  de: finalizeLocaleDictionary({
    ...withSharedFooterExplore(withEnglishSupportHrefs(deDictionary as Omit<Translations, 'pageSeo'>)),
    pageSeo: dePageSeo as Translations['pageSeo'],
  }),
  fr: finalizeLocaleDictionary({
    ...withSharedFooterExplore(withEnglishSupportHrefs(frDictionary as Omit<Translations, 'pageSeo'>)),
    pageSeo: frPageSeo as Translations['pageSeo'],
  }),
};

export function getTranslations(locale: string | undefined): Translations {
  if (locale && isSiteLocale(locale)) return dictionaries[locale];
  return dictionaries[DEFAULT_LOCALE];
}

/** Locale + dictionary + path localizer for Astro frontmatter. */
export function useLocale(currentLocale: string | undefined) {
  const locale = (currentLocale && isSiteLocale(currentLocale) ? currentLocale : DEFAULT_LOCALE) as SiteLocale;
  const t = getTranslations(locale);
  const lp = (path: string) => localizePath(path, locale);
  return { locale, t, lp };
}

export type { Translations } from './types';
export type { NavId, NavLink } from './types';
export { LOCALES, DEFAULT_LOCALE, type SiteLocale } from './locales';
export {
  getLocalizedPath,
  localizePath,
  localeFromPathname,
  stripLocalePrefix,
} from './paths';

/** @deprecated Use getTranslations(Astro.currentLocale) in pages and layouts. */
export const t = en;
