# App Alignment Changes for User Journeys Implementation

This document outlines all changes needed to align the Worky app with the Bolo user journeys and dual booking system (calendar + auctions).

## Current State Analysis

### Current Implementation
- **Database**: Basic tables (users, handyman_profiles, time_slots, bookings) with simple time slot booking
- **Navigation**: Simple handyman/customer tab navigation  
- **UI**: Basic dashboard screens with placeholder content
- **Auth**: Working authentication with role-based routing
- **Backend**: Minimal Supabase integration

### Target State (Based on User Journeys)
- **Dual Booking System**: Calendar integration + Real-time auction system
- **Role-specific Workflows**: Distinct handyman vs customer user journeys
- **Real-time Features**: Live auction bidding, notifications, calendar updates
- **Calendar Integration**: External calendar sync for direct bookings
- **Auction System**: Premium time slot auctions with bidding

---

## 1. DATABASE SCHEMA CHANGES

### 1.1 New Tables Required

#### `auctions` Table
```sql
CREATE TABLE auctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handyman_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  service_type VARCHAR NOT NULL,
  region VARCHAR NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  starting_price DECIMAL(10,2) NOT NULL,
  reserve_price DECIMAL(10,2),
  current_highest_bid DECIMAL(10,2) DEFAULT 0,
  bid_increment DECIMAL(10,2) DEFAULT 5.00,
  ends_at TIMESTAMPTZ NOT NULL,
  status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'ended', 'cancelled')),
  winner_id UUID REFERENCES users(id),
  auto_extend BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `auction_bids` Table  
```sql
CREATE TABLE auction_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID REFERENCES auctions(id) ON DELETE CASCADE,
  bidder_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bid_amount DECIMAL(10,2) NOT NULL,
  bid_time TIMESTAMPTZ DEFAULT NOW(),
  is_winning_bid BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `notifications` Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL CHECK (type IN ('auction_outbid', 'auction_won', 'auction_ended', 'booking_confirmed', 'booking_cancelled')),
  title VARCHAR NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `calendar_integrations` Table
```sql
CREATE TABLE calendar_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handyman_id UUID REFERENCES users(id) ON DELETE CASCADE,
  calendar_provider VARCHAR NOT NULL CHECK (calendar_provider IN ('google', 'apple', 'outlook')),
  external_calendar_id VARCHAR NOT NULL,
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  sync_enabled BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 1.2 Modified Tables

#### Update `bookings` Table
```sql
-- Add booking type and auction reference
ALTER TABLE bookings ADD COLUMN booking_type VARCHAR DEFAULT 'calendar' CHECK (booking_type IN ('calendar', 'auction'));
ALTER TABLE bookings ADD COLUMN auction_id UUID REFERENCES auctions(id);
ALTER TABLE bookings ADD COLUMN winning_bid_amount DECIMAL(10,2);
```

#### Update `time_slots` Table  
```sql
-- Add calendar integration fields
ALTER TABLE time_slots ADD COLUMN calendar_event_id VARCHAR;
ALTER TABLE time_slots ADD COLUMN is_synced_to_calendar BOOLEAN DEFAULT false;
ALTER TABLE time_slots ADD COLUMN booking_type VARCHAR DEFAULT 'calendar' CHECK (booking_type IN ('calendar', 'auction', 'both'));
```

#### Update `handyman_profiles` Table
```sql
-- Add auction-specific fields  
ALTER TABLE handyman_profiles ADD COLUMN default_auction_duration INTEGER DEFAULT 60; -- minutes
ALTER TABLE handyman_profiles ADD COLUMN min_bid_increment DECIMAL(10,2) DEFAULT 5.00;
ALTER TABLE handyman_profiles ADD COLUMN calendar_integration_enabled BOOLEAN DEFAULT false;
ALTER TABLE handyman_profiles ADD COLUMN auto_confirm_calendar_bookings BOOLEAN DEFAULT false;
```

### 1.3 RLS Policies

```sql
-- Auctions policies
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view active auctions" ON auctions FOR SELECT USING (status = 'active');
CREATE POLICY "Handymen can manage own auctions" ON auctions FOR ALL USING (handyman_id = auth.uid());

-- Auction bids policies  
ALTER TABLE auction_bids ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view auction bids" ON auction_bids FOR SELECT USING (true);
CREATE POLICY "Users can create own bids" ON auction_bids FOR INSERT WITH CHECK (bidder_id = auth.uid());

-- Notifications policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
```

---

## 2. UI/UX CHANGES NEEDED

### 2.1 Navigation Structure Changes

#### Current Navigation
```typescript
// Simple 3-tab layout for both user types
HandymanTabs: Dashboard, Bookings, Profile
CustomerTabs: Browse, Bookings, Profile
```

#### Required Navigation (Based on User Journeys)
```typescript
// Handyman Journey-focused Navigation
HandymanTabs: 
  - Dashboard (calendar status + auction performance)
  - Calendar (availability management)  
  - Auctions (create & manage auctions)
  - Bookings (calendar bookings + auction wins)
  - Profile

// Customer Journey-focused Navigation  
CustomerTabs:
  - Browse (auctions + calendar slots)
  - Auctions (active bids + bidding)
  - Bookings (calendar + auction bookings)
  - Profile
```

### 2.2 New Screen Components Needed

#### Handyman Screens
1. **Calendar Management Screen** (`/src/screens/handyman/CalendarManagement.tsx`)
   - Set availability periods
   - Sync with external calendars
   - View booking confirmations

2. **Auction Creation Screen** (`/src/screens/handyman/AuctionCreation.tsx`)
   - Create premium auctions
   - Set parameters (duration, starting price, reserve)
   - Monitor active auctions

3. **Auction Management Screen** (`/src/screens/handyman/AuctionManagement.tsx`)
   - View active auctions
   - Monitor real-time bids
   - Auction performance analytics

#### Customer Screens  
1. **Auction Browse Screen** (`/src/screens/customer/AuctionBrowse.tsx`)
   - Browse active auctions
   - Filter by location/skills/price
   - Quick bid functionality

2. **Auction Detail Screen** (`/src/screens/customer/AuctionDetail.tsx`)
   - Real-time auction interface
   - Bidding controls
   - Countdown timer

3. **Active Bids Screen** (`/src/screens/customer/ActiveBids.tsx`)
   - Monitor current bids
   - Outbid notifications
   - Budget tracking

### 2.3 New UI Components Required

#### Real-time Components
1. **AuctionCard** (`/src/components/auction/AuctionCard.tsx`)
   - Display auction info with real-time updates
   - Show current bid and time remaining

2. **BiddingInterface** (`/src/components/auction/BiddingInterface.tsx`)
   - Bid input with validation
   - Quick bid buttons (+5, +10, +20 CHF)
   - Real-time bid updates

3. **CountdownTimer** (`/src/components/auction/CountdownTimer.tsx`)
   - Real-time countdown display
   - Visual urgency indicators

4. **NotificationBell** (`/src/components/notifications/NotificationBell.tsx`)
   - Real-time notification indicator
   - Auction alerts and booking updates

#### Calendar Components
1. **CalendarSlot** (`/src/components/calendar/CalendarSlot.tsx`)
   - Display available calendar slots
   - Direct booking interface

2. **CalendarIntegration** (`/src/components/calendar/CalendarIntegration.tsx`)
   - Setup external calendar sync
   - Manage calendar permissions

---

## 3. BACKEND LOGIC CHANGES

### 3.1 Real-time Auction System

#### Required Functions
```sql
-- Close expired auctions
CREATE OR REPLACE FUNCTION close_expired_auctions()
RETURNS void AS $$
BEGIN
  -- Update auction status and determine winners
  UPDATE auctions 
  SET status = 'ended', 
      winner_id = (
        SELECT bidder_id 
        FROM auction_bids 
        WHERE auction_id = auctions.id 
        ORDER BY bid_amount DESC, bid_time ASC 
        LIMIT 1
      )
  WHERE status = 'active' AND ends_at <= NOW();
  
  -- Create booking for auction winners
  INSERT INTO bookings (slot_id, customer_id, handyman_id, status, total_price, booking_type, auction_id, winning_bid_amount)
  SELECT 
    NULL, -- No time slot for auctions
    a.winner_id,
    a.handyman_id,
    'confirmed', -- Auto-confirm auction wins
    ab.bid_amount,
    'auction',
    a.id,
    ab.bid_amount
  FROM auctions a
  LEFT JOIN auction_bids ab ON a.id = ab.auction_id AND ab.is_winning_bid = true
  WHERE a.status = 'ended' AND a.winner_id IS NOT NULL;
END;
$$ LANGUAGE plpgsql;
```

#### Realtime Subscriptions Setup
```typescript
// /src/lib/auctions.ts
export const subscribeToAuctions = (callback: (payload: any) => void) => {
  return supabase
    .channel('auctions')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'auctions' }, callback)
    .subscribe();
};

export const subscribeToAuctionBids = (auctionId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`auction_bids:${auctionId}`)
    .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'auction_bids', filter: `auction_id=eq.${auctionId}` }, 
        callback)
    .subscribe();
};
```

### 3.2 Calendar Integration Logic

#### Calendar Service
```typescript
// /src/services/CalendarService.ts
export class CalendarService {
  static async syncHandymanAvailability(handymanId: string): Promise<void> {
    // Fetch external calendar events
    // Update time_slots table
    // Mark availability conflicts
  }
  
  static async createCalendarBooking(booking: Booking): Promise<void> {
    // Create event in external calendar
    // Send calendar invites
  }
  
  static async exportBookingToICS(bookingId: string): Promise<string> {
    // Generate ICS file content
    // Include booking type (calendar vs auction)
  }
}
```

### 3.3 Notification System

#### Notification Service
```typescript
// /src/services/NotificationService.ts
export class NotificationService {
  static async sendAuctionOutbidNotification(bidderId: string, auction: Auction): Promise<void> {
    // Create notification record
    // Send push notification
  }
  
  static async sendAuctionWinNotification(winnerId: string, auction: Auction): Promise<void> {
    // Create notification record
    // Send push notification
    // Trigger booking creation
  }
  
  static async sendBookingConfirmationNotification(customerId: string, booking: Booking): Promise<void> {
    // Create notification record
    // Send push notification
  }
}
```

---

## 4. CONTEXT UPDATES NEEDED

### 4.1 New Context Providers

#### AuctionContext
```typescript
// /src/contexts/AuctionContext.tsx
export interface AuctionContextType {
  activeAuctions: Auction[];
  userBids: AuctionBid[];
  subscribeToAuction: (auctionId: string) => void;
  placeBid: (auctionId: string, bidAmount: number) => Promise<void>;
  createAuction: (auctionData: CreateAuctionData) => Promise<void>;
}
```

#### NotificationContext  
```typescript
// /src/contexts/NotificationContext.tsx
export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => Promise<void>;
  subscribeToNotifications: () => void;
}
```

### 4.2 Updated AuthContext
```typescript
// Add user profile data and role-specific permissions
interface AuthContextType {
  user: User | null;
  userType: UserType | null;
  handymanProfile?: HandymanProfile;
  loading: boolean;
  hasCalendarIntegration: boolean;
  signUp: (email: string, password: string, userType: UserType) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<void>;
}
```

---

## 5. NEW DEPENDENCIES NEEDED

### 5.1 Calendar Integration
```bash
npm install react-native-calendar-events
npm install @react-native-async-storage/async-storage
```

### 5.2 Real-time Features
```bash
npm install @supabase/realtime-js
```

### 5.3 Notifications
```bash
npm install expo-notifications
npm install @react-native-async-storage/async-storage
```

### 5.4 Date/Time Handling
```bash
npm install date-fns
npm install date-fns-tz
```

### 5.5 Charts for Analytics
```bash
npm install react-native-svg
npm install victory-native
```

---

## 6. IMPLEMENTATION PRIORITY

### Phase 1: Database & Backend (Week 1)
1. ✅ Update database schema with new tables
2. ✅ Implement RLS policies
3. ✅ Create auction management functions
4. ✅ Set up real-time subscriptions

### Phase 2: Core Auction System (Week 2)  
1. ✅ Implement auction creation (handyman)
2. ✅ Build bidding interface (customer)
3. ✅ Add real-time bid updates
4. ✅ Implement auction closing logic

### Phase 3: Calendar Integration (Week 3)
1. ✅ Build calendar availability management
2. ✅ Implement direct booking system
3. ✅ Add calendar sync functionality
4. ✅ Create ICS export feature

### Phase 4: UI/UX Polish (Week 4)
1. ✅ Implement role-specific navigation
2. ✅ Add notification system
3. ✅ Build analytics dashboards
4. ✅ Polish user experience

### Phase 5: Testing & Launch (Week 5)
1. ✅ Integration testing
2. ✅ User acceptance testing
3. ✅ Performance optimization
4. ✅ Production deployment

---

## 7. MIGRATION PLAN

### 7.1 Data Migration
- Existing `time_slots` → Update with new fields
- Existing `bookings` → Add `booking_type` field (default to 'calendar')
- User preferences → Migrate to new profile structure

### 7.2 User Migration
- Existing users continue with calendar booking
- New auction features opt-in
- Gradual rollout of calendar integration

### 7.3 Rollback Plan
- Database migrations are reversible
- Feature flags for auction system
- Fallback to simple booking if needed

---

This document provides a comprehensive roadmap for implementing the Bolo user journeys in the Worky app, transforming it from a simple booking system to a sophisticated dual-system platform with calendar integration and real-time auctions.