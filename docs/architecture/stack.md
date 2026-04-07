# Technology Stack

## Core Technologies
- **Framework:** Next.js (React) using the App Router with global `error.tsx` boundary handling.
- **Styling:** Tailwind CSS using native default dark mode styling.
- **Language:** TypeScript.

## Backend Integration
- The Next.js API route `src/app/api/rewrite/route.ts` communicates securely with the Gemini API.
- Prompt explicitly instructs the model to increase verbosity without adding information, wrapping thoughts in `<think>` tags to simulate a thinking phase.
- A cookie-based client identification system is used to enforce a 10-uses-per-day server-side rate limit using an in-memory cache. Honest HTTP 429 status codes are returned on limit hit.

## Data Storage
- History of rewrites is saved using browser **Local Storage**.
- Rotating placeholders are sourced from `public/examples.json`.
- No external persistent database is used.

## Testing
- Unit and Component tests are driven by Jest and React Testing Library (RTL).
