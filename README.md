# SkyPrestige Realestate

Site institucional + painel de gestão de anúncios para a imobiliária **SkyPrestige Realestate**.

## Stack

- **Next.js 16 (App Router)** + **TypeScript** — `src/app/*`, cada pasta = uma rota
- **React 19**
- **Tailwind CSS v4** — estilos por classes, tema definido em `src/app/globals.css`
- **lucide-react** — ícones
- **Supabase** — base de dados (Postgres), autenticação e armazenamento de fotos

## Estrutura do projeto

```
src/
  app/
    page.tsx                 → / (página inicial)
    imoveis/page.tsx          → /imoveis (listagem com filtros)
    imoveis/[slug]/page.tsx   → /imoveis/:slug (detalhe do imóvel)
    sobre/page.tsx             → /sobre
    contacto/page.tsx          → /contacto
    login/page.tsx             → /login (acesso da equipa)
    dashboard/                 → painel de gestão (protegido, requer sessão)
      page.tsx                   → visão geral
      imoveis/page.tsx           → lista de imóveis (editar/apagar/publicar)
      imoveis/novo/page.tsx      → criar imóvel
      imoveis/[id]/page.tsx      → editar imóvel
      leads/page.tsx             → contactos recebidos
    actions/                   → Server Actions (mutações: criar/editar imóvel, leads, login)
  components/                 → componentes reutilizáveis (Navbar, Footer, PropertyCard, ...)
    dashboard/                  → componentes específicos do painel
    ui/                          → primitivos (Button, Input, Select, ...)
  lib/
    site.ts                     → dados da marca, navegação, FAQs (equivalente ao "siteData.ts")
    types.ts                    → tipos partilhados (Property, Lead, ...)
    queries.ts                  → leituras à base de dados
    supabase/                   → clientes Supabase (browser / server / proxy)
proxy.ts                      → equivalente ao antigo "middleware.ts" (protege /dashboard)
supabase/schema.sql           → esquema completo da base de dados + dados de exemplo
```

## Configurar o backend (Supabase)

O site fica **completamente funcional sem backend** para navegação, mas para conseguires
**criar e gerir anúncios** precisas de configurar um projeto Supabase (gratuito):

1. Cria uma conta em [supabase.com](https://supabase.com) e cria um novo projeto.
2. Vai a **SQL Editor** → cola todo o conteúdo de [`supabase/schema.sql`](./supabase/schema.sql) → **Run**.
   Isto cria as tabelas (`properties`, `property_images`, `leads`, `profiles`), as regras de
   segurança (RLS) e o bucket de imagens `property-images`, além de 6 imóveis de exemplo.
3. Vai a **Project Settings → API** e copia:
   - `Project URL`
   - `anon public` key
4. Copia `.env.example` para `.env.local` e cola esses valores:
   ```bash
   cp .env.example .env.local
   ```
5. Cria o teu primeiro utilizador (quem vai gerir os anúncios) em
   **Authentication → Users → Add user** (define email + palavra-passe).
   Esse é o login que vais usar em `/login`.

## Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

- Site público: `/`, `/imoveis`, `/sobre`, `/contacto`
- Painel de gestão: `/login` → `/dashboard`

## Como funciona a criação de anúncios

1. Login em `/login` com o utilizador criado no Supabase.
2. `/dashboard/imoveis/novo` → preenche os dados, envia fotos (upload direto para o
   Supabase Storage) e escolhe se o anúncio fica **publicado** e/ou **em destaque**.
3. O anúncio aparece automaticamente em `/imoveis` (e na homepage, se marcado como destaque).
4. Pedidos de contacto feitos por visitantes (formulário no imóvel ou em `/contacto`)
   aparecem em `/dashboard/leads`.

## Deploy

Este projeto está pronto para deploy na [Vercel](https://vercel.com/new). Basta:

1. Importar o repositório.
2. Definir as variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy.
