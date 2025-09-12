# Repository Guidelines

This repository hosts Worky specs, rules, and operational docs. It does not contain app source; keep specs concise, traceable, and executable by the app team.

## Project Structure & Module Organization
- `docs/` – Guides and decision records (e.g., `testing-summary.md`).
- `docs/specs/` – Feature specs named `SPEC-<TOPIC>-NNN.md` (e.g., `SPEC-CHAT-001.md`).
- `assets/images/` – Icons, diagrams, screenshots referenced by docs.
- `scripts/` – DB operations guidance (see `scripts/README.md`).
- Root READMEs – Overview and implementation summaries.

## Docs Workflow & Commands
- Edit Markdown directly; no build step for this repo.
- Optional validation (if installed): `npx markdownlint .`; `npx markdown-link-check -p README.md`.
- Database ops: follow `scripts/README.md` (e.g., `./scripts/db-manager.sh status`).

## Coding Style & Naming Conventions
- Markdown: ATX headers (`#`, `##`), one H1 per file, short sections, bulleted steps.
- Filenames: specs `SPEC-<TOPIC>-NNN.md`; guides `kebab-case` (e.g., `authentication-user-guide.md`).
- Code blocks: add fences with language (e.g., ```ts, ```sql); prefer 2‑space indentation.
- Keep lines ≲100 chars; link long URLs with titles.

## Testing & Validation
- Ensure examples are runnable/consistent (queries, commands, flows).
- Update cross‑refs in `docs/requirements-and-decisions.md` when behavior changes.
- Verify images exist in `assets/images/` and render in GitHub preview.

## Windsurf‑Aligned App Rules (Reference)
- Stack & identity: TypeScript, React Native 0.79.6 + Expo SDK 53, expo‑router, Supabase; region/timezone Switzerland (Europe/Zurich), currency CHF. Do not expose server secrets; only use `EXPO_PUBLIC_*`.
- Structure mapping: `app/(auth|customer|handyman|tabs)`, `lib/*-service.ts`, `contexts/AuthContext.tsx`, constants in `constants/SwissRegions.ts` and `constants/WorkTypes.ts`, tests in `__tests__/`.
- Security & data: RLS required on new tables; store UTC in DB, convert in UI to Europe/Zurich; handle booking/auction concurrency with DB constraints/RPC.
- SQL & docs: migrations live at `/database/0NN_description.sql` (app repo); document schema changes in `docs/SCHEMA.md` and proposals in `docs/ARCHITECTURE.md`.
- Read first: `/README.md`, `/docs/*`, `IMPLEMENTATION_SUMMARY.md` before large changes.

## Commit & Pull Request Guidelines
- Conventional Commits: `docs:`, `chore:`, `feat(spec):`, `fix:`.
- PRs: summary, affected files, linked issue/spec ID, and screenshots when relevant.
- Keep PRs focused and reviewable.

## Security & Configuration Tips
- Never commit secrets (API keys, `DATABASE_URL`). Use placeholders and `.env` references only.
- Redact any personally identifiable information in examples.
