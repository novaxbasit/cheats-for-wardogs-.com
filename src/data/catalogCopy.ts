import { CHEATS_PRIMARY_SLUG, HWID_SPOOFER_SLUG, SKIN_CHANGER_SLUG, UGC_SLUG } from '../config/catalog';
import type { SiteLocale } from '../i18n/locales';
import { deepApplySiteTokens } from '../i18n/brandTokens';
import es from './catalogCopy/locales/es.json';
import de from './catalogCopy/locales/de.json';
import fr from './catalogCopy/locales/fr.json';

/** UI copy for the /products/ catalog page and the header products menu. */
export interface CatalogCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  trust: string[];
  featuredEyebrow: string;
  from: string;
  priceLabel: string;
  lifetime: string;
  perMonth: string;
  utilitiesEyebrow: string;
  utilitiesTitle: string;
  utilitiesDesc: string;
  chooserEyebrow: string;
  chooserTitle: string;
  chooserDesc: string;
  scenarios: { slug: string; need: string; answer: string }[];
  compareEyebrow: string;
  compareTitle: string;
  compareDesc: string;
  compareRows: { label: string; values: Record<string, string> }[];
  ctaTitle: string;
  ctaDesc: string;
  ctaSupport: string;
  menuHeading: string;
  menuViewAll: string;
  menuTaglines: Record<string, string>;
}

const en: CatalogCopy = {
  eyebrow: 'Store',
  title: '{gameName} cheats and utilities',
  subtitle:
    'Everything we sell for {gameName}. Open any product for the full feature list, requirements and checkout.',
  trust: ['Instant delivery', '24/7 support', 'Monthly or lifetime plans', 'Partner checkout'],
  featuredEyebrow: 'Main product',
  from: 'From',
  priceLabel: 'Price',
  lifetime: 'Lifetime',
  perMonth: '/ month',
  utilitiesEyebrow: 'Utilities',
  utilitiesTitle: 'More tools we sell',
  utilitiesDesc: 'Each utility sells on its own license with a dedicated page and checkout path.',
  chooserEyebrow: 'Not sure?',
  chooserTitle: 'Which product do I need?',
  chooserDesc: 'Start from your situation. Each answer links to the product built for it.',
  scenarios: [
    { slug: CHEATS_PRIMARY_SLUG, need: 'I want aimbot, player ESP, item ESP, and radar on {gameShort}.', answer: '{cheatProduct}' },
    { slug: HWID_SPOOFER_SLUG, need: 'New accounts work on other PCs but die instantly on this tower.', answer: 'HWID Spoofer' },
    { slug: UGC_SLUG, need: 'My gaming or social profile is restricted and I need appeal help.', answer: 'UGC Account Recovery' },
    { slug: SKIN_CHANGER_SLUG, need: 'I want deluxe finishes on screen without paying per cosmetic.', answer: 'Skin Changer' },
  ],
  compareEyebrow: 'Compare',
  compareTitle: 'Compare products side by side',
  compareDesc: 'Plans, delivery and requirements at a glance. Product pages have the full details.',
  compareRows: [
    {
      label: 'Best for',
      values: {
        [CHEATS_PRIMARY_SLUG]: 'Wardogs PvP and loadout grinding',
        [HWID_SPOOFER_SLUG]: 'Machines flagged at the hardware layer',
        [UGC_SLUG]: 'Account or profile restrictions',
        [SKIN_CHANGER_SLUG]: 'Client-side cosmetic previews',
      },
    },
    {
      label: 'Delivery',
      values: {
        [CHEATS_PRIMARY_SLUG]: 'Instant, via portal',
        [HWID_SPOOFER_SLUG]: 'Instant, via portal',
        [UGC_SLUG]: 'Instant, via portal',
        [SKIN_CHANGER_SLUG]: 'Instant, via portal',
      },
    },
    {
      label: 'Windows',
      values: {
        [CHEATS_PRIMARY_SLUG]: '10 / 11, 64-bit',
        [HWID_SPOOFER_SLUG]: '10 / 11, 64-bit, admin',
        [UGC_SLUG]: '10 / 11, 64-bit',
        [SKIN_CHANGER_SLUG]: '10 / 11, 64-bit',
      },
    },
    {
      label: 'Security settings',
      values: {
        [CHEATS_PRIMARY_SLUG]: 'HVCI, TPM, Secure Boot on',
        [HWID_SPOOFER_SLUG]: 'HVCI, TPM, Secure Boot on',
        [UGC_SLUG]: 'HVCI, TPM, Secure Boot on',
        [SKIN_CHANGER_SLUG]: 'HVCI, TPM, Secure Boot on',
      },
    },
  ],
  ctaTitle: 'Still deciding?',
  ctaDesc: 'Tell support what happened or what you want to do, and they will point you to the right product before you pay.',
  ctaSupport: 'Ask support',
  menuHeading: 'Products',
  menuViewAll: 'Compare all products',
  menuTaglines: {
    [CHEATS_PRIMARY_SLUG]: 'Aimbot, player ESP, item ESP, and radar',
    [HWID_SPOOFER_SLUG]: 'Refresh disk, MAC, and GPU IDs',
    [UGC_SLUG]: 'Template appeals with dispute runners',
    [SKIN_CHANGER_SLUG]: 'On-screen skins, outfits, knives',
  },
};

const byLocale: Record<SiteLocale, CatalogCopy> = {
  en,
  es: es as CatalogCopy,
  de: de as CatalogCopy,
  fr: fr as CatalogCopy,
};

const finalized = Object.fromEntries(
  Object.entries(byLocale).map(([locale, copy]) => [locale, deepApplySiteTokens(copy)]),
) as Record<SiteLocale, CatalogCopy>;

export function getCatalogCopy(locale: SiteLocale): CatalogCopy {
  return finalized[locale];
}
