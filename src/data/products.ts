import {
  ALL_UTILITY_PRODUCT_SLUGS,
  CHEAT_PRODUCT_SLUGS,
  CHEATS_PRIMARY_SLUG,
  HWID_SPOOFER_SLUG,
  SKIN_CHANGER_SLUG,
  UGC_SLUG,
  UTILITY_PRODUCT_PATHS,
  UTILITY_PRODUCT_SLUGS,
  type UtilityProductSlug,
} from '../config/catalog';
import { PRODUCT_BASE } from '../config/site';
import { CHEAT_PRODUCT_NAME } from '../config/game';
import { getTranslations } from '../i18n';
import { deepApplySiteTokens } from '../i18n/brandTokens';
import type { SiteLocale } from '../i18n/locales';
import type { Translations } from '../i18n/types';
import { checkoutForSlug } from '../config/checkout';
import { WARDOGS_SHOWCASE_GALLERY_KEYS } from '../config/gameplayMedia';
import { HWID_GALLERY_KEYS } from '../config/hwidMedia';
import type { IconName } from '../components/icons/types';
import { getProductCopyBundle, registerProductCopyBundle, type ProductCopyBundle } from './products/exportCopy';
import esProductCopy from './products/locales/es.json';
import deProductCopy from './products/locales/de.json';
import frProductCopy from './products/locales/fr.json';

export interface ProductSlide {
  /** Still image, or the poster frame when `videoSrc` is set. */
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
  width?: number;
  height?: number;
  /** `image` unless a clip is attached. */
  kind?: 'image' | 'video';
  /** MP4 or WebM. The slider shows this instead of the still; `src` stays the poster. */
  videoSrc?: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
  relatedForumSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  elite: [
    'wardogs-cheats-buyers-guide',
    'wardogs-aimbot-settings',
    'wardogs-esp-radar-explained',
    'are-wardogs-cheats-safe',
    'wardogs-cheat-not-working',
    'wardogs-hwid-spoofer-guide',
  ],
  'hwid-spoofer': [
    'wardogs-hwid-spoofer-guide',
    'are-wardogs-cheats-safe',
    'wardogs-cheats-buyers-guide',
    'wardogs-cheat-not-working',
    'wardogs-aimbot-settings',
    'wardogs-esp-radar-explained',
  ],
  ugc: [
    'wardogs-cheats-buyers-guide',
    'are-wardogs-cheats-safe',
    'wardogs-cheat-not-working',
    'wardogs-hwid-spoofer-guide',
    'wardogs-aimbot-settings',
    'wardogs-esp-radar-explained',
  ],
  'skin-changer': [
    'wardogs-skin-changer',
    'wardogs-cheats-buyers-guide',
    'are-wardogs-cheats-safe',
    'wardogs-esp-radar-explained',
    'wardogs-aimbot-settings',
    'wardogs-cheat-not-working',
  ],
};

/** Community threads paired with each product detail page */
export const productRelatedForumSlugs: Record<string, string[]> = {
  elite: [
    'wardogs-esp-vs-radar-difference',
    'wardogs-aimbot-settings-fov-prediction',
    'what-to-check-before-buying-wardogs-cheats',
    'wardogs-esp-vs-aimbot-feature-comparison',
  ],
  'hwid-spoofer': [
    'wardogs-hwid-spoofer-ban-questions',
    'wardogs-cheats-not-working-after-update',
    'wardogs-cheats-status-after-game-update',
    'what-to-check-before-buying-wardogs-cheats',
  ],
  ugc: [
    'wardogs-cheats-ban-risk-account-safety',
    'what-to-check-before-buying-wardogs-cheats',
    'wardogs-hwid-spoofer-ban-questions',
    'wardogs-cheats-not-working-after-update',
  ],
  'skin-changer': [
    'wardogs-skin-changer-cosmetic-unlock-policy',
    'wardogs-esp-vs-aimbot-feature-comparison',
    'wardogs-undetected-external-cheat-claims',
    'wardogs-cheats-ban-risk-account-safety',
  ],
};

const productBase = PRODUCT_BASE;

const hwidPlanStep: AcquisitionStep = {
  num: '02',
  title: 'Choose monthly or lifetime',
  desc: 'Pick Monthly at $50 for 31 days or Lifetime at $150 for unlimited access. Both ship the operator panel plus the trace cleaner in one license.',
};

const ugcPlanStep: AcquisitionStep = {
  num: '02',
  title: 'Choose monthly or lifetime',
  desc: 'Monthly costs $35 for 31 days; Lifetime is $150 with unlimited access. Either plan unlocks the same UGC automation workspace.',
};

const skinPlanStep: AcquisitionStep = {
  num: '02',
  title: 'Choose your cosmetic license length',
  desc: 'Monthly is $35 for 31 days; Lifetime is $150 with unlimited access. Billing cadence changes; the cosmetic library does not.',
};

const windowsSecurityStep: AcquisitionStep = {
  num: '03',
  title: 'Prepare Windows security settings',
  desc: 'Enable HVCI and Core Isolation under Windows Security, then switch on TPM and Secure Boot in firmware, before your first session.',
};

const hwidAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Verify anti-cheat coverage',
    desc: 'Published stacks include Riot Vanguard, Easy Anti-Cheat, BattlEye, Ricochet, and related families. Cross-check your title against that list and the status banner on {siteDomain} before you pay.',
  },
  hwidPlanStep,
  {
    ...windowsSecurityStep,
    desc: `${windowsSecurityStep.desc} Spoof and cleaner actions also need administrator rights on this PC.`,
  },
  {
    num: '04',
    title: 'Run spoof, then cleaner, then launch',
    desc: 'Use the portal guide sequence: commit identifier changes, run the bundled cleanup pass, then open the game client.',
  },
];

const ugcAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Confirm the restriction type',
    desc: 'UGC targets account limits on gaming, social, or marketplace profiles. When new accounts fail only on one machine, treat it as hardware-side and use the HWID path instead of appeals.',
  },
  ugcPlanStep,
  windowsSecurityStep,
  {
    num: '04',
    title: 'Draft and automate your appeal',
    desc: 'Translate platform rules into a UGC workflow, then let automation replay dispute steps instead of retyping each ticket.',
  },
];

const skinChangerAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Ask support about title coverage',
    desc: 'Coverage spans major titles but shifts when patches land. Email support with your game name before checkout to confirm cosmetics remain listed.',
  },
  skinPlanStep,
  windowsSecurityStep,
  {
    num: '04',
    title: 'Load outfits from the menu',
    desc: 'Once the portal delivers access, open the lightweight client and pick weapon skins, outfits, or knife variants for that play session.',
  },
];

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on {siteDomain} before purchase, especially after a Wardogs or anti-cheat update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Wardogs Cheats or the utility that matches your goal. Review the feature list before checkout via our partner checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Contact support and confirm availability, Windows setup, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use the setup guide after purchase. Contact support for installation help if you need it. Confirm compatibility with your current game build before you launch.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Game builds and anti-cheat updates can change compatibility and feature availability. Confirm current status on {siteDomain} before you purchase or launch.';

const sharedLimitations =
  'Third-party cheat software can be detected, may stop working after game updates, and can result in account restrictions or bans. Compatibility and availability can change without notice.';

const windowsSecurityRequirements: SystemRequirement[] = [
  { icon: 'reqShieldGuide', text: 'HVCI and Core Isolation turned on in Windows Security.' },
  { icon: 'reqSettings', text: 'TPM and Secure Boot enabled in BIOS/UEFI.' },
];

const mainProductSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit (Intel or AMD).' },
  { icon: 'reqSettings', text: 'Borderless or windowed display mode.' },
  { icon: 'reqWifi', text: 'Stable internet and loader access after purchase.' },
  { icon: 'reqShieldGuide', text: 'Steam, Battle.net, or Xbox Game Pass (compatibility varies by build).' },
];

const galleryRaw = {
  gpEspGameplayChams: {
    width: 1024,
    height: 576,
    src: '/images/gameplay/wardogs-esp-gameplay-chams.webp',
    alt:
      'Wardogs first-person rifle view with an enemy outlined in red through a concrete wall, a head aim marker, compass, and minimap on screen.',
    caption: 'ESP through cover',
    captionDesc: 'Player ESP chams and aim markers while the aimbot tab stays open in a live match.',
  },
  gpAimbotMenu: {
    width: 772,
    height: 432,
    src: '/images/gameplay/wardogs-aimbot-menu.webp',
    alt:
      'Dark Wardogs cheat menu on the Aimbot tab with enable aimbot, memory aim, FOV, smoothing, and hitbox dropdowns.',
    caption: 'Aimbot controls',
    captionDesc: 'Toggle aim assistance, set FOV and smoothing, and pick a target hitbox from the sidebar menu.',
  },
  gpColorSettingsMenu: {
    width: 769,
    height: 432,
    src: '/images/gameplay/wardogs-color-settings-menu.webp',
    alt:
      'Wardogs cheat Colors tab listing enemy box, skeleton, health, armor, name, distance, FOV circle, crosshair, and vehicle color swatches.',
    caption: 'ESP color presets',
    captionDesc: 'Assign colors for enemy overlays, crosshair, FOV ring, and world object highlights.',
  },
} satisfies Record<
  string,
  {
    src: string;
    alt: string;
    caption: string;
    captionDesc: string;
    width: number;
    height: number;
    videoSrc?: string;
  }
>;

type GalleryKey = keyof typeof galleryRaw;

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((key) => {
    const item = galleryRaw[key];
    if (!item) throw new Error(`Missing gallery key: ${String(key)}`);
    const { src, alt, caption, captionDesc, width, height, videoSrc } = item;
    return {
      src,
      alt,
      caption,
      captionDesc,
      width,
      height,
      ...(videoSrc ? { videoSrc, kind: 'video' as const } : {}),
    };
  });
}

const wardogsShowcaseSlides = slide(...WARDOGS_SHOWCASE_GALLERY_KEYS);

const hwidGalleryRaw = {
  hwidSerialCheck: {
    src: '/images/hwid-spoofer/hwid-spoofer-serial-check-panel.webp',
    alt: 'Operator dashboard with disk, board, display, UUID, GPU, and network rows marked changed or unchanged beside a check-serials control.',
    caption: 'Identifier audit view',
    captionDesc: 'Each row reports whether a hardware value changed after the latest spoof cycle.',
  },
  hwidUefiSpoof: {
    src: '/images/hwid-spoofer/hwid-spoofer-uefi-spoof-panel.webp',
    alt: 'Firmware tab showing permanent spoof toggle, GPU and ethernet switches, and a seed field on a dark mountain-themed panel.',
    caption: 'Firmware spoof tab',
    captionDesc:
      'Toggle GPU or ethernet spoofing, enter a seed, and apply permanent changes from the firmware screen.',
  },
} satisfies Record<
  string,
  { src: string; alt: string; caption: string; captionDesc: string; videoSrc?: string }
>;

type HwidGalleryKey = keyof typeof hwidGalleryRaw;

function hwidSlide(...keys: HwidGalleryKey[]): ProductSlide[] {
  return keys.map((key) => {
    const item = hwidGalleryRaw[key];
    const { src, alt, caption, captionDesc, videoSrc } = item;
    return {
      src,
      alt,
      caption,
      captionDesc,
      ...(videoSrc ? { videoSrc, kind: 'video' as const } : {}),
    };
  });
}

const hwidShowcaseSlides = hwidSlide(...HWID_GALLERY_KEYS);

const ugcShowcaseSlides: ProductSlide[] = [
  {
    src: '/images/ugc/ugc.webp',
    alt: 'Crimson gear emblem with a clock face and speed lines used as the UGC product mark.',
    caption: 'Appeal control desk',
    captionDesc: 'Template library and automated dispute runners for limited profiles.',
  },
];

const skinChangerShowcaseSlides: ProductSlide[] = [
  {
    src: '/images/skin-changer/skin-changer.webp',
    alt: 'Steel shield icon reading Skin Changer with crossed rifles, revolvers, and star highlights.',
    caption: 'On-device cosmetic picker',
    captionDesc: 'Weapon finishes, character outfits, and knife styles drawn only on your screen.',
  },
];

function slugFromHref(href: string): string {
  const normalized = href.replace(/^\//, '').replace(/\/$/, '');
  for (const slug of ALL_UTILITY_PRODUCT_SLUGS) {
    if (normalized === slug || normalized.endsWith(`/${slug}`)) return slug;
  }
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  if (!segment || segment === 'dota-2-cheats' || segment === 'cheats' || segment === 'product') {
    return CHEATS_PRIMARY_SLUG;
  }
  return segment;
}

const tierAbout: Record<string, ProductPage['about']> = {
  elite: [
    {
      type: 'p',
      text: 'Advertised modules include aimbot, aimlock, memory aimbot, aim prediction, triggerbot, player ESP, item ESP, radar, no recoil, no spread, full bright, and custom crosshair options in a menu-based interface.',
    },
    { type: 'h2', text: 'Configuration and support' },
    {
      type: 'p',
      text: 'The menu supports saving, loading, and organizing settings, with language customization and other interface options listed by the provider. Setup information is provided to help configure the software; update timing and feature availability may vary.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  elite: [
    { type: 'h2', text: 'Plans and delivery' },
    {
      type: 'p',
      text: 'Choose monthly ($35 for 31 days) or lifetime ($150) at checkout. Digital delivery and loader access are provided after purchase. Check the live status banner before every session.',
    },
    { type: 'h2', text: 'Updates and compatibility' },
    {
      type: 'p',
      text: 'The provider advertises compatibility maintenance following game updates. Actual compatibility may depend on the current game build and product version; verify before launch.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'Machine-level lockouts' },
    {
      type: 'p',
      text: 'Hardware flags stick to the PC, not only the username you used. If alternate rigs sign in fine while this box rejects every new account, identifiers likely need a refresh. The panel rewrites disk serials, MAC addresses, GPU IDs, and related fingerprints so authentication can proceed on a clean hardware profile. It will not lift sanctions that remain on the account itself.',
    },
    { type: 'h2', text: 'Documented anti-cheat families' },
    {
      type: 'p',
      text: 'We publish support notes for Riot Vanguard (Valorant), Easy Anti-Cheat, BattlEye, Ricochet (Call of Duty), ACE, Javelin, and comparable stacks. Vendors change detection rules, so confirm your title on this page before checkout.',
    },
    { type: 'h2', text: 'Trace cleanup bundled' },
    {
      type: 'p',
      text: 'The license includes a cleaner that removes leftover traces after spoofing. Finish identifier changes, run cleanup, then start the game following the active portal guide.',
    },
    { type: 'h2', text: 'What your PC needs' },
    {
      type: 'p',
      text: 'Use Windows 10 or 11 (64-bit) with administrator rights for spoof and cleaner tasks, HVCI, Core Isolation, TPM, and Secure Boot enabled, plus reliable internet for activation and updates.',
    },
  ],
  ugc: [
    { type: 'h2', text: 'Role of Unban & Governance Control' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) prepares appeals for limited gaming profiles, social handles, and marketplace storefronts. Build workflow templates once, then let the software resubmit dispute packets instead of copying the same message by hand.',
    },
    { type: 'h2', text: 'Outcomes stay with reviewers' },
    {
      type: 'p',
      text: 'Platforms decide every case, and some penalties never expire. UGC arranges evidence and wording only; it does not rotate hardware IDs, so machine-level bans stay outside its scope.',
    },
    { type: 'h2', text: 'What your PC needs' },
    {
      type: 'p',
      text: 'Run Windows 10 or 11 with HVCI, Core Isolation, TPM, and Secure Boot enabled before the first launch.',
    },
  ],
  'skin-changer': [
    { type: 'h2', text: 'What the library covers' },
    {
      type: 'p',
      text: 'The lightweight client layers premium weapon skins, character outfits, and rare knife variants onto supported games without purchasing each cosmetic item separately.',
    },
    { type: 'h2', text: 'Local rendering only' },
    {
      type: 'p',
      text: 'Looks exist on your display alone. Account inventories never gain items, trading stays impossible, and visuals disappear when the client closes. Assume other players will not see the finish.',
    },
    { type: 'h2', text: 'Title list maintenance' },
    {
      type: 'p',
      text: 'Major games appear on the supported list today, yet patches can remove entries. Ask support to confirm your title before you buy.',
    },
    { type: 'h2', text: 'What your PC needs' },
    {
      type: 'p',
      text: 'Windows 10 or 11 with HVCI, Core Isolation, TPM, and Secure Boot enabled, plus loader access after purchase.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  elite: {
    images: wardogsShowcaseSlides,
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: mainProductSystemRequirements,
    fullFeatures: [
      'Aimbot',
      'Aimlock',
      'Memory aimbot',
      'Aim prediction',
      'Triggerbot',
      'Customizable aim keys, FOV, hitbox, distance, visibility checks',
      'Target-switch delays and aiming indicators',
      'Controller-compatible aiming assistance',
      'Player ESP: 2D boxes, names, distance, weapon info, KDA',
      'Snaplines, proximity alerts, bot ESP, customizable ESP colors',
      'Item ESP and maximum ESP distance',
      'Radar',
      'No recoil and no spread options',
      'Full bright',
      'Custom crosshair',
      'Disable flash option',
      'Team check',
      'Show FPS and VSync settings',
      'Zoom level adjustment',
      'Save, load, and organize configs in the menu',
      'Language customization (menu)',
      'Windows 10 or 11 (Intel or AMD)',
      'Borderless or windowed mode',
      'Steam, Battle.net, Xbox Game Pass compatibility (varies by build)',
    ],
    overview: {
      title: 'Wardogs cheat suite on Windows',
      paragraphs: [
        'Wardogs Cheats advertises aiming assistance, player visibility enhancements, radar, and gameplay customization in a menu-based interface.',
        'Advertised for Windows 10 or 11 PCs using Intel or AMD processors, with borderless or windowed display modes and compatibility listed for Steam, Battle.net, and Xbox Game Pass. Monthly ($35, 31 days) and lifetime ($150) plans are listed at checkout. Verify compatibility on {siteDomain} before purchase or launch.',
      ],
    },
  },
  'hwid-spoofer': {
    images: hwidShowcaseSlides,
    goodToKnow:
      'Complete identifier rotation and run the cleaner before launching the game that triggered the hardware flag, using the portal guide order. Re-read anti-cheat coverage on the status banner before you pay.',
    limitations:
      'Built for hardware ID flags only; active account sanctions remain. Spoofing can conflict with publisher terms and invite new penalties. Anti-cheat support may end without notice after vendor updates.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11, 64-bit.' },
      { icon: 'reqSettings', text: 'Administrator rights for spoof and cleaner actions.' },
      ...windowsSecurityRequirements,
      { icon: 'reqWifi', text: 'Stable internet for activation and updates.' },
    ],
    fullFeatures: [
      'Disk serial refresh',
      'MAC address refresh',
      'GPU identifier refresh',
      'Extra hardware fingerprints covered',
      'Bundled trace cleanup tool',
      'Riot Vanguard (Valorant)',
      'Easy Anti-Cheat titles',
      'BattlEye titles',
      'Ricochet (Call of Duty)',
      'ACE, Javelin and other anti-cheats',
    ],
    overview: {
      title: 'Recover PCs flagged by major anti-cheat stacks',
      paragraphs: [
        'After a hardware ban, refresh disk serials, MAC addresses, GPU IDs, and related fingerprints so this machine can authenticate again. Documented coverage includes Vanguard, Easy Anti-Cheat, BattlEye, Ricochet, and similar stacks, with a cleaner included in the package.',
        'Choose it when other computers accept fresh logins but this one blocks them instantly. It cannot remove sanctions tied to the account record. Monthly ($50, 31 days) and Lifetime ($150) licenses include the same tooling.',
      ],
    },
  },
  ugc: {
    images: ugcShowcaseSlides,
    goodToKnow:
      'Gather ownership proof and a timeline before you automate filings. Platform reviewers keep final say on every appeal.',
    limitations:
      'No outcome is promised, and permanent suspensions remain permanent. UGC never changes hardware IDs or bypasses security controls, and weak evidence hurts your case.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11, 64-bit.' },
      ...windowsSecurityRequirements,
      { icon: 'reqWifi', text: 'Stable internet after purchase.' },
    ],
    fullFeatures: [
      'Workflow-driven appeal packets',
      'Repeatable dispute automation',
      'Cross-platform account coverage',
      'Gaming profile appeals',
      'Social handle appeals',
      'Marketplace storefront appeals',
      'Monthly or lifetime licenses',
      'Windows 10 and 11',
    ],
    overview: {
      title: 'Cross-platform account appeal automation',
      paragraphs: [
        'UGC (Unban & Governance Control) pairs custom appeal workflows with automated dispute handling for restricted gaming, social, and marketplace accounts.',
        'Success depends on each platform reviewer, and hardware-linked bans are out of scope. Monthly ($35, 31 days) and Lifetime ($150) licenses unlock the same capability set.',
      ],
    },
  },
  'skin-changer': {
    images: skinChangerShowcaseSlides,
    goodToKnow:
      'Cosmetics appear only inside your local client; inventories never receive items. Confirm title coverage with staff before checkout.',
    limitations:
      'Cosmetic clients may still break game terms and risk account action. Finishes are not real goods, cannot be traded, and disappear when the client exits. Supported games and items may change after patches or Windows updates.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11, 64-bit.' },
      ...windowsSecurityRequirements,
      { icon: 'reqWifi', text: 'Stable internet and loader access after purchase.' },
    ],
    fullFeatures: [
      'Premium weapon finish presets',
      'Character outfit presets',
      'Rare knife style presets',
      'Wide major-title coverage',
      'Lightweight local client',
      'On-screen-only cosmetic rendering',
      'Monthly or lifetime licenses',
      'Windows 10 and 11',
    ],
    overview: {
      title: 'High-end looks without per-item checkout',
      paragraphs: [
        'Skin Changer layers premium weapon skins, outfits, and knife variants onto supported games so you can skip buying each cosmetic separately.',
        'Rendering stays on your machine and never posts to account ledgers. Monthly ($35, 31 days) and Lifetime ($150) plans share one cosmetic library. Ask support to confirm your title before purchase.',
      ],
    },
  },
};

const utilityAcquisitionSteps: Record<UtilityProductSlug, AcquisitionStep[]> = {
  [HWID_SPOOFER_SLUG]: hwidAcquisitionSteps,
  [UGC_SLUG]: ugcAcquisitionSteps,
  [SKIN_CHANGER_SLUG]: skinChangerAcquisitionSteps,
};

function buildTierPages(t: Translations): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = CHEAT_PRODUCT_NAME;
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.heroDesc ?? cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      relatedForumSlugs: productRelatedForumSlugs[slug] ?? [],
    };
  });
}

function findProductCard(t: Translations, slug: UtilityProductSlug) {
  const match = (items: Translations['products']['items']) =>
    items.find((item) => slugFromHref(item.href) === slug);
  return match(t.products.items) ?? match(getTranslations('en').products.items);
}

function buildUtilityPages(t: Translations): ProductPage[] {
  return UTILITY_PRODUCT_SLUGS.flatMap((slug) => {
    const product = findProductCard(t, slug);
    const content = productContent[slug];
    if (!product || !content) return [];

    return [
      {
        slug,
        kind: 'utility' as const,
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: Math.max(0, content.fullFeatures.length - product.features.length),
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: {
          title: acquisitionFor(product.title).title,
          steps: utilityAcquisitionSteps[slug],
        },
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
        relatedForumSlugs: productRelatedForumSlugs[slug] ?? [],
      },
    ];
  });
}

export function getProductPages(locale: SiteLocale): ProductPage[] {
  const t = getTranslations(locale);
  return [...buildTierPages(t), ...buildUtilityPages(t)].map((page) =>
    deepApplySiteTokens(applyProductCopy(page, locale)),
  );
}

export function getCheatPages(locale: SiteLocale) {
  return getProductPages(locale).filter((p) => p.kind === 'tier');
}

export function getProductPage(slug: string, locale: SiteLocale) {
  return getProductPages(locale).find((p) => p.slug === slug);
}

/** Tier slugs for sitemap extras, store lives at `PRODUCT_BASE` only. */
export function getAllProductSlugs(): string[] {
  const slugs = getAllCheatSlugs();
  const catalog = new Set<string>(CHEAT_PRODUCT_SLUGS);
  for (const slug of slugs) {
    if (!catalog.has(slug as (typeof CHEAT_PRODUCT_SLUGS)[number])) {
      throw new Error(`Cheat slug "${slug}" missing from CHEAT_PRODUCT_SLUGS in src/config/catalog.ts`);
    }
  }
  return [];
}

export function getHwidSpooferPage(locale: SiteLocale) {
  return getProductPage(HWID_SPOOFER_SLUG, locale);
}

export function getUtilityPages(locale: SiteLocale) {
  return getProductPages(locale).filter((p) => p.kind === 'utility');
}

export function utilityProductPath(slug: UtilityProductSlug): string {
  return UTILITY_PRODUCT_PATHS[slug];
}

export function getAllCheatSlugs() {
  return getCheatPages('en').map((p) => p.slug);
}

export function getHeroSlides(_locale: SiteLocale): ProductSlide[] {
  return wardogsShowcaseSlides;
}

const productCopyByLocale: Record<Exclude<SiteLocale, 'en'>, ProductCopyBundle> = {
  es: esProductCopy as ProductCopyBundle,
  de: deProductCopy as ProductCopyBundle,
  fr: frProductCopy as ProductCopyBundle,
};

function acquisitionTitleFor(productName: string) {
  return `How to get ${productName}`;
}

function buildEnglishProductCopyBundle(): ProductCopyBundle {
  const tierSlugs = ['elite'] as const;
  const utilitySlugs = ALL_UTILITY_PRODUCT_SLUGS;

  const tiers = Object.fromEntries(
    tierSlugs.map((slug) => {
      const content = productContent[slug];
      const displayName = CHEAT_PRODUCT_NAME;
      return [
        slug,
        {
          about: tierAbout[slug],
          body: tierBodies[slug] ?? [],
          overview: content.overview,
          goodToKnow: content.goodToKnow,
          limitations: content.limitations,
          acquisitionTitle: acquisitionTitleFor(displayName),
        },
      ];
    }),
  ) as ProductCopyBundle['tiers'];

  const utilities = Object.fromEntries(
    utilitySlugs.map((slug) => {
      const content = productContent[slug];
      const title = findProductCard(getTranslations('en'), slug)?.title ?? slug;
      return [
        slug,
        {
          body: utilityBodies[slug] ?? [],
          overview: content.overview,
          goodToKnow: content.goodToKnow,
          limitations: content.limitations,
          acquisitionTitle: acquisitionTitleFor(title),
          acquisitionSteps: utilityAcquisitionSteps[slug],
          systemRequirements: content.systemRequirements.map((r) => r.text),
        },
      ];
    }),
  ) as ProductCopyBundle['utilities'];

  return {
    sharedGoodToKnow,
    sharedLimitations,
    acquisitionSteps: defaultAcquisitionSteps.map(({ num, title, desc }) => ({ num, title, desc })),
    systemRequirements: mainProductSystemRequirements.map((r) => r.text),
    gallery: Object.values(galleryRaw).map(({ alt, caption, captionDesc }) => ({
      alt,
      caption,
      captionDesc,
    })),
    tiers,
    utilities,
  };
}

registerProductCopyBundle(buildEnglishProductCopyBundle());

export const heroSlides = getHeroSlides('en');

function productCopyFor(locale: SiteLocale): ProductCopyBundle {
  if (locale === 'en') return getProductCopyBundle();
  return productCopyByLocale[locale];
}

function applyProductCopy(page: ProductPage, locale: SiteLocale): ProductPage {
  if (locale === 'en') return page;
  const copy = productCopyFor(locale);
  const bucket = page.kind === 'tier' ? copy.tiers[page.slug] : copy.utilities[page.slug];
  if (!bucket) return page;

  const isTier = page.kind === 'tier';
  const localizedSteps = isTier ? copy.acquisitionSteps : 'acquisitionSteps' in bucket ? bucket.acquisitionSteps : undefined;
  const localizedRequirements = isTier
    ? copy.systemRequirements
    : 'systemRequirements' in bucket
      ? bucket.systemRequirements
      : undefined;

  const acquisition: ProductAcquisition = {
    title: bucket.acquisitionTitle,
    steps: localizedSteps?.map((step) => ({ ...step })) ?? page.acquisition.steps,
  };

  const localizedGallery = isTier ? copy.gallery : 'gallery' in bucket ? bucket.gallery : undefined;
  const images = localizedGallery
    ? page.images.map((slide, index) => {
        const g = localizedGallery[index];
        if (!g) return slide;
        return { ...slide, alt: g.alt, caption: g.caption, captionDesc: g.captionDesc };
      })
    : page.images;
  const fullFeatures =
    'fullFeatures' in bucket && bucket.fullFeatures?.length ? bucket.fullFeatures : page.fullFeatures;

  const systemRequirements = page.systemRequirements.map((req, index) => ({
    ...req,
    text: localizedRequirements?.[index] ?? req.text,
  }));

  return {
    ...page,
    overview: bucket.overview,
    body: bucket.body,
    about: 'about' in bucket ? bucket.about : page.about,
    goodToKnow: bucket.goodToKnow,
    limitations: bucket.limitations,
    acquisition,
    images,
    fullFeatures,
    systemRequirements,
  };
}
