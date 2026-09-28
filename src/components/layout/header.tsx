'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { ArrowUpRight } from '@/components/ui/icons';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  // En la página de inicio se utiliza la barra flotante con ScrollSpy
  if (pathname === '/') return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#dedfd8] bg-[#f5f5f0]/95 backdrop-blur-xl">
      <div className="container-wide flex h-[76px] items-center justify-between gap-5">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5" aria-label={`${siteConfig.name}, ir a inicio`}>
          <span aria-hidden="true" className="flex h-9 w-9 rotate-[-12deg] items-center justify-center rounded-full bg-[#171923] text-[#b6f264] text-lg font-black">✳</span>
          <span className="font-bold tracking-[-.055em] text-xl">{siteConfig.shortName}<span className="text-[#85878a]">®</span></span>
        </Link>
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-7">
          {siteConfig.nav.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                className={`text-[.83rem] font-semibold transition hover:text-[#737774] ${isActive ? 'underline decoration-2 underline-offset-8' : ''}`}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/contacto" className="hidden md:inline-flex items-center gap-2 rounded-full border border-[#171923] px-5 py-2.5 text-[.82rem] font-bold hover:bg-[#171923] hover:text-white transition">Hablemos <ArrowUpRight className="h-4 w-4" /></Link>
        <button type="button" className="md:hidden rounded-full border border-[#c4c6c2] px-4 py-2 text-sm font-bold" aria-expanded={open} aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'} aria-controls="mobile-menu" onClick={() => setOpen((current) => !current)}>{open ? 'Cerrar ✕' : 'Menú ☰'}</button>
      </div>
      {open && <nav id="mobile-menu" aria-label="Navegación móvil" className="md:hidden border-t border-[#dedfd8] bg-[#f5f5f0] px-6 py-4">
        {siteConfig.nav.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setOpen(false)}
              className={`block border-b border-[#dedfd8] py-3 font-semibold ${isActive ? 'underline decoration-2' : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>}
    </header>
  );
}
