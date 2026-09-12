import Link from 'next/link';
import styles from './footer.module.css';

const pageLinks = [
  ['home', '/'],
  ['about', '/#about'],
  ['experience', '/#experience'],
  ['projects', '/#projects'],
  ['articles', '/#articles'],
];

const contactLinks = [
  ['resume', '/resume.pdf'],
  ['github', 'https://github.com/kwaiidev'],
  ['linkedin', 'https://www.linkedin.com/in/sacerio417/'],
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.inner}>
        <div className={styles.grid}>
          <nav aria-label="footer navigation">
            <h2>pages</h2>
            <p>
              {pageLinks.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </p>
          </nav>

          <section>
            <h2>contact</h2>
            <p>
              {contactLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {label}
                </a>
              ))}
            </p>
          </section>
        </div>
      </section>
    </footer>
  );
}
