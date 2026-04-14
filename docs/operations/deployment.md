# Deployment & Testing

## Deployment
- `longermini` utilizes a multi-stage `Dockerfile` optimized for Next.js production builds.
- Local verification and deployment are orchestrated strictly via `docker-compose`.
- To boot the application locally:
  ```bash
  docker-compose up --build
  ```
- The `GEMINI_API_KEY` environment variable must be set in the host environment or a local `.env` file for Docker interpolation.

## Testing
- Tests are executed via:
  ```bash
  npm run test
  ```
- Testing leverages Jest and React Testing Library (RTL).
- Dockerizing tests is optional; local bare-metal execution is preferred for developer iteration speed.
