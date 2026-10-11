-- Apply in the Supabase SQL editor. All browser access is denied; only server service_role can call RPCs.
create table public.planner_conversations (
  id uuid primary key,
  version integer not null,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  contact jsonb,
  brief jsonb,
  recommendation jsonb,
  lead_quality jsonb,
  missing_information jsonb,
  project_summary text,
  notification_status text
);

create table public.planner_messages (
  id uuid primary key,
  conversation_id uuid not null references public.planner_conversations(id) on delete cascade,
  position integer not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null,
  unique (conversation_id, position)
);

create table public.planner_rate_windows (
  key text primary key,
  requests integer not null,
  resets_at timestamptz not null
);

alter table public.planner_conversations enable row level security;
alter table public.planner_messages enable row level security;
alter table public.planner_rate_windows enable row level security;
revoke all on public.planner_conversations, public.planner_messages, public.planner_rate_windows from anon, authenticated;
grant all on public.planner_conversations, public.planner_messages, public.planner_rate_windows to service_role;
create index planner_lead_inbox on public.planner_conversations (submitted_at desc) where submitted_at is not null;
create index planner_failed_notifications on public.planner_conversations (notification_status) where notification_status in ('failed', 'pending');

-- A single transaction saves the brief and every message. Optimistic version checks prevent lost updates.
create or replace function public.planner_save(payload jsonb, expected_version integer)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  conversation_uuid uuid := (payload->>'id')::uuid;
  changed integer;
begin
  if expected_version = 0 then
    insert into public.planner_conversations (id, version, data)
      values (conversation_uuid, 1, payload) on conflict do nothing;
    get diagnostics changed = row_count;
    if changed = 0 then return false; end if;
  else
    update public.planner_conversations set version = expected_version + 1, data = payload, updated_at = now()
      where id = conversation_uuid and version = expected_version;
    get diagnostics changed = row_count;
    if changed = 0 then return false; end if;
  end if;
  update public.planner_conversations set
    submitted_at = (payload->>'submitted_at')::timestamptz,
    contact = payload->'contact', brief = payload->'brief', recommendation = payload->'recommendation',
    lead_quality = payload->'lead_quality', missing_information = payload->'missing_information',
    project_summary = payload->>'project_summary', notification_status = payload->'notification'->>'status'
    where id = conversation_uuid;
  insert into public.planner_messages (id, conversation_id, position, role, content, created_at)
    select (item->>'id')::uuid, conversation_uuid, ordinal::integer,
      item->>'role', item->>'content', (item->>'created_at')::timestamptz
    from jsonb_array_elements(payload->'messages') with ordinality as messages(item, ordinal)
    on conflict (id) do nothing;
  return true;
end;
$$;

-- Shared across Vercel instances. Atomic upsert prevents race conditions when consuming limits.
create or replace function public.planner_consume_rate(rate_key text, maximum integer, window_seconds integer)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare used integer;
begin
  delete from public.planner_rate_windows where resets_at < now() - interval '1 day';
  insert into public.planner_rate_windows (key, requests, resets_at)
    values (rate_key, 1, now() + make_interval(secs => window_seconds))
    on conflict (key) do update set
      requests = case when public.planner_rate_windows.resets_at <= now() then 1 else public.planner_rate_windows.requests + 1 end,
      resets_at = case when public.planner_rate_windows.resets_at <= now() then now() + make_interval(secs => window_seconds) else public.planner_rate_windows.resets_at end
    returning requests into used;
  return used <= maximum;
end;
$$;

revoke execute on function public.planner_save(jsonb, integer), public.planner_consume_rate(text, integer, integer) from public, anon, authenticated;
grant execute on function public.planner_save(jsonb, integer), public.planner_consume_rate(text, integer, integer) to service_role;

-- Basic inbox lives in Supabase's table editor; no custom admin needed for V1.
-- select contact, project_summary, brief, recommendation, lead_quality, missing_information,
--        notification_status, submitted_at from public.planner_conversations
-- where submitted_at is not null order by submitted_at desc;
