# Reglas permanentes del proyecto — Plantilla Web V1

1. Antes de modificar código, leer README.md, docs/ARCHITECTURE.md, docs/DESIGN_SYSTEM.md y tasks/todo.md. Para cambios no triviales, crear plan verificable y registrar avances.
2. Mantener Next.js App Router + React + TypeScript estricto + Tailwind v4. No migrar a Vite ni añadir backend, CMS, servicios externos o dependencias sin justificar y documentar la decisión.
3. La identidad y navegación pertenecen a `src/config/site.ts`; proyectos y artículos a `src/content/`; tokens visuales a `src/app/globals.css`. Los componentes nunca deben incluir información personal real hardcodeada.
4. No copiar código, imágenes, textos, fotografías, nombre o branding del portafolio de César Loli. Es referencia estructural, no un repositorio de origen. No afirmar que conocemos su código ni el framework que emplea.
5. Arquitectura simple: Server Components por defecto; Client Components solo si requieren estado/eventos. UI accesible (WCAG 2.2 AA como objetivo), semántica HTML, teclado, estados de foco, preferencias de reducción de movimiento.
6. No usar any, secretos en el frontend, URLS javascript:, endpoints simulados que parezcan reales ni formularios que aparenten enviar datos. El asistente de V1 es una FAQ local etiquetada como DEMO, nunca IA real.
7. Cerrar cada cambio con `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`; verificar responsive y navegación móvil. Si no pueden ejecutarse, indicar causa exacta y no afirmar éxito.
8. Ante fallos: reproducir, buscar causa raíz, corregir con el menor cambio y añadir prueba o verificación de regresión. Registrar lecciones en tasks/lessons.md.
9. No efectuar push, crear repositorio remoto, desplegar ni borrar archivos del usuario sin su autorización. Preservar funcionamiento local y cambios existentes.
10. Entregar cada fase con archivos modificados, decisiones justificadas, comandos/pruebas ejecutadas, resultados reales y pendientes.
