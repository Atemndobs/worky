#!/bin/bash

# Worky Database Cleanup Script
# This script removes all Worky-related tables from the database
# WARNING: This will delete all data in the Worky tables!

echo "⚠️  WARNING: This script will DELETE ALL Worky-related tables and data!"
echo "This action cannot be undone."
echo ""
read -p "Are you sure you want to continue? (type 'yes' to confirm): " confirmation

if [ "$confirmation" != "yes" ]; then
    echo "❌ Cleanup cancelled."
    exit 0
fi

echo "🧹 Starting Worky database cleanup..."

# Load environment variables from .env file if it exists
if [ -f ".env" ]; then
    echo "Loading environment variables from .env file..."
    export $(grep -v "^#" .env | xargs)
fi

# Check if psql is installed
if ! command -v psql &> /dev/null
then
    echo "❌ psql could not be found. Please install PostgreSQL client tools."
    exit 1
fi

# Check if database connection parameters are set
if [ -z "$DATABASE_URL" ]; then
    # Try to construct DATABASE_URL from Supabase environment variables
    if [ -n "$EXPO_PUBLIC_SUPABASE_URL" ] && [ -n "$SUPABASE_DB_PASSWORD" ]; then
        # Extract host and project ID from Supabase URL
        SUPABASE_HOST=$(echo $EXPO_PUBLIC_SUPABASE_URL | sed "s|https://||" | sed "s|.supabase.co||")
        DATABASE_URL="postgresql://postgres:$SUPABASE_DB_PASSWORD@${SUPABASE_HOST}.supabase.co:5432/postgres"
        echo "Constructed DATABASE_URL from Supabase environment variables"
    else
        echo "⚠️  DATABASE_URL environment variable not set."
        echo "Please set it with: export DATABASE_URL='postgresql://user:password@host:port/database'"
        echo "Or set EXPO_PUBLIC_SUPABASE_URL and SUPABASE_DB_PASSWORD in your .env file"
        echo "Or run this script with the database URL as a parameter:"
        echo "  ./cleanup.sh 'postgresql://user:password@host:port/database'"
        exit 1
    fi
fi

# Drop triggers first
echo "🗑️  Dropping triggers..."
psql $DATABASE_URL -c "DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;"
psql $DATABASE_URL -c "DROP TRIGGER IF EXISTS on_booking_created ON public.bookings;"

# Drop functions
echo "🗑️  Dropping functions..."
psql $DATABASE_URL -c "DROP FUNCTION IF EXISTS public.handle_new_user();"
psql $DATABASE_URL -c "DROP FUNCTION IF EXISTS public.handle_booking_conflict();"
psql $DATABASE_URL -c "DROP FUNCTION IF EXISTS public.complete_auction(uuid);"

# Drop indexes
echo "🗑️  Dropping indexes..."
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_time_slots_handyman_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_time_slots_status;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_time_slots_start_time;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_bookings_customer_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_bookings_slot_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_handyman_profiles_user_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auctions_slot_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auctions_status;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auctions_end_time;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auction_bids_auction_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auction_bids_customer_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_notifications_user_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_notifications_read;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_notifications_created_at;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payment_intents_booking_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payment_intents_status;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payouts_handyman_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payouts_booking_id;"
psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payouts_status;"

# Drop policies and disable RLS
echo "🗑️  Disabling RLS and dropping policies..."
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY;"
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.handyman_profiles DISABLE ROW LEVEL SECURITY;"
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.time_slots DISABLE ROW LEVEL SECURITY;"
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.bookings DISABLE ROW LEVEL SECURITY;"
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.auctions DISABLE ROW LEVEL SECURITY;"
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.auction_bids DISABLE ROW LEVEL SECURITY;"
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.notifications DISABLE ROW LEVEL SECURITY;"
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.payment_intents DISABLE ROW LEVEL SECURITY;"
psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.payouts DISABLE ROW LEVEL SECURITY;"

psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view own profile\" ON public.users;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can update own profile\" ON public.users;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can insert own profile\" ON public.users;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Anyone can view handyman profiles\" ON public.handyman_profiles;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can create own profile\" ON public.handyman_profiles;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can update own profile\" ON public.handyman_profiles;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Anyone can view available slots\" ON public.time_slots;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can create own slots\" ON public.time_slots;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can update own slots\" ON public.time_slots;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view their bookings\" ON public.bookings;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Customers can create bookings\" ON public.bookings;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can update booking status\" ON public.bookings;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Anyone can view active auctions\" ON public.auctions;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view their auction bids\" ON public.auction_bids;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Customers can create auction bids\" ON public.auction_bids;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view own notifications\" ON public.notifications;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can update own notifications\" ON public.notifications;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"System can create notifications\" ON public.notifications;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view own payment intents\" ON public.payment_intents;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"System can manage payment intents\" ON public.payment_intents;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can view own payouts\" ON public.payouts;"
psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"System can manage payouts\" ON public.payouts;"

# Drop tables
echo "🗑️  Dropping tables..."
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.payouts;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.payment_intents;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.notifications;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.auction_bids;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.auctions;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.bookings;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.time_slots;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.handyman_profiles;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.users;"

# Drop extension
echo "🗑️  Dropping extensions..."
psql $DATABASE_URL -c "DROP EXTENSION IF EXISTS \"uuid-ossp\";"

echo "✅ Cleanup completed successfully!"
echo "All Worky-related tables and data have been removed from the database."