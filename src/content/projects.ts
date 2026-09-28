import type { Project } from './types';

/** Casos ficticios: reemplaza con proyectos reales y derechos de imagen verificados. */
export const projects: Project[] = [
  {
    slug: 'atlas-territorial', title: 'Atlas territorial', category: 'Datos + visualización', year: '2026',
    summary: 'Un mapa que convierte información compleja en decisiones claras.',
    description: ['Proyecto conceptual para visualizar datos territoriales y explorar relaciones espaciales.', 'La arquitectura propuesta separa datos geográficos, visualización y contenido editorial para evolucionar sin rehacer la interfaz.'],
    services: ['Estrategia digital', 'Visualización de datos', 'Experiencia de usuario'], accent: 'violet', featured: true
  },
  {
    slug: 'horizonte-urbano', title: 'Horizonte urbano', category: 'Arquitectura + contenido', year: '2026',
    summary: 'Narrativas visuales para comunicar una nueva manera de imaginar la ciudad.',
    description: ['Caso ilustrativo que integra investigación urbana, storytelling y un sistema de componentes reutilizables.', 'Demuestra cómo presentar proyectos complejos sin sacrificar una experiencia de navegación sencilla.'],
    services: ['Diseño editorial', 'Arquitectura de información', 'Storytelling'], accent: 'orange', featured: true
  },
  {
    slug: 'pulso-digital', title: 'Pulso digital', category: 'Producto + interfaz', year: '2026',
    summary: 'Un sistema visual flexible, construido para crecer con cada nueva idea.',
    description: ['Ejemplo de producto digital que utiliza tokens de diseño y módulos desacoplados.', 'El objetivo es cambiar textos, estilos y contenidos sin modificar la estructura principal del proyecto.'],
    services: ['Design system', 'Desarrollo web', 'Accesibilidad'], accent: 'green', featured: true
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
