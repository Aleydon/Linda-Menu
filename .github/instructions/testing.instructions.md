---
applyTo: '**/*.test.{ts,tsx}'
---

## Testing Standards

- Use Jest with React Testing Library.
- Test behavior, not implementation details.
- Prefer screen queries over container queries.
- Use userEvent instead of fireEvent.

## Structure

- One behavior per test.
- Test accessibility when possible.

## Naming

- describe: component or feature name
- it: expected behavior
- Use clear and descriptive test names.
