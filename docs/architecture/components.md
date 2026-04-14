# Components Architecture

This document describes the React components used in the application.

## `src/app/page.tsx`
The main page component. It holds the core state for the UI, including the text area, remaining uses, and the placeholder examples. It handles user input and triggers API calls.
*   **State:** Manages `text`, `remainingUses`, `seedLang`, `isDark`, and UI loading states.

## `src/components/Header.tsx`
The application header. It contains the title and controls for toggling the light/dark theme.
*   **Theme Management:** It checks the initial preference, reads from `localStorage` to prevent FOUC, and updates both `localStorage` and the `document.documentElement` class list on toggle.

## `src/components/RewriteHistory.tsx`
Displays a history of the user's previously generated texts. It reads from and writes to `localStorage` to persist this history across sessions.
