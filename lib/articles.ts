import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export type Article = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

const articlesRoot = join(process.cwd(), 'content', 'articles');

function isMarkdownFile(fileName: string) {
  return fileName.endsWith('.md');
}

function slugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, '');
}

function isValidSlug(slug: string) {
  return /^[a-z0-9-]+$/.test(slug);
}

function toRequiredString(value: unknown, fieldName: string, slug: string) {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  throw new Error(`Article "${slug}" is missing a valid "${fieldName}" field.`);
}

function toDateString(value: unknown, slug: string) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return toRequiredString(value, 'date', slug);
}

function toTags(value: unknown) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(',').map((tag) => tag.trim()).filter(Boolean);
  }

  return [];
}

function getDateParts(date: string) {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

function getSortTime(date: string) {
  const parts = getDateParts(date);

  if (!parts) {
    return 0;
  }

  return Date.UTC(parts.year, parts.month - 1, parts.day);
}

export function formatArticleDate(date: string) {
  const parts = getDateParts(date);

  if (!parts) {
    return date;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(parts.year, parts.month - 1, parts.day)));
}

export function getArticleSlugs() {
  if (!existsSync(articlesRoot)) {
    return [];
  }

  return readdirSync(articlesRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => isMarkdownFile(fileName))
    .map((fileName) => slugFromFileName(fileName));
}

export function getArticleBySlug(slug: string) {
  if (!isValidSlug(slug)) {
    return undefined;
  }

  const filePath = join(articlesRoot, `${slug}.md`);

  if (!existsSync(filePath)) {
    return undefined;
  }

  const file = readFileSync(filePath, 'utf8');
  const { data, content } = matter(file);

  if (data.published === false) {
    return undefined;
  }

  return {
    slug,
    title: toRequiredString(data.title, 'title', slug),
    date: toDateString(data.date, slug),
    description: toRequiredString(data.description, 'description', slug),
    tags: toTags(data.tags),
    content: content.trim(),
  } satisfies Article;
}

export function getAllArticles() {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => Boolean(article))
    .sort((first, second) => getSortTime(second.date) - getSortTime(first.date));
}
