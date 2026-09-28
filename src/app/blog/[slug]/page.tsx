import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticle } from '@/content/articles';
import { formatDate } from '@/lib/format';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const article = getArticle((await params).slug); return article ? { title: article.title, description: article.excerpt } : {}; }
export default async function BlogDetail({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return <article className="container-wide section-gap"><Link href="/blog" className="eyebrow hover:underline">← Volver a la bitácora</Link><div className="mx-auto max-w-4xl"><p className="eyebrow mb-6 mt-16 text-muted">{article.category} · {formatDate(article.date)} · {article.readMinutes} min</p><h1 className="display text-[clamp(3rem,7.2vw,7.2rem)]">{article.title}</h1><p className="my-10 border-l-4 border-[#a2d467] pl-6 text-xl leading-9 text-muted">{article.excerpt}</p><div className="border-t border-[#dcded8] pt-12">{article.paragraphs.map((paragraph) => <p key={paragraph} className="mb-8 text-lg leading-9 text-[#383b40]">{paragraph}</p>)}</div><Link href="/blog" className="button-primary mt-10">← Leer más artículos</Link></div></article>;
}
