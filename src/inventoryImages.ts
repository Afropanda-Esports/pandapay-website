const INVENTORY_IMAGE_PATHS: Record<string, string> = {
  'game-gift-cards': '/inventory/game-gift-cards.png',
  roblox: '/inventory/roblox.png',
  'cod-battle-pass': '/inventory/cod-battle-pass.png',
  playstation: '/inventory/playstation.png',
};

export function getInventoryImage(slug: string): string {
  return INVENTORY_IMAGE_PATHS[slug] ?? INVENTORY_IMAGE_PATHS['game-gift-cards'];
}
