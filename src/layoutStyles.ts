import type { CSSProperties } from 'react';

/** Inline fallback so layout cannot collapse to min-content when flex + Safari disagree with Tailwind. */
export const layoutFullWidth: CSSProperties = {
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  boxSizing: 'border-box',
};

/** Replaces full-width `border-b border-border` between landing sections. */
export const sectionSeparatorShadow = 'shadow-[var(--shadow-section-separate)]';

/** Replaces `border-y` on the marquee ribbon. */
export const marqueeEdgeShadow = 'shadow-[var(--shadow-marquee-edge)]';

/** Replaces `border-t` above the footer legal row. */
export const footerRuleShadow = 'shadow-[var(--shadow-footer-rule)]';
