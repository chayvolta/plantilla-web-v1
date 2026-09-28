import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ui/article-card';
import { articles } from '@/content/articles';
import { siteConfig } from '@/config/site';
export const metadata: Metadata = { title: 'Bitácora', description: 'Ideas y artículos sobre diseño de producto, tecnología y comunicación.' };
export default function BlogPage() { return <section className="container-wide section-gap"><p className="eyebrow mb-6 text-muted">Bitácora / 02</p><h1 className="display text-[clamp(3.4rem,9vw,9rem)]">{siteConfig.copy.journalTitle}</h1><p className="my-10 max-w-xl text-lg leading-8 text-muted">{siteConfig.copy.journalIntro}</p><div className="mt-12">{articles.map((article, index) => <ArticleCard article={article} index={index} key={article.slug} />)}</div></section>; }
