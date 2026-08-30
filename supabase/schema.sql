-- Vaphia CMS schema
-- Run this once in Supabase SQL Editor.

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  locale text not null check (locale in ('en','fa','fr','es')),
  page_key text not null check (page_key in ('home','watch','play','create','explore','parents','about')),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (locale, page_key)
);

create table if not exists public.site_settings (
  id text primary key,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.site_content enable row level security;
alter table public.site_settings enable row level security;

-- Public visitors can read only published site content/settings.
drop policy if exists "public read site content" on public.site_content;
create policy "public read site content" on public.site_content for select using (true);

drop policy if exists "public read site settings" on public.site_settings;
create policy "public read site settings" on public.site_settings for select using (true);

-- A signed-in user is an admin only when their auth.user id exists in public.admins.
drop policy if exists "admins can read own membership" on public.admins;
create policy "admins can read own membership" on public.admins for select using (auth.uid() = user_id);

drop policy if exists "admins manage content" on public.site_content;
create policy "admins manage content" on public.site_content for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

drop policy if exists "admins manage settings" on public.site_settings;
create policy "admins manage settings" on public.site_settings for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 8388608, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = true, file_size_limit = 8388608,
allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif'];

drop policy if exists "public read site media" on storage.objects;
create policy "public read site media" on storage.objects for select using (bucket_id = 'site-media');

drop policy if exists "admins upload site media" on storage.objects;
create policy "admins upload site media" on storage.objects for insert
with check (
  bucket_id = 'site-media'
  and exists (select 1 from public.admins a where a.user_id = auth.uid())
);

drop policy if exists "admins update site media" on storage.objects;
create policy "admins update site media" on storage.objects for update
using (
  bucket_id = 'site-media'
  and exists (select 1 from public.admins a where a.user_id = auth.uid())
);

drop policy if exists "admins delete site media" on storage.objects;
create policy "admins delete site media" on storage.objects for delete
using (
  bucket_id = 'site-media'
  and exists (select 1 from public.admins a where a.user_id = auth.uid())
);

-- After creating your admin user in Authentication > Users, run:
-- insert into public.admins(user_id) values ('YOUR-AUTH-USER-UUID');
