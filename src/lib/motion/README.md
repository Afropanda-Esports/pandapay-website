# Motion utilities

Selected engine: gsap. Use word/character/line splitting only for text that requires it. Call the helper after fonts and layout are ready. Call resetTextSplit(element) before replacing dynamic text or remeasuring after a layout change. Use explicit reinitialization first; add a scoped observer only when the content source requires it.

For React, scope GSAP timelines to the component lifecycle and prefer useGSAP when appropriate. For Astro, use plain scripts unless an existing island is justified. This helper is DOM-only and must not be used in Expo. Respect reduced-motion preferences and avoid splitting interactive controls or content marked data-motion-ignore.
