/** Solid / high-chroma cards (shadow can clip with overflow-hidden — lift + slight brighten). */
export const cardHoverSolid =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:brightness-[1.03]';

/** Bordered cards: lift, shadow, stronger border + ring on hover. */
export const cardHoverBordered =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevation-3 hover:border-primary-500/40 hover:ring-1 hover:ring-primary-500/15';

/** Depth from shadow only (no stroke); hover lifts and deepens shadow. */
export const cardHoverShadow =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevation-4';

/** White / near-white card on a light page (Painpoint + Testimonial `bg-testimonial-3`). */
export const lightCardSurface =
  'shadow-elevation-2 ring-1 ring-black/[0.07] hover:shadow-elevation-4 hover:ring-black/[0.12]';
