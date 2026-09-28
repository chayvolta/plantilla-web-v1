---
trigger: glob
globs: "**/*.ts, **/*.tsx"
description: "Convenciones TypeScript, React y Next.js App Router para cambios de código."
---
# Restricciones de implementación
- Tipado estricto y componentes pequeños, responsabilidad única; evitar `any` y estados redundantes.
- Usar Server Components por defecto; `use client` solo con necesidad demostrable.
- Para rutas dinámicas de Next.js 16, tratar `params` como Promise y resolverlo con await.
- No permitir imports circulares, fetch a rutas internas durante render de servidor, ni secretos en cliente.
- Conservar URLs y slugs estables; generar metadatos por página y páginas 404 verificables.
- Los datos de demostración deben identificarse como ficticios.
