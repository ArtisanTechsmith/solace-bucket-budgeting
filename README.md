# Solace Bucket Budgeting

A modern, bucket-based budgeting app. Money is split into named **buckets** (e.g. "Groceries", "Rent", "Savings") so spending is easy to plan, track, and reason about at a glance.

Built to demonstrate production-grade front-end engineering: a layered data layer, typed server responses, decoupled server/UI state, and a component system designed to be reused as the feature set grows.

## Status

Early-stage. The foundation (data layer, layout shell, reusable primitives) is in place; the first end-to-end feature — bucket CRUD — is next on the roadmap.

## Tech Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | React 19 + TypeScript | Component model, strong typing, ecosystem |
| Build | Vite 8 | Fast dev server, first-class TS/ESM support |
| UI | Mantine 9 | Accessible, themeable primitives; reduces bespoke CSS |
| Server state | TanStack Query 5 | Caching, refetch semantics, request deduplication |
| UI state | Zustand 5 | Small, flexible, no boilerplate for local UI state |
| Forms | Mantine Form | Validation built on the same primitives as the rest of the app |
| Charts | Recharts + Mantine Charts | Read-only data visualization |
| Mock API | json-server | Local stand-in for a real backend while domain logic evolves |
| Tooling | ESLint, Prettier, npm-run-all | Enforced consistency; single-command dev startup |

## Architecture

The app separates **server state** from **UI state** and funnels all HTTP traffic through a small, typed data layer.

```
┌────────────────────────────┐
│  Components / Views        │  Mantine + feature components
│  (React Query hooks)       │
└─────────────┬──────────────┘
              │ useQuery / useMutation
┌─────────────▼──────────────┐
│  API layer                 │  Buckets.ts → ApiConnector
│  typed DTOs + Envelope     │
└─────────────┬──────────────┘
              │ fetch
┌─────────────▼──────────────┐
│  Mock backend              │  json-server (db.json)
└────────────────────────────┘
```

Key pieces:

- **`ApiConnector`** — generic HTTP client. `POST`/`PUT` require a typed body via method overloading, so a "create with a body" bug is caught at compile time, not runtime.
- **`Envelope<T>`** — every response is wrapped with `data` and `errors`, so views never guess what a raw payload looks like and error handling has a single, consistent shape to check.
- **DTOs** (`BucketDto`) — one file per resource; a single place to evolve the server contract.
- **React Query hooks** (`useBuckets`) — the only seam views touch; components never call `fetch` directly.
- **Zustand** (`useNavbar`) — reserved for pure UI state (e.g. nav collapse), deliberately kept out of server data.

## Getting Started

Prerequisites: Node.js 20+ and npm.

```sh
npm install
npm start
```

- App: <http://localhost:3000>
- Mock API: <http://localhost:3001>

### Scripts

| Script | What it does |
| --- | --- |
| `npm start` | Runs the mock API and the dev server together |
| `npm run dev` | Vite dev server only (port 3000) |
| `npm run db` | json-server only (port 3001) |
| `npm run build` | Type-check (`tsc -b`) then production build |
| `npm run lint` | ESLint over the whole project |
| `npm run preview` | Serve the production build locally |

## Project Structure

```
src/
├── api/                  # Data layer
│   ├── ApiConnector.ts   # Generic HTTP client (method-overloaded)
│   ├── Envelope.ts       # { data, errors } response wrapper
│   ├── QueryClientProvider.tsx
│   └── buckets/          # Domain resource: DTO + query hooks
├── components/
│   ├── card/             # Reusable Card (title, actions, loading, close)
│   └── motion/           # framer-motion wrappers
├── layout/
│   └── useNavbar.tsx     # Collapsible app-shell nav (Zustand UI state)
├── App.tsx
└── main.tsx
```

## Design Decisions

- **Overloaded `sendRequest`**: `GET`/`DELETE` can't accept a body and `POST`/`PUT` require one — enforced by the type system rather than a runtime check.
- **Data layer + hooks as the only data seam**: views stay declarative; swapping json-server for a real API later touches one file, not every component.
- **JSON server behind the same Envelope contract**: the mock is an implementation detail; the rest of the app is already written against the shape a real backend would return (this also makes it a drop-in starting point for a contract-driven API).
- **UI state in Zustand, not React Query**: distinguishes "stuff the server knows" from "stuff the browser knows", which keeps query invalidation semantics clean.

## Roadmap

- [x] Data layer, layout shell, reusable `Card` primitive
- [ ] Bucket CRUD (create, edit, delete) with mock persistence
- [ ] Budget allocation and roll-up ("available to budget")
- [ ] Transactions and per-bucket spend tracking
- [ ] Tests (unit + integration at the data-layer seam)
- [ ] CI pipeline (lint → typecheck → test → build)