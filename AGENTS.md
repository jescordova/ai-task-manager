# AGENTS.md

## Repo layout

- Two independent apps with no root manifest or workspace tooling. Run commands inside `client/` or `server/`.
- `client/`: Astro 5 + React 19 + Tailwind 4 (via `@tailwindcss/vite`, no `tailwind.config`). Uses npm (`package-lock.json`). It is its own git repo; the root and `server/` are not git repos, so run `git` from `client/`.
- `server/`: Express 5 + Mongoose 9 + TypeScript. Uses pnpm (`pnpm@10.20.0`, `pnpm-lock.yaml`).

## Commands

Client (`client/`):
- `npm install`
- `npm run dev` -> Astro at http://localhost:4321
- `npm run build` -> `dist/`; `npm run preview` to serve the build
- No lint/test/typecheck scripts. `astro build` does not typecheck React/TS, so type errors will not fail the build.

Server (`server/`):
- `pnpm install`
- `pnpm dev` -> ts-node-dev on `src/server.ts`, http://localhost:4000. It runs `--transpile-only`, so type errors do NOT block dev.
- `pnpm build` -> `tsc` to `dist/` (this is the only typecheck). No `start` script; run `node dist/server.js` for production.
- No lint or test scripts.

## Environment

- Server loads `server/.env` via dotenv in `src/server.ts` and requires `PORT`, `MONGO_URI`, `JWT_SECRET`.
- `server/.env` and `server/atlas-credentials (1).env` contain secrets and `server/` has no `.gitignore`. Never commit or copy their contents.

## Backend wiring

- Entrypoint is `server/src/server.ts`: `app.listen` runs first, then `connectDB()` inside the listen callback. Keep that order unless intentionally changing startup behavior.
- Routes have no `/api` prefix: `/auth`, `/user`, `/tasks` (`server/src/app.ts`). The client hardcodes `API_URL = "http://localhost:4000"` in `client/src/services/api.ts`; changing host or prefix requires updating both.
- Auth uses JWT stored in `localStorage.token` and sent as `Authorization: Bearer <token>`. Login signs `{ _id }`; middleware also accepts `userId`; controllers read `(req as any).user._id`.
- Task routes apply `authenticateToken` per route, not with a router-level `router.use`.

## Known gotchas

- `Task` model only has `title`, `completed`, `user` (`server/src/models/Task.model.ts`). The client sends/renders `description`, which Mongoose silently drops (strict schema) so it is never persisted; `Task` in `client/src/services/api.ts` also comments out `description`, making `task.description` in `TaskList.tsx` a type error. Add it to both when working on descriptions.
- `client/src/pages/index.astro` is a static mock dashboard. The real API-backed UI is `/dashboard` (`dashboard.astro` -> `TaskList`); login redirects there.
- Task access is scoped by `{ user: userId }` in controller queries. Preserve that filter when adding task operations.


1. Oui, je connais, mais si j'ai une doute alors je te demanderai
2. 100% veux dire, que l'app marche et par exemple le vendre, sans bugs ou autre chose, qu'il marche sans aucun problème
3. Oui Poto, t'es mon coach/prof, à toi de decider
4. Oui elle sont là
5. Oui Poto, on le versionne 