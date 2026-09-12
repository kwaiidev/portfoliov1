import type { ReactNode } from 'react';
import Link from 'next/link';
import type { TableOfContentsItem } from '@/lib/markdown';
import TableOfContents from './TableOfContents';
import styles from './long-form.module.css';

type LongFormMeta = {
  label: string;
  value: string;
};

type LongFormAction = {
  label: string;
  href: string;
};

type LongFormLayoutProps = {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  meta?: LongFormMeta[];
  tags?: string[];
  badge?: string;
  actions?: LongFormAction[];
  tableOfContents: TableOfContentsItem[];
  lead?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export default function LongFormLayout({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  meta = [],
  tags = [],
  badge,
  actions = [],
  tableOfContents,
  lead,
  children,
  footer,
}: LongFormLayoutProps) {
  return (
    <main id="main-content" className={styles.page}>
      <article className={styles.shell}>
        <Link href={backHref} className={styles.backLink}>
          <span aria-hidden="true">←</span> {backLabel}
        </Link>

        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>{title}</h1>

          <p className={styles.eyebrow}>{eyebrow}</p>

          <div className={styles.heroSummary}>
            <p className={styles.description}>{description}</p>
            {badge && <p className={styles.badge}>{badge}</p>}
            {actions.length > 0 && (
              <nav className={styles.actions} aria-label="Project links">
                {actions.map((action) => {
                  const external = action.href.startsWith('http');

                  return (
                    <a
                      key={`${action.label}-${action.href}`}
                      href={action.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                    >
                      {action.label} <span aria-hidden="true">↗</span>
                    </a>
                  );
                })}
              </nav>
            )}
          </div>

          {meta.length > 0 && (
            <dl className={styles.metaGrid}>
              {meta.map((item) => (
                <div key={`${item.label}-${item.value}`}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {tags.length > 0 && (
            <ul className={styles.tagList} aria-label="Technologies and topics">
              {tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          )}
        </header>

        {lead && <div className={styles.lead}>{lead}</div>}

        <div className={styles.contentGrid} data-has-toc={tableOfContents.length > 0}>
          <TableOfContents items={tableOfContents} />
          <div className={styles.content}>{children}</div>
        </div>

        {footer && <footer className={styles.contentFooter}>{footer}</footer>}
      </article>
    </main>
  );
}
