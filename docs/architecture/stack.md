# Technology Stack

## Core Technologies
- **Framework:** Next.js (React) using the App Router with global `error.tsx` boundary handling.
- **Styling:** Tailwind CSS (v4) utilizing CSS variables (`--background`, `--foreground`) for explicit Light/Dark mode support.
- **Language:** TypeScript.
- **Component Limits:** Adhere strictly to the < 200 LOC per file constraint by modularizing UI logic (e.g., extracting Header, Action Buttons, and Background Cards).

## Backend Integration
- The Next.js API route `src/app/api/rewrite/route.ts` communicates securely with the Gemini API (`gemini-3-flash-preview`).
- **Prompt Engineering:** The prompt explicitly instructs the model to increase verbosity without adding new conceptual information.
- **Thinking Phase:** The model is instructed to output thoughts wrapped in `<think>` tags, heavily constrained to execute within ~5 seconds to ensure a fast user experience.
- **Rate Limiting:** A cookie-based client identification system enforces a 10-uses-per-day server-side rate limit via an in-memory cache, returning HTTP 429 when exhausted.

## Data Storage
- Rewrite history is persisted locally using browser `localStorage`.
- No persistent external backend database is used for users.
- Input/Output examples are served from `public/io-examples.json` for background rendering.

## Testing
- Unit and Component tests are driven by Jest and React Testing Library (RTL).
