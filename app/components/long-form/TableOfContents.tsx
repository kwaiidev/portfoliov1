'use client';

import { useEffect, useRef, useState } from 'react';
import type { TableOfContentsItem } from '@/lib/markdown';
import styles from './long-form.module.css';

type TableOfContentsProps = {
  items: TableOfContentsItem[];
};

function ContentsList({
  items,
  activeId,
  onNavigate,
}: TableOfContentsProps & { activeId: string; onNavigate?: (id: string) => void }) {
  return (
    <ol className={styles.tocList}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className={styles.tocItem}
          data-depth={item.depth}
        >
          <a
            href={`#${item.id}`}
            className={styles.tocLink}
            aria-current={activeId === item.id ? 'location' : undefined}
            onClick={() => onNavigate?.(item.id)}
          >
            <span className={styles.tocIndex} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const mobileDetails = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const currentHash = window.location.hash.slice(1);

    if (currentHash && items.some((item) => item.id === currentHash)) {
      setActiveId(currentHash);
    }

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeading = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

        if (visibleHeading) {
          setActiveId(visibleHeading.target.id);
        }
      },
      { rootMargin: '-12% 0px -55% 0px' },
    );

    headings.forEach((heading) => observer.observe(heading));

    const syncHash = () => {
      const id = window.location.hash.slice(1);

      if (items.some((item) => item.id === id)) {
        setActiveId(id);
      }
    };

    window.addEventListener('hashchange', syncHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', syncHash);
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const activeTitle = items.find((item) => item.id === activeId)?.title ?? items[0].title;
  const closeMobileContents = (id: string) => {
    if (mobileDetails.current) {
      mobileDetails.current.open = false;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(id)?.focus({ preventScroll: true });
    });
  };

  return (
    <aside className={styles.toc} aria-label="Page sections">
      <nav className={styles.desktopToc} aria-label="Table of contents">
        <p className={styles.tocLabel}>on this page</p>
        <ContentsList items={items} activeId={activeId} />
      </nav>

      <details ref={mobileDetails} className={styles.mobileToc}>
        <summary>
          <span>on this page</span>
          <span className={styles.mobileTocCurrent}>{activeTitle}</span>
        </summary>
        <nav aria-label="Table of contents">
          <ContentsList items={items} activeId={activeId} onNavigate={closeMobileContents} />
        </nav>
      </details>
    </aside>
  );
}
