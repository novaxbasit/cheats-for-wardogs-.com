import { SITE_DOMAIN as SITE_DOMAIN_VALUE } from './site-url.mjs';

export const SITE_DOMAIN = SITE_DOMAIN_VALUE;
export const SITE_URL = `https://${SITE_DOMAIN}`;
/** Public brand string (header, legal, schema). Override via env when re-skinning the template. */
const publicSiteName =
  typeof import.meta !== 'undefined'
    ? (import.meta.env?.PUBLIC_SITE_NAME as string | undefined)
    : undefined;

export const SITE_NAME = publicSiteName?.trim() || 'Cheats For Wardogs';
export const PRODUCT_BASE = '/cheats/';
export const HWID_SPOOFER_PATH = '/hwid-spoofer/';
export const UGC_PATH = '/ugc/';
export const SKIN_CHANGER_PATH = '/skin-changer/';
/** Catalog page listing every product; each card links to its detail page. */
export const PRODUCTS_HUB_PATH = '/products/';
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;
