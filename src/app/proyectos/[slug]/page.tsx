import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/content/projects';
import { ArrowUpRight, Spark } from '@/components/ui/icons';
import { isSafePublicUrl } from '@/lib/format';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const project = getProject((await params).slug); return project ? { title: project.title, description: project.summary } : {}; }
export default async function ProjectDetail({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <article className="container-wide section-gap">
    <Link href="/proyectos" className="eyebrow hover:underline">← Volver a proyectos</Link><div className="mt-12 flex flex-wrap items-end justify-between gap-8"><div><p className="eyebrow mb-6 text-muted">{project.category} · {project.year}</p><h1 className="display text-[clamp(3.5rem,9vw,9.5rem)]">{project.title}</h1></div><p className="max-w-sm text-lg leading-8 text-muted">{project.summary}</p></div>
    <div className={`project-art project-art-${project.accent} my-14 min-h-[410px] md:min-h-[560px]`}><Spark className="h-60 w-60 opacity-80"/><span className="absolute bottom-7 left-7 eyebrow">Ilustración conceptual, sin fotografía externa</span></div>
    <div className="grid gap-10 border-t border-[#dcded8] pt-10 md:grid-cols-[1fr_2fr]"><div><h2 className="eyebrow mb-5">Áreas del proyecto</h2>{project.services.map((service) => <p className="border-b border-[#dcded8] py-3 text-sm font-semibold" key={service}>{service}</p>)}</div><div><h2 className="display mb-8 text-4xl md:text-6xl">Contexto y enfoque</h2>{project.description.map((paragraph) => <p className="mb-5 max-w-2xl text-lg leading-9 text-muted" key={paragraph}>{paragraph}</p>)}{project.externalUrl && isSafePublicUrl(project.externalUrl) && <a className="button-primary mt-4" target="_blank" rel="noreferrer" href={project.externalUrl}>Visitar proyecto <ArrowUpRight className="h-5 w-5"/></a>}</div></div>
  </article>;
}
