# Sistema visual V1

**Concepto:** editorial contemporáneo, alto contraste, grandes titulares, retícula geométrica y espacio negativo. Inspiración general en portafolios modernos; la paleta y los SVG son originales del proyecto.

- Fondo `#f5f5f0`, tinta `#161821`, oscuro `#171923`, acento lima `#b6f264`, borde `#dcded8`.
- Visuales de tarjetas por categorías: violeta `#c8c5ff`, naranja `#f8b38b`, verde `#a8d9b0`.
- Tipografía: pila de sistema Arial/Helvetica, sin descargas externas; grandes titulares con tracking condensado.
- Componentes: `Header`, `Footer`, `ProjectCard`, `ArticleCard`, `DemoAssistant`.
- Responsive: grillas de una columna en móvil, dos columnas según espacio.
- Accesibilidad: jerarquía de títulos, enlaces descriptivos, controles etiquetados, skip link, foco visible y preferencia de reducción de movimiento.

## Personalización
1. Cambiar `src/config/site.ts` para identidad, navegación y contacto.
2. Reemplazar casos DEMO en `src/content/projects.ts` y notas en `src/content/articles.ts`.
3. Cambiar tokens en `src/app/globals.css` (incluidos los colores de botones y decoraciones).
4. Incorporar fotografía propia solo con permiso y texto alternativo pertinente.
