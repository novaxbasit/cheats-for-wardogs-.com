import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, ROUTES } from '../utils/path';
import type { SiteLocale } from '../i18n/locales';
import { getSiteFaqs as getSiteFaqsForLocale } from './faq/locale';
import { isUtilityEnabled } from '../config/catalog';
import { applySiteTokens } from '../i18n/brandTokens';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'aim'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
  /** Utility slugs the answer talks about; the item is hidden when any of them is not sold. */
  requires?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const cheats = link('{cheatProduct}', ROUTES.cheats);
const hwid = link('HWID Spoofer', ROUTES.hwidSpoofer);
const ugc = link('UGC', ROUTES.ugc);
const skinChanger = link('Skin Changer', ROUTES.skinChanger);
const allProducts = link('products page', ROUTES.productsHub);
const faqPage = link('full FAQ', ROUTES.faq);
const blog = link('blog guides', ROUTES.blog);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if Wardogs cheats are online?',
    a: a('The live status banner is on {siteDomain}. Always check after a Wardogs or anti-cheat update.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('Your portal grants loader access, the setup guide and config library via our partner checkout. Follow the guide before launching Wardogs.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party wardogs cheats?',
    a: a('Yes, any modification carries risk. anti-cheat and report systems evolve. Read current status and accept the risk before use.'),
    aHtml:
      'Yes, any modification carries risk. Anti-cheat and report systems evolve. Read current status and accept the risk before use.',
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('Wardogs on Windows 10/11 64-bit only. macOS and Linux are not supported.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Yes, use the HWID reset in your portal or open a support ticket. Limits depend on your tier.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are products and utilities listed?',
    a: `Every product is listed on the ${allProducts}: {productList}. Each one has its own page with a feature list and checkout via our partner.`,
  },
  {
    id: 'ugc-what',
    topic: 'products',
    icon: 'accountRecovery',
    q: 'How does UGC handle restricted accounts?',
    a: `${ugc} (Unban & Governance Control) builds appeal workflows and runs automated dispute filings for limited gaming profiles, social handles, or marketplace storefronts on any platform.`,
    scopes: ['ugc'],
    requires: ['ugc'],
  },
  {
    id: 'ugc-guarantee',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Will UGC promise an unban?',
    a: a('No. UGC formats evidence and messaging, but reviewers decide each case and some suspensions never lift. No tool can promise a reversal.'),
    scopes: ['ugc'],
    requires: ['ugc'],
  },
  {
    id: 'ugc-vs-hwid',
    topic: 'products',
    icon: 'faqHwidWhen',
    q: 'UGC or HWID Spoofer for my issue?',
    a: `Profile or account limits map to ${ugc} and its appeal automation. When only this PC blocks brand-new logins, treat it as hardware-side and use ${hwid} instead.`,
    scopes: ['ugc', 'hwid-spoofer'],
    requires: ['ugc', 'hwid-spoofer'],
  },
  {
    id: 'skin-visible',
    topic: 'products',
    icon: 'cosmetic',
    q: 'Does Skin Changer add items to my inventory?',
    a: `No. ${skinChanger} draws cosmetics on your client only, so inventories stay empty, trades stay impossible, and other players likely never see the finish.`,
    scopes: ['skin-changer'],
    requires: ['skin-changer'],
  },
  {
    id: 'skin-games',
    topic: 'products',
    icon: 'faqPlatforms',
    q: 'Which titles work with Skin Changer?',
    a: a('Major games appear on the product page, yet patches can drop support. Email support with your title before checkout.'),
    scopes: ['skin-changer'],
    requires: ['skin-changer'],
  },
  {
    id: 'utility-requirements',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which Windows settings do utilities require?',
    a: a('Use Windows 10 or 11 with HVCI, Core Isolation, TPM, and Secure Boot enabled in Windows Security and firmware. HWID Spoofer also needs administrator rights; see each utility page for the rest.'),
    scopes: ['hwid-spoofer', 'ugc', 'skin-changer'],
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is Wardogs ESP?',
    a: `Player ESP shows boxes, names, distance, weapon info, KDA, snaplines, and proximity alerts. Item ESP covers loot with distance caps. ${cheats} bundles aimbot, radar, and handling options in one menu.`,
    scopes: ['elite'],
  },
  {
    id: 'esp-vs-aim',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What is the difference between ESP and aimbot?',
    a: `ESP layers are information overlays; they do not move your crosshair. Aimbot, aimlock, no recoil, and triggerbot are combat assists on ${cheats}, tuned separately in the loader.`,
  },
  {
    id: 'elite-slots',
    topic: 'plans',
    icon: 'faqEliteSlots',
    q: 'Why are Wardogs Cheats slots limited?',
    a: `Wardogs Cheats is a private build with direct dev support and priority patch delivery. Slot caps keep patch cycles fast. Check the status banner before checkout.`,
    scopes: ['elite'],
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Can OBS capture my overlay?',
    a: `Stream-proof mode on ${cheats} hides overlays from OBS. Test a local recording before going live.`,
  },
  {
    id: 'build-status',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Will the build stay online after every patch?',
    a: a('No. Online status is shown on the product page and status banner at purchase time only. Stop if the build shows updating, testing, or offline after an anti-cheat update.'),
  },
  {
    id: 'esp-safer',
    topic: 'safety',
    icon: 'faqEspSafer',
    q: 'Is ESP lower-profile than aimbot?',
    a: a('ESP is often less obvious than maxed aimbot, but it is still a cheat. The game\'s anti-cheat does not ignore overlays because you left aim assist off.'),
  },
  {
    id: 'hwid-when',
    topic: 'products',
    icon: 'faqHwidWhen',
    q: 'When is HWID Spoofer the right fix?',
    a: `${hwid} addresses hardware ID flags when other PCs accept logins but this one refuses them. It refreshes disk serials, MAC addresses, GPU IDs, and related values, includes a cleaner, and cannot clear an account that stays sanctioned.`,
    scopes: ['hwid-spoofer'],
    requires: ['hwid-spoofer'],
  },
  {
    id: 'external-loader',
    topic: 'products',
    icon: 'faqExternalLoader',
    q: 'Is the loader injected into the game folder?',
    a: `{siteName} runs external with cloud config sync, no files injected into the Wardogs directory. Anti-cheat risk still applies. See ${cheats}.`,
  },
  {
    id: 'blog-vs-cheats',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are blog cheat codes the same as live Wardogs cheats?',
    a: `No. Blog articles about offline or local testing do not replace the live loader. Live Wardogs sessions use ${cheats} when status is online.`,
  },
  {
    id: 'blog-setup',
    topic: 'blog',
    icon: 'faqBlogSetup',
    q: 'Where do blog setup guides point for purchase?',
    a: `Guides link to the product pages, such as ${cheats}. Checkout runs through our partner, never paste loader files from random messages.`,
  },
  {
    id: 'who-cheats',
    topic: 'plans',
    icon: 'faqWhoElite',
    q: 'Who should buy Wardogs Cheats?',
    a: `Players who want aimbot, player ESP, item ESP, radar, and priority patch delivery when slots are open on Wardogs.`,
    scopes: ['elite'],
  },
  {
    id: 'vac-update',
    topic: 'safety',
    icon: 'faqVacUpdate',
    q: 'What should I do after an anti-cheat update?',
    a: a('Check {siteDomain} status. Do not launch until the banner shows online. Load conservative presets after any patch.'),
  },
  {
    id: 'discord-help',
    topic: 'setup',
    icon: 'headphones',
    q: 'How do I get install help?',
    a: a('Open a support ticket after purchase with your order email, Windows version and Wardogs client build. Staff walk through loader setup from there.'),
  },
  {
    id: 'pmc-scav-raids',
    topic: 'plans',
    icon: 'faqTurboRanked',
    q: 'Do modules work across Wardogs game modes?',
    a: `Yes. ${cheats} includes saved configs in the portal for different modes and maps. Tune ESP distance caps and aim smoothing before your first match.`,
  },
  {
    id: 'zoom-hack',
    topic: 'esp',
    icon: 'faqZoomHack',
    q: 'Which tier includes radar and item ESP?',
    a: `Radar and item ESP ship with ${cheats}. Use them to track nearby pushes and loot routes on each map.`,
    scopes: ['elite'],
  },
  {
    id: 'trigger-bot',
    topic: 'aim',
    icon: 'faqAutoFarm',
    q: 'Does the product include trigger bot?',
    a: `Optional trigger bot ships with ${cheats} alongside aimbot and no recoil. Start with conservative delay presets in the portal.`,
    scopes: ['elite'],
  },
  {
    id: 'private-cheats',
    topic: 'safety',
    icon: 'faqPrivateCheats',
    q: 'What are private Wardogs cheats?',
    a: a('Private means per-user keys and maintained builds, not public zip packs. {siteName} ships portal delivery for the full Wardogs suite on one cheats license.'),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `This site includes landing FAQs and per-page sections. See the ${faqPage} for all product, cheat and blog answers, or read ${blog} for deep guides.`,
  },
];

/** Shared FAQ block copy + filters (home, /faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Filter plans, ESP, aim, weapon handling, products, setup, and blog answers.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'aim',
  'safety',
  'products',
  'blog',
  'setup',
];

/** Section copy when FAQ list is scoped to the current page (not /faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading. Visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export { getProductFaqs, getSiteFaqs, getLandingFaqs, getAllFaqs } from './faq/locale';

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  'Buyer Guides': [
    {
      id: 'blog-buyer-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Do blog buyer guides replace the live loader?',
      a: a('No. Guides explain what to check before checkout. Live Wardogs play still uses the product on {siteDomain} when status shows online.'),
    },
    {
      id: 'blog-buyer-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which product matches a buyer guide checklist?',
      a: `Feature checklists map to ${cheats}. Recovery or hardware topics point to the matching utility on the ${allProducts}.`,
    },
    {
      id: 'blog-buyer-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this buyer guide still valid after a patch?',
      a: a('Check the article date and the live status banner. Patch-day notes on {siteDomain} override older screenshots.'),
    },
  ],
  Features: [
    {
      id: 'blog-features-esp',
      topic: 'blog',
      icon: 'faqBlogSlugEsp',
      q: 'Which product includes ESP from this article?',
      a: `${cheats} includes player ESP, item ESP, and radar overlays for Wardogs when status is online.`,
    },
    {
      id: 'blog-features-docs',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Where is the authoritative feature list?',
      a: `Articles summarize options. The live module list on ${cheats} is what checkout covers.`,
    },
  ],
  Comparisons: [
    {
      id: 'blog-compare-paid',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Do comparison articles remove enforcement risk for paid builds?',
      a: a('No. Comparisons explain tradeoffs. Any third-party tool can still lead to enforcement. Read status before you launch.'),
    },
    {
      id: 'blog-compare-checkout',
      topic: 'blog',
      icon: 'faqBlogSetup',
      q: 'Where do comparison guides link for purchase?',
      a: `Guides link to product pages such as ${cheats}. Checkout runs through our partner, not random file shares.`,
    },
  ],
  Tools: [
    {
      id: 'blog-tools-hwid',
      topic: 'blog',
      icon: 'faqBlogSlugHwid',
      q: 'Can a spoofer article replace the HWID product page?',
      a: `Articles teach ideas only. Pricing, requirements, and workflow scope stay on ${hwid}.`,
      requires: ['hwid-spoofer'],
    },
    {
      id: 'blog-tools-support',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Need help after reading a tools article?',
      a: a('Open a support ticket with your order email and the article slug. Staff reference the same portal steps as product pages.'),
    },
  ],
  Troubleshooting: [
    {
      id: 'blog-trouble-status',
      topic: 'blog',
      icon: 'faqBlogSecVac',
      q: 'Does this troubleshooting article mean the build is online?',
      a: a('No article replaces the live status banner. Check {siteDomain} after every patch before you launch.'),
    },
    {
      id: 'blog-trouble-support',
      topic: 'blog',
      icon: 'headphones',
      q: 'Still stuck after the checklist?',
      a: a('Contact support with your game build, Windows version and the exact error text. Include what you already tried from the article.'),
    },
  ],
  Guides: [
    {
      id: 'blog-guide-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Do offline cheat codes replace the live loader?',
      a: a('No. Local or offline testing does not replace the operator loader for Wardogs. Live play uses the product on {siteDomain} when status shows online.'),
    },
    {
      id: 'blog-guide-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which tier matches this guide?',
      a: `Setup and feature guides map to modules on ${cheats}. Ban recovery articles point to the matching utility on the ${allProducts}.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: a('Check the article date and the live status banner. Patch-day articles note when modules change. The status banner has the latest build notes.'),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout, not from third-party links in comments or DMs.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test settings before a live Wardogs session?',
      a: a('Yes. Load conservative ESP and aim presets offline or in a quiet area first. Raise FOV, smoothing, and ESP distance caps over several sessions.'),
    },
  ],
  Security: [
    {
      id: 'blog-sec-vac',
      topic: 'blog',
      icon: 'faqBlogSecVac',
      q: 'Does this article mean the build stays online?',
      a: a('No article replaces the live status banner. Check {siteDomain} after every patch before you launch.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to product pages such as ${cheats}. Feature lists on those pages are authoritative for checkout.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: a('Open a support ticket with your order email and the article slug. Staff reference the same portal presets mentioned in guides.'),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: a('Re-check status after every Wardogs update. Portal presets update with patch notes, reload configs instead of copying old sliders.'),
  },
];

export function getBlogFaqs(tag: string, slug: string, locale: SiteLocale = 'en'): SiteFaqItem[] {
  if (locale !== 'en') {
    const localized = getSiteFaqsForLocale(locale);
    const topicFaqs = localized.filter((f) => f.topic === 'blog').slice(0, 4);
    const extras: SiteFaqItem[] = [];
    if (slug.includes('esp') || slug.includes('loot') || slug.includes('radar')) {
      extras.push(...localized.filter((f) => f.topic === 'esp').slice(0, 2));
    }
    if (slug.includes('aim') || slug.includes('recoil') || slug.includes('trigger')) {
      extras.push(...localized.filter((f) => f.topic === 'aim').slice(0, 2));
    }
    if (slug.includes('hwid') || slug.includes('ban') || slug.includes('vac')) {
      extras.push(...localized.filter((f) => f.id === 'hwid-when' || f.topic === 'products').slice(0, 2));
    }
    extras.push(...localized.filter((f) => ['setup', 'safety'].includes(f.topic)).slice(0, 2));
    const seen = new Set<string>();
    return [...extras, ...topicFaqs, ...localized.filter((f) => f.topic === 'blog')].filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    }).slice(0, 8);
  }
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('esp') || slug.includes('loot') || slug.includes('radar')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which product covers ESP from this article?',
      a: `${cheats} includes player ESP, item ESP, and radar overlays described in our Wardogs guides.`,
    });
  }
  if (slug.includes('aim') || slug.includes('recoil') || slug.includes('trigger')) {
    slugHints.push({
      id: 'blog-slug-aim',
      topic: 'aim',
      icon: 'faqBlogSlugScripts',
      q: 'Which product includes aim modules from this article?',
      a: `${cheats} ships aimbot, no recoil and optional trigger bot with separate loader tabs.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('ban') || slug.includes('vac')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Do recovery guides replace HWID or cheat product pages?',
      a: `Recovery writeups support ${hwid} and ${cheats}; authoritative scope and limits remain on those product pages.`,
      requires: ['hwid-spoofer'],
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs]
    .filter((item) => (item.requires ?? []).every(isUtilityEnabled))
    .slice(0, 8)
    .map((item) => ({ ...item, a: applySiteTokens(item.a) }));
}

