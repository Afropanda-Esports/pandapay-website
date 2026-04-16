import type { CSSProperties } from 'react';

/** Inline fallback so layout cannot collapse to min-content when flex + Safari disagree with Tailwind. */
export const layoutFullWidth: CSSProperties = {
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  boxSizing: 'border-box',
};
