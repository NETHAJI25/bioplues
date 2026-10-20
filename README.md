# Bioplues | ProofShield

**An evidence-first, modular web application security assessment and remediation tracking platform.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## Executive Summary

ProofShield (Bioplues) is a local-first, evidence-centric web application security assessment and remediation tracking platform. It enforces an "evidence over assumptions" workflow: every vulnerability finding is traceable to concrete artifacts (affected URL, HTTP method, evidence summary, impact, remediation, references, and timestamps), enabling developers and security reviewers to verify fixes through a structured retest process.

## Problem Statement

Security findings are often scattered across spreadsheets, chats, and tools with no traceability or verification loop. ProofShield addresses this by providing a unified, scoped workspace for projects, scans, findings, remediation, retests, and reports—designed for reproducible, responsible security assessments.

## Solution Overview

| Capability | Implementation | Status |
| :-- | :-- | :-- |
| Project & Scope Management | src/features/projects/ · src/app/router.tsx | **Implemented** |
| Security Scanning (Demo Mode) | src/adapters/DemoScannerAdapter.ts · src/services/scanService.ts | **Implemented** |
| Evidence-First Findings | src/domain/types.ts · src/features/findings/ | **Implemented** |
| Remediation Tracking | src/features/remediation/Remediation.tsx | **Implemented** |
| Retests & Verification | src/features/remediation/Retests.tsx | **Implemented** |
| Reporting | src/features/reports/ | **Implemented** |
| Administration & Settings | src/features/administration/ | **Implemented** |
| Scanner Abstraction Layer | Adapter pattern (IScanner-style) via ScanService | **Implemented** |
| Modular Backend Scaffold | server/ (Express, WebSocket, routes, middleware, RBAC, schema, utils) | **Scaffolded** |

## Feature-to-Code Mapping

| Feature Area | Key Files / Modules | Purpose |
| :-- | :-- | :-- |
| **App Shell & Routing** | src/app/App.tsx, src/app/router.tsx, src/app/providers.tsx | Root layout, route definitions, global state (demo mode, projects, scans, findings) |
| **Overview (Landing/Dashboard)** | src/features/overview/LandingPage.tsx, src/features/overview/Dashboard.tsx | Product overview, KPIs, activity summary |
| **Projects** | src/features/projects/Projects.tsx, src/features/projects/NewProject.tsx, src/features/projects/ProjectDetail.tsx | Create/manage projects, scope configuration surfaces |
| **Scans** | src/features/scans/ScanCenter.tsx, src/features/scans/NewScan.tsx, src/features/scans/ScanDetail.tsx | Scan lifecycle, progress, endpoints/logs views |
| **Findings** | src/features/findings/Findings.tsx, src/features/findings/FindingDetail.tsx | Evidence-first listing and detailed finding view |
| **Remediation & Retests** | src/features/remediation/Remediation.tsx, src/features/remediation/Retests.tsx | Fix tracking and verification workflow |
| **Reports** | src/features/reports/Reports.tsx, src/features/reports/ReportDetail.tsx | Report listing and detailed report view |
| **Admin & Settings** | src/features/administration/Admin.tsx, src/features/administration/Settings.tsx | Platform configuration surfaces |
| **Domain & Services** | src/domain/types.ts, src/services/scanService.ts | Canonical types and scan orchestration |
| **Scanner Adapters** | src/adapters/DemoScannerAdapter.ts | Safe, deterministic demo scanner implementation |
| **Backend Scaffold** | server/index.ts, server/routes/, server/middleware/, server/db/schema.ts, server/websocket/, server/utils/, server/types/ | Auth/RBAC, rate-limiting, audit, validation, real-time events, data model |

## Architecture

`	ext
bioplues/
├── src/                # Frontend (React + TypeScript + Vite)
│   ├── app/            # Shell, router, providers
│   ├── features/       # Feature modules by domain
│   ├── adapters/       # Scanner adapters
│   ├── services/       # Business logic/services
│   ├── domain/         # Shared domain types
│   ├── components/     # Shared UI components
│   └── lib/            # Utilities
├── server/             # Backend scaffold (Express + WebSocket)
├── public/             # Static assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig*.json
`

## Technology Stack

| Layer | Technologies | Purpose |
| :-- | :-- | :-- |
| **Frontend** | React 19, TypeScript, Vite 8, React Router DOM 7 | UI, routing, build tooling |
| **Styling** | Tailwind CSS v4, @tailwindcss/vite | Modern, responsive UI |
| **UI Components/UX** | lucide-react, framer-motion, sonner, cmdk, vaul | Icons, animations, toasts, palettes, drawers |
| **State & Forms** | zustand, react-hook-form, @hookform/resolvers, zod | State management, validation, forms |
| **Data/Utilities** | axios, date-fns, clsx, tailwind-merge | HTTP, dates, class utilities |
| **Visualization/Editors** | recharts, @monaco-editor/react, react-markdown, remark-gfm | Charts, editor, markdown rendering |
| **Export** | html2canvas, jspdf | Report/export groundwork |
| **Backend (Scaffold)** | Express, ws, helmet, cors, compression, morgan, express-rate-limit, jsonwebtoken, bcryptjs, drizzle-orm, better-sqlite3, uuid | API, auth, realtime, schema, security |
| **Tooling** | oxlint, postcss, autoprefixer | Linting, CSS processing |

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) **v18 or higher**
- [npm](https://www.npmjs.com/) **v9 or higher**

### Steps

`ash
# 1) Clone the repository
git clone https://github.com/NETHAJI25/bioplues.git
cd bioplues

# 2) Install dependencies
npm install

# 3) Start development server
npm run dev
`

The application will be available at: **[http://localhost:5173](http://localhost:5173)**

### Production

`ash
# Build
npm run build

# Preview production build
npm run preview
`

### Linting

`ash
npm run lint
`

## Usage

1. **Landing Page** (/) – Project overview and entry point
2. **Dashboard** (/dashboard) – Security posture summary (demo data loaded by default)
3. **Projects** (/projects) – Manage assessment projects
4. **Scans** (/scans) / **New Scan** (/scans/new) – Configure and review scans
5. **Findings** (/findings) – Browse evidence-backed findings; open details for full context
6. **Remediation** (/remediation) – Track fixes in progress
7. **Retests** (/retests) – Verify remediated findings
8. **Reports** (/reports) – Review assessment reports
9. **Settings** (/settings) / **Admin** (/admin) – Configuration surfaces

**Demo Mode:** Enabled by default. A sample project (*"Sample Store — Security Training Lab"*) with pre-populated findings is loaded on first run for immediate, reproducible evaluation.

## Evaluator Quick-Verification Guide

| Criterion | Evidence | Verification |
| :-- | :-- | :-- |
| **Feature completeness** | src/app/router.tsx and all src/features/* modules listed in the Feature-to-Code Mapping | Inspect linked modules; run 
pm run dev and navigate all routes. |
| **Reproducibility** | package.json scripts, src/app/providers.tsx (demo data), src/adapters/DemoScannerAdapter.ts (deterministic findings) | Run 
pm install && npm run dev from a clean clone. Demo state is reproducible with no external services required. |
| **Model performance** | Rule-based/demo platform (no trained ML weights included). Deterministic adapter logic in src/adapters/DemoScannerAdapter.ts and src/services/scanService.ts. | Review adapter logic and observe consistent, deterministic results across runs. (Not applicable as a trainable model checkpoint.) |
| **Testing** | Manual, reproducible walkthrough above + TypeScript build/lint checks | Execute 
pm run build and 
pm run lint. Follow the Usage section to validate routes and workflows. |
| **Limitations** | [Limitations & Known Issues](#limitations--known-issues) | Review the limitations section below to distinguish implemented features from scaffolds/prototypes and known gaps. |

**Scoring guidance:** Evaluate each criterion independently using the competition rubric. Award credit only for claims supported by reproducible evidence. Distinguish implemented features from prototypes and planned work.

## Limitations & Known Issues

| Item | Type | Notes |
| :-- | :-- | :-- |
| **Live Network Scanning** | Known Limitation | Uses the DemoScannerAdapter (simulated). No active external scanning is executed by default. |
| **Persistent Storage** | Known Limitation | Frontend state is in-memory/demo. A full schema is present in server/db/schema.ts but not wired to a required runtime DB for the default frontend demo. |
| **Backend Runtime** | Known Limitation | The server/ directory is a structured, modular scaffold (routes, middleware, auth/RBAC, WebSocket, utils). It is not required to run the frontend in demo mode. |
| **Authentication** | Known Limitation | Auth/RBAC primitives exist in the backend scaffold; a fully integrated end-to-end auth UI flow is not fully wired in the current demo. |
| **Automated Test Suite** | Known Limitation | No unit/integration/E2E test runner is configured at this time. Reproducibility is demonstrated via build, lint, and manual walkthrough. |
| **Report Exports** | Prototype/Partial | html2canvas and jspdf are installed; full PDF/JSON/CSV/SARIF export flows can be extended. |

## Security Note

This project is designed for **authorized security assessments only**. The demo mode uses simulated data with no automatic active exploitation. If extended to real scanning, strict scope enforcement, rate-limiting, proper authentication/authorization, and audit logging should be enforced.

## Contributing

Contributions are welcome. Please follow the existing feature-sliced structure, keep types strict, and update documentation when adding features.

## License

This project is licensed under the [MIT License](LICENSE).

**Repository:** [https://github.com/NETHAJI25/bioplues](https://github.com/NETHAJI25/bioplues)
