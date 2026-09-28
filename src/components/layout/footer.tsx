import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { isSafePublicUrl } from '@/lib/format';
import { ArrowUpRight } from '@/components/ui/icons';

export function Footer() {
  const socials = Object.entries(siteConfig.social).filter(([, url]) => isSafePublicUrl(url));
  return <footer className="bg-[#171923] text-[#f7f7f3] pt-20 pb-9">
    <div className="container-wide">
      <div className="grid gap-10 border-b border-white/20 pb-20 md:grid-cols-[1.5fr_1fr] md:gap-20">
        <div><p className="eyebrow text-[#b6f264]">Hablemos de lo que sigue</p><h2 className="display my-7 text-[clamp(3rem,6.7vw,7rem)]">{siteConfig.copy.footerTitle[0]}<br />{siteConfig.copy.footerTitle[1]}</h2><Link className="button-light" href="/contacto">Iniciar conversación <ArrowUpRight className="h-5 w-5" /></Link></div>
        <div className="flex flex-col justify-end gap-7"><p className="max-w-sm text-lg text-[#bec0c4]">Ideas claras, diseño funcional y un punto de partida que puedes hacer tuyo.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {siteConfig.nav.filter((nav) => nav.href !== '/').map((nav) => <Link key={nav.href} href={nav.href} className="hover:text-[#b6f264]">{nav.label}</Link>)}
          {socials.map(([network, url]) => <a key={network} href={url} target="_blank" rel="noreferrer" className="capitalize hover:text-[#b6f264]">{network}</a>)}
        </div></div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs text-[#a7aab0]"><span>© {new Date().getFullYear()} {siteConfig.name}. Plantilla original de demostración.</span><span>Hecho para evolucionar · Next.js + Tailwind</span></div>
    </div>
  </footer>;
}
