import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import {
  HWID_SPOOFER_PATH,
  PRODUCT_BASE,
  PRODUCTS_HUB_PATH,
  SITE_DOMAIN,
  SITE_NAME,
  SKIN_CHANGER_PATH,
  UGC_PATH,
} from '../config/site';

const productBase = PRODUCT_BASE;

export const en: Translations = {
  site: {
    name: SITE_NAME,
    domain: SITE_DOMAIN,
    title: 'Wardogs Cheats | Aimbot, Player ESP and Radar',
    description:
      'Wardogs menu tools for aimbot, player ESP, item ESP, radar, and recoil options on Windows, with loader updates after patches. Compare plans at {siteDomain}.',
  },
  nav: [
    {
      id: 'products',
      href: PRODUCTS_HUB_PATH,
      label: 'Products',
      shortLabel: 'Products',
      sheetLabel: 'Browse products',
    },
    { id: 'blog', href: '/blog/', label: 'Blog', sheetLabel: 'Read the blog' },
    { id: 'forum', href: '/forum/', label: 'Forum', sheetLabel: 'Open the forum' },
    { id: 'faq', href: '/faq/', label: 'FAQ', sheetLabel: 'Pre-purchase questions' },
    { id: 'support', href: '/support/', label: 'Support', sheetLabel: 'Open support desk' },
  ],
  hero: {
    status: 'Wardogs, patch build online',
    eyebrow: '#1 CHEATS PROVIDER',
    titleLead: 'Wardogs ',
    titleAccent: 'Cheats for PC',
    subtitle:
      'Player ESP, aimbot, and radar tools for Wardogs on Windows. Browse products below to compare modules and monthly or lifetime plans before checkout.',
    ctaPrimary: 'View products',
    metrics: [
      { label: 'Stream-proof', strong: 'Yes' },
      { label: 'Patch speed', strong: '<24h' },
      { label: 'Users', strong: '300+' },
      { label: 'Live support', strong: '24/7' },
    ],
    statusPills: [
      'Player ESP',
      'Item ESP',
      'Radar Online',
      'Aimbot Ready',
      'Triggerbot',
      'No Recoil',
      'No Spread',
      'Stream Proof',
      'Full Bright',
      'Team Check',
      'Custom Crosshair',
      'Config Save',
      '24/7 Support',
      'Instant Delivery',
      'Live Status',
      'Patch Tracking',
      'FOV Controls',
      'Auto Updates',
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything you need in one package',
    subtitle:
      'Aim assists, player and item ESP, radar, and weapon handling options for Wardogs, maintained after patches.',
    items: [
      {
        title: 'Player ESP',
        subtitle: 'Read the firefight.',
        desc: '2D boxes, names, distance, weapon info, and KDA lines help you track pushes without tabbing out.',
        bullets: [
          'Snaplines and proximity alerts',
          'Bot ESP and team check filters',
          'Custom color presets per layer',
          'Max distance caps in menu',
          'Weapon and KDA readouts',
        ],
        tags: ['wardogs esp', 'player esp', 'snaplines'],
        bento: 'sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1',
      },
      {
        title: 'Item ESP',
        subtitle: 'Loot awareness.',
        desc: 'Item ESP highlights pickups and gear on the map with distance controls so you route safely.',
        bullets: [
          'Item labels and distance readouts',
          'Maximum ESP distance slider',
          'Toggle sets per game mode',
          'Pairs with radar overlays',
        ],
        tags: ['item esp', 'loot esp', 'distance cap'],
        bento: 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-2',
      },
      {
        title: 'Aimbot',
        subtitle: 'Tuned aim assists.',
        desc: 'Aimbot, aimlock, memory aim, and prediction settings share FOV, hitbox, and smoothing controls.',
        bullets: [
          'Custom aim keys and hitbox pick',
          'Visibility checks and switch delay',
          'Controller-compatible assists',
          'Aiming indicators in menu',
        ],
        tags: ['aimbot', 'aimlock', 'triggerbot'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-3',
      },
      {
        title: 'No Recoil',
        subtitle: 'Steadier bursts.',
        desc: 'No recoil and no spread options are designed to steady listed weapons when the menu exposes them.',
        bullets: [
          'Separate toggles per weapon class',
          'Strength sliders with caps',
          'Save handling presets to cloud',
          'Pair with aim FOV limits',
        ],
        tags: ['no recoil', 'no spread', 'weapon handling'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-3',
      },
      {
        title: 'Radar',
        subtitle: 'Nearby activity.',
        desc: 'Radar view is designed to show nearby movement so you can rotate before a flank closes in.',
        bullets: [
          'Activity blips around your position',
          'Opacity and scale controls',
          'Works beside ESP color layers',
          'Toggle without closing menu',
        ],
        tags: ['radar', 'wardogs radar', 'map awareness'],
        bento:
          'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-4',
      },
      {
        title: 'Trigger Bot',
        subtitle: 'Fire when aligned.',
        desc: 'Optional triggerbot fires when your crosshair meets a valid target, with delay and key gates.',
        bullets: [
          'Delay and hold-time tuning',
          'Team check aware firing',
          'Toggle separate from aimbot',
          'Conservative defaults in portal',
        ],
        tags: ['trigger bot', 'fire assist', 'wardogs cheats'],
        bento:
          'sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-4',
      },
      {
        title: 'Stream Proof',
        subtitle: 'Built for creators.',
        desc: 'Stream-proof modes are designed to keep overlays on your monitor while capture software records a clean feed.',
        bullets: ['OBS and Game Bar capture modes', 'Toggle stream proof per module', 'Test checklist in portal docs'],
        tags: ['obs capture', 'stream proof', 'capture hide'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-6',
      },
      {
        title: 'Visual toggles',
        subtitle: 'Clarity and HUD.',
        desc: 'Full bright, custom crosshair, disable flash, zoom level, and FPS or VSync options sit in the misc tab.',
        bullets: [
          'Full bright for dark maps',
          'Custom crosshair shapes',
          'Disable flash where listed',
          'Zoom level and HUD readouts',
        ],
        tags: ['full bright', 'crosshair', 'disable flash'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-6',
      },
      {
        title: 'Cloud Config & Updates',
        subtitle: 'Patch day ready.',
        desc: 'Save, load, and organize configs in the menu; portal delivery tracks Wardogs and anti-cheat patch days.',
        bullets: ['Cloud backup for profiles', 'Loader push within hours of patches', 'Status banner for build notes'],
        tags: ['cloud sync', 'auto update', 'presets'],
        bento: 'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-2',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why us',
    title: 'Wardogs tooling backed by patches, not promises',
    subtitle:
      'Many cheat shops ship stale loaders, loud rage presets, and ticket bots. {siteDomain} focuses on patch-day loader builds, readable ESP defaults, and live operators.',
    usLabel: '{siteName}',
    otherLabel: 'Typical provider',
    rows: [
      {
        title: 'Patch-day loader updates',
        desc: 'Anti-cheat-aware builds pushed within hours of Wardogs updates; check the live status banner before you queue.',
      },
      {
        title: 'Humanized aim & ESP defaults',
        desc: 'FOV caps, smoothing and distance filters ship conservative in the portal so overlays stay readable, not wall-of-box rage modes.',
      },
      {
        title: 'Live operators',
        desc: 'Real engineers for loader setup, ESP configs and HWID resets: 24/7 shift coverage, not copy-paste FAQ tickets.',
      },
      {
        title: 'External loader + stream proof',
        desc: 'Overlay suite with OBS capture modes, no risky DLL injection into the Wardogs process like legacy providers still sell.',
      },
      {
        title: 'Cloud preset sync',
        desc: 'Per-mode profiles backup to the portal, same sliders on any PC without rebuilding from scratch.',
      },
      {
        title: 'HWID reset & license moves',
        desc: 'HWID clears and machine transfers handled through support, most providers lock one rig or charge for every swap.',
      },
    ],
    metrics: [
      {
        value: '<24h',
        title: 'Patch turnaround',
        desc: 'Average time to ship a loader build after major Wardogs or anti-cheat changes.',
      },
      {
        value: '24/7',
        title: 'Operator support',
        desc: 'Engineers on shift for setup, configs and account issues.',
      },
      {
        value: '300+',
        title: 'Active operators',
        desc: 'Windows players running ESP, aimbot and utilities on {siteDomain}.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup guide',
    titleLead: 'From checkout to your first match in just',
    titleHighlight: 'three simple steps',
    intro:
      'Getting started is easy. Follow the operator portal flow to download the loader, load presets, and launch Wardogs on Windows.',
    ctaPrimary: 'Compare plans',
    ctaSecondary: 'Read the setup FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Unlock portal & download loader',
        desc: 'Complete checkout, open your operator dashboard, and pull the latest patch loader build for Windows.',
      },
      {
        step: 'Step 2',
        title: 'Launch & configure modules',
        desc: 'Run the external loader, import Wardogs presets, and tune ESP, aimbot, and radar sliders.',
      },
      {
        step: 'Step 3',
        title: 'Verify status & launch Wardogs',
        desc: 'Check the live status banner, launch the game client, and play with cloud-backed profiles saved in the portal.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform support',
    title: 'Runs on your rig.',
    subtitle: 'Check the live status banner before launching Wardogs after updates.',
    items: ['Windows 10 & 11', 'Wardogs', 'anti-cheat client', 'Auto updater', 'Config cloud sync', 'HWID reset', 'External loader'],
  },
  cheats: {
    eyebrow: 'Main product',
    title: 'Wardogs Cheats',
    subtitle: 'Aimbot, player ESP, item ESP, radar, and handling options with priority patch delivery.',
    viewAll: 'View product details',
    explore: 'Explore',
    items: [
      {
        badge: 'Limited slots',
        tier: 'Private',
        name: 'Wardogs Cheats',
        title: 'Wardogs Hacks for Windows',
        desc: 'Aimbot, player ESP, item ESP, radar, no recoil, no spread, and menu-listed options for Wardogs on Windows. Monthly ($35, 31 days) and lifetime ($150) at checkout.',
        heroDesc:
          'Configure aiming assists, player ESP, and radar from one menu. Confirm compatibility on {siteDomain} before you launch Wardogs.',
        features: ['Aimbot', 'Player ESP', 'Item ESP', 'Radar', 'No recoil', 'No spread'],
        more: 21,
        href: productBase,
        variant: 'limited',
      },
    ],
  },
  products: {
    eyebrow: 'Store',
    title: 'Our products',
    subtitle:
      'Every product has its own page with features, requirements and checkout.',
    viewAll: 'View all cheats',
    backToCheats: 'Back to product',
    showcaseHeading: 'Product Overview',
    experience: {
      eyebrow: 'Experience',
      title: 'Menu layers · After checkout',
      subtitle:
        'Screenshots above show the Wardogs menu layout; below is what each module group does and how portal access works after purchase.',
      previewLabel: 'In-game layers',
      accessDividerTop: 'Preview',
      accessDividerBottom: 'Access',
    },
    hwidPage: {
      showcaseHeading: 'Operator panel shots',
      overviewSubtitle:
        'See which identifiers rotate, which anti-cheat families we document, and how machine flags differ from account sanctions.',
      highlights: {
        eyebrow: 'Quick read',
        title: 'Scope of hardware refresh',
        desc: 'Disk, MAC, GPU, and related IDs can be refreshed after a hardware flag so this PC signs in again. Full tables appear lower on the page.',
      },
      featuresSection: {
        eyebrow: 'Coverage',
        title: 'Identifiers and anti-cheat lists',
        desc: 'Rows list fingerprint types the panel edits alongside the anti-cheat families we publish.',
      },
      experience: {
        eyebrow: 'Post-purchase',
        title: 'UI walkthrough · Portal steps',
        subtitle:
          'Panel callouts sit on the left; license delivery and setup order sit on the right.',
        previewLabel: 'Panel views',
        accessDividerTop: 'UI',
        accessDividerBottom: 'Steps',
      },
      highlightsMore: '{count} more rows are listed in the full feature table.',
    },
    utilityPages: {
      ugc: {
        showcaseHeading: 'Workflow stills',
        overviewSubtitle:
          'Learn how UGC maps restrictions to templates, which steps run automatically, and why platforms keep veto power.',
        highlights: {
          eyebrow: 'Focus',
          title: 'Appeal packet automation',
          desc: 'Gaming, social, and marketplace limits each get repeatable dispute workflows instead of manual copy paste.',
        },
        featuresSection: {
          eyebrow: 'Modules',
          title: 'Automation included',
          desc: 'Capabilities unlock as soon as your UGC license is active.',
        },
        experience: {
          eyebrow: 'Access',
          title: 'Screens · Portal flow',
          subtitle: 'Still frames on the left; license delivery and setup on the right.',
          previewLabel: 'Screenshots',
          accessDividerTop: 'UI',
          accessDividerBottom: 'Steps',
        },
        highlightsMore: '{count} extra capability rows sit further down the page.',
      },
      'skin-changer': {
        showcaseHeading: 'Lookbook stills',
        overviewSubtitle:
          'See where finishes render, what never touches your inventory, and how to verify a title pre-checkout.',
        highlights: {
          eyebrow: 'Focus',
          title: 'On-device finish library',
          desc: 'Premium weapon skins, outfits, and knife styles inside supported games without buying each item alone.',
        },
        featuresSection: {
          eyebrow: 'Modules',
          title: 'Cosmetic categories',
          desc: 'Finish types available once your cosmetic license is active.',
        },
        experience: {
          eyebrow: 'Access',
          title: 'Screens · Portal flow',
          subtitle: 'Screenshot notes on the left; portal access and menu setup on the right.',
          previewLabel: 'Screenshots',
          accessDividerTop: 'UI',
          accessDividerBottom: 'Steps',
        },
        highlightsMore: '{count} extra cosmetic rows sit further down the page.',
      },
    },
    swipeHint: 'Swipe for more screenshots',
    checkoutEyebrow: 'Checkout',
    checkoutSelect: 'Select subscription',
    checkoutSingle: 'Purchase option',
    checkoutTotal: 'Total',
    bestValue: 'Best value',
    planWeekly: '1 Week',
    planWeeklyNote: '7 days',
    planMonthly: 'Monthly',
    planLifetime: 'Lifetime',
    planOneTime: 'One-time access',
    planPerMonth: '31 days of access',
    planOneTimeNote: 'Unlimited access',
    get: 'Get',
    explore: 'Explore',
    buyNow: 'Buy now',
    viewDetails: 'View details',
    items: [
      {
        badge: 'Available',
        category: 'System utility',
        title: 'HWID Spoofer for Wardogs PCs',
        subtitle:
          'Rotate disk serials, MAC addresses, and GPU IDs, then run the bundled cleaner before you sign in again.',
        desc: 'Refreshes disk serials, MAC addresses, GPU IDs, and related fingerprints after a hardware flag, with trace cleanup in the same license.',
        features: ['Disk serial refresh', 'MAC refresh', 'GPU ID refresh', 'Cleaner included'],
        more: 0,
        href: HWID_SPOOFER_PATH,
      },
      {
        badge: 'Available',
        category: 'Account recovery',
        title: 'Account Recovery Workflows with UGC',
        subtitle:
          'Build template appeals and repeat dispute steps for restricted gaming, social, or marketplace profiles.',
        desc: 'Unban & Governance Control (UGC) ships template appeals and automated dispute filings for limited logins across platforms.',
        features: ['Appeal workflows', 'Dispute automation', 'Any platform', 'Gaming, social, marketplace'],
        more: 0,
        href: UGC_PATH,
      },
      {
        badge: 'Available',
        category: 'Cosmetic',
        title: 'Client Skin Changer for Supported Titles',
        subtitle:
          'Preview weapon skins and outfits locally without unlocking each paid cosmetic.',
        desc: 'Small client that paints premium weapon skins, outfits, and knife variants on your screen across major titles.',
        features: ['Weapon finish presets', 'Outfit presets', 'Knife style presets', 'Major title coverage'],
        more: 0,
        href: SKIN_CHANGER_PATH,
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Guides and updates',
    subtitle: 'ESP and aimbot setup, menu tuning and patch-day checks for Wardogs.',
    latestTitle: 'Wardogs Cheat Guides & Patch-Day Notes',
    latestSubtitle: 'Filter by topic to find setup guides, feature deep-dives, and patch-day notes.',
    filterAll: 'All articles',
    emptyFilter: 'No articles match this filter.',
    emptyArchive: 'No articles yet. New guides will show up here.',
    viewAll: 'View all articles',
    read: 'Read',
    articleActionsAria: 'Continue reading',
    buyCta: 'Buy Wardogs Cheats',
    buyHwidCta: 'Buy HWID Spoofer',
    moreArticles: 'More articles',
    sidebarAria: 'Article sidebar',
    tocTitle: 'In this article',
    relatedTitle: 'Related guides',
    filterToolbarAria: 'Filter articles by topic',
    items: [],
  },
  workflow: {
    eyebrow: 'How it works',
    badge: '4 easy steps',
    titleBefore: 'From status check to',
    titleHighlight: 'saved profile.',
    subtitle: 'A straight path from status check to a saved config you can reuse every session.',
    ctaLabel: 'Pick your plan',
    ctaHref: productBase,
    ctaSecondary: 'Setup FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      {
        num: '01',
        phase: 'Before purchase',
        title: 'Check live status',
        desc: 'Read the live banner on {siteDomain} before you buy or launch.',
      },
      {
        num: '02',
        phase: 'Checkout',
        title: 'Choose your product',
        desc: 'Pick the cheat suite or a hardware utility, whichever matches bans, rigs, or account resets you face.',
      },
      {
        num: '03',
        phase: 'Loader',
        title: 'Launch & configure',
        desc: 'Download from the portal, enable modules, and tune ESP and aim sliders offline first.',
      },
      {
        num: '04',
        phase: 'In-game',
        title: 'Save your profile',
        desc: 'When settings feel right, save mode presets to the cloud for the next session.',
      },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'Wardogs Cheats Support',
    subtitle: 'Let us know how we can help.',
    channels: [
      {
        icon: 'users',
        title: 'Chat before checkout',
        desc: 'Speak to our team about tiers and access.',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'headphones',
        title: 'Chat to support',
        desc: "We're here for loader, HWID and account issues.",
        linkLabel: '{supportEmail}',
        href: 'mailto:{supportEmail}',
      },
      {
        icon: 'navFaq',
        title: 'Read the FAQ',
        desc: 'Compatibility, bans and setup, before you buy.',
        linkLabel: 'View all FAQ',
        href: '/faq/',
      },
    ],
    ticketTitle: 'Include in your ticket',
    ticketItems: [
      { title: 'Order email', desc: 'The address used at checkout on {siteDomain} or via our partner checkout.' },
      { title: 'Platform', desc: 'Windows 10 or 11, and your Wardogs client version.' },
      { title: 'Error detail', desc: 'Screenshot or exact message from the loader or game client.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers before checkout.',
    subtitle: 'Compatibility, bans and access, no vague promises.',
    items: [
      {
        num: '01',
        q: 'Where do I check if Wardogs cheats are online?',
        a: 'The live status banner is on {siteDomain}. Always check after a Wardogs or anti-cheat update.',
      },
      {
        num: '02',
        q: 'What happens after I buy?',
        a: 'Your portal grants loader access, the setup guide and config library via our partner checkout. Follow the guide before launching Wardogs.',
      },
      {
        num: '03',
        q: 'Can I get banned using third-party wardogs cheats?',
        a: 'Yes, any modification carries risk. Anti-cheat and report systems evolve. Read current status and accept the risk before use.',
      },
      {
        num: '04',
        q: 'Which platforms are supported?',
        a: 'Wardogs on Windows 10/11 64-bit only. macOS and Linux are not supported.',
      },
      {
        num: '05',
        q: 'Can I move my license to a new PC?',
        a: 'Yes, use the HWID reset in your portal or open a support ticket. Limits depend on your tier.',
      },
      {
        num: '06',
        q: 'Where are products and utilities listed?',
        a: 'Every product is listed at {siteDomain}/products/, and each one has its own page with a feature list and checkout via our partner.',
      },
    ],
  },
  footer: {
    homeLink: 'Site homepage',
    tagline: 'Wardogs cheats with aimbot, player ESP, and radar for PC. {siteDomain}',
    trademark: '{game} is a trademark of {gamePublisher}. {siteDomain} is not affiliated with or endorsed by {gamePublisher}.',
    explore: 'Explore',
    exploreLinks: [
      { id: 'products', href: '/', label: 'Feature overview', ariaLabel: 'Features', scrollTarget: 'features' },
      { id: 'products', href: PRODUCTS_HUB_PATH, label: 'All products', ariaLabel: 'All products' },
      { id: 'products', href: productBase, label: 'Cheat plans and modules', ariaLabel: '{cheatProduct}' },
      { id: 'hwidSpoofer', href: HWID_SPOOFER_PATH, label: 'PC HWID spoofer', ariaLabel: 'HWID Spoofer' },
      { id: 'products', href: UGC_PATH, label: 'UGC account recovery', ariaLabel: 'UGC Account Recovery' },
      { id: 'products', href: SKIN_CHANGER_PATH, label: 'Client skin options', ariaLabel: 'Skin Changer' },
      { id: 'blog', href: '/blog/', label: 'Guides and articles', ariaLabel: 'Blog' },
      { id: 'forum', href: '/forum/', label: 'Community forum', ariaLabel: 'Forum' },
    ],
    supportLinks: [
      { href: '/faq/', label: 'Pre-purchase FAQ', ariaLabel: 'FAQ' },
      { href: '/support/', label: 'Contact support', ariaLabel: 'Support' },
    ],
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About {siteName}',
      description:
        '{siteName} provides {cheatProduct}, related utilities and PC support resources at {siteDomain}.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            '{siteName} is a PC-focused resource for Wardogs players exploring aimbot, player ESP, item ESP, and radar options. We publish setup guides and live status notes so you can evaluate {cheatProduct} before checkout.',
            'All product names are used for identification only.',
          ],
        },
        {
          heading: 'What we publish',
          paragraphs: [
            'Our site covers {cheatProduct} and the utilities listed on our products page. Blog articles explain menu configs, patch-day checks, and anti-cheat update behavior.',
            'Content is updated when patches land or when loader modules shift. Check the homepage status banner before every session.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'Questions about compatibility, loader errors, or checkout are handled through email support. Include your order email, game account, and Windows version when opening a ticket.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description:
        'How {siteName} handles analytics, cookies, and contact data when you use {siteDomain}.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect standard web analytics such as page views, device type, browser, and approximate region through Google Analytics when enabled. Checkout and license delivery happen on external checkout pages, we do not store payment card data on {siteDomain}.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us understand which guides and product pages are useful so we can improve content and fix broken links. Support tickets may retain the email address and message content you provide until the issue is resolved.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use minimal cookies required for analytics. You can block cookies in your browser settings; core site content remains accessible without them.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For privacy questions, use the options on the Support page. Purchase and refund rules are in our Terms & Conditions.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description:
        'Purchase, license, refund, and use terms for {siteName} products and {siteDomain}.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Last updated: September 2026. By using {siteDomain} or completing checkout for any product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We sell {cheatProduct} and the utilities listed on our products page, delivered through an operator portal and loader on Windows.',
            'Feature lists on each product page describe what is included at the time of purchase. Modules can change when Wardogs or anti-cheat systems update.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. {siteDomain} does not process or store payment card numbers.',
            'After purchase, use the operator portal linked from your order flow to download the current loader and setup guide before launching Wardogs.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. HWID and device limits depend on your tier and are enforced in the portal.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes. We do not refund change-of-mind purchases, account bans, anti-cheat penalties, or issues caused by ignoring setup guides or running modules while the status banner shows offline.',
            'If the product does not work as described on a supported setup: Wardogs on Windows 10/11, current loader from the portal, and the live status banner showing online when you started, contact us through the Support page. Include your order email, Windows version, game build, and screenshots or exact error text from the loader.',
            'We may, at our discretion, offer a fix, replacement access, or partial/full refund when we confirm a fault on our side. We are not obligated to approve every request.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for Wardogs can conflict with game updates and anti-cheat. You use this software at your own risk, including possible account action.',
            'Check the homepage status banner before every session. Do not queue while modules are offline or misaligned after a patch.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For terms, billing, or loader questions, use the buttons on the Support page. See also our Privacy Policy for how we handle site data.',
          ],
        },
      ],
    },
    support: {
      title: '{siteName} Support',
      description:
        'Get support for loader, HWID, and checkout questions at {siteDomain}.',
    },
  },
  common: {
    breadcrumbHome: 'Home',
    breadcrumbProducts: 'Products',
    breadcrumbBlog: 'Blog',
    breadcrumbForum: 'Forum',
    breadcrumbFaq: 'FAQ',
    breadcrumbAbout: 'About',
    breadcrumbPrivacy: 'Privacy',
    breadcrumbTerms: 'Terms',
    breadcrumbSupport: 'Support',
    contactSupport: 'Contact support',
  },
  notFound: {
    metaDescription: 'The page you requested could not be found on {siteDomain}.',
    title: 'Page not found',
    body: 'That URL does not exist or may have moved. Head back to the homepage or browse our products.',
    backHome: 'Back to home',
    viewProducts: 'View products',
    viewElite: 'View product page',
  },
  pages: {
    faq: {
      eyebrow: 'Help center',
      title: 'Wardogs Cheats FAQ: Setup, Plans & anti-cheat',
      description:
        'Answers on Wardogs cheats: setup steps, monthly and lifetime plans, ESP and aim modules, anti-cheat status, and checkout help at {siteDomain}.',
      schemaName: 'Wardogs Cheats FAQ',
      schemaDescription:
        'Answers on Wardogs cheats, player ESP, aimbot, radar, loader setup, pricing, and checkout at {siteDomain}.',
    },
    forum: {
      eyebrow: 'Wardogs community forum',
      title: 'Wardogs Community Forum',
      description:
        'Archived, read-only threads on loader setup, ESP configs, patch status, and HWID bans. Replies are closed.',
      exploreGuides: 'Explore the guides',
      postsAria: 'Community posts',
      sortAria: 'Post sorting',
      sortPopular: 'Popular',
      sortLatest: 'Latest',
      sortTop: 'Most discussed',
      filterAria: 'Filter discussions by topic',
      filterAll: 'All topics',
      resultsCount: 'guide discussions',
      voteAria: 'Discussion voting',
      upvoteAria: 'Upvote this discussion',
      downvoteUnavailableAria: 'Downvoting is unavailable',
      guideTeam: '{siteName} guide team',
      guideBasedQa: 'Guide-based Q&A',
      fromGuide: 'From the guide:',
      comments: 'comments',
      closedThread: 'Closed thread',
      closedBy: 'Closed by archive',
      repliesClosed: 'Replies are closed',
      readDiscussion: 'Read discussion',
      empty: 'No discussions match. Try another search or topic.',
      emptyArchive: 'No discussions yet. New threads will show up here.',
      categoryGeneral: 'General',
      categoryGuides: 'Guides & Builds',
      categoryPatch: 'Patch Talk',
      categoryCommunity: 'Community',
      paginationAria: 'Discussion pages',
      pagePrevious: 'Previous',
      pageNext: 'Next',
      sidebarTitle: '{siteName} Community',
      sidebarIntro: 'Read-only archive. Threads stay up for reference, you cannot start a thread or reply.',
      statsDiscussions: 'guide discussions',
      statsTopics: 'topics',
      exploreAllGuides: 'Explore all guides',
      communitiesHeading: 'Communities',
      browseRelated: 'Browse related Q&A',
      browseAllCommunities: 'Browse all communities',
      guidelinesHeading: 'Community guidelines',
      guideline1: 'Keep it friendly and constructive',
      guideline2: 'Stay on topic and add context',
      guideline3: 'Mark spoilers and sensitive content',
      readFullGuidelines: 'Read the full guidelines',
      sidebarFoot: 'About · Guidelines · Privacy · Terms',
    },
    utilities: {
      title: 'HWID Spoofer',
      description: 'Refresh hardware identifiers when other PCs accept logins but this one rejects them right away.',
      viewDetails: 'View utility details',
      includes: 'Ships with license:',
      schemaName: 'HWID Spoofer',
    },
  },
  pageSeo: {
    '/': {
      title: 'Wardogs Cheats | Aimbot, ESP and Radar on PC',
      description:
        'Wardogs Cheats with aimbot, player ESP, and radar on Windows. Compare plans on {siteDomain} before checkout.',
    },
    '/cheats/': {
      title: 'Wardogs Hacks | Menu Modules and Checkout Plans',
      description:
        'Wardogs Hacks with player ESP, aimbot, and radar on Windows. Review menu options and requirements on {siteDomain}.',
    },
    '/hwid-spoofer/': {
      title: 'Wardogs HWID Spoofer | Rotate Disk and MAC IDs',
      description:
        'Wardogs HWID Spoofer rotates disk, MAC, and GPU IDs when this PC fails login. Bundled cleaner; see plans on {siteDomain}.',
    },
    '/products/': {
      title: 'Wardogs Products | {cheatProduct} and Utilities',
      description:
        'Compare {cheatProduct}, HWID Spoofer, UGC, and Skin Changer plans, Windows requirements, and checkout paths on {siteDomain}.',
    },
    '/ugc/': {
      title: 'Wardogs Account Recovery | UGC Appeal Automation',
      description:
        'Wardogs Account Recovery maps restrictions to UGC workflows and automates dispute steps. View plan options on {siteDomain}.',
    },
    '/skin-changer/': {
      title: 'Wardogs Skin Changer | Local Weapon and Outfit Skins',
      description:
        'Wardogs Skin Changer previews weapon skins and outfits client-side in supported titles. Compare plans on {siteDomain}.',
    },
    '/blog/': {
      title: 'Wardogs Guides | ESP, Aimbot and Patch Notes',
      description:
        'Wardogs preset walkthroughs, ESP and aim tuning, radar setup, and anti-cheat status checklists on {siteDomain}.',
    },
    '/forum/': {
      title: 'Wardogs Forum Archive | Setup, ESP and Status',
      description:
        'Read-only Wardogs threads on loader setup, ESP configs, patches, and HWID notes. New threads and replies are closed.',
    },
    '/faq/': {
      title: 'Wardogs ESP FAQ | Setup, Plans and Risk',
      description:
        'Wardogs ESP and aimbot answers on Windows compatibility, plan options, status checks, and checkout help on {siteDomain}.',
    },
    '/terms/': {
      title: 'Terms of Sale & License Use',
      description:
        'Refund rules, license limits, checkout delivery, and risk disclosure for products sold via {siteDomain}.',
    },
    '/privacy/': {
      title: 'Privacy Policy | Analytics & Support Data',
      description:
        'How {siteDomain} uses cookies, analytics, and the information you send when opening a support ticket.',
    },
    '/about/': {
      title: 'About {siteDomain} & {siteName}',
      description:
        'Who publishes Wardogs Cheats resources, status notes, and support channels on {siteDomain}.',
    },
    '/support/': {
      title: 'Wardogs Cheats Support | Loader, HWID & Checkout',
      description:
        'Contact support for portal access, module errors, and billing questions before or after checkout on {siteDomain}.',
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheatsNav: 'Try Now',
    homeAria: 'Wardogs Cheats home',
    menuOpen: 'Open menu',
    themeLight: 'Switch to light mode',
    languageSwitcherLabel: 'Language',
    languageNames: {
      en: 'English',
      es: 'Español',
      de: 'Deutsch',
      fr: 'Français',
    },
  },
};
