---
name: regression-loop
description: Aplica el ciclo de diagnóstico, corrección, pruebas y aprendizaje permanente ante fallas o solicitudes de refactor.
---
# Bucle de calidad
1. Reproducir y describir la falla con evidencia; no cambiar código sin hipótesis.
2. Delimitar la causa raíz y elegir el cambio con menor impacto.
3. Ejecutar lint, typecheck, test y build, además de comprobar la funcionalidad afectada en navegador.
4. Si algo falla, replanificar, corregir y repetir el ciclo; no declarar listo un build fallido.
5. Escribir en tasks/lessons.md una regla que impida reincidencia y en tasks/todo.md el resultado de verificación.
