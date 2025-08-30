---
trigger: always_on
alwaysApply: true
---

# Database Schema and RLS Policies

When making changes to the database schema or RLS policies, always follow these guidelines:

1. Any new table must ship with SELECT/INSERT/UPDATE/DELETE policies
2. Always propose SQL changes in `/database/*.sql` with migration notes
3. Keep RLS enabled at all times
4. Handle booking/auction concurrency with DB constraints or RPC to prevent double-bookings
5. Time handling: store UTC in DB; convert to Europe/Zurich in UI
6. Follow the existing schema patterns in `database/schema.sql`
7. Update `/docs/SCHEMA.md` when making schema changes

Example of proper RLS policy structure:
```sql
-- For a new table called "example"
create table example (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  data text,
  created_at timestamp with time zone default now()
);

-- RLS policies
alter table example enable row level security;

create policy "Users can view their own examples"
  on example for select
  using (user_id = auth.uid());

create policy "Users can insert their own examples"
  on example for insert
  with check (user_id = auth.uid());

create policy "Users can update their own examples"
  on example for update
  using (user_id = auth.uid());

create policy "Users can delete their own examples"
  on example for delete
  using (user_id = auth.uid());
```