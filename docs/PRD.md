# PRD — Product Requirements Document
## CalendApp — Aplicación web de calendarios personalizables

**Versión:** 1.0  
**Fecha:** Abril 2026  
**Estado:** Borrador inicial

---

## 1. Visión del producto

CalendApp es una aplicación web auto-hospedada que permite crear calendarios de pared georgianos completamente personalizables, con control total sobre el diseño visual de cada página (mes). El usuario puede combinar imágenes, stickers, texto, emojis y fondos personalizados, y exportar el resultado en PDF/PNG listo para imprimir en casa o en imprenta.

---

## 2. Problema que resuelve

Aplicaciones comerciales como Hoffmann han ido eliminando funcionalidades clave (stickers propios, fondos por página, fotos en celdas de días, acceso a biblioteca local de imágenes), obligando a los usuarios a adaptarse a un producto cada vez más limitado. CalendApp devuelve el control total al usuario, sin depender de terceros ni de sus decisiones de producto.

---

## 3. Usuarios objetivo

| Usuario | Rol | Perfil técnico |
|---------|-----|----------------|
| Usuario principal (madre) | Creador de calendarios | Medio — se apaña bien con ordenadores, no es técnica |
| Administrador (hijo) | Admin + también creador | Alto — gestiona el servidor |

La aplicación está diseñada para escalar a más usuarios con el mismo perfil que el usuario principal.

---

## 4. Contexto de uso

- **Dispositivo:** Ordenador de escritorio/portátil (navegador web)
- **Acceso:** Red local o acceso remoto vía servidor propio (self-hosted)
- **Formato de salida:** A4 vertical, alta resolución (300 DPI mínimo)
- **Destino de impresión:** Hogar o papelería/imprenta local
- **Encuadernación:** Gusano/espiral en el centro, colgado desde la parte superior

---

## 5. Funcionalidades — MoSCoW

### 🔴 MUST (MVP obligatorio)

#### 5.1 Gestión de proyectos
- Crear múltiples proyectos de calendario (años, borradores, temáticos)
- Nombrar, duplicar, eliminar y archivar proyectos
- Estado de proyecto: Borrador / En progreso / Finalizado
- Cada proyecto contiene 12 meses (o rango personalizado)

#### 5.2 Editor de página mensual
Cada mes es una página A4 compuesta de dos zonas principales:

**Zona superior — Área de imagen/collage**
- Fondo de zona: color sólido, degradado o imagen
- Soporte para una o múltiples imágenes posicionables libremente
- Control de posición X, Y y capa (Z/orden)
- Efectos de imagen: opacidad, brillo, contraste, saturación, escala de grises, sepia
- Texto decorativo libre con control total de tipografía
- Stickers y emojis posicionables
- Soporte de capas (el usuario decide qué elemento está encima de cuál)

**Zona inferior — Grid del calendario**
- Tabla estándar de calendario gregoriano (Lu–Do o Do–Sá, configurable)
- Nombre del mes y año en cabecera
- Celda por día con número del día
- Personalización de la tabla:
  - Color de fondo de la tabla (con opacidad)
  - Color de fondo por celda individual
  - Color, grosor y estilo de bordes
  - Tipografía de los números (familia, tamaño, color, peso)
  - Posición del número dentro de la celda (arriba-izq, centro, etc.)
- Celda de día acepta:
  - Imagen/foto
  - Sticker o emoji
  - Texto personalizado
  - Icono de festivo o evento
- Fin de semana con color diferenciado (configurable)

#### 5.3 Biblioteca de assets
- Subida de imágenes (JPG, PNG, WEBP, SVG, GIF)
- Subida de stickers personalizados (PNG con transparencia)
- Biblioteca persistente — se sube una vez, disponible siempre
- Organización por carpetas/álbumes
- Vista previa en miniatura
- Búsqueda y filtrado

#### 5.4 Sistema de festivos y eventos
- Festivos nacionales españoles cargados automáticamente por año
- Soporte para festivos de comunidades autónomas (seleccionable)
- Festivos marcados visualmente en el grid (color diferenciado, icono)
- Eventos personalizados recurrentes:
  - Cumpleaños
  - Aniversarios
  - Santos (calendario de santos integrado)
  - Eventos propios con nombre, color e icono personalizados
- Los eventos se muestran en la celda del día correspondiente

#### 5.5 Sistema de plantillas
- Plantilla base global del proyecto (tipografía, colores, disposición)
- Cada mes hereda la plantilla base
- Modificaciones por mes que sobreescriben la base (sin afectar al resto)
- Posibilidad de aplicar la plantilla de un mes concreto a todos los demás
- Guardar configuraciones como nueva plantilla reutilizable

#### 5.6 Exportación
- Exportar mes individual o proyecto completo
- Formatos: PDF (alta resolución, 300 DPI) y PNG por página
- PDF multipágina para impresión directa
- Marca de corte/guías de encuadernación opcionales
- Nombre de archivo configurable

#### 5.7 Autenticación y usuarios
- Sistema de login con usuario y contraseña
- Roles: Administrador y Usuario estándar
- Gestión de usuarios desde panel de admin
- Sesión persistente con opción de recordar

#### 5.8 Internacionalización (i18n)
- Sistema i18n integrado (i18next o equivalente)
- Idiomas iniciales: Español e Inglés
- Preparado para añadir idiomas adicionales
- Preferencia de idioma guardada por usuario

---

### 🟡 SHOULD (Alta prioridad, no MVP)

- **Portada y contraportada:** Páginas adicionales al principio y fin del calendario
- **Vista previa de impresión:** Simulación de cómo quedará el calendario físico
- **Deshacer/Rehacer (Ctrl+Z):** Historial de acciones en el editor
- **Zoom en el editor:** Para trabajar con precisión en zonas pequeñas
- **Guías de alineación:** Líneas de snap al mover elementos
- **Copiar/pegar elementos** entre meses
- **Festivos internacionales:** Otros países además de España

### 🟢 COULD (Versión futura)

- **Compartir calendario** como enlace de solo lectura
- **Modo oscuro** en la interfaz
- **App móvil** (PWA) para visualización
- **Calendario de varios idiomas** (nombres de mes/día en otro idioma)
- **Integración con Google Calendar** para importar eventos
- **Plantillas de la comunidad** (compartir diseños entre usuarios)
- **Texto curvo** en el área de imagen

### ⚫ WON'T (Fuera de alcance)

- Servicio de impresión integrado (se genera el archivo, la impresión es externa)
- App nativa de escritorio
- Venta o suscripción comercial (es uso privado/familiar)
- Edición colaborativa en tiempo real

---

## 6. Restricciones y requisitos no funcionales

| Requisito | Detalle |
|-----------|---------|
| Formato de salida | A4 vertical, 210×297mm, 300 DPI mínimo |
| Encuadernación | Gusano/espiral central — márgenes internos a tener en cuenta |
| Self-hosted | Docker Compose sobre Ubuntu Server |
| Servidor | Intel i7-7ª gen, 16GB RAM — app ligera, sin IA pesada |
| Navegadores objetivo | Chrome, Firefox, Edge (versiones modernas) |
| Sin dependencias de terceros de pago | Todo open source o self-hosteable |
| Privacidad | Los datos e imágenes no salen del servidor propio |

---

## 7. Criterios de éxito

- El usuario principal puede crear un calendario completo de 12 meses sin ayuda técnica
- El PDF exportado se puede imprimir directamente en A4 con calidad aceptable para enmarcado
- Los assets subidos persisten entre sesiones indefinidamente
- La carga de cualquier página del editor es inferior a 3 segundos en red local
- El administrador puede gestionar usuarios y hacer backups desde la interfaz

---

## 8. Glosario

| Término | Definición |
|---------|------------|
| Proyecto | Un calendario completo (normalmente un año) |
| Página/Mes | Una hoja del calendario correspondiente a un mes |
| Asset | Imagen, sticker, emoji o elemento visual subido por el usuario |
| Grid | La tabla de días del mes |
| Celda | Cada cuadro individual del grid que representa un día |
| Plantilla | Configuración visual base aplicable a uno o varios meses |
| Zona superior | La parte de la página dedicada a imagen/collage decorativo |
| Zona inferior | La parte de la página que contiene el grid del calendario |
