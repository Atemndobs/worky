#!/bin/bash

# Worky Database Migration Script
# This script runs all necessary migrations to set up the Worky database

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
    echo "Or run this script with the database URL as a parameter:"
    echo "  ./migrate.sh 'postgresql://user:password@host:port/database'"
    exit 1
fi

echo "📋 Running schema setup..."
psql $DATABASE_URL -f database/schema.sql

echo "🔧 Fixing RLS policies..."
psql $DATABASE_URL -f database/fix-rls-policies.sql

echo "✅ Migration completed successfully!"
echo ""
echo "To verify the migration, run:"
echo "  psql $DATABASE_URL -f database/check-database-status.sql"