import Link from 'next/link';
import type { Project } from '@/content/types';
import { ArrowUpRight, Spark } from './icons';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <article className="group">
    <Link href={`/proyectos/${project.slug}`} className="block" aria-label={`Ver proyecto ${project.title}`}>
      <div className={`project-art project-art-${project.accent} transition-[border-radius] duration-300 group-hover:rounded-[36px]`}>
        <div className="absolute left-6 top-6 z-10 text-xs font-bold tracking-widest">{String(index + 1).padStart(2, '0')} / SELECCIÓN</div>
        <Spark className="w-32 md:w-40 opacity-80 transition-transform duration-500 group-hover:rotate-45" />
        <span className="absolute bottom-5 right-5 z-10 rounded-full bg-white/80 p-3"><ArrowUpRight className="h-5 w-5" /></span>
      </div>
      <div className="flex items-start justify-between gap-4 py-5"><div><p className="eyebrow mb-2 text-[#757879]">{project.category}</p><h3 className="text-[clamp(1.4rem,2.6vw,2rem)] font-bold tracking-[-.055em]">{project.title}</h3><p className="mt-2 text-sm text-[#626670]">{project.summary}</p></div><span className="text-sm text-[#66686d]">{project.year}</span></div>
    </Link>
  </article>;
}
