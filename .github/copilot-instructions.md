# Project Coding Standards

## General

- Use TypeScript strictly (no implicit any).
- Prefer functional components and hooks.
- Write clean, readable, maintainable code.
- Avoid unnecessary comments; code should be self-explanatory.
- Use English for code and identifiers.

## Architecture

- Follow modular and component-based architecture.
- Prefer composition over inheritance.
- Keep components small and reusable.

## Imports

- Use path aliases instead of relative imports.

## Formatting & Linting

- Follow ESLint and Prettier rules configured in the project.
- Never format manually if it conflicts with lint rules.

## Performance

- Avoid unnecessary re-renders.
- Use React Server Components when appropriate.
- Use dynamic imports for heavy components.

## Testing

- Always create tests before modifying/creating components, following the TDD methodology.
