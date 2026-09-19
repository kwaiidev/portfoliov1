import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  focalPoint?: string;
};

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  slug: string;
  title: string;
  year?: string;
  date?: string;
  role?: string;
  timeline?: string;
  status?: string;
  order: number;
  summary: string;
  tech: string[];
  highlights: string[];
  award?: string;
  aliases: string[];
  links: ProjectLink[];
  images: ProjectImage[];
  featured: boolean;
  content: string;
};

export type ProjectSummary = Pick<
  Project,
  'slug' | 'title' | 'year' | 'order' | 'summary' | 'tech' | 'highlights' | 'award' | 'links' | 'images' | 'featured'
>;

const projectsRoot = join(process.cwd(), 'content', 'projects');

function isMarkdownFile(fileName: string) {
  return fileName.endsWith('.md');
}

function slugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, '');
}

function isValidSlug(slug: string) {
  return /^[a-z0-9-]+$/.test(slug);
}

function normalizeSlug(slug: string) {
  return slug.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function toRequiredString(value: unknown, fieldName: string, slug: string) {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  throw new Error(`Project "${slug}" is missing a valid "${fieldName}" field.`);
}

function toOptionalString(value: unknown) {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return undefined;
}

function toStringList(value: unknown, fieldName: string, slug: string) {
  if (!Array.isArray(value)) {
    throw new Error(`Project "${slug}" is missing a valid "${fieldName}" list.`);
  }

  return value.map((item, index) => (
    toRequiredString(item, `${fieldName}[${index}]`, slug)
  ));
}

function toAliases(value: unknown, slug: string) {
  if (!value) {
    return [];
  }

  const aliases = toStringList(value, 'aliases', slug);

  aliases.forEach((alias) => {
    if (!isValidSlug(alias)) {
      throw new Error(`Project "${slug}" has an invalid alias: "${alias}".`);
    }
  });

  return aliases;
}

function toOrder(value: unknown, slug: string) {
  const order = Number(value);

  if (!Number.isInteger(order) || order < 0) {
    throw new Error(`Project "${slug}" is missing a valid non-negative integer "order" field.`);
  }

  return order;
}

function toLinks(value: unknown, slug: string) {
  if (!value) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error(`Project "${slug}" has an invalid "links" field.`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Project "${slug}" has an invalid link at index ${index}.`);
    }

    const link = item as Record<string, unknown>;

    return {
      label: toRequiredString(link.label, `links[${index}].label`, slug),
      href: toRequiredString(link.href, `links[${index}].href`, slug),
    };
  });
}

function toImages(value: unknown, slug: string) {
  if (!value) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error(`Project "${slug}" has an invalid "images" field.`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Project "${slug}" has an invalid image at index ${index}.`);
    }

    const image = item as Record<string, unknown>;
    const width = Number(image.width);
    const height = Number(image.height);

    if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
      throw new Error(`Project "${slug}" has invalid dimensions for image ${index}.`);
    }

    return {
      src: toRequiredString(image.src, `images[${index}].src`, slug),
      alt: toRequiredString(image.alt, `images[${index}].alt`, slug),
      width,
      height,
      caption: toOptionalString(image.caption),
      focalPoint: toOptionalString(image.focalPoint),
    } satisfies ProjectImage;
  });
}

function readProject(slug: string): Project | undefined {
  if (!isValidSlug(slug)) {
    return undefined;
  }

  const filePath = join(projectsRoot, `${slug}.md`);

  if (!existsSync(filePath)) {
    return undefined;
  }

  const file = readFileSync(filePath, 'utf8');
  const { data, content } = matter(file);

  if (data.published !== true) {
    return undefined;
  }

  const project: Project = {
    slug,
    title: toRequiredString(data.title, 'title', slug),
    year: toOptionalString(data.year),
    date: toOptionalString(data.date),
    role: toOptionalString(data.role),
    timeline: toOptionalString(data.timeline),
    status: toOptionalString(data.status),
    order: toOrder(data.order, slug),
    summary: toRequiredString(data.summary, 'summary', slug),
    tech: toStringList(data.tech, 'tech', slug),
    highlights: toStringList(data.highlights, 'highlights', slug),
    award: toOptionalString(data.award),
    aliases: toAliases(data.aliases, slug),
    links: toLinks(data.links, slug),
    images: toImages(data.images, slug),
    featured: data.featured === true,
    content: content.trim(),
  };

  return project;
}

function getProjectSlugs() {
  if (!existsSync(projectsRoot)) {
    return [];
  }

  const slugs = readdirSync(projectsRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter(isMarkdownFile)
    .map(slugFromFileName);

  const invalidSlug = slugs.find((slug) => !isValidSlug(slug));

  if (invalidSlug) {
    throw new Error(`Project filename creates an invalid slug: "${invalidSlug}".`);
  }

  return slugs;
}

export function getAllProjects() {
  const projects = getProjectSlugs()
    .map(readProject)
    .filter((project): project is Project => Boolean(project))
    .sort((first, second) => first.order - second.order || first.title.localeCompare(second.title));

  const identifierOwners = new Map<string, string>();

  projects.forEach((project) => {
    [project.slug, ...project.aliases].forEach((identifier) => {
      const normalized = normalizeSlug(identifier);
      const existingOwner = identifierOwners.get(normalized);

      if (existingOwner && existingOwner !== project.slug) {
        throw new Error(`Project identifier "${identifier}" conflicts with project "${existingOwner}".`);
      }

      identifierOwners.set(normalized, project.slug);
    });
  });

  return projects;
}

export function getProjectSummaries(): ProjectSummary[] {
  return getAllProjects().map((project) => ({
    slug: project.slug,
    title: project.title,
    year: project.year,
    order: project.order,
    summary: project.summary,
    tech: project.tech,
    highlights: project.highlights,
    award: project.award,
    links: project.links,
    images: project.images,
    featured: project.featured,
  }));
}

export function getProjectBySlug(slug: string) {
  if (!isValidSlug(slug)) {
    return undefined;
  }

  const normalizedSlug = normalizeSlug(slug);

  return getAllProjects().find((project) => (
    normalizeSlug(project.slug) === normalizedSlug
    || project.aliases.some((alias) => normalizeSlug(alias) === normalizedSlug)
  ));
}

export function getProjectNavigation(slug: string) {
  const projects = getAllProjects();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index < 0) {
    return {};
  }

  return {
    previous: projects[index - 1],
    next: projects[index + 1],
  };
}
