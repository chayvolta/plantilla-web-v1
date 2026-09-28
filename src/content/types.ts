export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string[];
  services: string[];
  accent: 'violet' | 'orange' | 'green';
  featured: boolean;
  externalUrl?: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  paragraphs: string[];
};
