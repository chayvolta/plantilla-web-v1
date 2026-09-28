import type { Article } from './types';

/** Textos de muestra, no citas de la web de referencia. */
export const articles: Article[] = [
  {
    slug: 'una-web-que-pueda-cambiar', title: 'Una web que pueda cambiar contigo', category: 'Diseño de producto', date: '2026-09-12', readMinutes: 4,
    excerpt: 'Por qué conviene pensar el sitio como un sistema y no como una colección de páginas aisladas.',
    paragraphs: ['Un sitio bien estructurado no solo necesita verse bien cuando se publica. Debe ser sencillo de actualizar y de ampliar.', 'Separar contenidos, diseño y lógica permite reutilizar módulos y reduce el costo de mantener nuevas versiones.', 'Esta plantilla usa una identidad de demostración que puede sustituirse desde archivos de configuración y contenido.']
  },
  {
    slug: 'contenido-antes-que-efectos', title: 'El contenido primero; los efectos después', category: 'Experiencia de usuario', date: '2026-08-24', readMinutes: 3,
    excerpt: 'La jerarquía visual, el lenguaje claro y las interacciones discretas hacen una diferencia real.',
    paragraphs: ['Las animaciones deben ayudar a entender una interfaz, no ocultar su propósito.', 'Una navegación accesible y una estructura semántica consistente permiten que más personas encuentren lo que necesitan.', 'La base de esta demostración funciona sin animaciones complejas ni servicios externos.']
  },
  {
    slug: 'pensar-en-componentes', title: 'Diseñar un lenguaje de componentes', category: 'Desarrollo web', date: '2026-07-09', readMinutes: 5,
    excerpt: 'Una pequeña biblioteca de piezas sólidas ofrece más valor que decenas de componentes inconsistentes.',
    paragraphs: ['Los componentes deben responder a responsabilidades claras: navegación, presentación, tarjetas y contenido.', 'Los tokens de diseño ayudan a cambiar la identidad visual sin duplicar estilos en todas las páginas.', 'Cuando el proyecto crezca, estos elementos serán la base del sistema de diseño de las próximas versiones.']
  }
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
