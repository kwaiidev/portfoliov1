import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatArticleDate, getAllArticles, getArticleBySlug } from '@/lib/articles';

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
    title: `${article.title} | kwaiidev`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="overflow-x-hidden bg-[#0d1b2a] px-5 pb-12 pt-28 text-[#e0e1dd] sm:px-8">
      <article className="mx-auto w-full max-w-[20.5rem] sm:max-w-3xl">
        <Link href="/articles" className="font-mono text-sm text-[#778da9] hover:text-[#f0ebd8]">
          ../articles
        </Link>

        <header className="mt-10">
          <p className="font-mono text-sm text-[#778da9]">{formatArticleDate(article.date)}</p>
          <h1 className="mt-3 break-words text-4xl font-semibold leading-tight text-[#f0ebd8] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 break-words text-sm leading-6 text-[#e0e1dd]/70">{article.description}</p>
          {article.tags.length > 0 && (
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#778da9]/80">
              {article.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </p>
          )}
        </header>

        <div className="mt-10 border-t border-[#415a77]/45 pt-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mt-10 break-words text-3xl font-semibold leading-tight text-[#f0ebd8]">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-10 break-words font-mono text-lg leading-7 text-[#778da9]">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 break-words font-mono text-sm leading-6 text-[#778da9]">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mt-4 break-words text-sm leading-7 text-[#e0e1dd]/75">{children}</p>
              ),
              a: ({ href, children }) => {
                const className = 'text-[#f0ebd8] underline decoration-[#778da9] underline-offset-4 hover:text-[#778da9]';

                if (href?.startsWith('/')) {
                  return (
                    <Link href={href} className={className}>
                      {children}
                    </Link>
                  );
                }

                return (
                  <a
                    href={href}
                    className={className}
                    target={href?.startsWith('#') ? undefined : '_blank'}
                    rel={href?.startsWith('#') ? undefined : 'noopener noreferrer'}
                  >
                    {children}
                  </a>
                );
              },
              ul: ({ children }) => (
                <ul className="mt-4 space-y-2 pl-5 text-sm leading-7 text-[#e0e1dd]/75">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-[#e0e1dd]/75">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="break-words pl-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="mt-6 border-l border-[#778da9] pl-4 text-[#e0e1dd]/70">
                  {children}
                </blockquote>
              ),
              pre: ({ children }) => (
                <pre className="mt-5 overflow-x-auto border border-[#415a77]/45 bg-[#1b263b] p-4 text-sm leading-6 text-[#e0e1dd]">
                  {children}
                </pre>
              ),
              code: ({ className, children }) => {
                if (className) {
                  return <code className={className}>{children}</code>;
                }

                return (
                  <code className="rounded bg-[#1b263b] px-1.5 py-0.5 font-mono text-xs text-[#f0ebd8]">
                    {children}
                  </code>
                );
              },
              hr: () => <hr className="my-10 border-t border-[#415a77]/45" />,
              table: ({ children }) => (
                <table className="mt-6 block w-full overflow-x-auto text-left text-sm leading-6 text-[#e0e1dd]/75">
                  {children}
                </table>
              ),
              th: ({ children }) => (
                <th className="border-b border-[#415a77]/60 px-3 py-2 font-mono text-xs text-[#778da9]">
                  {children}
                </th>
              ),
              td: ({ children }) => <td className="border-b border-[#415a77]/35 px-3 py-2">{children}</td>,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
