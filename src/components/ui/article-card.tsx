import Link from 'next/link';
import type { Article } from '@/content/types';
import { ArrowUpRight } from './icons';
import { formatDate } from '@/lib/format';

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return <article className="group border-t border-[#d4d6d0] py-8 sm:py-10">
    <Link href={`/blog/${article.slug}`} className="grid items-start gap-4 sm:grid-cols-[70px_1fr_auto] sm:gap-8">
      <span className="text-sm text-[#858780]">{String(index + 1).padStart(2, '0')}</span>
      <div><p className="eyebrow mb-4 text-[#686b6d]">{article.category} · {formatDate(article.date)} · {article.readMinutes} min</p><h3 className="max-w-3xl text-[clamp(1.55rem,3vw,2.8rem)] font-bold tracking-[-.065em] group-hover:underline underline-offset-4">{article.title}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{article.excerpt}</p></div>
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#858780] transition group-hover:bg-[#171923] group-hover:text-white"><ArrowUpRight className="h-5 w-5" /></span>
    </Link>
  </article>;
}
