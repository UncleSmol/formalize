# Design System

## Typography

Font loaded via `next/font/google`:
- **Poppins** — body text, headings (`--font-poppins`)
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

Tailwind class: `font-sans`

## Color Tokens

Defined as CSS custom properties in `globals.css`, mapped to Tailwind via `@theme inline`.

| Token          | Light       | Dark        |
|----------------|-------------|-------------|
| `background`   | `#ffffff`   | `#0a0a0a`   |
| `foreground`   | `#171717`   | `#ededed`   |

Usage: `bg-background`, `text-foreground`

Dark mode: automatic via `prefers-color-scheme` media query.

## Spacing & Layout

- Tailwind default spacing scale
- Container: use `max-w-*` utilities as needed
- Responsive breakpoints: `sm` (640), `md` (768), `lg` (1024), `xl` (1280), `2xl` (1536)

## Components

No custom component library installed. Build with Tailwind utilities directly.

When a shared component library is needed, evaluate:
- **shadcn/ui** — copy-paste components built on Radix primitives
- **Radix UI** — headless accessible primitives

## Motion

Use Framer Motion only when motion adds clarity or brand value. Respect `prefers-reduced-motion`.

## Accessibility

- Semantic HTML elements first
- Visible focus states (`focus-visible:outline-*`)
- Minimum contrast ratio: 4.5:1 (text), 3:1 (large text / UI)
- All interactive elements keyboard accessible
- Form inputs always have associated labels
