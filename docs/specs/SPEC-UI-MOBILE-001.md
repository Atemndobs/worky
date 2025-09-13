# SPEC-UI-MOBILE-001 — Expo App UI (Dark) from Designs

This spec maps the user journeys from the Bolo auction system to an Expo SDK 53 app using TypeScript and `expo-router`. It implements the dual booking system (calendar + auctions) with real-time bidding capabilities.

- App stack: TypeScript, Expo SDK 53, React Native 0.79.6, `expo-router`, Supabase client, `react-native-svg` + `victory-native` (charts), `expo-linear-gradient` (accents), `expo-image`.
- Environment: only `EXPO_PUBLIC_*` vars. Store UTC in DB; display Europe/Zurich.
- Navigation: tabs with a custom bottom bar (center multicolor ring) + per-screen headers.
- Theme: dark by default with soft contrast, rounded cards, neon-accent ring.

## Routes & Structure
```
app/
├─ (auth)/
│  ├─ login.tsx
│  ├─ register.tsx
│  └─ welcome.tsx
├─ (handyman)/           # Handyman-specific flow
│  ├─ dashboard.tsx      # Calendar status & auction performance
│  ├─ calendar.tsx       # Set calendar availability
│  ├─ auctions.tsx       # Create & manage auctions
│  ├─ bookings.tsx       # Calendar bookings & auction wins
│  └─ profile.tsx        # Business profile
├─ (customer)/           # Customer-specific flow
│  ├─ dashboard.tsx      # Browse auctions & calendar slots
│  ├─ auctions.tsx       # Active bids & auction participation
│  ├─ bookings.tsx       # Calendar bookings & auction wins
│  └─ profile.tsx        # Personal profile
├─ _layout.tsx
└─ index.tsx             # Role-based routing

components/
├─ AuctionCard.tsx       # Real-time auction display
├─ BiddingInterface.tsx  # Auction bidding controls
├─ CountdownTimer.tsx    # Auction countdown display
├─ CalendarSlot.tsx      # Calendar booking component
├─ RevenueChart.tsx      # Handyman earnings analytics
└─ NotificationBell.tsx  # Real-time bid notifications

lib/
├─ supabase.ts           # Supabase client (public envs)
├─ auctions.ts           # Auction logic & real-time subscriptions
├─ calendar.ts           # Calendar integration helpers
├─ currency.ts           # CHF helpers
└─ tz.ts                 # Europe/Zurich conversions

contexts/
├─ AuthContext.tsx       # User authentication with role-based routing
├─ AuctionContext.tsx    # Real-time auction state management
└─ NotificationContext.tsx # Bid alerts & booking notifications

constants/
├─ SwissRegions.ts
└─ WorkTypes.ts

__tests__/ (as needed)
```

## Libraries to install (app repo)
```sh
npx create-expo-app -t expo-template-blank-typescript worky
cd worky
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo install react-native-svg victory-native expo-linear-gradient expo-image
npm i @supabase/supabase-js
```

## Env
Create `app.config.ts` or `app.json` with `extra` and use `process.env.EXPO_PUBLIC_*` at runtime.
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

## Theming
- Colors: background `#0B0B0D`, card `#17181B`, text primary `#FFFFFF`, muted `#9AA3AF`.
- Accents: green `#57C084`, orange `#F4A259`, cyan `#5FD3F3`.
- Radius: 20–28 on large cards; 12 on tiles.
- Elevation: subtle shadows; blur not required for MVP.

### Theme object
```ts
// lib/theme.ts
export const theme = {
  bg: '#0B0B0D', card: '#17181B', text: '#FFFFFF', muted: '#9AA3AF',
  positive: '#57C084', negative: '#E05B5B', accent: '#5FD3F3', ring: ['#F4A259','#5FD3F3','#57C084']
}
```

## Navigation Architecture
- Role-based navigation: Handyman vs Customer flows
- Handyman tabs: Dashboard (calendar status + auction performance), Calendar Management, Auction Creation, Bookings
- Customer tabs: Browse (auctions + calendar slots), Active Bids, Bookings, Profile
- Real-time notifications integrated across all screens

```tsx
// components/TabBar.tsx
import { Tabs } from 'expo-router'
import { View, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '@/lib/theme'

export default function TabBar() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.card, borderTopColor: '#000', height: 72 },
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.muted,
      }}
    >
      <Tabs.Screen name="dashboard" options={{
        title: '',
        tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: color }} />
      }} />
      <Tabs.Screen name="wallet" options={{
        title: '',
        tabBarIcon: ({ color }) => <View style={{ width: 20, height: 20, borderRadius: 6, backgroundColor: color }} />
      }} />
      <Tabs.Screen name="action" options={{
        href: null, // hidden route; rendered via tabBarButton
        tabBarButton: () => (
          <Pressable style={{ marginTop: -22 }} onPress={() => { /* TODO: open sheet */ }}>
            <LinearGradient colors={theme.ring} style={{ width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: theme.card }} />
            </LinearGradient>
          </Pressable>
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: '',
        tabBarIcon: ({ color }) => <View style={{ width: 18, height: 18, borderRadius: 4, backgroundColor: color }} />
      }} />
    </Tabs>
  )
}
```

`app/(tabs)/_layout.tsx`
```tsx
import TabBar from '@/components/TabBar'
export default TabBar
```

## Screens

### Handyman Dashboard
- Top: Calendar availability status and upcoming auctions
- Revenue analytics: Auction earnings vs calendar bookings
- Active auctions: Real-time bid monitoring
- Quick actions: Create auction, set availability

```tsx
// app/(tabs)/dashboard.tsx
import { View, Text, ScrollView } from 'react-native'
import ChartBars from '@/components/ChartBars'
import { theme } from '@/lib/theme'

export default function Dashboard() {
  const data = [280, 520, 950, 425, 640, 380, 720]
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: theme.muted, marginBottom: 8 }}>Week • 2–11 October</Text>
      <Text style={{ color: theme.text, fontSize: 36, fontWeight: '700', marginBottom: 16 }}>1280.00 CHF</Text>
      <ChartBars values={data} />
      <View style={{ height: 16 }} />
      <Text style={{ color: theme.text, fontSize: 18, marginBottom: 12 }}>Category</Text>
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 20, padding: 16 }}>
            <Text style={{ color: theme.muted }}>Travel</Text>
            <Text style={{ color: theme.text, fontSize: 24, fontWeight: '700' }}>785.00</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 20, padding: 16 }}>
            <Text style={{ color: theme.muted }}>Shopping</Text>
            <Text style={{ color: theme.text, fontSize: 24, fontWeight: '700' }}>950.00</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 20, padding: 16 }}>
            <Text style={{ color: theme.muted }}>Delivery</Text>
            <Text style={{ color: theme.text, fontSize: 24, fontWeight: '700' }}>50.00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
```

`components/ChartBars.tsx`
```tsx
import { View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'
import { theme } from '@/lib/theme'

export default function ChartBars({ values }: { values: number[] }) {
  const width = 320; const height = 140; const pad = 12
  const max = Math.max(...values, 1)
  const col = (width - pad * 2) / values.length
  return (
    <View style={{ backgroundColor: theme.card, borderRadius: 20, padding: 12 }}>
      <Svg width={width} height={height}>
        {values.map((v, i) => {
          const h = (v / max) * (height - 24)
          const x = pad + i * col + col * 0.2
          const y = height - h - 8
          return <Rect key={i} x={x} y={y} width={col * 0.6} height={h} rx={6} fill={i === 2 ? theme.positive : '#2B2D31'} />
        })}
      </Svg>
    </View>
  )
}
```

### Customer Dashboard  
- Active auctions: Browse and filter by location/skills
- Real-time bid status: Current auctions and outbid alerts
- Calendar slots: Available direct booking opportunities
- Budget tracking: Spending limits and bid history
```tsx
// app/(tabs)/wallet.tsx
import { View, Text, ScrollView } from 'react-native'
import { theme } from '@/lib/theme'

export default function Wallet() {
  const txs = [
    { id: '1', name: 'Ryan Brown', amount: 685, time: '08:41 PM' },
    { id: '2', name: 'YouTube Music', amount: -510.5, time: '08:14 PM' },
    { id: '3', name: 'Tom Scott', amount: 390, time: '05:28 PM' }
  ]
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16 }}>
      <View style={{ backgroundColor: theme.card, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ color: theme.muted, marginBottom: 12 }}>•••• 8458</Text>
        <Text style={{ color: theme.text, fontSize: 40, fontWeight: '800' }}>35,900.50 CHF</Text>
      </View>
      <Text style={{ color: theme.muted, marginBottom: 8 }}>Last transactions</Text>
      {txs.map(tx => (
        <View key={tx.id} style={{ backgroundColor: theme.card, borderRadius: 18, padding: 16, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ color: theme.text }}>{tx.name}</Text>
          <Text style={{ color: tx.amount >= 0 ? theme.positive : '#E05B5B' }}>{tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
```

### Auction Interface
- Real-time bid display with countdown timer
- Competitive bidding with minimum increment enforcement
- Automatic outbid notifications
- Reserve price and auction parameter display
- Winner announcement and automatic booking confirmation
```tsx
// app/(tabs)/profile.tsx
import { View, Text, Image } from 'react-native'
import { theme } from '@/lib/theme'

export default function Profile() {
  const tiles = ['Settings','Notifications','Verification','Support','Referral','Legal']
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: 16 }}>
      <View style={{ alignItems: 'center', marginVertical: 24 }}>
        <Image source={{ uri: 'https://i.pravatar.cc/160' }} style={{ width: 84, height: 84, borderRadius: 42 }} />
        <Text style={{ color: theme.text, fontSize: 32, fontWeight: '800', marginTop: 16 }}>Emma Wilson</Text>
        <Text style={{ color: theme.muted, marginTop: 6 }}>emma.wilson@gmail.com</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' }}>
        {tiles.map(t => (
          <View key={t} style={{ width: '48%', backgroundColor: theme.card, borderRadius: 18, padding: 16, height: 100, justifyContent: 'flex-end' }}>
            <Text style={{ color: theme.text }}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
```

## Auth & Supabase
- Follow `WORKY_BUILD_INSTRUCTIONS.md` AuthContext; adapt to React Native.
- Client in `lib/supabase.ts`:
```ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } }
)
```
- On app start, redirect to `(tabs)` or `(auth)` based on session.

## Data & Timezone
- Store UTC in DB, display with `Intl.DateTimeFormat('de-CH', { timeZone: 'Europe/Zurich' })`.
- Currency show as CHF with grouping; helpers in `lib/currency.ts`.

## Validation & Testing
- Lint TypeScript; minimal RTL tests for `ChartBars` sizing and `Wallet` transaction signs.
- Run `npx expo prebuild` only if adding native modules (not required here).

## Acceptance Criteria
- Role-based navigation between handyman and customer flows
- Real-time auction bidding with countdown timers
- Calendar integration for direct booking system
- Auction creation with customizable parameters (duration, starting price, reserve price)
- Real-time notifications for auction bids and booking confirmations
- Revenue analytics for handymen showing auction vs calendar earnings
- Dark theme throughout; safe-area respected; no console errors.

## Out of Scope (MVP)
- Payment processing integration (Phase 3)
- Proxy bidding functionality
- Advanced auction analytics
- Multi-language support

## Handover Notes
- Implement dual booking system: Calendar integration + Auction system
- Set up Supabase Realtime channels for auction bidding
- Configure role-based routing and authentication
- Apply RLS policies for auction and booking data security
- Keep constants in `constants/SwissRegions.ts` and `constants/WorkTypes.ts`
- Implement comprehensive notification system for auctions and bookings

```
Spec ID: SPEC-UI-MOBILE-001
Owner: Mobile
Status: Proposed
Depends on: WORKY_BUILD_INSTRUCTIONS.md, docs/requirements-and-decisions.md
```
