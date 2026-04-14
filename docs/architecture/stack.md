# Technology Stack

## Core Choices
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS V4 (with custom `.dark` variant mapping).
- **Language**: TypeScript.
- **Environment**: Cloudflare Pages / Workers (Edge computing).

## Edge Constraints
- This application runs entirely on the Edge.
- Node.js APIs (e.g., `fs`, `path`) are completely unsupported in production.
- All backend server logic is confined to `src/app/api/rewrite/route.ts` and `src/app/api/seed/route.ts`.