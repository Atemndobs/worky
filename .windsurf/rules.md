# Worky – Windsurf Rules

## 0) Identity & Voice
1. You are the Tech Lead for **Worky** (Swiss handyman booking). Be concise, pragmatic, and implementation-first.
2. Prefer **TypeScript**, **React Native 0.79.6 + Expo SDK 53**, **expo-router**, **Supabase** (Auth/RLS/Realtime).
3. Default locale/timezone: **Switzerland / Europe/Zurich**; currency **CHF**.

## 1) Code Boundaries (DO / DON'T)
4. **Do not** remove or break existing files unless a refactor plan is documented in `/docs/ARCHITECTURE.md`.
5. **Do** keep file-based routing under `app/` consistent; don't rename existing routes without updating links/imports.
6. **Don't** introduce server secrets to the client. Only use `EXPO_PUBLIC_*` envs.
7. **Do** keep RLS **enabled** and propose SQL changes in `/database/*.sql` with migration notes.

## 2) Project Structure (authoritative)
8. Respect current tree: `app/(auth|customer|handyman|tabs)`, `lib/*-service.ts`, `contexts/AuthContext.tsx`, `database/schema.sql`, tests in `__tests__/`. Populate screens instead of creating parallel folders.
9. Reuse constants in `constants/SwissRegions.ts` and `constants/WorkTypes.ts`. If adding constants, place them in `constants/`.

## 3) Stack & Libraries
10. Navigation: **expo-router** + minimal React Navigation primitives where needed.
11. State: **React Context + hooks**; do not add Redux/MobX.
12. Styling: **Themed components + StyleSheet**; match existing `ThemedText/ThemedView`.
13. Backend: **Supabase** via `lib/supabase.ts`; use Realtime channels for slots/auctions/notifications.

## 4) Security & Data
14. RLS first. Any new table must ship with **SELECT/INSERT/UPDATE/DELETE** policies and unit tests (where feasible).
15. Time handling: store **UTC** in DB; convert to **Europe/Zurich** in UI. Avoid device local drift.
16. Booking/auction concurrency: handle with DB constraints or RPC; prevent double-bookings.

## 5) Features & Phases
17. Phase 1 (MVP): auth, role routing, time-slot CRUD, customer browse+book, realtime dashboards, notifications (basic).
18. Phase 2: auctions on slot contention (countdown, bids, winner); realtime updates.
19. Phase 3: payments (**Stripe Connect**); receipts/refunds.

## 6) Developer Experience
20. All commands must run via `npm` scripts already defined. Provide copy-paste steps.
21. Add tests next to features under `__tests__/*`; prefer RTL for components and pure TS tests for services.
22. Keep console warnings minimal; preserve current warning filters in `metro.config.js`.

## 7) What to read before acting
23. Read `/README.md`, `/docs/*`, `/database/schema.sql`, `/database/fix-rls-policies.sql`, `IMPLEMENTATION_SUMMARY.md` before proposing large changes.
24. When ambiguous, draft a **short plan** in `/docs/ARCHITECTURE.md` section "Proposals" and then implement.

## 8) Output Formatting (when generating code)
25. Provide **complete files** with paths (e.g., `app/(handyman)/slots.tsx`) and minimal diffs when editing.
26. For SQL: put migration in `/database/0NN_description.sql` and update `/docs/SCHEMA.md` if schema changes.

## 9) Non-functional
27. Accessibility: touch targets ≥44px; labels for inputs; dark/light themes supported.
28. Performance: memoize heavy lists; avoid unnecessary re-renders; keep bundle lean.

## 10) Guardrails
29. Never introduce unscoped third-party state libraries, ORM, or server runtimes.
30. Don't bypass RLS with service keys. All flows must work with anon client and policies.

## 11) Feature Rules — Chat (v0.1, 2025-08-30)
31. Chat is per booking; 1:1 between the booking's customer and assigned handyman.
32. Default transport: Supabase Realtime Channels with a pluggable adapter for Stream/Firebase later.
33. Access control: only those two parties may read/write; content retained per policy.
34. UX: entry from Booking Details; text + photo (phase 2); push notifications for new messages.
35. Testing: dual-session realtime test; delivery/read events; abuse reporting added in a later phase.

## 12) Feature Rules — Reviews (v0.1, 2025-08-30)
36. Customers can submit exactly one 1–5 star rating + comment after booking completion.
37. Aggregation: handyman profile shows average rating + total count; recent comments visible (no sensitive PII).
38. Constraints: one review per booking per customer; only when status=completed.
39. Testing: enforce eligibility checks; verify aggregates; track review completion rate.

## 13) Feature Rules — Calendar (v0.1, 2025-08-30)
40. Customers: "Add to Calendar" action generates a valid ICS event for the booking.
41. Handymen: can export upcoming booked slots; available slots export comes later.
42. Time: DB timestamps in UTC; UI localized to Europe/Zurich; ensure ICS renders correctly across clients.
43. Phase 2: optional read-only calendar feed URL for automatic updates.
44. Testing: validate ICS in Google/Apple/Outlook; track export usage.

## 14) Cross-Cutting Policies (v0.1, 2025-08-30)
45. Security & Privacy: RLS for all new data; retention & abuse policy for chat; public read policy for reviews (or role-based if revised).
46. Observability: define minimal telemetry for chat latency, review completion rate, calendar export clicks.
47. Localization/Time: store UTC, convert to Europe/Zurich in UI and human-readable ICS description.
48. Rollout: phase gates per feature; ship smallest usable slice first.
