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

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      title: `${article.title} | kwaii.dev`,
      description: article.description,
      url: `/articles/${article.slug}`,
      publishedTime: article.date,
      authors: ['Jason Sacerio'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary',
      title: `${article.title} | kwaii.dev`,
      description: article.description,
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
    author: {
      '@type': 'Person',
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
