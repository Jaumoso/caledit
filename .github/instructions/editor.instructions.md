---
description: 'Use when working on the calendar editor: MonthEditorPage, CoverEditorPage, CanvasEditor, CalendarGrid, DraggableGridOverlay, render pages, or any Fabric.js/grid interaction.'
applyTo:
  [
    'apps/frontend/src/pages/MonthEditorPage.tsx',
    'apps/frontend/src/pages/CoverEditorPage.tsx',
    'apps/frontend/src/pages/RenderMonthPage.tsx',
    'apps/frontend/src/pages/RenderCoverPage.tsx',
    'apps/frontend/src/components/CanvasEditor.tsx',
    'apps/frontend/src/components/CanvasToolbar.tsx',
    'apps/frontend/src/components/CalendarGrid.tsx',
    'apps/frontend/src/components/GridPropertiesPanel.tsx',
    'apps/frontend/src/components/DraggableGridOverlay.tsx',
    'apps/frontend/src/components/CellModal.tsx',
    'apps/frontend/src/components/ObjectPropertiesPanel.tsx',
    'apps/frontend/src/components/LayersPanel.tsx',
    'apps/frontend/src/lib/calendarTypes.ts',
  ]
---

# Kalenda — Editor Architecture

## Page Layout

- ONE Fabric.js canvas covers the full A4 page (794×1123px at 96 DPI)
- CalendarGrid is an HTML/React overlay positioned absolutely on top of the canvas
- Two modes toggled in UI: `editorMode: 'canvas' | 'grid'`
  - Canvas mode: Fabric.js interactive, toolbar + layers panel + object properties visible
  - Grid mode: DraggableGridOverlay active, GridPropertiesPanel visible

## Constants (calendarTypes.ts)

```ts
PAGE_WIDTH = 794 // A4 at 96 DPI
PAGE_HEIGHT = 1123
DEFAULT_GRID_X = 16
DEFAULT_GRID_Y = 652
DEFAULT_GRID_WIDTH = 762
DEFAULT_GRID_HEIGHT = 455
```

## CanvasEditor (Fabric.js)

- Exposes methods via `CanvasEditorHandle` (useImperativeHandle/ref):
  `toJSON()`, `loadFromJSON()`, `addImageFromURL()`, `addText()`, `addSticker()`,
  `setBackground()`, `undo/redo`, `zoom*`, `bringForward/sendBackward`, `deleteSelected()`
- Undo/redo: JSON history stack, `MAX_HISTORY = 50`, keyboard shortcuts (Cmd+Z / Cmd+Y)
- `preserveObjectStacking: true` on canvas init
- `isLoadingRef` prevents saving history during JSON load (race condition guard)
- Undo/redo is for canvas operations only — NOT for grid config changes

## CalendarGrid (HTML overlay)

Cell content layers (z-index order):

1. Background image
2. Day number (positioned by `dayPosition`, red if holiday)
3. Saint name (top-left, gray, small)
4. Holiday label (bottom-left, red bold)
5. Event dots / event text
6. Cell text
7. Emoji

## DraggableGridOverlay

- 8 resize handles (corners + edge midpoints) + move
- Minimum size: width ≥ 100px, height ≥ 50px
- Distance indicators to page edges (dashed lines + px labels)
- `active=true` → z-index 10, children non-interactive; `active=false` → z-index 2

## Data Persistence

- Three JSON fields per CalendarMonth: `canvasTopJson`, `gridConfigJson`, `overlayJson`
- Per-cell data in `DayCell.contentJson` (text, emoji, imageAssetId, stickerAssetId)
- Autosave every 30s with dirty-flag optimization (`dirtyRef`)
- Also saves on unmount (fire-and-forget)
- Refs (`dirtyRef`, `gridConfigRef`, `canvasTopJsonRef`) synced via useEffect for cleanup access

## Cover Editor

- CoverEditorPage is a simplified MonthEditorPage: Fabric.js canvas only, NO grid overlay
- Supports front/back cover via URL param `type` ('front' | 'back')
- Cover JSON stored on the Project model, not CalendarMonth

## Render Pages (Headless — Puppeteer)

- `RenderMonthPage` and `RenderCoverPage` are NOT user-facing
- Accessed via short-lived render tokens: `GET /api/render-data/{monthId}?token=...`
- Must reproduce the exact same layout as the editor (canvas + grid overlay)
- Ready signal: set `window.__RENDER_READY__ = true` after canvas + images loaded
- `waitForImages()` waits ~2s for image load completion
- **All `@fontsource-variable/*` imports are required** — without them, fonts fail in Puppeteer

## GridConfig (18 properties)

- Layout: `gridX`, `gridY`, `gridWidth`, `gridHeight`, `gridOverlayOpacity`
- Style: `bgColor`, `bgOpacity`, `borderColor`, `borderWidth`, `borderStyle`
- Day numbers: `dayFontFamily`, `dayFontSize`, `dayFontColor`, `dayFontWeight`, `dayPosition` (9 positions)
- Header: `headerFontFamily`, `headerFontSize`, `headerFontColor`, `headerBgColor`
- Toggles: `showHolidays`, `holidayBgColor`, `showSaints`, `showEvents`

## CellModal (per-day editing)

- Modal-driven, not inline editing
- Options: bgColor, text (max 100 chars), emoji, image from asset library, sticker from asset library
- Can create quick events (BIRTHDAY/ANNIVERSARY/CUSTOM) directly from cell
