/** Solid / high-chroma cards (shadow can clip with overflow-hidden — lift + slight brighten). */
export const cardHoverSolid =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:brightness-[1.03]';

/** Bordered cards: lift, shadow, stronger border + ring on hover. */
export const cardHoverBordered =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevation-3 hover:border-primary-500/40 hover:ring-1 hover:ring-primary-500/15';

/** Depth from shadow only (no stroke); hover lifts and deepens shadow. */
export const cardHoverShadow =
  'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevation-4';

/** Primary “outline” pill without a hard stroke (ring + depth + soft glow). */
export const primaryOutlinePill =
  'shadow-[0_0_0_2px_rgba(204,53,0,0.38),0_8px_22px_-6px_rgba(204,53,0,0.15),0_0_20px_-2px_rgba(204,53,0,0.18)] transition-all hover:shadow-[0_0_0_2px_rgba(204,53,0,0.5),0_12px_28px_-4px_rgba(204,53,0,0.22),0_0_24px_-2px_rgba(204,53,0,0.24)]';

/** Soft top edge inside tinted cards (replaces `border-t`). */
export const cardFooterInsetRule =
  'shadow-[inset_0_1px_0_0_rgba(0,0,0,0.075)] dark:shadow-[inset_0_1px_0_0_rgba(0,0,0,0.22)]';

/** White / near-white card on a light page (Painpoint + Testimonial `bg-testimonial-3`). */
export const lightCardSurface =
  'shadow-elevation-2 ring-1 ring-black/[0.07] hover:shadow-elevation-4 hover:ring-black/[0.12]';
