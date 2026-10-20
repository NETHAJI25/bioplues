# Bioplues / ProofShield — API.md

> Based on server/ scaffold. Routes exist; runtime wiring to DB may vary. Treat as contract.

## Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout

## Users/Orgs
- GET/POST/PUT/DELETE /api/users
- GET/POST/PUT/DELETE /api/orgs

## Projects/Targets/Assets
- CRUD /api/projects
- CRUD /api/targets
- CRUD /api/assets

## Scans
- POST /api/scans/start
- GET /api/scans/:id/status
- GET /api/scans/:id/findings
- POST /api/scans/:id/cancel

## Findings
- GET /api/findings (filter/paginate)
- PATCH /api/findings/:id (status/update)
- POST /api/findings/bulk

## Health/Metrics
- GET /api/health
- GET /api/metrics

## Notes
- Auth/RBAC middleware present. Enforce server-side authZ.
- Validate with Zod. Use audit logging.
- Return consistent JSON with errors/pagination.
