---
applyTo: '**/*.{ts,tsx}'
---

## React & Next.js

- Use React 19 best practices.
- Prefer Server Components by default.
- Use Client Components only when interactivity is required.
- Use "use client" only when needed.

## Components

- Use functional components.
- Prefer named exports.
- Keep components under 200 lines.
- Extract logic into hooks when reusable.

## Hooks

- Custom hooks must start with `use`.
- Avoid side effects inside render.

## Next.js

- Use App Router patterns.
- Use server actions when appropriate.
- Use Next.js Image and Link components.
- Prefer async data fetching in Server Components.
