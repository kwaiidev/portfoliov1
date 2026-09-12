import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { getAllProjects } from '@/lib/projects';

const baseUrl = 'https://kwaii.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [{
    url: baseUrl,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }];

  const projects = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    changeFrequency: 'monthly' as const,
    priority: project.featured ? 0.8 : 0.7,
  }));

  const articles = getAllArticles().map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...pages, ...projects, ...articles];
}
