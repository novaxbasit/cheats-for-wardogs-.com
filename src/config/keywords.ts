/**
 * Keyword homes (Part 3). One primary on `/`, one secondary per assigned route.
 * Copy parts use these as SEO targets without creating new pages.
 */
export const PRIMARY_KEYWORD = 'Wardogs Cheats';

/** One representative secondary keyword per route (page SEO focus). */
export const SECONDARY_KEYWORD_BY_PATH: Record<string, string> = {
  '/cheats/': 'Wardogs Hacks',
  '/hwid-spoofer/': 'Wardogs HWID Spoofer',
  '/ugc/': 'Wardogs Account Recovery',
  '/skin-changer/': 'Wardogs Skin Changer',
  '/products/': 'Buy Wardogs Cheats',
  '/faq/': 'Wardogs Wallhack',
  '/blog/': 'Best Wardogs Cheats',
  '/forum/': 'Wardogs PC Cheats',
  '/support/': 'Wardogs Cheat Download',
};

/** Each CONFIG secondary keyword maps to exactly one existing page. */
export const SECONDARY_KEYWORD_HOME: Record<string, string> = {
  'Wardogs Hacks': '/cheats/',
  'Wardogs Aimbot': '/cheats/',
  'Wardogs ESP': '/products/',
  'Wardogs Wallhack': '/faq/',
  'Wardogs Vehicle ESP': '/cheats/',
  'Wardogs Radar Hack': '/cheats/',
  'Wardogs No Recoil': '/cheats/',
  'Wardogs No Spread': '/cheats/',
  'Wardogs Cheat Download': '/support/',
  'Wardogs Hack Download': '/cheats/',
  'Buy Wardogs Cheats': '/products/',
  'Best Wardogs Cheats': '/blog/',
  'Undetected Wardogs Cheats': '/cheats/',
  'Wardogs Cheat Menu': '/cheats/',
  'Wardogs Streamproof Cheats': '/cheats/',
  'Wardogs Config Cheats': '/cheats/',
  'Wardogs HWID Spoofer': '/hwid-spoofer/',
  'Wardogs Skin Changer': '/skin-changer/',
  'Wardogs Cheats Lifetime': '/cheats/',
  'Wardogs PC Cheats': '/forum/',
};
