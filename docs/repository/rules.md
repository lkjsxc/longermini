# Repository Rules

## Constraints
- Every markdown documentation file must strictly not exceed 300 lines.
- Every source code file (`.ts`, `.tsx`) must strictly not exceed 200 lines.
- Documentation directories must always contain a `README.md` file at their root acting as an index.

## Quality
- All UI components should be highly modular.
- Use `npm run lint` before committing to ensure Next.js standard compliance.
- Code should favor modern Next.js App Router conventions (Server Components where possible, Client Components for interactivity).
