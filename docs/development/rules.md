# Rules

## Constraints
- **Markdown Limits**: Documentation files must never exceed 300 lines.
- **Source Limits**: `.ts` and `.tsx` source files must never exceed 200 lines. Split components explicitly when approaching this limit.
- **TOC Requirement**: All `docs/` subdirectories must have a `README.md` that acts purely as a table of contents.

## Commits
- Commit frequently during the development process.
- Ensure functional and logical chunks are grouped into commits.
- "YOLO" mode is permitted for high-speed delivery.

## Refactoring
- Do not hesitate to perform aggressive refactors if they improve LLM readability.
- Maintain backward compatibility ONLY if explicitly stated; otherwise, bold changes are authorized.
