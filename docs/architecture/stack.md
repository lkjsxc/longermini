# Tech Stack

## Core Technologies
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS V4.
- **Language**: TypeScript.
- **Environment**: Cloudflare Pages / Workers (Edge computing).
- **Backend API**: Cloudflare Workers environment.

## Dark/Light Mode
- Tailwind v4 handles dark mode.
- We use a custom variant explicitly tied to the `.dark` class toggle to override system preferences.
- Defined in `globals.css` with `@custom-variant dark (&:where(.dark, .dark *));`.

## Runtime Constraints
- The project runs on the Edge (Cloudflare).
- Node.js APIs (e.g., `fs`, `path`) are unsupported in production.
- All server-side logic resides in `src/app/api/rewrite/route.ts`.
