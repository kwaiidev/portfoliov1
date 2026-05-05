import Link from 'next/link';

const current = [
  'cs + math @ UCF',
  'building autonomous stuff',
  'incoming @ ???, treasurer @ Knight Hacks',
];

const selected = [
  {
    title: 'Guido',
    description: 'autonomous voice controlled wheelchair',
    href: '/projects/guido',
  },
  {
    title: 'Conduit',
    description: 'accessibility interface using EEG and CV',
    href: '/projects/conduit',
  },
  {
    title: 'ZPM-TUNA',
    description: 'autonomous SWARM drones for dynamic evacuation',
    href: '/projects/zpmtuna',
  },
];

export default function Home() {
  return (
    <main id="home" className="overflow-x-hidden bg-[#0d1b2a] px-5 pb-12 pt-28 text-[#e0e1dd] sm:px-8">
      <section className="mx-auto w-full max-w-[20.5rem] sm:max-w-2xl">
        <h1 className="text-4xl font-semibold text-[#f0ebd8] sm:text-5xl">Jason Sacerio</h1>
        <p className="mt-3 break-words font-mono text-sm leading-6 text-[#e0e1dd]/60">
          systems programmer
        </p>


        <section className="mt-10">
          <h2 className="font-mono text-sm text-[#778da9]">current</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#e0e1dd]/75">
            {current.map((item) => (
              <li key={item} className="break-words">- {item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-sm text-[#778da9]">selected projects</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            {selected.map((project) => (
              <li key={project.title} className="grid gap-1 sm:grid-cols-[9rem_1fr]">
                <Link href={project.href} className="font-medium text-[#f0ebd8] hover:text-[#778da9]">
                  {project.title}
                </Link>
                <span className="break-words text-[#e0e1dd]/60">{project.description}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
