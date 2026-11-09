-- Pequenos Passos: configuração do banco no Supabase (plano gratuito)
-- Cole tudo no "SQL Editor" do Supabase e clique em Run.

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  role text not null default 'responsavel' check (role in ('responsavel','medico'))
);

create table children (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users on delete cascade,
  name text not null,
  birth date not null,
  code text not null default substr(replace(gen_random_uuid()::text,'-',''),1,8),
  created_at timestamptz default now()
);

create table access (
  child_id uuid references children on delete cascade,
  doctor uuid references auth.users on delete cascade,
  primary key (child_id, doctor)
);

-- kinds: g = medidas, mk = conquistas, mem = memórias (privadas), co = consultas, dv = dúvidas, va = vacinas
create table records (
  id bigint generated always as identity primary key,
  child_id uuid not null references children on delete cascade,
  kind text not null check (kind in ('g','mk','mem','co','dv','va')),
  data jsonb not null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table children enable row level security;
alter table access   enable row level security;
alter table records  enable row level security;

create policy "perfil: o próprio" on profiles for select using (auth.uid() = id);
create policy "perfil: criar o próprio" on profiles for insert with check (auth.uid() = id);

create policy "criança: responsável faz tudo" on children for all
  using (owner = auth.uid()) with check (owner = auth.uid());
create policy "criança: médico vinculado lê" on children for select
  using (exists (select 1 from access a where a.child_id = children.id and a.doctor = auth.uid()));

create policy "acesso: médico vê os seus" on access for select using (doctor = auth.uid());
create policy "acesso: responsável encerra" on access for delete
  using (exists (select 1 from children c where c.id = access.child_id and c.owner = auth.uid()));

create policy "registros: responsável faz tudo" on records for all
  using (exists (select 1 from children c where c.id = records.child_id and c.owner = auth.uid()))
  with check (exists (select 1 from children c where c.id = records.child_id and c.owner = auth.uid()));
-- O médico lê apenas dados de saúde (nunca as memórias/fotos).
create policy "registros: médico vinculado lê saúde" on records for select
  using (kind <> 'mem' and exists (select 1 from access a where a.child_id = records.child_id and a.doctor = auth.uid()));

-- Cria o perfil automaticamente quando a conta é criada
create function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, name, role)
  values (new.id, new.raw_user_meta_data->>'name',
          case when new.raw_user_meta_data->>'role' = 'medico' then 'medico' else 'responsavel' end);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- O médico vincula um paciente informando o código de 8 caracteres
create function claim_child(c text) returns children
language plpgsql security definer set search_path = public as $$
declare r children;
begin
  if (select role from profiles where id = auth.uid()) is distinct from 'medico' then
    raise exception 'Apenas médicos podem adicionar pacientes';
  end if;
  select * into r from children where code = lower(trim(c));
  if not found then raise exception 'Código não encontrado'; end if;
  insert into access (child_id, doctor) values (r.id, auth.uid()) on conflict do nothing;
  return r;
end $$;
