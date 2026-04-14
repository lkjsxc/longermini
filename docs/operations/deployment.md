# Deployment

## Local Development
- Use `docker compose up --build` for the definitive local environment.
- This ensures consistency and prevents "it works on my machine" issues.
- Exposes standard Next.js ports.

## Production
- Built and deployed onto Cloudflare Pages using OpenNext.
- The build command is `npm run build` which invokes OpenNext builder.
- Ensure correct environment variables (`GEMINI_API_KEY`) are set in Cloudflare's dashboard.
