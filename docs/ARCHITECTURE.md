# Bioplues / ProofShield — ARCHITECTURE.md

## 1. Overview
Feature-sliced React frontend + modular Express scaffold backend.

## 2. Frontend
- Entry: src/main.tsx
- App: src/app/App.tsx (BrowserRouter + AppProvider)
- Routing: src/app/router.tsx
- State: AppProvider (demoMode, projects, activeScans, findings)
- Features: overview, projects, scans, findings, remediation, reports, administration
- Domain: src/domain/types.ts
- Services/Adapters: src/services/scanService.ts, src/adapters/DemoScannerAdapter.ts

## 3. Backend (Scaffold)
- Entry: server/index.ts
- Middleware: auth, rbac, rateLimit, validate, auditLogger, errorHandler, notFound
- Routes: auth, users, orgs, projects, targets, assets, health, metrics
- WS: server/websocket/server.ts
- DB: server/db/schema.ts (Drizzle-ready)
- Utils: crypto, scoring, dedupe, pagination
- Types: shared DTOs

## 4. Data Flow (Current)
1. UI renders from AppProvider (in-memory/demo)
2. NewScan/ScanCenter use ScanService -> DemoScannerAdapter (simulated)
3. Findings stored in context; lifecycle tracked by FindingStatus
4. Remediation/Retests update status in context
5. Reports render from context data

## 5. Data Flow (Target)
Frontend <-> REST API <-> Services <-> DB (persistent). WS for real-time events.

## 6. Boundaries
- UI never calls real scanners directly (uses adapter)
- Contracts defined in domain/types + server/types
- Safe-by-default: demo only

## 7. Diagram (Text)
User -> React Router -> Feature Components -> Context/Service -> Adapter/HTTP -> (API/DB/WS)
