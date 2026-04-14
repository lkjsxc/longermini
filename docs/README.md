# Documentation Canon

`docs/` is the active canon for intended behavior, architecture, and operator workflow for `longermini`.

## Core Documentation Rules
1. Maintain one canonical statement for each rule to avoid contradictions.
2. Every documentation directory must contain exactly one `README.md` that acts as a Table of Contents (TOC) and index for its children.
3. Every documentation file (`.md`) MUST NOT exceed 300 lines.
4. Every source file (`.ts`, `.tsx`) MUST NOT exceed 200 lines.
5. Record exact commands when they matter for operations.
6. Prefer short, declarative bullet points over narrative prose for LLM optimization.
7. Optimize formatting and structure for LLM retrieval and reasoning.

## Top-Level Directory Index
- [vision/README.md](vision/README.md): Product intent, goals, and core philosophy.
- [architecture/README.md](architecture/README.md): Technology stack, runtime, and external API integration contracts.
- [product/README.md](product/README.md): Feature behavior, UI rules, theming, and interaction flows.
- [operations/README.md](operations/README.md): Deployment, testing rules, and operational runbooks.
- [repository/README.md](repository/README.md): Code authoring rules and repository structural constraints.
