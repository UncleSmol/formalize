<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Formalize — Project Bootstrap

## Architecture

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`
- **Fonts:** Poppins via `next/font/google`
- **Path alias:** `@/*` → `./src/*`

## Conventions

### File Structure
```
src/
  app/          # App Router pages, layouts, loading, error boundaries
    layout.tsx  # Root layout (fonts, global CSS)
    page.tsx    # Home route
    globals.css # Tailwind import + design tokens
  components/   # Reusable UI components (create as needed)
  lib/          # Utilities, helpers, server-only modules
```

### Code Style
- Use TypeScript strict mode. No `any` unless absolutely unavoidable.
- Prefer named exports over default exports for utilities and components.
- Components are PascalCase files: `MyComponent.tsx`.
- Hooks are camelCase with `use` prefix: `useSomething.ts`.
- Server components by default. Add `"use client"` only when interactivity is required.
- Keep secrets server-side. Never expose env vars prefixed with `PRIVATE_` or containing `SECRET` to the client.

### Styling
- Tailwind utility classes. Avoid custom CSS unless Tailwind cannot express the pattern.
- Use `cn()` helper from `lib/utils.ts` for conditional class merging (install `clsx` + `tailwind-merge` when needed).
- Responsive: mobile-first (`sm:`, `md:`, `lg:`, `xl:`).
- Dark mode: Tailwind `dark:` variant based on `prefers-color-scheme`.

## Quality Checklist

Before committing:
1. `npm run build` — must pass with no errors.
2. `npm run lint` — must pass with no warnings.
3. No `console.log` left in production code.
4. No hardcoded secrets or API keys.

## Commands

| Command           | Purpose                        |
|-------------------|--------------------------------|
| `npm run dev`     | Start dev server (Turbopack)   |
| `npm run build`   | Production build               |
| `npm run start`   | Serve production build         |
| `npm run lint`    | Run ESLint                     |

## Deployment

Target platform: Vercel (default). Build output is handled automatically by Next.js.
