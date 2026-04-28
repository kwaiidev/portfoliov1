import Link from 'next/link';

const notes = [
  ['school', 'cs + math @ UCF'],
  ['focus', 'systems programming, robotics, accessibility'],
  ['now', 'building autonomous stuff + treasurer @ Knight Hacks'],
];

const interests = [
  'low-level systems',
  'autonomous robotics',
  'swarm modeling',
  'being on the water',
];

export default function AboutPage() {
  return (
    <main id="about" className="overflow-x-hidden bg-[#0d1b2a] px-5 pb-12 pt-28 text-[#e0e1dd] sm:px-8">
      <section className="mx-auto w-full max-w-[20.5rem] sm:max-w-2xl">
        <Link href="/" className="font-mono text-sm text-[#778da9] hover:text-[#f0ebd8]">
          ../home
        </Link>

        <h1 className="mt-5 text-4xl font-semibold text-[#f0ebd8] sm:text-5xl">about</h1>
        <p className="mt-3 break-words font-mono text-sm leading-6 text-[#e0e1dd]/60">
          Jason Sacerio
        </p>

        <section className="mt-10 border-t border-[#415a77]/45 pt-6">
          <div className="space-y-5 text-sm leading-7 text-[#e0e1dd]/75 sm:text-base">
            <p>
              I&apos;m a computer science and math student at UCF who likes building close to the machine.
            </p>
            <p>
              Most of my work sits around systems, robotics, and tools that make technology easier for people to use.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-sm text-[#778da9]">quick notes</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            {notes.map(([label, value]) => (
              <li key={label} className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                <span className="font-medium text-[#f0ebd8]">{label}</span>
                <span className="break-words text-[#e0e1dd]/60">{value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-sm text-[#778da9]">things i like</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#e0e1dd]/75">
            {interests.map((interest) => (
              <li key={interest} className="break-words">- {interest}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
