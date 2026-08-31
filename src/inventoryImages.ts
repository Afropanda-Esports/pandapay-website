/** Card display width × 2 for retina (matches scripts/optimize-inventory.mjs). */
export const INVENTORY_IMAGE_WIDTH = 560;
export const INVENTORY_IMAGE_HEIGHT = 700;

const INVENTORY_IMAGE_PATHS: Record<string, string> = {
  'vtu-airtime': '/inventory/airtime.svg',
  'vtu-data': '/inventory/data.svg',
  'vtu-electricity': '/inventory/electricity.svg',
  'vtu-cable': '/inventory/cable-tv.svg',
};

export function getInventoryImage(slug: string): string {
  return INVENTORY_IMAGE_PATHS[slug] ?? INVENTORY_IMAGE_PATHS['vtu-airtime'];
}
