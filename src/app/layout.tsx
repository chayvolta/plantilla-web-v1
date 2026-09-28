import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DemoAssistant } from '@/components/ui/demo-assistant';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  robots: { index: process.env.NODE_ENV === 'production', follow: true },
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: 'website', locale: 'es_MX' }
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f5f5f0' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#b6f264] focus:p-3">Saltar al contenido</a><Header /><main id="contenido">{children}</main><Footer />{siteConfig.features.demoAssistant && <DemoAssistant />}</body></html>;
}
