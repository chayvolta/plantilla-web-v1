---
name: launch-web-v1
description: Orquesta la revisión, finalización local y verificación de la plantilla multipropósito de Next.js V1 antes de cualquier despliegue.
---
# Finalizar V1 sin perder el trabajo local

1. Leer `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `README.md` y `tasks/todo.md`.
2. Inspeccionar archivos y `git status`; hacer inventario de lo existente y no reemplazar trabajo sin necesidad.
3. Crear un plan de validación priorizado que distinga bloqueadores de mejoras opcionales.
4. Revisar dependencias y APIs contra documentación oficial actual; instalar si el usuario autorizó y el entorno tiene acceso.
5. Ejecutar los cuatro comandos de calidad, registrar resultados y reparar fallos con cambios mínimos.
6. Usar las skills `visual-qa` y `regression-loop` si resultan necesarias.
7. Entregar informe en `docs/RELEASE_CHECK.md`; mantener publicación externa como paso manual pendiente.
