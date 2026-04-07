# Deployment & Testing

## Deployment
- `longermini` uses a multi-stage `Dockerfile` optimized for Next.js production builds.
- Local deployment and verification is orchestrated via `docker-compose`.
- To boot locally: `docker-compose up --build`
- Ensure `GEMINI_API_KEY` is set in the host environment or a `.env` file for Docker to pick up.

## Testing
- All tests are run via `npm run test`.
- Uses Jest + React Testing Library.
- Dockerizing tests is optional; local execution is preferred for speed.
