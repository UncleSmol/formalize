# Stack

## Runtime
- **Node.js** v24+
- **Next.js** 16.2.2 — App Router, React Server Components, Server Actions
- **React** 19.2.4
- **React DOM** 19.2.4

## Language
- **TypeScript** 5.x (strict mode)
- Target: ES2017
- Module resolution: bundler

## Styling
- **Tailwind CSS** v4 via `@tailwindcss/postcss`
- PostCSS config: `postcss.config.mjs`

## Fonts
- Poppins (`--font-poppins`) — weights 300, 400, 500, 600, 700
- Loaded via `next/font/google` with CSS variable

## Linting
- **ESLint** 9 flat config (`eslint.config.mjs`)
- `eslint-config-next` 16.2.2

## Build Tooling
- **Turbopack** enabled for dev (`next dev --turbopack`)
- Standard Next.js production bundling

## Path Aliases
- `@/*` → `./src/*` (configured in `tsconfig.json`)
