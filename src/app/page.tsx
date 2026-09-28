'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { projects } from '@/content/projects';
import { articles } from '@/content/articles';
import { 
  ArrowUpRight, 
  ArrowRight,
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles,
  GraduationCap
} from '@/components/ui/icons';
import { isSafePublicUrl } from '@/lib/format';

type SectionId = 'sobre-mi' | 'proyectos' | 'blog' | 'contacto';

interface NavItem {
  id: SectionId;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'blog', label: 'Bitácora' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('sobre-mi');
  const [navPillStyle, setNavPillStyle] = useState({ left: 6, width: 90 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<Map<SectionId, HTMLButtonElement>>(new Map());

  // Estado para la carga y filtrado interactivo de proyectos
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [loadingArticles, setLoadingArticles] = useState(true);

  // 1. EFECTO JS: ScrollSpy con IntersectionObserver
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as SectionId;
          if (id && NAV_ITEMS.some((item) => item.id === id)) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 1.1 Sincronización reactiva del deslizador de la píldora flotante
  useEffect(() => {
    const activeButton = navButtonsRef.current.get(activeSection);
    const container = navContainerRef.current;
    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeButton.getBoundingClientRect();
      setNavPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [activeSection]);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 2. EFECTO JS: 3D Tilt Card con detector de mouse y reducción de movimiento
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeaveTilt = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // 3. EFECTO JS: Spotlight / Glow dinámico que sigue al cursor
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const handleSpotlightMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 4. EFECTO JS: Simulación de carga diferida de datos
  useEffect(() => {
    const timerP = setTimeout(() => setLoadingProjects(false), 550);
    const timerA = setTimeout(() => setLoadingArticles(false), 750);
    return () => {
      clearTimeout(timerP);
      clearTimeout(timerA);
    };
  }, []);

  // 5. Descarga de CV simulada accesible
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = `mailto:${siteConfig.email}?subject=Solicitud%20de%20CV%20-%20${encodeURIComponent(siteConfig.name)}`;
    link.click();
  };

  // Categorías dinámicas de proyectos
  const categories = ['todos', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = selectedCategory === 'todos' 
    ? projects 
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-slate-100/40 text-[#19323b] selection:bg-[#2a4953]/20">
      
      {/* 1. BARRA DE NAVEGACIÓN FLOTANTE (Pill flotante con ScrollSpy) */}
      <nav 
        aria-label="Navegación principal de sección"
        className="fixed left-1/2 -translate-x-1/2 top-5 z-50 w-[94vw] sm:w-[460px]"
      >
        <div 
          ref={navContainerRef}
          className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_10px_32px_rgba(25,50,59,0.1)] rounded-full p-1.5 flex relative"
        >
          {/* Píldora indicadora deslizante */}
          <div 
            className="absolute top-1.5 bottom-1.5 bg-[#171923] rounded-full transition-all duration-300 ease-out shadow-[0_4px_14px_rgba(23,25,35,0.2)] pointer-events-none"
            style={{ 
              width: `${navPillStyle.width}px`, 
              transform: `translateX(${navPillStyle.left}px)` 
            }}
          />

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              ref={(el) => {
                if (el) navButtonsRef.current.set(item.id, el);
                else navButtonsRef.current.delete(item.id);
              }}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? 'true' : undefined}
              className={`flex-1 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] z-10 transition-colors duration-200 cursor-pointer ${
                activeSection === item.id ? 'text-[#fffaf3]' : 'text-[#48514e] hover:text-[#19323b]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 min-h-[85vh]">
        
        {/* 2. TARJETA DE PERFIL INTERACTIVA CON 3D TILT */}
        <div 
          onMouseMove={handleMouseMoveTilt}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeaveTilt}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          }}
          className="relative w-[280px] h-[360px] md:w-[320px] md:h-[400px] flex-shrink-0 cursor-pointer select-none group"
        >
          {/* Capa de cristal exterior */}
          <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/60 via-white/30 to-white/10 backdrop-blur-md border border-white/60 shadow-[0_16px_36px_rgba(25,50,59,0.12)] transition-shadow duration-300 group-hover:shadow-[0_24px_48px_rgba(25,50,59,0.18)]"></div>
          
          {/* Interior editorial */}
          <div className="absolute inset-[10px] rounded-[18px] overflow-hidden bg-[#e9ece6] flex flex-col items-center justify-center border border-[#19323b]/10 shadow-inner p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#171923] text-[#b6f264] text-2xl font-black shadow-lg mb-4">
              ✳
            </div>
            <span className="font-serif text-xl font-bold text-[#160E09]">{siteConfig.name}</span>
            <span className="text-xs text-[#2a4953]/70 font-semibold mt-1 uppercase tracking-wider">
              {siteConfig.shortName}®
            </span>
            <div className="mt-4 px-3 py-1 rounded-full bg-white/70 border border-[#2a4953]/10 text-[11px] font-medium text-[#2a4953]">
              {siteConfig.availability}
            </div>
          </div>
          
          {/* Reflejo de cristal superior */}
          <div className="absolute top-[10px] left-[10px] right-[10px] h-[35%] bg-gradient-to-b from-white/40 to-transparent rounded-t-[18px] pointer-events-none"></div>
        </div>

        {/* HERO CONTENIDO */}
        <div className="flex flex-col max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#19323b]/10 w-max mx-auto md:mx-0 mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2a4953]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2a4953]">
              {siteConfig.hero.eyebrow}
            </span>
          </div>

          <h1 className="font-serif text-[40px] sm:text-[50px] md:text-[58px] font-bold leading-[1.08] tracking-tight text-[#160E09] mb-5">
            {siteConfig.hero.headline[0]}<br />
            {siteConfig.hero.headline[1]}<br />
            <span className="text-[#2a4953]">{siteConfig.hero.headline[2]}</span>
          </h1>
          
          <p className="text-[15px] sm:text-[17px] text-[#39403d] font-medium leading-relaxed opacity-90 mb-8 max-w-md mx-auto md:mx-0">
            {siteConfig.hero.description}
          </p>

          {/* BOTONES DE ACCIÓN DIRECTA */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start w-full">
            <button 
              onClick={() => scrollToSection('proyectos')}
              className="bg-[#171923] text-[#fffaf3] border border-[#171923] hover:bg-[#2a4953] px-8 py-3.5 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] shadow-[0_10px_20px_rgba(25,50,59,0.15)] transition-all active:scale-95 cursor-pointer"
            >
              Explorar proyectos
            </button>
            <button 
              onClick={() => scrollToSection('sobre-mi')}
              className="bg-white/80 text-[#19323b] border border-[#19323b]/15 hover:bg-white px-8 py-3.5 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] transition-all active:scale-95 cursor-pointer"
            >
              Conocer el enfoque
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 1: SOBRE MÍ (Trayectoria, Educación, Principios y Stack) */}
      <section id="sobre-mi" className="px-4 sm:px-6 md:px-10 py-20 relative z-10 w-full scroll-mt-24">
        <div 
          className="max-w-6xl mx-auto rounded-[32px] overflow-hidden" 
          style={{ 
            background: 'linear-gradient(180deg, rgba(255,252,247,0.92) 0%, rgba(250,245,237,0.82) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 20px 40px rgba(21,33,35,0.06)'
          }}
        >
          {/* Header de la tarjeta */}
          <div className="border-b border-[#2a4953]/10 px-8 py-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2a4953]/60 block mb-1">
                {siteConfig.copy.homeAboutEyebrow}
              </span>
              <h2 className="font-serif text-[32px] sm:text-[38px] text-[#160E09] font-semibold">
                {siteConfig.about.title}
              </h2>
            </div>
            <button 
              onClick={handleDownloadCV}
              className="flex items-center gap-2 border border-[#2a4953]/20 hover:bg-white/70 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.14em] text-[#19323b] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Download className="w-4 h-4" />
              Solicitar Dossier / CV
            </button>
          </div>

          {/* Grid de contenido */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Principios de trabajo y trayectoria */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2a4953]/60 mb-6">
                  Principios fundamentales
                </h3>
                <div className="flex flex-col">
                  {siteConfig.about.principles.map((p) => (
                    <div 
                      key={p.number} 
                      className="grid grid-cols-[40px_1fr] border-b border-[#2a4953]/10 py-5 first:pt-0 last:border-0 last:pb-0"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2a4953]/50 mt-1">
                        {p.number}
                      </span>
                      <div>
                        <h4 className="font-serif text-[19px] sm:text-[21px] font-semibold text-[#160E09]">
                          {p.title}
                        </h4>
                        <p className="text-[13px] sm:text-[14px] text-[#2a4953]/75 font-medium mt-1 leading-relaxed">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#2a4953]/10 pt-8">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2a4953]/60 mb-3">
                  <GraduationCap className="w-4 h-4 text-[#2a4953]" />
                  <span>Enfoque y Formación</span>
                </div>
                <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#2a4953]/80 font-medium max-w-2xl">
                  {siteConfig.about.description}
                </p>
              </div>
            </div>

            {/* Tech Stack clasificado */}
            <div className="lg:col-span-4 lg:border-l lg:border-[#2a4953]/10 lg:pl-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2a4953]/60 mb-6">
                Ecosistema y Habilidades
              </h3>
              <div className="flex flex-col gap-6">
                {[
                  { cat: 'Arquitectura & Web', sub: 'Next.js, TypeScript, React 19', tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4'] },
                  { cat: 'Infraestructura & Cloud', sub: 'Rendimiento y Despliegue', tags: ['Vercel', 'Edge Compute', 'Docker', 'CI/CD'] },
                  { cat: 'Diseño & Accesibilidad', sub: 'Estándares y Experiencia', tags: ['WCAG 2.2 AA', 'Design Tokens', 'Semántica HTML'] },
                ].map((stack, i) => (
                  <div key={i}>
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#2a4953]/80">{stack.cat}</h4>
                    <p className="text-[12px] text-[#2a4953]/60 font-medium mt-0.5 mb-2.5">{stack.sub}</p>
                    <div className="flex flex-wrap gap-2">
                      {stack.tags.map((tag) => (
                        <span key={tag} className="bg-white/80 px-3 py-1 rounded-full text-[11px] font-semibold text-[#19323b] border border-[#2a4953]/10 shadow-2xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Enlaces de detalle */}
          <div className="border-t border-[#2a4953]/10 px-8 py-6 bg-white/20 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#2a4953]/70 font-medium">
              Conoce en profundidad nuestra metodología en la página dedicada.
            </span>
            <Link 
              href="/sobre-mi" 
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171923] hover:text-[#2a4953]"
            >
              Leer más sobre nosotros <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: PROYECTOS (Filtros interactivos y simulación de carga) */}
      <section id="proyectos" className="py-24 bg-white/40 px-6 sm:px-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2a4953]/60 block mb-1">
                {siteConfig.copy.homeWorkEyebrow}
              </span>
              <h2 className="font-serif text-[40px] sm:text-[48px] font-bold text-[#160E09]">
                {siteConfig.copy.homeWorkTitle[0]} {siteConfig.copy.homeWorkTitle[1]}
              </h2>
            </div>

            {/* Pestañas de filtrado reactivo */}
            <div className="flex flex-wrap items-center gap-2 bg-white/80 p-1.5 rounded-full border border-[#19323b]/10 shadow-2xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-[#171923] text-white shadow-2xs' 
                      : 'text-[#48514e] hover:text-[#19323b]'
                  }`}
                >
                  {cat === 'todos' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loader o listado con animación de entrada */}
          {loadingProjects ? (
            <div className="w-full h-[280px] rounded-3xl bg-white/50 border border-[#19323b]/10 backdrop-blur-md flex items-center justify-center shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-[#2a4953] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[#19323b] text-[15px] font-medium">Cargando proyectos seleccionados...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((p) => (
                <article 
                  key={p.slug}
                  className="group flex flex-col justify-between p-7 rounded-3xl bg-white/85 border border-[#19323b]/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#2a4953]/60">
                        {p.category} · {p.year}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#19323b]/5 flex items-center justify-center text-[#19323b] group-hover:bg-[#171923] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#160E09] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#2a4953]/75 font-medium leading-relaxed mb-6">
                      {p.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#19323b]/10">
                    {p.services.map((service) => (
                      <span key={service} className="text-[11px] font-semibold text-[#19323b]/80 bg-[#19323b]/5 px-2.5 py-0.5 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link 
              href="/proyectos" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171923] hover:text-[#2a4953]"
            >
              Ver catálogo completo de proyectos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: BLOG / BITÁCORA (Simulación de carga y lectura) */}
      <section id="blog" className="py-24 px-6 sm:px-10 relative overflow-hidden bg-gradient-to-b from-white/40 to-gray-50/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2a4953]/60 block mb-1">
            {siteConfig.copy.homeJournalEyebrow}
          </span>
          <h2 className="font-serif text-[40px] sm:text-[50px] font-bold text-[#2a4953] mb-3">
            {siteConfig.copy.homeJournalTitle[0]} {siteConfig.copy.homeJournalTitle[1]}
          </h2>
          <div className="w-16 h-1 bg-[#2a4953] rounded-full mb-4 opacity-80"></div>
          <p className="text-[#737373] text-[15px] font-medium mb-10 max-w-lg">
            {siteConfig.copy.journalIntro}
          </p>

          {loadingArticles ? (
            <div className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs rounded-2xl">
              <div className="w-4 h-4 border-2 border-[#2a4953] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[#19323b] text-sm font-medium">Cargando publicaciones editoriales...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
              {articles.map((art) => (
                <Link
                  key={art.slug}
                  href={`/blog/${art.slug}`}
                  className="group p-6 rounded-3xl bg-white/70 border border-white/80 shadow-xs hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-xs text-[#2a4953]/60 mb-3 font-semibold">
                    <span>{art.date}</span> · <span>{art.readMinutes} min de lectura</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#160E09] group-hover:text-[#2a4953] transition-colors mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#2a4953]/70 font-medium leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171923] hover:text-[#2a4953]"
            >
              Ir a la bitácora completa <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CONTACTO (Spotlight dinámico y enlaces seguros) */}
      <section id="contacto" className="py-28 px-6 sm:px-10 relative overflow-hidden scroll-mt-20">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
          <div className="text-center mb-14">
            <h2 className="font-serif text-[42px] sm:text-[54px] font-bold text-[#2a4953] leading-tight mb-4">
              {siteConfig.copy.contactTitle}
            </h2>
            <div className="w-16 h-1 bg-[#2a4953] rounded-full mx-auto mb-6 opacity-80"></div>
            <p className="text-[#19323b] text-lg font-medium">
              Abiertos a nuevas ideas, consultoría y colaboraciones.
            </p>
          </div>

          {/* Tarjetas de contacto con efecto de brillo (Spotlight) */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 w-full max-w-3xl">
            {/* Email */}
            <a 
              href={`mailto:${siteConfig.email}`}
              onMouseMove={handleSpotlightMove}
              className="group relative flex-1 min-w-[220px] flex flex-col items-center bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-[28px] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              <div 
                className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(42, 73, 83, 0.09), transparent 45%)`
                }}
              />
              <div className="text-[#2a4953] group-hover:scale-110 transition-transform duration-300 mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <span className="text-[#19323b] text-lg font-bold">Email</span>
              <span className="text-[#737373] text-xs font-medium mt-1">Escríbenos directamente</span>
            </a>

            {/* LinkedIn */}
            {siteConfig.social.linkedin && isSafePublicUrl(siteConfig.social.linkedin) && (
              <a 
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleSpotlightMove}
                className="group relative flex-1 min-w-[220px] flex flex-col items-center bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-[28px] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              >
                <div 
                  className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(42, 73, 83, 0.09), transparent 45%)`
                  }}
                />
                <div className="text-[#2a4953] group-hover:scale-110 transition-transform duration-300 mb-4">
                  <Linkedin className="w-8 h-8" />
                </div>
                <span className="text-[#19323b] text-lg font-bold">LinkedIn</span>
                <span className="text-[#737373] text-xs font-medium mt-1">Conectemos en red</span>
              </a>
            )}

            {/* GitHub */}
            {siteConfig.social.github && isSafePublicUrl(siteConfig.social.github) && (
              <a 
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleSpotlightMove}
                className="group relative flex-1 min-w-[220px] flex flex-col items-center bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-[28px] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              >
                <div 
                  className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(42, 73, 83, 0.09), transparent 45%)`
                  }}
                />
                <div className="text-[#2a4953] group-hover:scale-110 transition-transform duration-300 mb-4">
                  <Github className="w-8 h-8" />
                </div>
                <span className="text-[#19323b] text-lg font-bold">GitHub</span>
                <span className="text-[#737373] text-xs font-medium mt-1">Explora nuestro código</span>
              </a>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
