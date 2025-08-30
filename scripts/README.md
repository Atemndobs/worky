# Worky Database Management

This directory contains scripts to manage the Worky database schema and migrations.

## Available Scripts

### Migration Scripts
- `migrate.sh` - Runs all necessary migrations to set up the Worky database
- `cleanup.sh` - Removes all Worky-related tables and data from the database
- `db-manager.sh` - Combined script with multiple options (migrate, cleanup, status)

### NPM Commands
After setting up the DATABASE_URL environment variable, you can use these npm commands:
- `npm run db:migrate` - Run database migrations
- `npm run db:cleanup` - Clean up database tables
- `npm run db:status` - Check database status

## Prerequisites

1. PostgreSQL client tools (psql) must be installed
2. Set the DATABASE_URL environment variable:
   ```bash
   export DATABASE_URL="postgresql://user:password@host:port/database"
   ```

## Usage

### Using the combined script (recommended):
```bash
# Make the script executable
chmod +x scripts/db-manager.sh

# Run migrations
./scripts/db-manager.sh migrate

# Check database status
./scripts/db-manager.sh status

# Clean up database (WARNING: This deletes all data!)
./scripts/db-manager.sh cleanup
```

### Using individual scripts:
```bash
# Make scripts executable
chmod +x scripts/migrate.sh scripts/cleanup.sh

# Run migrations
./scripts/migrate.sh

# Clean up database (WARNING: This deletes all data!)
./scripts/cleanup.sh
```

### Using npm commands:
```bash
# Run migrations
npm run db:migrate

# Check database status
npm run db:status

# Clean up database (WARNING: This deletes all data!)
npm run db:cleanup
```

## Database Schema Overview

The Worky database includes the following tables:
- `users` - User accounts and types
- `handyman_profiles` - Business info, rates, skills
- `time_slots` - Available appointment slots
- `bookings` - Booking records and status
- `auctions` - Auction system for high-demand slots
- `auction_bids` - Bid history for auctions
- `notifications` - Push notifications
- `payment_intents` - Payment processing records
- `payouts` - Payout records to handymen

## Security Features

- Row Level Security (RLS) policies on all tables
- UUID primary keys for security
- Proper foreign key relationships
- Database triggers for automated workflows
- Indexes for performance optimization

## Troubleshooting

If you encounter issues:
1. Ensure DATABASE_URL is set correctly
2. Verify PostgreSQL client tools are installed
3. Check that you have proper database permissions
4. Review the SQL files in the `database/` directory for manual execution