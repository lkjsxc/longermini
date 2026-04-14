# API Architecture

This document outlines the API routes built using Next.js Edge Runtime.

## Rate Limiting Strategy
Due to the Edge runtime environment (Cloudflare Workers/Pages), Node.js `Map` cannot be used reliably for rate limiting as isolates spin up and down.
We use a cookie-based rate limiting approach:
*   A `usage_token` cookie stores the usage count and a reset timestamp.
*   The cookie is updated and sent back with the response headers.

## Endpoints

### `POST /api/rewrite`
*   **Purpose:** Expands a given short text into a longer, more verbose version without altering the core meaning.
*   **Payload:** `{ "text": "short text" }`
*   **Response:** Streaming plain text of the rewritten content. It uses `<think>` tags internally for chain-of-thought, which are stripped before final output in the UI.
*   **Limits:** 20 requests per day per user (enforced via cookies).

### `POST /api/seed`
*   **Purpose:** Generates a short, random, casual sentence in a specific language to serve as a seed for rewriting.
*   **Payload:** `{ "language": "English" | "Japanese" | ... }`
*   **Response:** Streaming plain text of the short seed sentence.
*   **Limits:** Shares the 20 requests per day limit with `/api/rewrite`.
