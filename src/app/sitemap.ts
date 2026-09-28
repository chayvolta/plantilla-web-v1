import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { projects } from '@/content/projects';
import { articles } from '@/content/articles';
export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteConfig.url.replace(/\/$/, '');
  const pages = ['', '/proyectos', '/sobre-mi', '/blog', '/contacto'];
  const paths = [...pages, ...projects.map((project) => `/proyectos/${project.slug}`), ...articles.map((article) => `/blog/${article.slug}`)];
  return paths.map((path) => ({ url: `${site}${path}`, changeFrequency: 'monthly' as const, priority: path ? .7 : 1 }));
}
