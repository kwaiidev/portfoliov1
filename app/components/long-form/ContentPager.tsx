import Link from 'next/link';
import styles from './long-form.module.css';

type PagerItem = {
  title: string;
  href: string;
};

export default function ContentPager({
  previous,
  next,
}: {
  previous?: PagerItem;
  next?: PagerItem;
}) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className={styles.pager} aria-label="More content">
      {previous ? (
        <Link href={previous.href}>
          <span>previous</span>
          <strong>← {previous.title}</strong>
        </Link>
      ) : <span />}
      {next && (
        <Link href={next.href} className={styles.pagerNext}>
          <span>next</span>
          <strong>{next.title} →</strong>
        </Link>
      )}
    </nav>
  );
}
