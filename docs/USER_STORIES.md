# USER_STORIES.md — Historias de usuario
## CalendApp

**Versión:** 1.0  
**Fecha:** Abril 2026

---

## Actores

- **U** — Usuario estándar (usuario principal, ej. la madre)
- **A** — Administrador (también puede hacer todo lo de U)
- **SIS** — Sistema (comportamiento automático)

---

## Épica 1 — Gestión de proyectos

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-01 | Como **U**, quiero crear un nuevo proyecto de calendario con nombre y año, para organizar mis calendarios por temporada | - Se puede nombrar el proyecto libremente; - Se genera automáticamente la estructura de 12 meses; - El proyecto aparece en la lista de proyectos |
| US-02 | Como **U**, quiero ver todos mis proyectos en una pantalla principal, para elegir en cuál trabajar | - Vista en tarjetas con miniatura, nombre, año y estado; - Filtros por estado (borrador/en progreso/finalizado) |
| US-03 | Como **U**, quiero duplicar un proyecto existente, para usarlo como base para el siguiente año sin empezar desde cero | - Se crea una copia exacta con nombre editable; - Las imágenes se referencian (no se duplican físicamente) |
| US-04 | Como **U**, quiero marcar un proyecto como finalizado o borrador, para saber cuál es mi estado actual de trabajo | - Estados: Borrador, En progreso, Finalizado; - El estado es visible en la lista |
| US-05 | Como **U**, quiero eliminar un proyecto, para mantener ordenada mi lista | - Confirmación antes de borrar; - Se eliminan los datos del proyecto pero los assets de biblioteca se conservan |

---

## Épica 2 — Editor de zona superior (imagen/collage)

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-10 | Como **U**, quiero establecer un fondo para la zona superior (color, degradado o imagen), para personalizar el estilo de cada mes | - Selector de color con opacidad; - Selector de degradado (dirección + colores); - Subir o elegir imagen de biblioteca como fondo |
| US-11 | Como **U**, quiero añadir una o más imágenes a la zona superior y moverlas libremente, para crear collages personalizados | - Arrastrar y soltar desde biblioteca; - Control de posición X/Y con ratón y con valores numéricos; - Redimensionar manteniendo proporciones |
| US-12 | Como **U**, quiero controlar la capa (orden Z) de cada elemento, para decidir qué queda encima y qué debajo | - Botones "traer al frente", "enviar al fondo", "subir capa", "bajar capa" |
| US-13 | Como **U**, quiero aplicar efectos a las imágenes (opacidad, brillo, escala de grises, sepia...), para conseguir el estilo visual que quiero | - Panel de efectos accesible al seleccionar imagen; - Vista previa en tiempo real |
| US-14 | Como **U**, quiero añadir texto decorativo libre en la zona superior, para poner títulos, frases o el nombre del mes | - Selección de fuente (de lista de fuentes disponibles); - Control de tamaño, color, peso, alineación; - Posicionable como cualquier otro elemento |
| US-15 | Como **U**, quiero añadir stickers y emojis a la zona superior, para decorarla | - Panel de stickers con búsqueda; - Emojis del sistema + stickers de biblioteca propia; - Posicionables y redimensionables |

---

## Épica 3 — Editor del grid del calendario

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-20 | Como **U**, quiero personalizar el color de fondo y la opacidad de la tabla del calendario, para que armonice con la zona superior | - Selector de color + slider de opacidad; - Vista previa inmediata |
| US-21 | Como **U**, quiero personalizar los bordes de la tabla (color, grosor, estilo), para lograr el look que quiero | - Estilos: sólido, discontinuo, punteado, ninguno; - Control por grosor en px; - Selector de color |
| US-22 | Como **U**, quiero personalizar la tipografía de los números de los días (familia, tamaño, color, peso), para que sean legibles y bonitos | - Lista de fuentes disponibles; - Control de tamaño, color y peso; - Vista previa en tiempo real |
| US-23 | Como **U**, quiero controlar la posición del número dentro de cada celda (arriba-izq, centro, etc.), para ajustar el espacio para stickers | - 9 posiciones predefinidas (grid 3x3); - La posición se aplica a todos los días del mes |
| US-24 | Como **U**, quiero añadir una imagen o foto a la celda de un día concreto, para marcar ese día con un recuerdo o evento | - Clic en celda → selector de imagen de biblioteca; - La imagen se ajusta a la celda o se puede recortar |
| US-25 | Como **U**, quiero añadir un sticker o emoji a la celda de un día concreto, para marcar días especiales | - Clic en celda → panel de stickers/emojis; - Puede coexistir con texto y número |
| US-26 | Como **U**, quiero añadir texto personalizado a la celda de un día, para escribir el nombre del evento o festivo | - Texto corto, tipografía configurable; - No reemplaza el número del día |
| US-27 | Como **U**, quiero que los fines de semana tengan un color diferenciado automáticamente, para identificarlos rápidamente | - Color de fin de semana configurable; - Opción de desactivar diferenciación |
| US-28 | Como **U**, quiero elegir si la semana empieza en lunes o domingo, para adaptarlo a mis preferencias | - Selector en configuración del proyecto o por mes |

---

## Épica 4 — Biblioteca de assets

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-30 | Como **U**, quiero subir imágenes a la biblioteca, para usarlas en mis calendarios | - Formatos: JPG, PNG, WEBP, SVG, GIF; - Subida múltiple; - Barra de progreso |
| US-31 | Como **U**, quiero que las imágenes subidas persistan indefinidamente, para no tener que subirlas cada vez | - Los archivos se guardan en el servidor; - No se eliminan al cerrar sesión |
| US-32 | Como **U**, quiero organizar mis imágenes en carpetas o álbumes, para encontrarlas fácilmente | - Crear, renombrar y eliminar carpetas; - Mover imágenes entre carpetas |
| US-33 | Como **U**, quiero buscar assets en mi biblioteca por nombre, para encontrar rápidamente lo que necesito | - Búsqueda en tiempo real por nombre de archivo o etiqueta |
| US-34 | Como **U**, quiero subir stickers personalizados (PNG transparente), para usarlos en mis diseños | - Se diferencian de las fotos en la biblioteca; - Sección propia de stickers |
| US-35 | Como **U**, quiero ver una vista previa de la imagen antes de usarla, para asegurarme de que es la correcta | - Hover o clic → miniatura ampliada con nombre y dimensiones |

---

## Épica 5 — Festivos y eventos

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-40 | Como **U**, quiero que los festivos nacionales españoles se marquen automáticamente en el grid, para no tener que hacerlo manualmente | - API o base de datos de festivos por año; - Color diferenciado en celda de festivo; - Texto con nombre del festivo |
| US-41 | Como **U**, quiero seleccionar mi comunidad autónoma para incluir también los festivos autonómicos, para un calendario más completo | - Selector de comunidad autónoma en configuración del proyecto |
| US-42 | Como **U**, quiero añadir eventos recurrentes (cumpleaños, aniversarios) que aparezcan automáticamente cada año, para no olvidarlos | - Nombre, fecha (día/mes sin año), color e icono personalizable; - Se repiten cada año automáticamente |
| US-43 | Como **U**, quiero añadir los santos del día a las celdas, para ver de quién es el santo cada día | - Calendario de santos integrado (España); - Mostrar/ocultar configurable por proyecto |
| US-44 | Como **U**, quiero añadir un evento puntual (no recurrente) a una fecha concreta, para marcarlo en el calendario | - Nombre, color, icono; - Solo aparece en el año/fecha especificada |
| US-45 | Como **U**, quiero elegir cómo se visualizan los festivos/eventos (color de celda, icono, texto), para que encajen con mi diseño | - Opciones: fondo de celda con color, punto de color, icono, texto o combinación |

---

## Épica 6 — Plantillas

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-50 | Como **U**, quiero definir una plantilla base para el proyecto (colores, fuentes, disposición), para mantener coherencia visual | - Panel de plantilla base en la configuración del proyecto; - Todos los meses heredan esta plantilla |
| US-51 | Como **U**, quiero modificar la configuración de un mes concreto sin afectar al resto, para dar personalidad propia a cada mes | - Los cambios en un mes se guardan como "sobreescritura local"; - Indicador visual de que ese mes tiene personalización propia |
| US-52 | Como **U**, quiero aplicar la configuración de un mes a todos los demás, para propagar un diseño que me ha gustado | - Botón "aplicar a todos los meses" con confirmación |
| US-53 | Como **U**, quiero guardar la configuración actual como plantilla reutilizable con nombre, para usarla en futuros proyectos | - Las plantillas guardadas aparecen en la lista de plantillas del proyecto |

---

## Épica 7 — Exportación e impresión

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-60 | Como **U**, quiero exportar un mes concreto como PNG de alta resolución, para revisarlo o imprimirlo individualmente | - 300 DPI mínimo; - Nombre de archivo configurable |
| US-61 | Como **U**, quiero exportar el calendario completo como PDF multipágina, para enviarlo a imprenta o imprimirlo en casa | - Un mes por página; - Orden correcto (portada si existe, luego meses) |
| US-62 | Como **U**, quiero que el PDF incluya marcas de guía de encuadernación (posición del gusano), para ayudar al montaje final | - Opción activable/desactivable; - Línea de referencia central horizontal |
| US-63 | Como **SIS**, el sistema debe generar el PDF con exactamente las dimensiones A4 (210×297mm) a 300 DPI, para garantizar calidad de impresión | - Comprobación automatizada de dimensiones en la generación |

---

## Épica 8 — Usuarios y administración

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-70 | Como **U**, quiero iniciar sesión con usuario y contraseña, para acceder a mis proyectos de forma segura | - Formulario de login; - Sesión persistente con opción "recordarme" |
| US-71 | Como **A**, quiero crear nuevos usuarios con nombre, email y contraseña, para dar acceso a otras personas | - Panel de admin; - Roles: admin / usuario estándar |
| US-72 | Como **A**, quiero desactivar o eliminar usuarios, para gestionar el acceso | - Usuario desactivado no puede iniciar sesión; - Sus proyectos se conservan |
| US-73 | Como **U**, quiero cambiar mi contraseña desde mi perfil, para mantener la seguridad | - Confirmación de contraseña actual requerida |
| US-74 | Como **U**, quiero seleccionar mi idioma preferido, para usar la app en el idioma que me resulte más cómodo | - Selector de idioma en perfil; - Cambio inmediato sin recargar página |

---

## Épica 9 — i18n / Internacionalización

| ID | Historia | Criterios de aceptación |
|----|----------|------------------------|
| US-80 | Como **U**, quiero que todos los textos de la interfaz estén en mi idioma seleccionado, para entender la aplicación sin esfuerzo | - Español e Inglés en MVP; - Estructura preparada para añadir más idiomas |
| US-81 | Como **SIS**, el sistema debe mostrar los nombres de meses y días de la semana en el idioma del usuario, para que el calendario tenga sentido local | - Locale del calendario configurable independientemente del idioma de la UI |
| US-82 | Como **A**, quiero poder añadir nuevos archivos de traducción, para extender el soporte de idiomas sin tocar código | - Ficheros JSON de traducción en directorio accesible |
