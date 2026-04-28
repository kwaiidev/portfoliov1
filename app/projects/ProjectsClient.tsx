'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import type { ProjectBase } from './projects-data';

export type Project = ProjectBase & {
  images: string[];
};

function ProjectImage({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [imageIndex, setImageIndex] = useState(0);
  const currentImage = project.images[imageIndex];
  const hasImages = project.images.length > 0;
  const canCarousel = project.images.length > 1;

  const showPreviousImage = () => {
    setImageIndex((current) => (current - 1 + project.images.length) % project.images.length);
  };

  const showNextImage = () => {
    setImageIndex((current) => (current + 1) % project.images.length);
  };

  return (
    <div className="relative mt-5 aspect-[4/3] overflow-hidden border border-[#415a77]/45 bg-[#0d1b2a] sm:aspect-[16/9]">
      {hasImages ? (
        <NextImage
          key={currentImage}
          src={currentImage}
          alt={`${project.title} project image ${imageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          priority={priority}
          className="object-cover"
          style={{ objectPosition: project.imagePosition ?? 'center' }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[#778da9]">
          <ImageIcon className="h-10 w-10" aria-hidden="true" />
        </div>
      )}
      {canCarousel && (
        <>
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
            <button
              type="button"
              onClick={showPreviousImage}
              className="flex h-9 w-9 items-center justify-center bg-[#0d1b2a]/80 text-[#f0ebd8] hover:bg-[#1b263b]"
              aria-label={`Show previous ${project.title} image`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNextImage}
              className="flex h-9 w-9 items-center justify-center bg-[#0d1b2a]/80 text-[#f0ebd8] hover:bg-[#1b263b]"
              aria-label={`Show next ${project.title} image`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p className="absolute bottom-3 right-3 bg-[#0d1b2a]/80 px-2 py-1 font-mono text-xs text-[#e0e1dd]/75">
            {imageIndex + 1}/{project.images.length}
          </p>
        </>
      )}
    </div>
  );
}

function ProjectEntry({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="py-10 text-sm leading-6">
      <div className="grid gap-1 sm:grid-cols-[8rem_1fr]">
        <p className="font-mono text-[#778da9]">{project.category}</p>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <h2 className="text-2xl font-medium text-[#f0ebd8]">{project.title}</h2>
            {project.award && (
              <span className="font-mono text-xs text-[#EFBF04]">{project.award}</span>
            )}
          </div>
          <p className="mt-3 break-words text-[#e0e1dd]/75">{project.description}</p>
        </div>
      </div>
      <div className="sm:ml-[8rem]">
        <ProjectImage project={project} priority={priority} />

        <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#778da9]/80">{project.tech.map((tech) => (<span key={tech}>{tech}</span>))}</p>
        <section className="mt-5 border-t border-[#415a77]/45 p t-5">
          <h3 className="font-mono mt-2 text-sm text-[#778da9]">build notes</h3>
          <ul className="mt-3 space-y-2 text-[#e0e1dd]/60">{project.expandedDescription.map((item) => (<li key={item} className="break-words">- {item}</li>))}</ul>
        </section>
      </div>
    </article>
  );
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <main id="projects" className="overflow-x-hidden bg-[#0d1b2a] px-5 pb-12 pt-28 text-[#e0e1dd] sm:px-8">
      <section className="mx-auto w-full max-w-[20.5rem] sm:max-w-3xl">
        <Link href="/" className="font-mono text-sm text-[#778da9] hover:text-[#f0ebd8]">
          ../home
        </Link>
        <h1 className="mt-10 text-4xl font-semibold text-[#f0ebd8] sm:text-5xl">projects</h1>
        <p className="mt-3 break-words font-mono text-sm leading-6 text-[#e0e1dd]/60">fun stuff</p>
        <section className="mt-10 border-t border-[#415a77]/45 pt-6">{projects.map((project, index) => (<ProjectEntry key={project.slug} project={project} priority={index === 0} />))}</section>
      </section>
    </main>
  );
}
