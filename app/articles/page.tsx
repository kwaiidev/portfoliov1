import Link from 'next/link';
import { formatArticleDate, getAllArticles } from '@/lib/articles';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main id="articles" className="overflow-x-hidden bg-[#0d1b2a] px-5 pb-12 pt-28 text-[#e0e1dd] sm:px-8">
      <section className="mx-auto w-full max-w-[20.5rem] sm:max-w-3xl">
        <Link href="/" className="font-mono text-sm text-[#778da9] hover:text-[#f0ebd8]">
          ../home
        </Link>

        <h1 className="mt-10 text-4xl font-semibold text-[#f0ebd8] sm:text-5xl">articles</h1>
        <p className="mt-3 break-words font-mono text-sm leading-6 text-[#e0e1dd]/60">
          stuff ive learned or blog
        </p>

        <section className="mt-10 border-t border-[#415a77]/45 pt-6">
          {articles.length === 0 ? (
            <p className="text-sm leading-6 text-[#e0e1dd]/60">no articles yet.</p>
          ) : (
            <div className="space-y-10">
              {articles.map((article) => (
                <article key={article.slug} className="text-sm leading-7">
                  <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                    <p className="font-mono text-[#778da9]">{formatArticleDate(article.date)}</p>
                    <div>
                      <h2 className="text-xl font-medium leading-7 text-[#f0ebd8]">
                        <Link href={`/articles/${article.slug}`} className="hover:text-[#778da9]">
                          {article.title}
                        </Link>
                      </h2>
                      <p className="mt-2 break-words text-[#e0e1dd]/70">{article.description}</p>
                      {article.tags.length > 0 && (
                        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#778da9]/80">
                          {article.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </p>
                      )}
                      <p className="mt-4">
                        <Link href={`/articles/${article.slug}`} className="font-mono text-[#778da9] hover:text-[#f0ebd8]">
                          read article
                        </Link>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
