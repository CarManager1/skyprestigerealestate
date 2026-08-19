-- ============================================================================
-- SkyPrestige Realestate — esquema da base de dados (Supabase / PostgreSQL)
--
-- Como usar:
--   1. Cria um projeto em https://supabase.com
--   2. Vai a "SQL Editor" no painel do Supabase
--   3. Cola e corre este ficheiro inteiro (de uma vez)
--   4. Cria o bucket de imagens (ver secção STORAGE no fim, ou faz manualmente
--      em Storage > New bucket > nome "property-images" > Public bucket ✅)
--   5. Cria o teu primeiro utilizador em Authentication > Users > Add user
--      (esse utilizador poderá fazer login em /login e gerir os imóveis)
-- ============================================================================

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Tabela: profiles (perfil de cada utilizador autenticado — admin/agente)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'agente' check (role in ('admin', 'agente')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Perfis são visíveis para utilizadores autenticados"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Um utilizador pode atualizar o seu próprio perfil"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Cria automaticamente um profile quando um novo utilizador se regista
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- Tabela: properties (anúncios de imóveis)
-- ----------------------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references auth.users (id) on delete set null,
  title text not null,
  slug text not null unique,
  description text,
  price numeric(12, 2) not null default 0,
  purpose text not null default 'venda' check (purpose in ('venda', 'arrendamento')),
  type text not null default 'apartamento'
    check (type in ('apartamento', 'moradia', 'penthouse', 'terreno', 'escritorio', 'loja')),
  state text not null default 'disponivel'
    check (state in ('disponivel', 'reservado', 'vendido')),
  bedrooms int,
  bathrooms int,
  area_m2 numeric(10, 2),
  city text not null,
  district text,
  address text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_published_idx on public.properties (published, created_at desc);
create index if not exists properties_city_idx on public.properties (city);
create index if not exists properties_type_idx on public.properties (type);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

alter table public.properties enable row level security;

-- Qualquer visitante pode ver imóveis publicados
create policy "Imóveis publicados são públicos"
  on public.properties for select
  to anon, authenticated
  using (published = true);

-- Utilizadores autenticados (equipa da agência) veem tudo, incluindo rascunhos
create policy "Equipa autenticada vê todos os imóveis"
  on public.properties for select
  to authenticated
  using (true);

create policy "Equipa autenticada cria imóveis"
  on public.properties for insert
  to authenticated
  with check (true);

create policy "Equipa autenticada edita imóveis"
  on public.properties for update
  to authenticated
  using (true);

create policy "Equipa autenticada apaga imóveis"
  on public.properties for delete
  to authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- Tabela: property_images (fotos de cada imóvel)
-- ----------------------------------------------------------------------------
create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  url text not null,
  position int not null default 0
);

create index if not exists property_images_property_idx on public.property_images (property_id, position);

alter table public.property_images enable row level security;

create policy "Fotos de imóveis publicados são públicas"
  on public.property_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.properties p
      where p.id = property_images.property_id and p.published = true
    )
  );

create policy "Equipa autenticada vê todas as fotos"
  on public.property_images for select
  to authenticated
  using (true);

create policy "Equipa autenticada gere fotos"
  on public.property_images for all
  to authenticated
  using (true)
  with check (true);

-- ----------------------------------------------------------------------------
-- Tabela: leads (pedidos de contacto / interesse)
-- ----------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default 'novo' check (status in ('novo', 'contactado', 'fechado')),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Qualquer visitante pode criar um pedido de contacto (formulário público)
create policy "Qualquer pessoa pode submeter um contacto"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Só a equipa autenticada pode ver/gerir os contactos recebidos
create policy "Equipa autenticada vê os contactos"
  on public.leads for select
  to authenticated
  using (true);

create policy "Equipa autenticada atualiza os contactos"
  on public.leads for update
  to authenticated
  using (true);

-- ============================================================================
-- STORAGE — bucket para as fotos dos imóveis
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "Fotos de imóveis são publicamente visíveis"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'property-images');

create policy "Equipa autenticada envia fotos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-images');

create policy "Equipa autenticada apaga fotos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'property-images');

-- ============================================================================
-- SEED — alguns imóveis de exemplo (opcional, pode apagar depois)
-- ============================================================================
insert into public.properties
  (title, slug, description, price, purpose, type, state, bedrooms, bathrooms, area_m2, city, district, featured, published)
values
  (
    'Penthouse com vista rio, Chiado',
    'penthouse-vista-rio-chiado',
    'Penthouse de luxo totalmente renovado, com terraço privado de 80m² e vista panorâmica sobre o rio Tejo. Acabamentos de excelência, cozinha equipada e garagem para duas viaturas.',
    2450000, 'venda', 'penthouse', 'disponivel', 3, 3, 210, 'Lisboa', 'Chiado', true, true
  ),
  (
    'Moradia contemporânea com piscina, Cascais',
    'moradia-piscina-cascais',
    'Moradia V5 de arquitetura contemporânea, jardim privado, piscina aquecida e vistas de mar. Localizada numa das zonas mais procuradas de Cascais.',
    3900000, 'venda', 'moradia', 'disponivel', 5, 4, 420, 'Cascais', 'Quinta da Marinha', true, true
  ),
  (
    'Apartamento T2 de charme, Príncipe Real',
    'apartamento-t2-principe-real',
    'Apartamento T2 remodelado num prédio de traça pombalina, no coração do Príncipe Real. Pé-direito alto, varanda e muita luz natural.',
    895000, 'venda', 'apartamento', 'disponivel', 2, 2, 110, 'Lisboa', 'Príncipe Real', false, true
  ),
  (
    'Apartamento T3 para arrendar, Foz do Douro',
    'apartamento-t3-foz-do-douro',
    'Apartamento T3 mobilado com vista mar, a poucos passos da praia. Condomínio fechado com segurança 24h e estacionamento.',
    3200, 'arrendamento', 'apartamento', 'disponivel', 3, 2, 145, 'Porto', 'Foz do Douro', true, true
  ),
  (
    'Escritório premium, Avenida da Liberdade',
    'escritorio-avenida-liberdade',
    'Espaço de escritório de open-space com 300m², totalmente equipado, num dos edifícios mais prestigiados da Avenida da Liberdade.',
    1800000, 'venda', 'escritorio', 'disponivel', null, 2, 300, 'Lisboa', 'Avenida da Liberdade', false, true
  ),
  (
    'Moradia com vista serra, Sintra',
    'moradia-vista-serra-sintra',
    'Moradia V4 rodeada de natureza, com vista para a Serra de Sintra, jardim maduro e piscina. Ideal para quem procura tranquilidade perto de Lisboa.',
    1650000, 'venda', 'moradia', 'reservado', 4, 3, 380, 'Sintra', 'Colares', false, true
  )
on conflict (slug) do nothing;
