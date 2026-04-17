---
description: 'Use when writing or modifying React components, pages, stores, styles, or frontend configuration in CalendApp.'
applyTo: 'apps/frontend/src/**'
---

# CalendApp Frontend — React & UI Conventions

## Tailwind CSS v4

- Import via `@import 'tailwindcss'` in index.css — NO `tailwind.config.js`
- Custom colors defined in `@theme` block in `index.css`
- Custom utility classes via `@utility` directive (NOT `@layer components`)
- Vite plugin: `@tailwindcss/vite` in vite.config.ts

## State Management (Zustand 5)

- One store per domain: `authStore`, `toastStore`, `editorStore`, etc.
- Use `persist` middleware when state should survive page reload
- Keep stores thin — no complex business logic, just state + simple actions
- Toast notifications via `useToastStore`: `toast.success()`, `toast.error()`, etc.

## API Calls (Axios)

- Use the shared Axios instance from `lib/api.ts` — never create new instances
- `baseURL: '/api'`, `withCredentials: true` (cookies)
- 401 responses auto-refresh the token and retry — do NOT handle 401 manually
- Auth endpoints (`/auth/me`, `/auth/login`, `/auth/refresh`) are excluded from auto-refresh

## i18n (react-i18next)

```tsx
const { t } = useTranslation()
return <h1>{t('dashboard.title')}</h1>
```

- Never hardcode user-visible strings — always use `t('key')`
- Keys use dot notation: `section.subsection.label`
- Add new keys to both `locales/en.json` and `locales/es.json`

## Auth State

- `isAuthenticated: boolean | null` — `null` means "still checking"
- Protected routes use `<ProtectedRoute>` wrapper
- `refreshToken` cookie restricted to `Path=/api/auth/refresh`

## Component Patterns

- Props typed as interfaces (not inline)
- Callbacks named `onAction` (e.g., `onChange`, `onSave`, `onDelete`)
- Types imported from `../lib/calendarTypes` or `@calendapp/shared`

## Vite Proxy

Both `/api` and `/uploads` are proxied to the backend (localhost:3000) in dev.

## Editor

See `editor.instructions.md` for Fabric.js canvas, CalendarGrid, covers, and render page conventions.
