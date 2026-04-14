# Testing Strategy

This document outlines the testing methodology and local development verification.

## Local Development Verification

The primary method for verifying the application behavior and build stability is through Docker Compose.

1.  **Starting the Environment**:
    Run `docker compose up --build` in the root directory. This builds the Next.js application within a production-like container.
2.  **Environment Variables**:
    Ensure `.env` contains `GEMINI_API_KEY`. If it is missing, API routes will fail with a 500 error.
3.  **Docker Checks**:
    The Dockerfile mimics the production deployment build steps. If the build succeeds in Docker, it should succeed on Cloudflare Pages.

## Manual Test Scenarios

Before committing significant changes, ensure the following flows work:

*   **FOUC Prevention**: Reload the page in both light and dark modes to verify no flickering occurs before React hydrates.
*   **State Persistence**: Change the `getseed` language, trigger a rewrite, and reload the page. The language and `remainingUses` counter should not reset.
*   **Rate Limits**: The Edge API rate limiting should properly decrement the `remainingUses` and return a `429` status code if the limit is exceeded.