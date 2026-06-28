# Architecture

## App Router Structure

This project uses the Next.js App Router (`src/app/`). All routes are directory-based.

```
src/app/
  layout.tsx      # Root layout — wraps every page
  page.tsx        # Home route (/)
  globals.css     # Global styles and design tokens
  favicon.ico     # Site icon
```

## Rendering Model

- **Server Components by default.** Every component is a React Server Component unless explicitly marked with `"use client"`.
- Client components are reserved for event handlers, state, effects, and browser-only APIs.
- Data fetching happens in server components or Server Actions — no API routes unless a public API is needed.

## Data Flow

```
Server Component (fetch data)
  └── Client Component ("use client" — interactive UI)
        └── Server Action (mutations)
```

## Adding Routes

Create a new directory under `src/app/`:

```
src/app/
  about/
    page.tsx       # /about
  blog/
    [slug]/
      page.tsx     # /blog/:slug
```

## Shared Modules

| Directory          | Purpose                                |
|--------------------|----------------------------------------|
| `src/components/`  | Reusable UI components                 |
| `src/lib/`         | Utilities, helpers, server-only logic  |
| `src/app/api/`     | Route handlers (only when needed)      |

## Error Handling

- `error.tsx` — route-level error boundary
- `loading.tsx` — Suspense fallback
- `not-found.tsx` — 404 page

Create these files at any route segment level to scope error/loading handling.

## Environment Variables

- `.env.local` — local overrides (gitignored)
- `.env` — shared defaults (committed if no secrets)
- `NEXT_PUBLIC_` prefix exposes to client bundle
- All other env vars are server-only
