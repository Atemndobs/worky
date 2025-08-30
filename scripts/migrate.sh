#!/bin/bash

# Worky Database Migration Script
# This script runs all necessary migrations to set up the Worky database

echo "🚀 Starting Worky database migration..."

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
        echo "  ./migrate.sh 'postgresql://user:password@host:port/database'"
        exit 1
    fi
fi

echo "📋 Running schema setup..."
psql "$DATABASE_URL" -f database/schema.sql

echo "🔧 Fixing RLS policies..."
psql "$DATABASE_URL" -f database/fix-rls-policies.sql

echo "✅ Migration completed successfully!"
echo ""
echo "To verify the migration, run:"
echo "  psql "$DATABASE_URL" -f database/check-database-status.sql"