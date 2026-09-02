# Arshia Global BD (Pvt.) Limited

Corporate marketing website for **Arshia Global BD (Pvt.) Limited** — real estate, contracting, infrastructure, export-import, supply, consultancy, and e-GP procurement.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **PostgreSQL (Prisma)**, and **NextAuth.js**.

## Features

- Multi-page public site (Home, About, Services, Projects, Team, Process, Testimonials, Contact)
- Feature-modular frontend with repository/API boundary
- PostgreSQL-backed CMS with JSON fallback when `DATABASE_URL` is unset
- Protected admin panel at `/admin` with CRUD for all site content
- Contact inquiry inbox with DB persistence
- REST API at `/api/v1/*`

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- PostgreSQL 14+ (required for admin CMS and DB-backed content)

## Environment setup

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/arshia_global_bd"
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"
ADMIN_SEED_EMAIL="admin@arshialtd.com"
ADMIN_SEED_PASSWORD="change-me"
ADMIN_SEED_NAME="Site Admin"
```

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

## Database setup

```bash
npm install
npx prisma migrate dev --name init
npm run db:seed
```

The seed script imports all content from `src/data/content.json` and creates the initial admin user from env vars.

## Run locally

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)
- Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Change the default admin password immediately after first login.**

Without `DATABASE_URL`, the public site falls back to `content.json` (read-only). Admin APIs return 503 until PostgreSQL is configured.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Lint / type-check |
| `npm run clean` | Remove build output |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed DB from content.json |
| `npm run db:studio` | Open Prisma Studio |

## Admin modules

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard with entity counts |
| `/admin/services` | Service divisions CRUD |
| `/admin/projects` | Portfolio CRUD |
| `/admin/team` | Departments and members |
| `/admin/hero` | Homepage carousel slides |
| `/admin/about` | Corporate profile |
| `/admin/process` | How-we-work steps |
| `/admin/testimonials` | Client quotes |
| `/admin/company` | Company profile and contact |
| `/admin/pages` | Page hero meta copy |
| `/admin/inquiries` | Contact form inbox |

### Roles

- `viewer` — read-only admin access
- `editor` — create and update content
- `super_admin` — full CRUD including deletes

## Architecture

```mermaid
flowchart TB
  subgraph public [Public App]
    Pages["app/(public)/*/page.tsx"]
    Features["features/*/components"]
    Pages --> Features
  end

  subgraph adminUI [Admin CMS]
    AdminPages["app/(admin)/admin/*"]
    AdminFeatures["features/admin/*"]
    AdminPages --> AdminFeatures
  end

  subgraph auth [Auth]
    NextAuth["NextAuth session"]
    Middleware["middleware.ts"]
    NextAuth --> Middleware
  end

  subgraph dataLayer [Data Layer]
    Repos["server/repositories/*"]
    ApiClient["lib/api/*"]
    DbAdapter["server/adapters/db/*"]
    JsonAdapter["server/adapters/json/*"]
  end

  subgraph api [Next.js API]
    Routes["app/api/v1/*"]
    Handlers["server/services/*"]
    Routes --> Handlers
    Handlers --> Repos
  end

  Features --> ApiClient
  AdminFeatures --> ApiClient
  ApiClient --> Routes
  DbAdapter --> Repos
  JsonAdapter --> Repos
  Middleware --> AdminPages
  PublicPages["app/(public)/*"] --> Repos
```

## Project structure

```
prisma/
├── schema.prisma       # PostgreSQL models
└── seed.ts             # Seed from content.json
src/
├── app/
│   ├── (public)/       # Public marketing routes
│   ├── (admin)/admin/  # Protected admin CMS
│   └── api/v1/         # Public + admin REST API
├── features/           # Domain UI (public + admin)
├── shared/             # Layout shell, UI primitives
├── server/             # Repositories, services, auth, DB adapters
├── lib/                # Navigation, API client, server helpers
├── types/              # site, api, admin types
└── data/content.json   # JSON fallback seed data
```

## Deploy

Build and run with any Node.js host (e.g. Vercel + managed PostgreSQL):

```bash
npm run build
npx prisma migrate deploy
npm run db:seed
npm run start
```

Set `DATABASE_URL`, `AUTH_SECRET`, and `AUTH_URL` in production.

## License

Proprietary — Arshia Global BD (Pvt.) Limited.
