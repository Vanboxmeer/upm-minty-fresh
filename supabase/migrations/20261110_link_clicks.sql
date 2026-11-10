-- Click log for tracked outbound links (/go/<slug>). Inserts only through the
-- log_link_click function (allow-listed slugs); reads are admin-only.
create table if not exists public.link_clicks (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  post_slug text,
  referrer text,
  user_agent text,
  country text,
  is_bot boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists link_clicks_created_idx on public.link_clicks (created_at desc);
create index if not exists link_clicks_slug_idx on public.link_clicks (slug, post_slug);
alter table public.link_clicks enable row level security;

drop policy if exists "Admins read link clicks" on public.link_clicks;
create policy "Admins read link clicks" on public.link_clicks
  for select to authenticated
  using (public.is_admin_user(auth.jwt() ->> 'email'));

create or replace function public.log_link_click(
  p_slug text, p_post_slug text, p_referrer text, p_user_agent text, p_country text, p_is_bot boolean
) returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_slug not in ('starlink') then
    return;
  end if;
  insert into public.link_clicks (slug, post_slug, referrer, user_agent, country, is_bot)
  values (p_slug, left(p_post_slug, 120), left(p_referrer, 300), left(p_user_agent, 300), left(p_country, 8), coalesce(p_is_bot, false));
end $$;
revoke all on function public.log_link_click(text, text, text, text, text, boolean) from public;
grant execute on function public.log_link_click(text, text, text, text, text, boolean) to anon, authenticated;
