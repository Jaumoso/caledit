---
description: 'Use when writing Prisma schema changes, migrations, database queries, or modifying the database layer in Kalenda.'
applyTo: 'apps/backend/prisma/**'
---

# Kalenda — Prisma & Database Conventions

## Prisma 7 with PrismaPg Adapter

- Client uses `@prisma/adapter-pg` + native `pg` Pool — NOT the default Prisma connection
- Do NOT add `url` to the `datasource` block in `schema.prisma`
- PrismaClient constructor requires `adapter` option (NOT `datasourceUrl`)
- Config in `prisma.config.ts` uses `datasource.url` (NOT `db.url`)

## Connection Setup

```ts
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
export const prisma = new PrismaClient({ adapter })
```

## Schema Conventions

- IDs: `@default(cuid())`
- Timestamps: `createdAt DateTime @default(now())` + `updatedAt DateTime @updatedAt`
- Enums: UPPERCASE values (e.g., `ADMIN`, `USER`, `DRAFT`, `BIRTHDAY`, `NATIONAL`)
- Relations: Always define both sides with `@relation`
- JSON fields for flexible data: `canvasTopJson`, `gridConfigJson`, `overlayJson`, `contentJson`, `configJson`

## Models Overview

- `User` — email unique, hashed password, role (ADMIN/USER)
- `Project` — 12 CalendarMonths auto-created, covers JSON, status (DRAFT/IN_PROGRESS/COMPLETED), autonomyCode
- `CalendarMonth` — canvasTopJson + gridConfigJson + overlayJson (3 Fabric.js/grid JSON fields)
- `DayCell` — per-cell content (contentJson for images/stickers/text)
- `Asset` / `AssetFolder` — uploaded files with thumbnails, tree-structured folders
- `Event` — recurring (year=null) or one-time, type: BIRTHDAY/ANNIVERSARY/SAINT/CUSTOM
- `Holiday` — scope: NATIONAL/AUTONOMY
- `Template` — reusable grid+canvas config (configJson)
- `ExportJob` — PDF/PNG export tracking (PENDING/PROCESSING/COMPLETED/FAILED)

## Queries

- Use `findFirst` with userId filter for ownership checks (not `findUnique`)
- Use `include` with `select` to minimize payload in GET endpoints
- Use `orderBy` for consistent result ordering
- Wrap multi-step mutations in `prisma.$transaction()`

## Migrations

- Generate with `npx prisma migrate dev --name descriptive_name`
- Never edit migration SQL files after they've been applied
- Test migrations against dev database before committing

## Dev Database

- PostgreSQL 16 (Alpine) via docker-compose.dev.yml
- Credentials: `kalenda:kalenda_password@localhost:5432/kalenda`
- Seed: `npx tsx src/seed.ts` → admin@kalenda.app/admin123, maria@kalenda.app/maria123
