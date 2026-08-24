/** Card display width × 2 for retina (matches scripts/optimize-inventory.mjs). */
export const INVENTORY_IMAGE_WIDTH = 560;
export const INVENTORY_IMAGE_HEIGHT = 700;

const INVENTORY_IMAGE_PATHS: Record<string, string> = {
  'vtu-airtime': '/inventory/airtime.svg',
  'vtu-data': '/inventory/data.svg',
  'vtu-electricity': '/inventory/electricity.svg',
  'vtu-cable': '/inventory/cable-tv.svg',
  'vtu-betting': '/inventory/betting.svg',
  'psn-10': '/inventory/playstation.svg',
  'psn-25': '/inventory/playstation.svg',
  'psn-50': '/inventory/playstation.svg',
  'psn-100': '/inventory/playstation.svg',
  'ps-plus-essential-1m': '/inventory/ps-plus.svg',
  'ps-plus-essential-3m': '/inventory/ps-plus.svg',
  'ps-plus-extra-1m': '/inventory/ps-plus.svg',
  'ps-plus-premium-1m': '/inventory/ps-plus.svg',
  playstation: '/inventory/playstation.svg',
  'game-gift-cards': '/inventory/playstation.svg',
  roblox: '/inventory/coming-soon.svg',
  'cod-battle-pass': '/inventory/coming-soon.svg',
};

export function getInventoryImage(slug: string): string {
  return INVENTORY_IMAGE_PATHS[slug] ?? INVENTORY_IMAGE_PATHS['vtu-airtime'];
}
