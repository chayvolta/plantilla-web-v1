# Plantilla Web V1 — Estudio Atlas (identidad ficticia)

Starter original multipropósito de portafolio editorial para proyectos profesionales. Inspiración conceptual en la navegación y los tipos de contenido de un portafolio público, **sin copiar su código, branding, fotografías ni textos**. No se depende de un repositorio externo no identificado.

## Stack
Next.js App Router (16), React 19, TypeScript estricto, Tailwind CSS 4. Diseño sin fonts, iconos ni imágenes descargadas de terceros.

## Requisitos
Node.js >=20.9, npm e internet para instalar dependencias. La versión de las dependencias se resuelve al ejecutar `npm install` y se fija en `package-lock.json`; conserva ese archivo dentro del repositorio una vez generado.

## Desarrollo local (Windows PowerShell)

```powershell
cd D:\desarrollo\plantilla-web-v1
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`. En otros sistemas usa `cp .env.example .env.local`. Si el nombre de carpeta difiere, adapta la ruta.

## Calidad
```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

**Nota de entrega:** el entorno que generó el ZIP no pudo acceder a registry.npmjs.org. Por eso el proyecto se proporciona como código fuente verificable estructuralmente, pero sin node_modules ni package-lock.json: las pruebas de build, lint y UI deben completarse en un equipo con npm e internet. No interpretar los checks estáticos como una certificación de compilación.

## Qué funciona en V1
- Home editorial con hero, proyectos destacados, presentación y artículos.
- Rutas de portafolio y blog (listados y detalles), Acerca de, Contacto y 404.
- Navegación móvil, acciones y FAQ local rotulada como DEMO (no IA real).
- Identidad centralizada, contenido tipado, SEO básico, sitemap y robots.
- Sin base de datos, autenticación, analítica, envíos ni servicios de pago.

## Cómo crear otro sitio
1. Duplica esta carpeta o conviértela en un GitHub Template cuando lo autorices.
2. Edita `src/config/site.ts`; sustituye `hola@ejemplo.com` antes de publicar.
3. Actualiza `src/content/projects.ts` y `src/content/articles.ts` con material propio.
4. Ajusta tokens de `src/app/globals.css` y los colores gráficos de las tarjetas.
5. Verifica metadata, enlaces y pruebas. Opcional: desactiva `siteConfig.features.demoAssistant`.
6. Configura `NEXT_PUBLIC_SITE_URL` con el dominio final antes de desplegar.

## Antigravity
- Pega el contenido de `prompts/ANTIGRAVITY_MASTER_PROMPT.md` en el agente.
- `AGENTS.md`: reglas automáticas permanentes.
- `.agents/rules/`: reglas tipadas y UI.
- `.agents/skills/`: arquitectura, inspección visual y ciclo de regresión. Se usa el formato Skills vigente en Antigravity; los Workflows tradicionales tienen fecha anunciada de retiro.
- Conserva los archivos `tasks/` y actualízalos conforme avance el proyecto.

## Alcance y derechos
Todo el contenido de ejemplo es ficticio; no afirmar que representa trabajos reales. Sustituye textos, correo, imágenes y enlaces antes de publicar. Elegir licencia del proyecto después de determinar propiedad y estrategia de distribución.
