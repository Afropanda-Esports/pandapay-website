# Architecture Notes

## Setup profile

- **Framework:** astro
- **Project profile:** interactive-experimental
- **Package manager detected:** bun
- **Profile intent:** A visually expressive experience with careful performance, accessibility, and motion lifecycle handling.

## Framework-specific rules

Prefer .astro components and static rendering first. Import the global stylesheet from the root layout. Add a hydrated island only where interactive browser behavior requires it; do not introduce React solely to host animation.

## Shared conventions

- CSS class names use lowercase BEM-inspired kebab-case: .navbar, .navbar__header, .navbar__header-bottom, .navbar__link--active.
- Component filenames use kebab-case (for example, navbar.tsx); React component exports remain PascalCase. Hook names use camelCase (for example, useScrollProgress).
- Use shared generic utilities only when they are genuinely reusable across the application.
- Keep primitive tokens, semantic tokens, and component tokens separate. Component tokens are introduced when a component has meaningful variants or repeated design requirements.
- Responsive typography is fluid-first using clamp(); use explicit breakpoints where composition actually changes. Derive breakpoints from content/layout rather than device labels alone.
- Use local font assets when supplied, optimize the required weights, and avoid downloading fonts unless requested.
- Themes are added only when requested or required by the product.
- Prefer framework-native data loading where it fits. Use Zustand for shared client state and TanStack Query for server state only when the use case justifies them. Avoid duplicating server state in multiple stores.
- Keep feature-based directories optional. Start with the smallest useful structure and add domain boundaries when complexity warrants them.

## Styling foundation

The token foundation is in src/styles/tokens.css, with reset and typography rules separated by responsibility. Import src/styles/global.css from the framework's existing global CSS entry. Do not overwrite an existing app entry merely to attach the stylesheet.

## Motion

Motion foundation enabled with GSAP for coordinated timelines, scroll-driven animation, and text animation; keep simple state transitions in CSS. Prefer useGSAP in React integrations and explicitly scope cleanup. For Astro, decide between plain scripts and an existing island instead of hydrating a framework solely for animation. Use the data-motion-* attributes as stable hooks and respect reduced-motion preferences.

## API layer

API infrastructure is not scaffolded. Add services/api only when the project needs a backend or external API.

## Configuration

The machine-readable defaults are in frontend-architecture.config.json. Explicit project decisions and existing sound conventions take precedence over these defaults. Update that configuration and this document when material choices change.

## Dependency installation

The selected GSAP setup uses gsap. Install it with the existing package manager if dependency installation was skipped.

## Privacy and network behavior

This setup does not enable telemetry or upload project files. Framework detection uses limited local metadata. Catalog synchronization, if configured, is read-only and downloads JSON data only.
