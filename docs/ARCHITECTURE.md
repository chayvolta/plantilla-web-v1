# Arquitectura V1

**Decisión:** Next.js App Router + React + TypeScript estricto + Tailwind CSS 4. Apuesta por páginas editoriales, rutas de contenido indexables y despliegue sencillo. No se afirma que la web inspiradora use esta arquitectura.

## Fronteras

- `src/app`: layout, rutas, metadatos, sitemap, robots, 404; sin contenido de negocio hardcodeado.
- `src/config/site.ts`: identidad, enlaces, navegación, descripción y flags de módulos.
- `src/content`: módulos de datos en TypeScript (contenido DEMO), tipos, funciones de búsqueda de slugs.
- `src/components/layout`: cabecera y pie; componentes de navegación.
- `src/components/ui`: tarjetas, SVG propios y asistente FAQ de demostración (único widget cliente adicional).
- `src/lib`: formateo y pequeñas funciones reutilizables.
- `src/app/globals.css`: tokens y utilidades mínimas para composición visual.

## Decisiones y límites

1. No se introduce CMS, base de datos ni backend en V1. La FAQ local no usa IA ni transmite información.
2. Todo el contenido textual e identidad debe poder sustituirse en configuración y módulos de datos; no hay imágenes de terceros.
3. Si luego se integran datos sensibles, autenticación, formularios o asistentes reales, diseñar seguridad, autorización, observabilidad y privacidad ANTES de habilitarlos.
4. Identidad visual original de demostración; no se extrae ni redistribuye código ajeno.
5. No hay un repositorio remoto creado por este paquete. Mantener el código local y preparar un futuro `git init`/repositorio plantilla privado o público solo tras autorización.

## Futuras extensiones (NO V1)
- CMS/MDX con un esquema que valide contenido.
- Temas configurables sin duplicar páginas.
- Módulo opcional de mapas (MapLibre) para proyectos de SIG.
- Formulario funcional con validación, antispam y tratamiento de datos.
- Asistente real con endpoint servidor y políticas de costos/seguridad.
