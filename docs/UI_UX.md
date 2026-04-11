# UI_UX.md — Diseño de Interfaz y Experiencia de Usuario
## CalendApp

**Versión:** 1.0  
**Fecha:** Abril 2026

---

## 1. Principios de diseño

1. **Claridad sobre densidad:** Interfaz limpia, sin abrumar con opciones. Los paneles de opciones avanzadas están colapsables.
2. **Acción directa:** El usuario puede empezar a editar sin configuración previa. Los valores por defecto son sensatos.
3. **Feedback inmediato:** Cualquier cambio se ve reflejado en el canvas en tiempo real.
4. **Progresión:** La pantalla principal muestra el progreso de los 12 meses de un vistazo.
5. **Recuperable:** Auto-guardado frecuente. El usuario nunca pierde trabajo.
6. **Accesible para usuario no técnico:** Sin jerga técnica. Etiquetas descriptivas. Tooltips en controles no obvios.

---

## 2. Paleta de colores de la interfaz

La interfaz usa tonos neutros para no interferir con los colores del calendario que el usuario está creando.

```
Fondo principal:      #F8F7F4  (blanco cálido)
Fondo panel lateral:  #F0EEE9
Borde suave:          #E2DDD6
Texto principal:      #1A1A1A
Texto secundario:     #6B6560
Acento primario:      #C8502A  (terracota — evoca papel y fotografía)
Acento hover:         #A83E1E
Éxito:                #2D7A4F
Error:                #C0392B
```

---

## 3. Pantallas y flujos

---

### 3.1 Pantalla de Login

```
┌─────────────────────────────────────────┐
│                                         │
│           [Logo CalendApp]              │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  Email                          │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │  Contraseña                     │   │
│   └─────────────────────────────────┘   │
│                                         │
│   [ ] Recordarme                        │
│                                         │
│   [        Entrar        ]              │
│                                         │
│   Selector de idioma: 🌐 ES | EN        │
│                                         │
└─────────────────────────────────────────┘
```

**Comportamiento:**
- Error claro si credenciales incorrectas
- Redirección al Dashboard tras login exitoso
- El selector de idioma cambia la interfaz antes de iniciar sesión

---

### 3.2 Dashboard — Lista de proyectos

```
┌────────────────────────────────────────────────────────────────┐
│  CalendApp          🌐 Idioma    👤 Usuario ▼                  │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Mis calendarios             [+ Nuevo proyecto]                 │
│                                                                  │
│  Filtrar: [Todos ▼]  [Año ▼]                                   │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ [Miniatura]  │  │ [Miniatura]  │  │ [Miniatura]  │         │
│  │              │  │              │  │              │         │
│  │ Calendario   │  │ Calendario   │  │ Vacaciones   │         │
│  │ 2026         │  │ 2025         │  │ Especial     │         │
│  │ En progreso  │  │ Finalizado   │  │ Borrador     │         │
│  │ 7/12 meses   │  │ ✓ Completo   │  │ 2/12 meses   │         │
│  │              │  │              │  │              │         │
│  │ [Editar] [⋮] │  │ [Abrir] [⋮] │  │ [Editar] [⋮] │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

**Menú [⋮] por proyecto:** Duplicar / Renombrar / Cambiar estado / Exportar todo / Eliminar

---

### 3.3 Vista general del proyecto — Los 12 meses

```
┌────────────────────────────────────────────────────────────────┐
│  ← Mis calendarios   Calendario 2026        [Exportar todo]   │
├────────────────────────────────────────────────────────────────┤
│  Plantilla base: [Editar plantilla]    Año: 2026               │
│                                                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                         │
│  │ ENE  │ │ FEB  │ │ MAR  │ │ ABR  │                         │
│  │[img] │ │[img] │ │[img] │ │[img] │                         │
│  │  ✓   │ │  ✓   │ │  ★   │ │  ○   │  ✓=completo ★=modif  ○=vacío
│  └──────┘ └──────┘ └──────┘ └──────┘                         │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                         │
│  │ MAY  │ │ JUN  │ │ JUL  │ │ AGO  │                         │
│  │[img] │ │[img] │ │[img] │ │[img] │                         │
│  │  ○   │ │  ○   │ │  ○   │ │  ○   │                         │
│  └──────┘ └──────┘ └──────┘ └──────┘                         │
│  [SEP] [OCT] [NOV] [DIC]                                       │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

Clic en cualquier mes → abre el editor de ese mes.

---

### 3.4 Editor de mes — Pantalla principal

Esta es la pantalla más importante y compleja de la app.

```
┌──────────────────────────────────────────────────────────────────────┐
│ ← Proyecto   ENERO 2026   [◀ Feb] [Mar ▶]   [Guardar] [Exportar]   │
├────────────┬─────────────────────────────────────────┬───────────────┤
│            │                                         │               │
│  PANEL     │         CANVAS PRINCIPAL                │  PANEL DE     │
│  IZQUIERDO │         (Vista A4 proporcional)         │  PROPIEDADES  │
│            │                                         │               │
│ ┌────────┐ │  ┌─────────────────────────────────┐   │ (contextual   │
│ │Herram. │ │  │                                 │   │  según lo     │
│ │        │ │  │   ZONA SUPERIOR                 │   │  seleccionado)│
│ │ ↖ Sel  │ │  │   (imagen/collage)              │   │               │
│ │ ✋ Mover│ │  │                                 │   │ Si nada sel:  │
│ │ 📝 Text│ │  │                                 │   │ ┌───────────┐ │
│ │ 🖼 Img │ │  │                                 │   │ │ PLANTILLA │ │
│ │ ⭐ Stk │ │  ├─────────────────────────────────┤   │ │ DEL MES   │ │
│ │ 🎨 Fnd │ │  │                                 │   │ │           │ │
│ │        │ │  │   ZONA INFERIOR                 │   │ │ Fondo:    │ │
│ └────────┘ │  │   (Grid del calendario)         │   │ │ [color]   │ │
│            │  │                                 │   │ │           │ │
│ ┌────────┐ │  │  Lu  Ma  Mi  Ju  Vi  Sá  Do     │   │ │ Bordes:   │ │
│ │CAPAS   │ │  │       1   2   3   4   5          │   │ │ [config]  │ │
│ │        │ │  │  6   7   8   9  10  11  12       │   │ │           │ │
│ │▲ Texto │ │  │ 13  14  15  16  17  18  19       │   │ │ Tipogr:   │ │
│ │▲ Foto1 │ │  │ 20  21  22  23  24  25  26       │   │ │ [config]  │ │
│ │▲ Fondo │ │  │ 27  28  29  30  31               │   │ └───────────┘ │
│ └────────┘ │  └─────────────────────────────────┘   │               │
│            │                                         │               │
├────────────┴─────────────────────────────────────────┴───────────────┤
│  [Biblioteca de assets]    Zoom: 75% [−][+]    Auto-guardado: 14:32  │
└──────────────────────────────────────────────────────────────────────┘
```

---

### 3.4.1 Panel de propiedades — Imagen seleccionada

```
┌─────────────────────────┐
│ 🖼 Imagen               │
├─────────────────────────┤
│ Posición                │
│ X: [  125  ] Y: [  80  ]│
│                         │
│ Tamaño                  │
│ A: [ 300 ] L: [ 200 ]   │
│ [🔒 Proporción]         │
│                         │
│ Capa (Z)                │
│ [▲ Subir] [▼ Bajar]     │
│ [⬆ Al frente] [⬇ Fondo] │
│                         │
│ Efectos                 │
│ Opacidad:  [━━━●━━] 80% │
│ Brillo:    [━━━━●━] 110 │
│ Contraste: [━━●━━━] 90  │
│ Saturación:[━━━●━━] 100 │
│ [ ] Escala de grises    │
│ [ ] Sepia               │
│                         │
│ [ Eliminar imagen ]     │
└─────────────────────────┘
```

---

### 3.4.2 Panel de propiedades — Grid seleccionado

```
┌─────────────────────────┐
│ 📅 Grid del calendario  │
├─────────────────────────┤
│ Fondo de tabla          │
│ Color: [████] #FFFFFF   │
│ Opacidad: [━━━━●] 90%   │
│                         │
│ Bordes                  │
│ Color: [████] #CCCCCC   │
│ Grosor: [ 1px ▼]        │
│ Estilo: [Sólido ▼]      │
│                         │
│ Números de días         │
│ Fuente: [Playfair ▼]    │
│ Tamaño: [  16  ] px     │
│ Color: [████] #1A1A1A   │
│ Peso: [Normal ▼]        │
│ Posición: [↖][↑][↗]     │
│            [←][·][→]    │
│            [↙][↓][↘]    │
│                         │
│ Fin de semana           │
│ Color: [████] #FFF5F5   │
│                         │
│ Inicio semana:[Lu ▼]    │
└─────────────────────────┘
```

---

### 3.4.3 Modal — Celda de día (clic en un día del grid)

```
┌──────────────────────────────────┐
│  Día 15 — Enero 2026             │
│  ─────────────────────────────── │
│  🎉 Festivo: No                  │
│                                  │
│  Eventos ese día:                │
│  ┌──────────────────────────┐    │
│  │ 🎂 Cumpleaños de Ana     │    │
│  └──────────────────────────┘    │
│  [+ Añadir evento]               │
│                                  │
│  Personalización de la celda:    │
│  Color de fondo: [████] [Limpiar]│
│                                  │
│  Imagen: [Seleccionar imagen]    │
│  [  Imagen seleccionada.jpg  ×]  │
│                                  │
│  Sticker/Emoji: [Abrir panel]    │
│  [⭐ seleccionado ×]              │
│                                  │
│  Texto: [________________]       │
│                                  │
│         [Cancelar] [Guardar]     │
└──────────────────────────────────┘
```

---

### 3.5 Biblioteca de assets

```
┌────────────────────────────────────────────────────────────┐
│  Biblioteca de imágenes              [+ Subir]  [+ Carpeta]│
├────────────┬───────────────────────────────────────────────┤
│            │  [🔍 Buscar...]          Ver: [▦ Grid][≡ Lista]│
│ 📁 Fotos   │                                               │
│  📁 2025   │  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  📁 2026   │  │img│ │img│ │img│ │img│ │img│ │img│       │
│  📁 Familia│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘       │
│            │  foto1 foto2 foto3 foto4 foto5 foto6          │
│ 📁 Stickers│                                               │
│  📁 Propios│  ┌───┐ ┌───┐ ┌───┐                           │
│  📁 Navidad│  │img│ │img│ │img│                           │
│            │  └───┘ └───┘ └───┘                           │
│            │  foto7 foto8 foto9                            │
└────────────┴───────────────────────────────────────────────┘
```

---

### 3.6 Panel de Stickers y Emojis

```
┌─────────────────────────────────┐
│ Stickers y Emojis    [✕ Cerrar] │
├─────────────────────────────────┤
│ [🔍 Buscar emoji o sticker...]  │
├─────────────────────────────────┤
│ Mis stickers                    │
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐      │
│ │🌸│ │⭐│ │🎂│ │❤│ │🎉│      │
│ └──┘ └──┘ └──┘ └──┘ └──┘      │
├─────────────────────────────────┤
│ Emojis  [Smileys][Naturaleza]   │
│         [Comida] [Viajes] [+]   │
│ 😀😂🥰😍🤩🥳😎🤗🥹          │
│ 😊😋🤣😄😁😆😅🫶💕           │
└─────────────────────────────────┘
```

---

### 3.7 Panel de exportación

```
┌───────────────────────────────────────┐
│  Exportar calendario          [✕]     │
├───────────────────────────────────────┤
│  ¿Qué exportar?                       │
│  ● Calendario completo (12 meses)     │
│  ○ Solo este mes (Enero)              │
│  ○ Seleccionar meses: [ENE][FEB]...   │
│                                       │
│  Formato:                             │
│  ☑ PDF (un archivo, todos los meses) │
│  ☑ PNG por página                    │
│                                       │
│  Opciones:                            │
│  ☑ Incluir guía de encuadernación    │
│  ☐ Portada (no configurada)          │
│                                       │
│  Nombre del archivo:                  │
│  [Calendario_2026              ]      │
│                                       │
│       [Cancelar]  [Exportar]          │
└───────────────────────────────────────┘
```

---

## 4. Flujo de navegación

```
Login
  │
  ▼
Dashboard (lista de proyectos)
  │
  ├──▶ Nuevo proyecto → modal → Dashboard
  │
  ├──▶ Abrir proyecto → Vista general 12 meses
  │         │
  │         ├──▶ Editar plantilla base → Editor de plantilla
  │         │
  │         └──▶ Clic en mes → Editor de mes
  │                   │
  │                   ├──▶ Panel izq: capas, herramientas
  │                   ├──▶ Canvas: zona superior (Fabric.js)
  │                   ├──▶ Canvas: zona inferior (grid + celdas)
  │                   ├──▶ Clic en celda → Modal de celda
  │                   ├──▶ Biblioteca de assets (panel inferior/modal)
  │                   └──▶ Exportar → Modal de exportación
  │
  ├──▶ Biblioteca → Página de assets
  │
  ├──▶ Eventos → Página de gestión de eventos recurrentes
  │
  └──▶ Admin (solo admin) → Gestión de usuarios
```

---

## 5. Consideraciones de UX para usuario no técnico

- **Tooltips** en todos los iconos de herramientas con nombre y atajo de teclado
- **Onboarding breve** en el primer uso: 3-4 pasos tipo "tooltip tour" explicando las zonas del editor
- **Mensajes de error en lenguaje natural:** "La imagen es demasiado grande (máx. 20MB)" en lugar de errores técnicos
- **Confirmaciones antes de acciones destructivas** (eliminar proyecto, aplicar plantilla a todos los meses)
- **Indicador de auto-guardado** siempre visible para tranquilidad del usuario
- **Los atajos de teclado son opcionales**, nunca requeridos para ninguna acción
- **Botón "Deshacer"** prominente (Ctrl+Z o botón visual) — muy importante para el editor canvas
- **Zoom** ajustable para ver el calendario completo o acercar para trabajar en detalle
