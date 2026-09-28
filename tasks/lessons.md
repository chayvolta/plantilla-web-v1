# Registro de aprendizaje

## Entrega inicial
- Evitar atribuir repositorios públicos al despliegue de referencia sin prueba explícita.
- Diferenciar siempre las funciones demostrativas de integraciones reales (FAQ sin IA; contacto vía mailto, sin formulario).
- En entornos sin acceso al registro npm, la revisión estática NO sustituye un build y pruebas de navegador.

## Sesión 28/09/2026 — Validación V1 y Calidad
- **Configuraciones limpias sin warnings:** En Next.js 16 + ESLint 9, las exportaciones directas anónimas de arrays u objetos en archivos de configuración (`eslint.config.mjs`, `postcss.config.mjs`) disparan advertencias `import/no-anonymous-default-export`. Siempre asignar a una constante identificada antes de `export default`.
- **Navegación accesible (WCAG 2.2 AA):** Menús móviles y widgets de asistencia flotantes deben escuchar el evento `keydown` para cerrar con la tecla `Escape`, y contar con `aria-label` dinámico según estado abierto/cerrado.
- **Rutas activas consistentes:** El indicador de navegación activa debe evaluar si la subruta pertenece a la sección padre (`pathname.startsWith(item.href)`) para mantener contexto visual en páginas de detalle (`/proyectos/[slug]`, `/blog/[slug]`).
- **Verificación en entorno con restricciones de red:** Si herramientas automáticas de navegador (como Playwright) fallan por indisponibilidad de binarios en CDNs remotas, verificar exhaustivamente el árbol de rutas con peticiones HTTP locales (`Invoke-WebRequest`), comprobando códigos de estado (200/404), tamaño de payload, sitemap y robots.
- **Microinteracciones y reducción de movimiento en React 19:** Evitar sincronizaciones síncronas de `setState` dentro de `useEffect` para media queries de navegador. Evaluar `window.matchMedia('(prefers-reduced-motion: reduce)')` directamente dentro del controlador del evento de puntero (`onMouseMove`) para garantizar cero renders en cascada y rendimiento nativo.
