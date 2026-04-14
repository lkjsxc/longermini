# State Management

This document explains how application state is persisted to ensure a seamless experience across page reloads.

## Local Storage State

The application utilizes the browser's `localStorage` for persisting user preferences and UI state that does not need to be synchronized with a backend database.

1.  **Theme Preference (`theme`)**:
    *   Stores either `"dark"` or `"light"`.
    *   Used by the `Header` component to initialize the correct theme.
    *   Also read by an inline script in `layout.tsx` before hydration to prevent Flash of Unstyled Content (FOUC).
2.  **Seed Language (`seedLang`)**:
    *   Stores the last selected language string (e.g., `"Japanese"`).
    *   Used to initialize the `<select>` element in the main interface.
3.  **Remaining Uses (`remainingUses`)**:
    *   Stores the integer value of remaining API requests.
    *   Provides immediate feedback on load, updated silently when an API request completes.
4.  **Rewrite History (`rewriteHistory`)**:
    *   Stores an array of `RewriteRecord` objects.

## Cookie State

1.  **Client Identifier (`client_id`)**:
    *   A UUID assigned to new clients and stored in an HTTP-only cookie.
2.  **Usage Token (`usage_token`)**:
    *   A JSON string containing `{ count: number, resetAt: number }`.
    *   Used by Edge API routes to enforce the daily rate limit of 10 requests.
    *   Necessary because in-memory state (like `Map`) resets on Edge cold starts.