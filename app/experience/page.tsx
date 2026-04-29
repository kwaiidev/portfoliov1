import Link from 'next/link';

type ExperienceItem = {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  tech?: string[];
  details: string[];
};

const experience: ExperienceItem[] = [
  {
    title: 'software engineer intern',
    subtitle: 'incoming @ ???',
    tech: ['C++', 'ROS2', 'gazebo', 'NAV2'],
    date: 'May 2026 - August 2026',
    description: 'cool autonomous stuff',
    details: ['making drone talk to eachother'],
  },
  {
    title: 'treasurer',
    subtitle: 'Knight Hacks',
    date: 'Jan 2026 - Present',
    description: 'Actively managing the financials and operations of Knight Hacks, the largest technical organization at UCF',
    details: ['Led a 100-person team as Treasurer of Knight Hacks, UCF’s Largest student-run tech organization serving acommunity of 1500+ students',
    'Managed finances for a 501(c)(3) nonprofit, overseeing a $100k+ annual budget across sponsorships and operating expenses. Secured $90K+ in sponsorships from Fortune 500 companies to support Knight Hacks IX'],
  },
  {
    title: 'researcher',
    subtitle: 'Knights Scholars Research Program',
    tech: ['python', 'C++', 'ROS2', 'QEMU', 'LlamaGPT'],
    date: 'Oct. 2025 - Present',
    description: 'Conducting research on security and fault tolerance of LLMs for embedded systems.',
    details: [
      'Conducted research on security and fault tolerance of LLMs for embedded systems, evaluating the impact of soft errors and adversarial attacks using real hardware and Gem5 simulation',
      'Analyzed mitigation strategies for LLM vulnerabilities, including memory bit-flip attacks and novel embedded-specific attack vectors, across platforms such as embedded boards and mobile devices (Android/iOS)',
    ],
  },
  {
    title: 'founder',
    subtitle: 'jtutors',
    date: 'sept 2024 - present',
    description: 'Led and managed a team of three, coordinating meetings, scheduling, and individualized lesson planning.',
    details: [
      'Led and managed a team of three, driving efficient coordination of meetings, scheduling, and individualized lesson planning to ensure seamless weekly execution of tutoring programs.',
      'Delivered measurable results for 62+ students in mathematics, with SAT students achieving an average 20-percentile score increase and classroom students improving by an average of 20% in overall grades.',
    ],
  },
  {
    title: 'president',
    subtitle: 'Florida Elite Athletics',
    date: 'Dec 2024 - Feb 2026',
    description: 'Help under served athletes around South Florida get the resources needed to succeed.',
    details: [
      'Help under served athletes around South Florida get the resources needed to succeed.',
      'Work with a team of 4 to create dreams come true for kids in the community of Broward County.',
    ],
  },
  {
    title: 'software engineer intern',
    subtitle: 'Blackstone',
    tech: ['python', 'pandas', 'numpy', 'SQL'],
    date: 'apr 2024 - sept 2024',
    description: 'Invited as 1 of 20 university students to gain insight and mentorship from engineers at Blackstone.',
    details: [
      'Invited as 1 of 20 university students to participate in gaining valuable insight and mentorship from engineers at Blackstone.',
      "Optimized Python-based back-end for the finance department, refactoring critical data pipelines and improving database queries, which reduced end-of-day report generation time by 30% and increased the reliability of financial data processing.",
    ],
  },
  {
    title: 'software engineer intern',
    subtitle: 'Capitol Steel Structures',
    tech: ['python', 'mongodb', 'django', 'html', 'css', 'stripe'],
    date: 'jan 2023 - aug 2023',
    description: 'Designed and implemented an ecommerce platform using MongoDB and Django.',
    details: [
      'Solely designed and implemented a comprehensive customer database using MongoDB and Django, streamlining data management and operational workflows to support increased client volume.',
      "Built and launched the company's first e-commerce website using Python, HTML/CSS, and Stripe for payment processing, enabling online sales of steel products and generating $273,000 in revenue in the first year.",
    ],
  },
  {
    title: 'division lead',
    subtitle: 'MDC eSports',
    date: 'jan 2023 - dec 2023',
    description: 'Orchestrated and coordinated all project phases, managing large-scale events with up to 30 attendees.',
    details: [
      'Orchestrated and coordinated all project phases, managing large-scale events with up to 30 attendees and ensuring flawless execution through strategic design and scheduling.',
      'Directed and supervised a 12-member team in a previously unranked program, elevating it to national recognition, achieving Top 200 in the United States and Top 50 in the Southeast, while demonstrating strong leadership and organizational skills.',
    ],
  },
];

export default function ExperiencePage() {
  return (
    <main id="experience" className="overflow-x-hidden bg-[#0d1b2a] px-5 pb-12 pt-28 text-[#e0e1dd] sm:px-8">
      <section className="mx-auto w-full max-w-[20.5rem] sm:max-w-3xl">
        <Link href="/" className="font-mono text-sm text-[#778da9] hover:text-[#f0ebd8]">
          ../home
        </Link>
        <h1 className="mt-10 text-4xl font-semibold text-[#f0ebd8] sm:text-5xl">experience</h1>
        <p className="mt-3 break-words font-mono text-sm leading-6 text-[#e0e1dd]/60">work, research</p>
        <section className="mt-10 border-t border-[#415a77]/45 pt-6">
          <ul className="space-y-10">
            {experience.map((item) => (
              <li key={`${item.subtitle}-${item.title}`} className="text-sm leading-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h2 className="text-lg font-medium text-[#f0ebd8]">{item.title}</h2>
                    <p className="mt-1 text-[#e0e1dd]/60">{item.subtitle}</p>
                  </div>
                  <p className="shrink-0 whitespace-nowrap text-right font-mono text-[#778da9]">{item.date}</p>
                </div>

                {item.tech && (
                  <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#778da9]/80">
                    {item.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </p>
                )}
                <p className="mt-4 break-words text-[#e0e1dd]/75">{item.description}</p>
                <ul className="mt-3 space-y-2 text-[#e0e1dd]/60">
                  {item.details.map((detail) => (
                    <li key={detail} className="break-words">- {detail}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
