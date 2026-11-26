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
- Every act has a `source` (name, url, license, retrievedAt). The validator requires it, and the Campaign page shows it as attribution.
- `src/data/acts/act1.json` was copied from [PoE2DB](https://poe2db.tw/us/Act_1) on 2026-11-26. It is licensed CC BY-NC-SA 3.0, so the data stays under the same license, needs attribution, and **must not be used commercially**. Everything is `verified: false` until checked in game.
- **Before adding ads, affiliate links or donations**, replace this data with content written from your own playthrough (or get written permission), then change the `source` accordingly.
- Register each new act file in `src/data/index.ts`.

## Roadmap

See the Notion plan "PoE2 Companion — Daily Keystone" (Day 1 to launch day, 11 Dec 2026).

Known risk for Day 6 (PWA): `vite-plugin-pwa` listed Vite 7 as its highest supported peer when Vite 8 came out. Check that its latest release supports Vite 8 before adding it.
