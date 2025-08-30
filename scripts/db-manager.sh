#!/bin/bash

# Worky Database Management Script
# This script provides options to migrate or clean up the Worky database

show_help() {
    echo "Worky Database Management Script"
    echo "Usage: $0 [option]"
    echo ""
    echo "Options:"
    echo "  migrate    Run database migrations to set up Worky tables"
    echo "  cleanup    Remove all Worky-related tables and data"
    echo "  status     Check the current status of Worky database tables"
    echo "  help       Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  DATABASE_URL  PostgreSQL connection string"
    echo "                Example: postgresql://user:password@host:port/database"
}

migrate_database() {
    echo "🚀 Starting Worky database migration..."
    
    # Check if psql is installed
    if ! command -v psql &> /dev/null
    then
        echo "❌ psql could not be found. Please install PostgreSQL client tools."
        exit 1
    fi
    
    # Check if database connection parameters are set
    if [ -z "$DATABASE_URL" ]; then
        echo "⚠️  DATABASE_URL environment variable not set."
        echo "Please set it with: export DATABASE_URL='postgresql://user:password@host:port/database'"
        exit 1
    fi
    
    echo "📋 Running schema setup..."
    psql $DATABASE_URL -f database/schema.sql
    
    echo "🔧 Fixing RLS policies..."
    psql $DATABASE_URL -f database/fix-rls-policies.sql
    
    echo "✅ Migration completed successfully!"
    echo ""
    echo "To verify the migration, run:"
    echo "  $0 status"
}

cleanup_database() {
    echo "⚠️  WARNING: This will DELETE ALL Worky-related tables and data!"
    echo "This action cannot be undone."
    echo ""
    read -p "Are you sure you want to continue? (type 'yes' to confirm): " confirmation
    
    if [ "$confirmation" != "yes" ]; then
        echo "❌ Cleanup cancelled."
        exit 0
    fi
    
    echo "🧹 Starting Worky database cleanup..."
    
    # Check if psql is installed
    if ! command -v psql &> /dev/null
    then
        echo "❌ psql could not be found. Please install PostgreSQL client tools."
        exit 1
    fi
    
    # Check if database connection parameters are set
    if [ -z "$DATABASE_URL" ]; then
        echo "⚠️  DATABASE_URL environment variable not set."
        echo "Please set it with: export DATABASE_URL='postgresql://user:password@host:port/database'"
        exit 1
    fi
    
    # Drop triggers first
    echo "🗑️  Dropping triggers..."
    psql $DATABASE_URL -c "DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TRIGGER IF EXISTS on_booking_created ON public.bookings;" > /dev/null 2>&1
    
    # Drop functions
    echo "🗑️  Dropping functions..."
    psql $DATABASE_URL -c "DROP FUNCTION IF EXISTS public.handle_new_user();" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP FUNCTION IF EXISTS public.handle_booking_conflict();" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP FUNCTION IF EXISTS public.complete_auction(uuid);" > /dev/null 2>&1
    
    # Drop indexes
    echo "🗑️  Dropping indexes..."
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_time_slots_handyman_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_time_slots_status;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_time_slots_start_time;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_bookings_customer_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_bookings_slot_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_handyman_profiles_user_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auctions_slot_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auctions_status;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auctions_end_time;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auction_bids_auction_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_auction_bids_customer_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_notifications_user_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_notifications_read;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_notifications_created_at;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payment_intents_booking_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payment_intents_status;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payouts_handyman_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payouts_booking_id;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP INDEX IF EXISTS idx_payouts_status;" > /dev/null 2>&1
    
    # Drop policies and disable RLS
    echo "🗑️  Disabling RLS and dropping policies..."
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.handyman_profiles DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.time_slots DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.bookings DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.auctions DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.auction_bids DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.notifications DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.payment_intents DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    psql $DATABASE_URL -c "ALTER TABLE IF EXISTS public.payouts DISABLE ROW LEVEL SECURITY;" > /dev/null 2>&1
    
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view own profile\" ON public.users;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can update own profile\" ON public.users;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can insert own profile\" ON public.users;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Anyone can view handyman profiles\" ON public.handyman_profiles;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can create own profile\" ON public.handyman_profiles;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can update own profile\" ON public.handyman_profiles;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Anyone can view available slots\" ON public.time_slots;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can create own slots\" ON public.time_slots;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can update own slots\" ON public.time_slots;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view their bookings\" ON public.bookings;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Customers can create bookings\" ON public.bookings;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can update booking status\" ON public.bookings;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Anyone can view active auctions\" ON public.auctions;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view their auction bids\" ON public.auction_bids;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Customers can create auction bids\" ON public.auction_bids;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view own notifications\" ON public.notifications;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can update own notifications\" ON public.notifications;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"System can create notifications\" ON public.notifications;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Users can view own payment intents\" ON public.payment_intents;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"System can manage payment intents\" ON public.payment_intents;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"Handymen can view own payouts\" ON public.payouts;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP POLICY IF EXISTS \"System can manage payouts\" ON public.payouts;" > /dev/null 2>&1
    
    # Drop tables
    echo "🗑️  Dropping tables..."
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.payouts;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.payment_intents;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.notifications;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.auction_bids;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.auctions;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.bookings;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.time_slots;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.handyman_profiles;" > /dev/null 2>&1
    psql $DATABASE_URL -c "DROP TABLE IF EXISTS public.users;" > /dev/null 2>&1
    
    # Drop extension
    echo "🗑️  Dropping extensions..."
    psql $DATABASE_URL -c "DROP EXTENSION IF EXISTS \"uuid-ossp\";" > /dev/null 2>&1
    
    echo "✅ Cleanup completed successfully!"
    echo "All Worky-related tables and data have been removed from the database."
}

check_status() {
    echo "🔍 Checking Worky database status..."
    
    # Check if psql is installed
    if ! command -v psql &> /dev/null
    then
        echo "❌ psql could not be found. Please install PostgreSQL client tools."
        exit 1
    fi
    
    # Check if database connection parameters are set
    if [ -z "$DATABASE_URL" ]; then
        echo "⚠️  DATABASE_URL environment variable not set."
        echo "Please set it with: export DATABASE_URL='postgresql://user:password@host:port/database'"
        exit 1
    fi
    
    echo "📋 Running database status check..."
    psql $DATABASE_URL -f database/check-database-status.sql
}

# Main script logic
case "$1" in
    migrate)
        migrate_database
        ;;
    cleanup)
        cleanup_database
        ;;
    status)
        check_status
        ;;
    help|"")
        show_help
        ;;
    *)
        echo "Invalid option: $1"
        show_help
        exit 1
        ;;
esac