'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

type ArticleItem = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

type ArticleTabsProps = {
  label: string;
  items: ArticleItem[];
};

export default function ArticleTabs({ label, items }: ArticleTabsProps) {
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const pageCount = Math.ceil(items.length / pageSize);
  const pageItems = items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className={styles.experienceTabList} role="tablist" aria-label="Article categories">
        <button
          type="button"
          role="tab"
          id="article-tab"
          aria-selected="true"
          aria-controls="article-panel"
          data-active="true"
          onClick={() => setPage(1)}
        >
          {label}
        </button>
      </div>

      <div id="article-panel" className={styles.articlePanel} role="tabpanel" aria-labelledby="article-tab" tabIndex={0}>
        <ol className={styles.articleList}>
          {pageItems.map((article, index) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`}>
                <span>{String((page - 1) * pageSize + index + 1).padStart(2, '0')}</span>
                <div>
                  <p>{article.date}</p>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
        {pageCount > 0 && (
          <nav className={styles.articlePagination} aria-label="Article pages">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                aria-current={page === pageNumber ? 'page' : undefined}
                onClick={() => setPage(pageNumber)}
              >
                {String(pageNumber).padStart(2, '0')}
              </button>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}
