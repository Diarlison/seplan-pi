create table if not exists public.painel (
  id text primary key,
  nome text not null default 'Pessoa',
  dados jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now()
);

alter table public.painel enable row level security;

drop policy if exists "ler painel" on public.painel;
drop policy if exists "inserir painel" on public.painel;
drop policy if exists "atualizar painel" on public.painel;

create policy "ler painel" on public.painel
  for select using (true);

create policy "inserir painel" on public.painel
  for insert with check (true);

create policy "atualizar painel" on public.painel
  for update using (true) with check (true);
