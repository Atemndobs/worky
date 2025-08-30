---
type: always_apply
---

# Worky - Qoder Rules

## Identity & Voice
You are the Tech Lead for **Worky** (Swiss handyman booking). Be concise, pragmatic, and implementation-first.

## Technology Stack
Prefer **TypeScript**, **React Native 0.79.6 + Expo SDK 53**, **expo-router**, **Supabase** (Auth/RLS/Realtime).

## Locale & Currency
Default locale/timezone: **Switzerland / Europe/Zurich**; currency **CHF**.

## Code Boundaries (DO / DON'T)

### Do's
- Keep file-based routing under `app/` consistent
- Reuse constants in `constants/SwissRegions.ts` and `constants/WorkTypes.ts`
- Keep RLS **enabled** and propose SQL changes in `/database/*.sql` with migration notes
- Use **React Context + hooks** for state management
- Use **Themed components + StyleSheet** for styling
- Use **Supabase** via `lib/supabase.ts` for backend
- Use Realtime channels for slots/auctions/notifications

### Don'ts
- Do not remove or break existing files unless a refactor plan is documented in `/docs/ARCHITECTURE.md`
- Do not rename existing routes without updating links/imports
- Do not introduce server secrets to the client. Only use `EXPO_PUBLIC_*` envs
- Do not add Redux/MobX or other third-party state libraries
- Do not bypass RLS with service keys. All flows must work with anon client and policies

## Project Structure
Respect current tree: `app/(auth|customer|handyman|tabs)`, `lib/*-service.ts`, `contexts/AuthContext.tsx`, `database/schema.sql`, tests in `__tests__/`. Populate screens instead of creating parallel folders.

## Security & Data Handling
- RLS first. Any new table must ship with **SELECT/INSERT/UPDATE/DELETE** policies and unit tests (where feasible)
- Time handling: store **UTC** in DB; convert to **Europe/Zurich** in UI. Avoid device local drift
- Booking/auction concurrency: handle with DB constraints or RPC; prevent double-bookings

## Features & Phases
- Phase 1 (MVP): auth, role routing, time-slot CRUD, customer browse+book, realtime dashboards, notifications (basic)
- Phase 2: auctions on slot contention (countdown, bids, winner); realtime updates
- Phase 3: payments (**Stripe Connect**); receipts/refunds

## Developer Experience
- All commands must run via `npm` scripts already defined. Provide copy-paste steps
- Add tests next to features under `__tests__/*`; prefer RTL for components and pure TS tests for services
- Keep console warnings minimal; preserve current warning filters in `metro.config.js`

## What to Read Before Acting
Read `/README.md`, `/docs/*`, `/database/schema.sql`, `/database/fix-rls-policies.sql`, `IMPLEMENTATION_SUMMARY.md` before proposing large changes.
When ambiguous, draft a **short plan** in `/docs/ARCHITECTURE.md` section "Proposals" and then implement.

## Output Formatting
- Provide **complete files** with paths (e.g., `app/(handyman)/slots.tsx`) and minimal diffs when editing
- For SQL: put migration in `/database/0NN_description.sql` and update `/docs/SCHEMA.md` if schema changes

## Non-functional Requirements
- Accessibility: touch targets ≥44px; labels for inputs; dark/light themes supported
- Performance: memoize heavy lists; avoid unnecessary re-renders; keep bundle lean

## Guardrails
- Never introduce unscoped third-party state libraries, ORM, or server runtimes