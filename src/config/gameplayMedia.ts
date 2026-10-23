/** Default Open Graph / Twitter preview (first hero slide). */
export const DEFAULT_OG_GAMEPLAY_IMAGE = '/images/gameplay/wardogs-esp-gameplay-chams.webp';

export const DEFAULT_OG_GAMEPLAY_ALT =
  'Wardogs first-person view with an enemy highlighted through a wall in red ESP chams, green head marker, and an aimbot settings panel open.';

/** Intrinsic size of the default OG master (1024×576). */
export const DEFAULT_OG_GAMEPLAY_WIDTH = 1024;
export const DEFAULT_OG_GAMEPLAY_HEIGHT = 576;

/** Homepage + product gallery use the same masters, once each per slider. */
export const WARDOGS_SHOWCASE_GALLERY_KEYS = [
  'gpEspGameplayChams',
  'gpAimbotMenu',
  'gpColorSettingsMenu',
] as const;
