# PoE2 Companion

Unofficial, mobile-first companion web app for Path of Exile 2: campaign checklist, timer, resistance tracker and build notes.
Not affiliated with or endorsed by Grinding Gear Games. Read-only: it never touches the game client.

## Stack

Vite 8 + React 19 + TypeScript 7 + Tailwind CSS 4 + React Router 8. Static site, no backend; user progress will live in the browser (localStorage).

## Getting started

Requires Node 22.22+ (see `.nvmrc`).

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Validate data, typecheck, production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run validate:data` | Checks every JSON file in `src/data/acts` |
| `npm run upgrade:latest` | Bumps every dependency to its newest release and reinstalls |

Dependency ranges in `package.json` were set without running an install. Run `npm run upgrade:latest` once after the first `npm install`, then commit `package-lock.json`.

## Data

Campaign content lives in `src/data/acts/*.json` (types in `src/types/PoeTypes.ts`).

- Names are objects like `{ "en": "...", "th": "...", "ja": "..." }`; only `en` is required.
- Every quest and waypoint has `verified`. Set it to `true` only for things confirmed in the actual game.
- `src/data/acts/act1.json` currently holds placeholder sample data. Replace it with real data from your own playthrough, and write routes and notes in your own words.
- Register each new act file in `src/data/index.ts`.

## Roadmap

See the Notion plan "PoE2 Companion — Daily Keystone" (Day 1 to launch day, 11 Dec 2026).

Known risk for Day 6 (PWA): `vite-plugin-pwa` listed Vite 7 as its highest supported peer when Vite 8 came out. Check that its latest release supports Vite 8 before adding it.
