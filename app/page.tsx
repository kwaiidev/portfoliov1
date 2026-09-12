import type { Metadata } from 'next';
import Link from 'next/link';
import { formatArticleDate, getAllArticles } from '@/lib/articles';
import { getProjectSummaries } from '@/lib/projects';
import performance from '@/data/performance.json';
import ArticleTabs from './components/ArticleTabs';
import ExperienceTabs from './components/ExperienceTabs';
import ProjectExplorer from './projects/ProjectExplorer';
import styles from './page.module.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const notes = [
  ['school', 'cs + math @ UCF'],
  ['focus', 'systems programming, robotics'],
  ['current', 'treasurer @ Knight Hacks'],
];

const experienceGroups = [
  {
    label: 'professional',
    items: [
      { title: 'software engineer intern', place: '???', date: 'may 2026 — august 2026', description: ['Reduced machine-control fault recovery time by 38% by building and integrating a real-time health monitoring and watchdog system for embedded safety controllers across multiple heavy-equipment platforms.',
        'Improved cross-platform deployment reliability to 99.7% over 500+ field hours by developing C++/Rust hardware abstraction layers and CAN/J1939 interfaces that standardized communication across different machine manufacturers.',
        'Cut embedded integration and debugging time by 45% by creating Python-based hardware-in-the-loop test automation covering drivers, RTOS tasks, communication faults, and degraded-connectivity scenarios before field deployment.'] },
      { title: 'researcher', place: 'UCF', date: 'sept 2025 — present', description: [
        'Conducted research on security and fault tolerance of LLMs for embedded systems, evaluating 15+ attack scenarios across 6 hardware platforms using real hardware and Gem5 simulation.',
        'Analyzed 10+ mitigation strategies for LLM vulnerabilities, including memory bit-flip attacks and 8 novel embedded-specific attack vectors, across 6 embedded boards and mobile devices.',
      ] },
      { title: 'software engineer intern', place: 'Blackstone', date: 'apr 2024 — sept 2024', description: [
        'Re-architected financial data processing pipelines using Pandas and NumPy vectorization, eliminating nested loops and reducing compute time by 40% on 10M+ row datasets.',
        'Optimized SQL queries, indexing strategies, and backend ETL workflows in Python, reducing end-of-day reporting latency by 30% and improving throughput, maintainability, and reliability across financial ingestion pipelines.',
      ] },
      { title: 'software engineer intern', place: 'Capitol Steel Structures', date: 'jan 2023 — aug 2023', description: [
        'Solely designed a comprehensive customer database using MongoDB and Django, supporting 1,200+ client records and streamlining efficiency.',
        'Built the company’s first e-commerce website using Python, HTML/CSS, and Stripe for payment processing, enabling online sales of steel products and generating $273,000 in revenue in the first year.',
      ] },
    ],
  },
  {
    label: 'side quests',
    items: [
      { title: 'treasurer', place: 'Knight Hacks', date: 'jan 2026 — present', description: [
        'Led a 100-person team as Treasurer of Knight Hacks, UCF’s largest student-run tech organization serving a community of 1,500+ students. Won best event at the UCF RSO Ceremony 2026 and was nominated for 11 other awards.',
        'Managed finances for a 501(c)(3) nonprofit, overseeing a $100k+ annual budget across sponsorships and operating expenses. Secured $90K+ in sponsorships from Fortune 500 companies to support Knight Hacks IX.',
      ] },
      { title: 'president', place: 'Florida Elite Athletics', date: 'dec 2024 — feb 2026', description: ['Helping underserved athletes across South Florida access the resources they need.'] },
      { title: 'founder', place: 'jtutors', date: 'sept 2024 — present', description: ['Leading a tutoring team that has delivered measurable results for more than 62 students.'] },
      { title: 'division lead', place: 'MDC eSports', date: 'jan 2023 — dec 2023', description: ['Led a 12-person team from unranked to national recognition.'] },
    ],
  },
];

const navigation = ['about', 'experience', 'projects', 'articles'];
const contactNavigation = [
  ['github', 'https://github.com/kwaiidev'],
  ['linkedin', 'https://www.linkedin.com/in/sacerio417/'],
  ['resume', '/resume.pdf'],
];

function ContactIcon({ label }: { label: string }) {
  if (label === 'github') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.85c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor" /></svg>;
  }

  if (label === 'linkedin') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 7.1A1.6 1.6 0 1 0 5.2 4a1.6 1.6 0 0 0 0 3.1ZM3.8 20h2.8v-9.2H3.8V20Zm4.6-9.2V20h2.8v-5.1c0-1.34.25-2.64 1.92-2.64 1.64 0 1.66 1.54 1.66 2.74V20h2.8v-5.57c0-2.74-.59-4.84-3.8-4.84-1.54 0-2.57.85-3 1.66h-.04v-1.45H8.4Z" fill="currentColor" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3Zm8 1.5V7h2.5M8.5 11h7m-7 3h7m-7 3h5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function Home() {
  const projects = getProjectSummaries();
  const articles = getAllArticles().map(({ slug, title, date, description }) => ({
    slug,
    title,
    date: formatArticleDate(date),
    description,
  }));

  return (
    <main id="main-content" className={styles.page}>
      <nav className={styles.navigation} aria-label="Page sections">
        <Link href="#home" className={styles.wordmark}>JS</Link>
        <div>
          {navigation.map((item) => <Link key={item} href={`#${item}`}>{item}</Link>)}
          {contactNavigation.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className={styles.contactIcon}><ContactIcon label={label} /></span>
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </nav>

      <section id="home" className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>welcome</p>
            <h1><span>Jason</span><span>Sacerio</span></h1>
            <p
              className={styles.performanceReadout}
              aria-label={`Latest Lighthouse build metrics: performance ${performance.performance}, largest contentful paint ${performance.lcp} seconds, cumulative layout shift ${performance.cls}, total blocking time ${performance.tbt} milliseconds, JavaScript ${performance.jsKb} kilobytes, transferred size ${performance.transferKb} kilobytes, ${performance.requests} requests`}
            >
              <span>perf <strong>{performance.performance}</strong></span>
              <span>lcp <strong>{performance.lcp}s</strong></span>
              <span>cls <strong>{performance.cls}</strong></span>
              <span>tbt <strong>{performance.tbt}ms</strong></span>
              <span>js <strong>{performance.jsKb}kb</strong></span>
              <span>transfer <strong>{performance.transferKb}kb</strong></span>
              <span>requests <strong>{performance.requests}</strong></span>
            </p>
          </div>
          <div id="about" className={styles.heroAbout}>
            <p className={styles.heroAboutCopy}>Hello, I am a third year at UCF CECS studying computer science and math. My passion is around building and turning silly ideas we make on the spot into cool products.</p>
            <p className={styles.heroAboutCopy}>Most of my work revolves around autonomous robotics, systems programming. I have had three internships and am the current Treasurer of Knight Hacks.</p>
            <p className={styles.heroAboutCopy}>For fun i like fishing, factory sims, and whatever random adventure i pick up next ;)</p>
            <dl className={styles.notes}>
              {notes.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </div>
        <a href="#about" className={styles.scrollCue}>scroll  <span>↓</span></a>
      </section>

      <section id="experience" className={styles.flowSection}>
        <header className={styles.sectionMarker}><h2>experience</h2></header>
        <div className={styles.sectionBody}><ExperienceTabs groups={experienceGroups} /></div>
      </section>

      <section id="projects" className={`${styles.flowSection} ${styles.projectsSection}`}>
        <header className={styles.sectionMarker}><h2>projects</h2></header>
        <div className={styles.sectionBody}><ProjectExplorer projects={projects} /></div>
      </section>

      <section id="articles" className={styles.flowSection}>
        <header className={styles.sectionMarker}><h2>articles</h2></header>
        <div className={styles.sectionBody}><ArticleTabs label="personal" items={articles} /></div>
      </section>
    </main>
  );
}
