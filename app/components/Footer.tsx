import Link from 'next/link';

const pageLinks = [
  ['home', '/'],
  ['about', '/about'],
  ['experience', '/experience'],
  ['projects', '/projects'],
  ['articles', '/articles'],
];

const contactLinks = [
  ['resume', '/resume.pdf'],
  ['github', 'https://github.com/kwaiidev'],
  ['linkedin', 'https://www.linkedin.com/in/sacerio417/'],
];

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2a] px-5 pb-16 text-[#e0e1dd] sm:px-8">
      <section className="mx-auto w-full max-w-[20.5rem] border-t border-[#415a77]/45 pt-8 font-mono text-sm sm:max-w-3xl">
        <div className="grid gap-8 sm:grid-cols-2">
          <nav aria-label="footer navigation">
            <h2 className="text-[#778da9]">pages</h2>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[#e0e1dd]/75">
              {pageLinks.map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-[#778da9]">
                  {label}
                </Link>
              ))}
            </p>
          </nav>

          <section>
            <h2 className="text-[#778da9]">contact</h2>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[#e0e1dd]/75">
              {contactLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:text-[#778da9]"
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
