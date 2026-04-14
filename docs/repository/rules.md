# Repository Rules

## Structural Constraints
- **Documentation Limits:** Every markdown (`.md`) file MUST NOT exceed 300 lines.
- **Code Limits:** Every source code file (`.ts`, `.tsx`) MUST NOT exceed 200 lines. Extract modular components (e.g., `Header`, `BackgroundCards`) to satisfy this.
- **Documentation Trees:** Documentation directories must always contain a `README.md` at their root acting as an index.

## Quality Standards
- Code must prioritize modern Next.js App Router conventions.
- All UI elements must be heavily modularized.
- Run `npm run lint` before committing to verify standard compliance.
- No unused variables or unnecessary imports.
- Maintain a single canonical statement per rule within `docs/` to avoid drift or contradictions.
