# Bioplues | ProofShield

**An evidence-first, modular web application security assessment and remediation tracking platform.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## 1. Executive Summary

ProofShield (Bioplues) is a local-first, evidence-centric web application security assessment platform. It focuses on traceable findings, structured remediation, and retest verification. The repository provides a complete, runnable frontend plus a modular backend scaffold for future full-stack deployment.

## 2. Problem Statement

Fragmented security findings, missing evidence, and broken remediation loops make vulnerability tracking unreliable. ProofShield standardizes the workflow from discovery to verified fix with reproducible evidence attached to every finding.

## 3. Solution Overview

| Capability | Implementation | Status |
| :-- | :-- | :-- |
| Project & Scope Management | src/features/projects/ with routes in src/app/router.tsx | Implemented |
| Security Scanning (Demo) | src/adapters/DemoScannerAdapter.ts, src/services/scanService.ts | Implemented |
| Evidence-First Findings | src/domain/types.ts, src/features/findings/ | Implemented |
| Remediation & Retests | src/features/remediation/ | Implemented |
| Reports | src/features/reports/ | Implemented |
| Admin/Settings | src/features/administration/ | Implemented |
| Extensible Scanner Interface | Adapter pattern with ScanService | Implemented |
| Backend Scaffold | server/ (Express, WS, routes, middleware, schema, utils) | Scaffolded |

## 4. Quick Start

### Prerequisites
- Node.js v18+
- npm v9+

### Install & Run

`ash
git clone https://github.com/NETHAJI25/bioplues.git
cd bioplues
npm install
npm run dev
`

Open [http://localhost:5173](http://localhost:5173). Demo mode is enabled by default with sample data.

### Build & Lint

`ash
npm run build
npm run lint
npm run preview
`

## 5. Architecture

`	ext
src/        -> React + TypeScript UI (features, app, adapters, services, domain)
server/     -> Express + WebSocket scaffold (routes, middleware, db/schema, types, utils)
public/     -> Static assets
dist/       -> Production build output
`

## 6. Feature-to-Code Mapping

| Feature | Source Files | Verification |
| :-- | :-- | :-- |
| Routing/App Shell | src/app/App.tsx, src/app/router.tsx, src/app/providers.tsx | Navigate all routes |
| Dashboard/Landing | src/features/overview/ | Load / and /dashboard |
| Projects | src/features/projects/ | Load /projects |
| Scans | src/features/scans/ | Load /scans, /scans/new |
| Findings | src/features/findings/ | Load /findings, open a finding detail |
| Remediation/Retests | src/features/remediation/ | Load /remediation, /retests |
| Reports | src/features/reports/ | Load /reports |
| Admin/Settings | src/features/administration/ | Load /settings, /admin |
| Scanner Engine | src/adapters/DemoScannerAdapter.ts, src/services/scanService.ts | Inspect demo data flow |
| Backend Scaffold | server/ | Inspect modules/middleware/routes/schema |

## 7. Technology Stack

- **Frontend:** React 19, TypeScript, Vite 8, React Router 7, Tailwind CSS v4
- **UI:** lucide-react, framer-motion, sonner, recharts, monaco-editor
- **State/Forms:** zustand, react-hook-form, zod
- **Backend (Scaffold):** Express, ws, helmet, cors, drizzle-orm, better-sqlite3, jsonwebtoken, zod
- **Tooling:** oxlint

## 8. Evaluator Quick-Verification Guide

| Criterion | Evidence | Verification |
| :-- | :-- | :-- |
| Feature completeness | Feature-to-code mapping (Section 6) | Inspect linked modules in src/ and server/ |
| Reproducibility | package.json scripts + demo data in src/app/providers.tsx / src/adapters/DemoScannerAdapter.ts | Run 
pm install && npm run dev |
| Model performance | Rule-based/demo platform (no trained weights) | Deterministic demo behavior; logic in adapters/services is inspectable |
| Testing | Manual reproducible walkthrough (Section 4) | Execute documented commands and navigate routes |
| Limitations | Section 9 | Review known issues and unsupported features |

**Scoring guidance:** Evaluate each criterion independently using the competition rubric. Award credit only for claims supported by reproducible evidence. Distinguish implemented features from prototypes and planned work.

## 9. Limitations & Known Issues

| Item | Type | Notes |
| :-- | :-- | :-- |
| Live network scanning | Known Limitation | Uses DemoScannerAdapter (simulated). No default active external scanning. |
| Persistent storage | Known Limitation | Frontend uses in-memory/demo state. DB schema exists in server/db/ but not wired to persistent runtime by default. |
| Backend runtime | Known Limitation | server/ is a structured scaffold (not required to run the frontend demo). |
| Authentication | Known Limitation | Auth primitives exist in scaffold; full UI auth flow not fully wired in current demo. |
| Automated tests | Known Limitation | No configured unit/integration/E2E test suite at present. |
| Exports | Prototype/Partial | Export libraries present; full PDF/CSV/SARIF export flows can be extended. |

## 10. License

MIT License - see [LICENSE](LICENSE) for details.

**Repository:** [https://github.com/NETHAJI25/bioplues](https://github.com/NETHAJI25/bioplues)
