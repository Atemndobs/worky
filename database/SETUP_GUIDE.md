# Database Setup Guide - User Journeys Implementation

This guide walks you through setting up the enhanced database schema to support the Bolo user journeys with auction system and calendar integration.

## 🚀 Quick Setup

### Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your project
3. Navigate to **SQL Editor**

### Step 2: Run the Schema
1. Copy the entire contents of `database/schema.sql`
2. Paste into Supabase SQL Editor
3. Click **Run** to execute

### Step 3: Verify Setup
1. Copy the contents of `database/check-database-status.sql`
2. Paste and run in SQL Editor
3. Verify all checks show ✅

## 📊 What Gets Created

### New Tables
- **`auctions`** - Premium time slot auctions created by handymen
- **`auction_bids`** - Real-time bidding records with winner tracking
- **`notifications`** - System notifications for auctions and bookings
- **`calendar_integrations`** - External calendar sync configuration

### Enhanced Existing Tables
- **`handyman_profiles`** - Added auction preferences and calendar settings
- **`time_slots`** - Added calendar integration and booking type fields
- **`bookings`** - Added auction support and booking type distinction

### Database Functions
- **`place_auction_bid()`** - Handle real-time bidding with validation
- **`close_expired_auctions()`** - Automatically close auctions and create bookings
- **`handle_new_user()`** - Create user profiles on registration

## 🔐 Security Features

### Row Level Security (RLS)
- **Auctions**: Public can view active auctions, handymen manage own
- **Bids**: Public can view bids, customers can place own bids
- **Notifications**: Users see only their own notifications
- **Calendar Integrations**: Handymen manage own calendar settings

### Data Validation
- Bid validation ensures proper increment amounts
- Reserve price enforcement
- Auction timing validation
- Calendar sync permission checks

## 🎯 User Journey Support

### Handyman Journey
1. **Calendar Management**: Set availability through external calendar sync
2. **Auction Creation**: Create premium auctions for high-demand slots
3. **Booking Management**: Handle both calendar and auction bookings
4. **Revenue Optimization**: Track auction vs calendar earnings

### Customer Journey  
1. **Auction Browsing**: View active auctions by location and service type
2. **Real-time Bidding**: Place bids with automatic outbid notifications
3. **Calendar Booking**: Book available slots directly through calendar
4. **Booking Tracking**: Manage both calendar and auction bookings

## ⚡ Real-time Features

### Supabase Realtime Subscriptions
```sql
-- Listen to auction updates
SELECT * FROM auctions WHERE status = 'active';

-- Listen to new bids
SELECT * FROM auction_bids WHERE auction_id = 'auction-id';

-- Listen to notifications
SELECT * FROM notifications WHERE user_id = auth.uid();
```

### Automatic Processes
- **Auction Closing**: `close_expired_auctions()` runs every minute
- **Bid Validation**: Real-time validation prevents invalid bids
- **Notification Creation**: Automatic notifications for all events

## 🧪 Testing the Setup

### Test 1: Basic Tables
```sql
-- Should return all 8 tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

### Test 2: RLS Policies
```sql
-- Should show policies for each table
SELECT schemaname, tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public';
```

### Test 3: Functions
```sql
-- Should show the 3 main functions
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public'
AND routine_name IN ('handle_new_user', 'place_auction_bid', 'close_expired_auctions');
```

## 🔧 Common Issues & Solutions

### Issue: Foreign Key Errors
**Problem**: Tables being created in wrong order
**Solution**: Run the entire schema.sql file at once, not line by line

### Issue: RLS Permission Denied  
**Problem**: Users can't access data after enabling RLS
**Solution**: Verify all policies are created and auth.uid() is working

### Issue: Function Not Found
**Problem**: Database functions not accessible from client
**Solution**: Ensure functions are created with SECURITY DEFINER

### Issue: Realtime Not Working
**Problem**: Supabase Realtime not receiving updates
**Solution**: Enable Realtime on tables in Supabase Dashboard > Database > Replication

## 📱 Next Steps

After database setup is complete:

1. **Update Environment Variables**
   ```bash
   # Add to .env
   EXPO_PUBLIC_SUPABASE_URL=your-project-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Test Authentication**
   - Register a new handyman user
   - Register a new customer user
   - Verify user_type is set correctly

3. **Test Auction Flow**
   - Create an auction as handyman
   - Place bids as customer
   - Verify real-time updates

4. **Enable Realtime**
   - Go to Database > Replication in Supabase
   - Enable for: `auctions`, `auction_bids`, `notifications`

## 🎉 Success Indicators

Your database is ready when:
- ✅ All 8 tables exist and are accessible
- ✅ RLS policies allow appropriate access
- ✅ Database functions execute without errors
- ✅ Test auction creation and bidding works
- ✅ Notifications are created automatically
- ✅ Users can register and profiles are created

## 🆘 Getting Help

If you encounter issues:

1. **Check Supabase Logs**: Look for error messages in the Logs section
2. **Run Status Check**: Use `check-database-status.sql` to identify missing components
3. **Verify Permissions**: Ensure your Supabase user has appropriate permissions
4. **Test Incrementally**: Test each function individually before full integration

The database schema is designed to support the complete user journey from simple calendar booking to sophisticated auction-based revenue optimization for handymen.