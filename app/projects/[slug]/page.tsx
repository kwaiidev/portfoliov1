import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ContentPager from '@/app/components/long-form/ContentPager';
import LongFormLayout from '@/app/components/long-form/LongFormLayout';
import MarkdownContent from '@/app/components/long-form/MarkdownContent';
import MediaGallery from '@/app/components/long-form/MediaGallery';
import { extractTableOfContents } from '@/lib/markdown';
import { getAllProjects, getProjectBySlug, getProjectNavigation } from '@/lib/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().flatMap((project) => (
    [project.slug, ...project.aliases].map((slug) => ({ slug }))
  ));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: 'article',
      title: `${project.title} | kwaii.dev`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      publishedTime: project.date,
      authors: ['Jason Sacerio'],
      tags: project.tech,
      images: project.images[0] ? [{ url: project.images[0].src, alt: project.images[0].alt }] : undefined,
    },
    twitter: {
      card: project.images[0] ? 'summary_large_image' : 'summary',
      title: `${project.title} | kwaii.dev`,
      description: project.summary,
      images: project.images[0] ? [{ url: project.images[0].src, alt: project.images[0].alt }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  if (slug !== project.slug) {
    permanentRedirect(`/projects/${project.slug}`);
  }

  const tableOfContents = extractTableOfContents(project.content);
  const navigation = getProjectNavigation(project.slug);

  return (
    <LongFormLayout
      backHref="/#projects"
      backLabel="all projects"
      eyebrow={`project ${String(project.order).padStart(2, '0')}`}
      title={project.title}
      description={project.summary}
      stack={project.tech}
      badge={project.award}
      actions={project.links}
      tableOfContents={tableOfContents}
      lead={project.images.length > 0 ? <MediaGallery title={project.title} images={project.images} /> : undefined}
      footer={(
        <ContentPager
          previous={navigation.previous ? {
            title: navigation.previous.title,
            href: `/projects/${navigation.previous.slug}`,
          } : undefined}
          next={navigation.next ? {
            title: navigation.next.title,
            href: `/projects/${navigation.next.slug}`,
          } : undefined}
        />
      )}
    >
      <MarkdownContent content={project.content} />
    </LongFormLayout>
  );
}
