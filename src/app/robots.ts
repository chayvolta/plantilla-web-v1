import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: process.env.NODE_ENV === 'production' ? undefined : '/' }, sitemap: `${siteConfig.url.replace(/\/$/, '')}/sitemap.xml` };
}
