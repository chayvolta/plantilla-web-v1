/** Único lugar para personalizar la identidad y los enlaces principales del sitio. */
export const siteConfig = {
  name: 'Estudio Atlas',
  shortName: 'ATLAS',
  description: 'Plantilla editorial para portafolios, estudios y proyectos digitales.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  language: 'es-MX',
  email: 'hola@ejemplo.com', // Sustituir antes de publicar
  location: 'Ciudad de México · Proyectos sin fronteras',
  availability: 'Disponible para nuevos proyectos',
  social: {
    github: '',   // Enlaces vacíos no aparecen en la interfaz
    linkedin: '',
    instagram: ''
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Acerca de', href: '/sobre-mi' },
    { label: 'Bitácora', href: '/blog' },
    { label: 'Contacto', href: '/contacto' }
  ],
  hero: {
    eyebrow: 'Diseño · Tecnología · Ideas',
    headline: ['Experiencias', 'digitales con', 'otra perspectiva.'],
    description: 'Un espacio para presentar ideas, documentar procesos y conectar con las personas correctas. Adapta esta plantilla a cualquier proyecto.'
  },
  about: {
    title: 'Cada proyecto comienza con una buena pregunta.',
    description: 'Somos un estudio de demostración. Aquí puedes contar quién eres, cómo trabajas y por qué tu propuesta importa. Todo este contenido está separado de la interfaz para que puedas reemplazarlo fácilmente.',
    principles: [
      { number: '01', title: 'Claridad', body: 'Ideas comprensibles desde el primer contacto.' },
      { number: '02', title: 'Sistema', body: 'Componentes que crecen sin perder coherencia.' },
      { number: '03', title: 'Impacto', body: 'Experiencias pensadas para personas reales.' }
    ]
  },
  copy: {
    homeWorkEyebrow: '01 / El trabajo',
    homeWorkTitle: ['Una selección', 'de ideas.'],
    homeAboutEyebrow: '02 / Sobre nosotros',
    homeJournalEyebrow: '03 / La bitácora',
    homeJournalTitle: ['Ideas en', 'movimiento.'],
    projectsIntro: 'Estos son ejemplos ficticios: sustituye los datos e imágenes por tus proyectos antes de publicar.',
    projectsTitle: 'Ideas que toman forma.',
    journalIntro: 'Un espacio editorial con publicaciones de muestra. Los textos se actualizan desde el directorio de contenido.',
    journalTitle: 'Ideas en movimiento.',
    contactTitle: 'Toda buena idea comienza hablando.',
    footerTitle: ['¿Construimos', 'algo juntos?']
  },
  features: {
    demoAssistant: true // Asistente FAQ local: no se conecta a ningún servicio de IA
  }
} as const;
