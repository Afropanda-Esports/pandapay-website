/** Card display width × 2 for retina (matches scripts/optimize-inventory.mjs). */
export const INVENTORY_IMAGE_WIDTH = 560;
export const INVENTORY_IMAGE_HEIGHT = 700;

const INVENTORY_IMAGE_PATHS: Record<string, string> = {
  'game-gift-cards': '/inventory/game-gift-cards.webp',
  roblox: '/inventory/roblox.webp',
  'cod-battle-pass': '/inventory/cod-battle-pass.webp',
  playstation: '/inventory/playstation.webp',
};

export function getInventoryImage(slug: string): string {
  return INVENTORY_IMAGE_PATHS[slug] ?? INVENTORY_IMAGE_PATHS['game-gift-cards'];
}
