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
| `npm run check:release` | Same checks, but fails while any item is still copied from a third party |
| `npm run upgrade:latest` | Bumps every dependency to its newest release and reinstalls |

Dependency ranges in `package.json` were set without running an install. Run `npm run upgrade:latest` once after the first `npm install`, then commit `package-lock.json`.

## Data

Campaign content lives in `src/data/acts/*.json` (types in `src/types/PoeTypes.ts`).

- Names are objects like `{ "en": "...", "th": "...", "ja": "..." }`; only `en` is required.
- Every quest and waypoint has `verified`. Set it to `true` only for things confirmed in the actual game.
- An item can be `"own"` only when `verified: true`. Acts that still hold non-own items need a `source` (name, url, license, licenseUrl, retrievedAt), and the Campaign page shows it as attribution.
- **Converting to our own data (do this per item as you play):** look at the game, rewrite the name, notes and rewards from what you see in your own words, then set `"origin": "own"` and `"verified": true`. Rewording the wiki text without checking the game does not make it ours. When the last item of an act is `own`, delete that act's `source`.
- **Before adding ads, affiliate links or donations**, run `npm run check:release`. It must pass (no third-party items left), or get written permission from the source.
- Register each new act file in `src/data/index.ts`.

## Roadmap

See the Notion plan "PoE2 Companion — Daily Keystone" (Day 1 to launch day, 11 Dec 2026).

Known risk for Day 6 (PWA): `vite-plugin-pwa` listed Vite 7 as its highest supported peer when Vite 8 came out. Check that its latest release supports Vite 8 before adding it.
