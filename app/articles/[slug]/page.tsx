import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LongFormLayout from '@/app/components/long-form/LongFormLayout';
import MarkdownContent from '@/app/components/long-form/MarkdownContent';
import { formatArticleDate, getAllArticles, getArticleBySlug } from '@/lib/articles';
import { extractTableOfContents } from '@/lib/markdown';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const knightHacksImage = ['becoming-treasurer', 'khviii-deepdive'].includes(article.slug)
    ? [{ url: '/cachedimage.png', width: 1200, height: 630, alt: 'Knight Hacks team posing together at an event' }]
    : undefined;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      title: `${article.title} | Jason Sacerio`,
      description: article.description,
      url: `/articles/${article.slug}`,
      publishedTime: article.date,
      authors: ['Jason Sacerio'],
      tags: article.tags,
      images: knightHacksImage,
    },
    twitter: {
      card: knightHacksImage ? 'summary_large_image' : 'summary',
      title: `${article.title} | Jason Sacerio`,
      description: article.description,
      images: knightHacksImage,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const tableOfContents = extractTableOfContents(article.content);
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    image: ['becoming-treasurer', 'khviii-deepdive'].includes(article.slug)
      ? 'https://kwaii.dev/cachedimage.png'
      : undefined,
    author: {
      '@type': 'Person',
      '@id': 'https://kwaii.dev/#person',
      name: 'Jason Sacerio',
      url: 'https://kwaii.dev',
    },
    mainEntityOfPage: `https://kwaii.dev/articles/${article.slug}`,
  }).replace(/</g, '\\u003c');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LongFormLayout
        backHref="/#articles"
        backLabel="all articles"
        eyebrow={formatArticleDate(article.date)}
        title={article.title}
        description={article.description}
        tags={article.tags.filter((tag) => tag.toLowerCase() !== 'blog')}
        tableOfContents={tableOfContents}
      >
        <MarkdownContent content={article.content} />
      </LongFormLayout>
    </>
  );
}
