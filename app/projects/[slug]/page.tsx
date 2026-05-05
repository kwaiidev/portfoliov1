import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '../projects-data';
import { getProjectBySlug, getProjectImages } from '../project-utils';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const images = getProjectImages(project.slug);

  return (
    <main className="overflow-x-hidden bg-[#0d1b2a] px-5 pb-12 pt-28 text-[#e0e1dd] sm:px-8">
      <section className="mx-auto w-full max-w-[20.5rem] sm:max-w-3xl">
        <Link href="/projects" className="font-mono text-sm text-[#778da9] hover:text-[#f0ebd8]">
          ../projects
        </Link>
        <h1 className="mt-10 text-4xl font-semibold text-[#f0ebd8] sm:text-5xl">{project.title}</h1>
        <p className="mt-3 font-mono text-sm text-[#778da9]">{project.category}</p>
        {project.award && (
          <p className="mt-2 font-mono text-xs text-[#EFBF04]">{project.award}</p>
        )}

        <p className="mt-6 break-words text-sm leading-6 text-[#e0e1dd]/75">{project.description}</p>

        <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#778da9]/80">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </p>

        {images.length > 0 && (
          <section className="mt-8">
            <h2 className="font-mono text-sm text-[#778da9]">images</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {images.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${project.title} project image`}
                  width={1280}
                  height={720}
                  className="h-full w-full border border-[#415a77]/45 object-cover"
                  style={{ objectPosition: project.imagePosition ?? 'center' }}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 border-t border-[#415a77]/45 pt-6">
          <h2 className="font-mono text-sm text-[#778da9]">build notes</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-[#e0e1dd]/60">
            {project.expandedDescription.map((item) => (
              <li key={item} className="break-words">
                - {item}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
