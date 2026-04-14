# Deployment and Operations

## Local Development
- Use Docker Compose for a consistent, isolated local environment.
- Command: `docker compose up --build`.

## Environment Variables
- Copy `.env.example` to `.env`.
- `GEMINI_API_KEY`: The API key from Google AI Studio needed for the `/api/rewrite` and `/api/seed` endpoints.

## Production
- Built and deployed on Cloudflare Pages using OpenNext.
- Build command: `npm run build` (invokes OpenNext builder).
- Ensure `GEMINI_API_KEY` is properly configured in the Cloudflare Dashboard environment variables.