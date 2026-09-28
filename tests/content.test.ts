import { describe, expect, it } from 'vitest';
import { articles, getArticle } from '../src/content/articles';
import { projects, getProject } from '../src/content/projects';
import { siteConfig } from '../src/config/site';
import { formatDate, isSafePublicUrl } from '../src/lib/format';

describe('Integridad del contenido y configuración', () => {
  it('mantiene slugs de proyectos únicos y válidos', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    projects.forEach((p) => {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.services.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
    });
  });

  it('mantiene slugs de artículos únicos y válidos', () => {
    expect(new Set(articles.map((a) => a.slug)).size).toBe(articles.length);
    articles.forEach((a) => {
      expect(a.slug).toMatch(/^[a-z0-9-]+$/);
      expect(a.title.trim().length).toBeGreaterThan(0);
      expect(a.paragraphs.length).toBeGreaterThan(0);
      expect(a.readMinutes).toBeGreaterThan(0);
    });
  });

  it('resuelve búsquedas por slug con getProject y getArticle', () => {
    expect(getProject('atlas-territorial')).toBeDefined();
    expect(getProject('slug-inexistente')).toBeUndefined();
    expect(getArticle('una-web-que-pueda-cambiar')).toBeDefined();
    expect(getArticle('articulo-inexistente')).toBeUndefined();
  });

  it('valida URLs públicas seguras rechazando protocolos peligrosos', () => {
    expect(isSafePublicUrl('https://ejemplo.com')).toBe(true);
    expect(isSafePublicUrl('http://localhost:3000')).toBe(true);
    expect(isSafePublicUrl('javascript:alert(1)')).toBe(false);
    expect(isSafePublicUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isSafePublicUrl('')).toBe(false);
    expect(isSafePublicUrl('no-es-url')).toBe(false);
  });

  it('formatea fechas en español correctamente', () => {
    const formatted = formatDate('2026-09-12');
    expect(formatted).toContain('2026');
    expect(formatted.toLowerCase()).toMatch(/septiembre|sep/);
  });

  it('verifica que siteConfig contenga los campos requeridos para personalización', () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.shortName).toBeTruthy();
    expect(siteConfig.email).toContain('@');
    expect(siteConfig.nav.length).toBeGreaterThanOrEqual(4);
    expect(siteConfig.about.principles.length).toBe(3);
  });
});
