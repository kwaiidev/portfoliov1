import { createElement, isValidElement, type ReactNode } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createHeadingSlugger } from '@/lib/markdown';
import styles from './long-form.module.css';

function childrenToText(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(childrenToText).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return childrenToText(children.props.children);
  }

  return '';
}

export default function MarkdownContent({ content }: { content: string }) {
  const slugger = createHeadingSlugger();

  const renderHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    function MarkdownHeading({ children }: { children?: ReactNode }) {
      const title = childrenToText(children).trim();
      const id = slugger.slug(title || 'section');

      return createElement(
        `h${level}`,
        {
          id,
          tabIndex: -1,
          className: `${styles.heading} ${styles[`heading${level}`]}`,
        },
        children,
        createElement(
          'a',
          {
            href: `#${id}`,
            className: styles.headingAnchor,
            'aria-label': `Link to ${title || 'this section'}`,
          },
          '#',
        ),
      );
    }

    return MarkdownHeading;
  };

  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: renderHeading(1),
          h2: renderHeading(2),
          h3: renderHeading(3),
          h4: renderHeading(4),
          h5: renderHeading(5),
          h6: renderHeading(6),
          a: ({ href, children }) => {
            const className = styles.textLink;

            if (href?.startsWith('/')) {
              return (
                <Link href={href} className={className}>
                  {children}
                </Link>
              );
            }

            const isAnchor = href?.startsWith('#');

            return (
              <a
                href={href}
                className={className}
                target={isAnchor ? undefined : '_blank'}
                rel={isAnchor ? undefined : 'noopener noreferrer'}
              >
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className={styles.blockquote}>{children}</blockquote>
          ),
          pre: ({ children }) => <pre className={styles.codeBlock}>{children}</pre>,
          code: ({ className, children }) => {
            const isBlock = Boolean(className) || String(children).includes('\n');

            return (
              <code className={isBlock ? className : styles.inlineCode}>{children}</code>
            );
          },
          hr: () => null,
          table: ({ children }) => (
            <div className={styles.tableRegion} role="region" aria-label="Scrollable table" tabIndex={0}>
              <table>{children}</table>
            </div>
          ),
          img: ({ src, alt }) => (
            // Markdown media can be remote or author-supplied, so preserve its natural ratio.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ''}
              className={styles.markdownImage}
              loading="lazy"
              decoding="async"
            />
          ),
          input: ({ type, checked, disabled }) => (
            <input type={type} checked={checked} disabled={disabled} readOnly />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
