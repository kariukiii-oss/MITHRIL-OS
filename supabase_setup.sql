-- Enable PostGIS extension for location queries (optional but good for maps)
create extension if not exists postgis;

-- Create Reports Table
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  reporter_hash text not null,
  message_text text,
  image_url text,
  latitude float not null,
  longitude float not null,
  ndvi float,
  mi float,
  ndmi float,
  status text check (status in ('CRITICAL', 'BAD', 'OKAY')),
  category text default 'General'
);

-- Create Locations (Watchlist) Table
create table public.locations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  latitude float not null,
  longitude float not null
);

-- Enable Row Level Security (RLS)
alter table public.reports enable row level security;
alter table public.locations enable row level security;

-- Create Policies (Public Read for Dashboard)
create policy "Enable read access for all users" on public.reports
  for select using (true);

create policy "Enable read access for all users" on public.locations
  for select using (true);

-- Create Policies (Service Role Write for Bot)
-- Note: Service role bypasses RLS, but we can add explicit insert policies if needed.
create policy "Enable insert for service role" on public.reports
  for insert with check (true);

create policy "Enable insert for service role" on public.locations
  for insert with check (true);
