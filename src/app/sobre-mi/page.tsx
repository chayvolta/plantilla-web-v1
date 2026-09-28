import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ArrowUpRight, Spark } from '@/components/ui/icons';
export const metadata: Metadata = { title: 'Acerca de', description: 'Principios y metodología detrás de esta plantilla modular.' };
export default function AboutPage() { return <>
  <section className="container-wide section-gap"><p className="eyebrow mb-6 text-muted">Acerca de / 03</p><h1 className="display max-w-6xl text-[clamp(3.3rem,9vw,9rem)]">{siteConfig.about.title}</h1><div className="mt-16 grid gap-8 border-t border-[#dcded8] pt-10 md:grid-cols-2"><p className="eyebrow text-muted">Una presentación flexible</p><p className="max-w-2xl text-xl leading-9">{siteConfig.about.description}</p></div></section>
  <section className="bg-[#171923] py-25 text-white"><div className="container-wide grid gap-12 md:grid-cols-2"><div className="flex min-h-[300px] items-center justify-center rounded-xl bg-[#b6f264] text-[#171923]"><Spark className="h-48 w-48" /></div><div><p className="eyebrow mb-5 text-[#b6f264]">Nuestro enfoque</p><h2 className="display mb-8 text-[clamp(2.5rem,5.2vw,5rem)]">Una base,<br />muchas historias.</h2><p className="max-w-lg text-lg leading-8 text-white/70">Personaliza identidad, componentes y contenidos sin tener que reconstruir las páginas. Este texto es demostrativo y debe reemplazarse con tu trayectoria.</p></div></div></section>
  <section className="container-wide section-gap"><p className="eyebrow mb-5 text-muted">Los principios</p><h2 className="display mb-14 text-[clamp(3rem,6vw,6rem)]">Cómo trabajamos.</h2><div className="grid gap-7 md:grid-cols-3">{siteConfig.about.principles.map((principle) => <div className="border-t border-[#babdb5] pt-8" key={principle.number}><span className="text-sm text-muted">{principle.number}</span><h3 className="my-7 text-3xl font-bold tracking-[-.055em]">{principle.title}</h3><p className="max-w-sm leading-8 text-muted">{principle.body}</p></div>)}</div><Link href="/contacto" className="button-primary mt-14">Trabajemos juntos <ArrowUpRight className="h-5 w-5" /></Link></section>
</>;
}
