---
description: 'Use when working on any file in CalendApp. Covers monorepo structure, shared package conventions, and general project rules.'
applyTo: '**'
---

# CalendApp — General Conventions

## Monorepo Structure

- pnpm workspaces: `apps/backend`, `apps/frontend`, `packages/shared`
- Shared types and Zod schemas live in `@calendapp/shared` — import from there, never duplicate
- Reference shared package as `workspace:*` in package.json

## Language & i18n

- UI strings must use i18next keys (`t('key')`), never hardcoded text
- Two locales: `es.json` (primary), `en.json` (fallback)
- Add keys to both locale files when creating new UI text

## TypeScript

- Strict mode everywhere — no `any` unless absolutely unavoidable
- Types shared between frontend and backend go in `packages/shared/src/types.ts`
- Zod schemas shared between frontend and backend go in `packages/shared/src/schemas.ts`
- Re-export new types/schemas from `packages/shared/src/index.ts`

## Error Format (API)

All API error responses must follow:

```json
{ "error": "ERROR_CODE", "message": "Human-readable description" }
```

## IDs

- All entity IDs use cuid (Prisma default)
