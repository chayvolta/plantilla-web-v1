---
name: architecture-review
description: Revisa la arquitectura, los límites de módulos y la estrategia de personalización antes de ampliar esta plantilla Next.js.
---
# Arquitectura: revisión por fase
1. Leer docs/ARCHITECTURE.md, AGENTS.md y el diff de los archivos relevantes.
2. Definir qué datos son contenido, configuración, presentación e interacción; comprobar separación de responsabilidades.
3. Proponer el menor cambio viable, riesgos, rutas afectadas y pruebas asociadas.
4. Evitar dependencias o abstracciones prematuras; preservar compatibilidad local y URLs existentes.
5. Registrar las decisiones importantes en docs/ARCHITECTURE.md y tasks/todo.md.
