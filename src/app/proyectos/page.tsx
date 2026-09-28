import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/content/projects';
import { siteConfig } from '@/config/site';
export const metadata: Metadata = { title: 'Proyectos', description: 'Proyectos de demostración y ejemplos de presentación editorial.' };
export default function ProjectsPage() { return <section className="container-wide section-gap"><p className="eyebrow mb-6 text-muted">Portafolio / 01</p><h1 className="display max-w-5xl text-[clamp(3.4rem,9vw,9rem)]">{siteConfig.copy.projectsTitle}</h1><p className="my-10 max-w-xl text-lg leading-8 text-muted">{siteConfig.copy.projectsIntro}</p><div className="grid gap-11 border-t border-[#dcded8] pt-12 md:grid-cols-2">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div></section>; }
