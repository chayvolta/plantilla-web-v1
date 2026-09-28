# Verificación de Lanzamiento Local — Plantilla Web V1 (Estudio Atlas)

**Fecha:** 28 de septiembre de 2026  
**Responsable:** A5 · QA / Seguridad / DevOps Local  
**Entorno de ejecución:** Windows (PowerShell) · Node.js `v24.20.0` · npm `11.19.0`  
**Framework:** Next.js `16.3.6` (Turbopack) · React `19.2.0` · TypeScript `5.9.3` · Tailwind CSS `4.1.18`

---

## 1. Resultados de la Suite de Comandos de Calidad

| Comando | Estado | Resultado Real Obtenido |
| :--- | :--- | :--- |
| `npm run lint` | **PASÓ** | 0 errores, 0 advertencias (configuraciones ESLint y PostCSS limpias) |
| `npm run typecheck` | **PASÓ** | 0 errores de tipos en TypeScript estricto (`tsc --noEmit`) |
| `npm run test` | **PASÓ** | 6 pruebas unitarias exitosas en Vitest (`tests/content.test.ts`) en 147 ms |
| `npm run build` | **PASÓ** | Compilación exitosa en 451 ms con Turbopack; 15 páginas estáticas prerenderizadas (SSG) |

---

## 2. Matriz de Rutas y Verificación HTTP Local (`http://localhost:3000`)

| Ruta | Tipo | Código HTTP | Longitud Respuesta | Estado |
| :--- | :--- | :---: | :---: | :--- |
| `/` | Estática (Home) | **200 OK** | 41,673 bytes | Hero, proyectos destacados, sobre mí, bitácora, footer y widget DEMO |
| `/proyectos` | Estática (Listado) | **200 OK** | 23,659 bytes | Listado de proyectos con categorías, títulos y enlaces |
| `/proyectos/atlas-territorial` | SSG (Detalle) | **200 OK** | 17,812 bytes | Servicios, ilustración vectorial SVG, contexto y botón volver |
| `/proyectos/horizonte-urbano` | SSG (Detalle) | **200 OK** | 17,792 bytes | Servicios, ilustración SVG naranja, descripción |
| `/proyectos/pulso-digital` | SSG (Detalle) | **200 OK** | 17,639 bytes | Servicios, ilustración SVG verde, descripción |
| `/sobre-mi` | Estática | **200 OK** | 19,476 bytes | Enfoque, 3 principios de trabajo y CTA a contacto |
| `/blog` | Estática (Listado) | **200 OK** | 21,330 bytes | Artículos editoriales con fecha y tiempo de lectura |
| `/blog/una-web-que-pueda-cambiar` | SSG (Detalle) | **200 OK** | 16,481 bytes | Artículo completo, excerpt destacado y navegación de regreso |
| `/contacto` | Estática | **200 OK** | 15,776 bytes | Enlace `mailto:`, disponibilidad y redes sociales seguras |
| `/sitemap.xml` | Dinámica (SEO) | **200 OK** | 1,455 bytes | Mapa XML con todas las URLs canónicas y prioridades |
| `/robots.txt` | Dinámica (SEO) | **200 OK** | 67 bytes | Reglas para rastreadores y enlace al sitemap |
| `/ruta-inexistente` | 404 Not Found | **404 OK** | Página de error | UI amigable con aviso "Error 404" y botón de retorno al inicio |

---

## 3. Accesibilidad y Ergonomía (WCAG 2.2 AA)

- **Skip Link:** Enlace oculto "Saltar al contenido" que se hace visible al primer tabulador de teclado enfocando `#contenido`.
- **Navegación por teclado y tecla Escape:**
  - El menú móvil en el `Header` se cierra automáticamente al presionar la tecla `Escape`.
  - El panel del asistente `DemoAssistant` se cierra al presionar la tecla `Escape`.
- **Estados semánticos:**
  - `aria-expanded` en botones toggle de menú y preguntas de FAQ.
  - `aria-label` descriptivo en botones sin texto directo o con estado alternable.
  - `aria-current="page"` tanto en desktop como en móvil para el enlace de la ruta activa.
  - Subrutas (p. ej. `/proyectos/atlas-territorial`) mantienen activa la sección padre en el menú.
- **Reducción de movimiento (`prefers-reduced-motion`):** Estilos dedicados en `globals.css` que suprimen animaciones y transiciones cuando el usuario tiene configurada la preferencia del sistema.
- **Seguridad en enlaces externos:** Función `isSafePublicUrl` filtra protocolos peligrosos (`javascript:`, `data:`).

---

## 4. Estado de Herramientas de Navegador Automáticas

- La subherramienta de Playwright automatizada reportó imposibilidad de descargar los binarios del navegador desde los CDNs de Azure/Akamai (HTTP 404 para la versión 1.57.0 en Windows x64).
- La verificación se efectuó directamente sobre el servidor Next.js activo mediante análisis de respuesta HTTP completa, inspección DOM, comprobación de linter/types y pruebas unitarias.
