# Expo Build Checklist (UI from SPEC-UI-MOBILE-001)

Follow in the app repo (not this specs repo). Aligns with Windsurf rules and WORKY_BUILD_INSTRUCTIONS.md.

## Prereqs
- Node 20+, Xcode/Android Studio set up.
- Expo CLI (`npx expo --version`).

## Scaffold
```sh
npx create-expo-app -t expo-template-blank-typescript worky
cd worky
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo install react-native-svg victory-native expo-linear-gradient expo-image
npm i @supabase/supabase-js
```

## Config
- Add `app.json` or `app.config.ts` with `extra` or rely on `EXPO_PUBLIC_*` envs.
- Set `scheme`, `ios.bundleIdentifier`, `android.package` later.

## Files to Add (paths)
- `app/(tabs)/_layout.tsx`, `app/(tabs)/dashboard.tsx`, `app/(tabs)/wallet.tsx`, `app/(tabs)/profile.tsx`.
- `components/TabBar.tsx`, `components/ChartBars.tsx`.
- `lib/theme.ts`, `lib/supabase.ts`, `constants/SwissRegions.ts`, `constants/WorkTypes.ts`.
- `contexts/AuthContext.tsx` (adapted from WORKY_BUILD_INSTRUCTIONS.md).

## Env
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

## Run
```sh
npx expo start -c
```

## Validate (MVP)
- Dark theme, custom tab with center ring.
- Dashboard bars + category cards.
- Wallet card + transactions.
- Profile tiles.
- No crashes; performance smooth on device.

## Next
- Wire real data via Supabase.
- Add auction/chat screens per existing specs.
- Add tests in `__tests__/` for basic UI rendering.
