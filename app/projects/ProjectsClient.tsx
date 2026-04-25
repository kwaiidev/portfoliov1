'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Code2, ImageIcon, Layers } from 'lucide-react';
import CSSWaves from '../components/CSSWaves';
import type { ProjectBase } from './projects-data';

export type Project = ProjectBase & {
  images: string[];
};

function ProjectVisual({
  project,
  className = '',
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
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
    <div className={`relative overflow-hidden bg-[#0d1b2a] ${className}`}>
      {hasImages ? (
        <NextImage
          key={currentImage}
          src={currentImage}
          alt={`${project.title} project image ${imageIndex + 1}`}
          fill
          sizes={priority ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: project.imagePosition ?? 'center' }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(65,90,119,0.18)_0%,rgba(13,27,42,0.35)_42%,rgba(224,225,221,0.08)_100%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(224,225,221,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(224,225,221,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-lg border border-[#e0e1dd]/20 bg-[#0d1b2a]/60 text-[#e0e1dd] shadow-2xl">
            <ImageIcon className="h-9 w-9" aria-hidden="true" />
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/95 via-[#0d1b2a]/30 to-transparent" />

      {canCarousel && (
        <>
          <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e1dd]/30 bg-[#0d1b2a]/75 text-[#f0ebd8] shadow-lg backdrop-blur-sm transition hover:bg-[#1b263b]"
              aria-label={`Show previous ${project.title} image`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e1dd]/30 bg-[#0d1b2a]/75 text-[#f0ebd8] shadow-lg backdrop-blur-sm transition hover:bg-[#1b263b]"
              aria-label={`Show next ${project.title} image`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#e0e1dd]/15 bg-[#0d1b2a]/70 px-3 py-2 shadow-lg backdrop-blur-sm">
            {project.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setImageIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  imageIndex === index ? 'w-6 bg-[#f0ebd8]' : 'w-2 bg-[#f0ebd8]/45 hover:bg-[#f0ebd8]/80'
                }`}
                aria-label={`Show ${project.title} image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TechTags({ tags, compact = false }: { tags: string[]; compact?: boolean }) {
  const visibleTags = compact ? tags.slice(0, 6) : tags;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[#748cab]/30 bg-[#415a77]/20 px-3 py-1 text-xs font-medium text-[#e0e1dd]"
        >
          {tag}
        </span>
      ))}
      {compact && tags.length > visibleTags.length && (
        <span className="rounded-full border border-[#e0e1dd]/15 bg-[#e0e1dd]/10 px-3 py-1 text-xs font-medium text-[#e0e1dd]/80">
          +{tags.length - visibleTags.length}
        </span>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  return (
    <motion.article
      className="group flex min-h-[620px] flex-col overflow-hidden rounded-lg border border-[#415a77]/30 bg-[#0d1b2a]/88 shadow-2xl shadow-black/20 backdrop-blur-sm"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
    >
      <ProjectVisual project={project} className="h-72 shrink-0" priority={priority} />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="inline-flex min-w-0 flex-1 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8c0d8]">
            <Layers className="h-4 w-4" aria-hidden="true" />
            {project.category}
          </span>
          {project.award && (
            <span className="inline-flex max-w-[58%] shrink-0 items-start gap-1.5 rounded-full bg-[#f0ebd8] px-3 py-1.5 text-xs font-bold text-[#0d1b2a]">
              <Award className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="min-w-0 leading-5">{project.award}</span>
            </span>
          )}
        </div>

        <h2 className="text-2xl font-bold text-[#f0ebd8]">{project.title}</h2>
        <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#e0e1dd]/82">
          {project.description}
        </p>

        <div className="mt-5">
          <TechTags tags={project.tech} compact />
        </div>

        <div className="mt-auto border-t border-[#415a77]/30 pt-5">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8c0d8]">
            <Code2 className="h-4 w-4" aria-hidden="true" />
            build notes
          </p>
          <ul className="space-y-2">
            {project.expandedDescription.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-[#e0e1dd]/78">
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#a8c0d8]" aria-hidden="true" />
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <CSSWaves className="relative min-h-screen">
      <main className="min-h-screen px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.section
            className="mb-10 max-w-3xl"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#a8c0d8]">
              selected work
            </p>
            <h1 className="text-4xl font-bold text-[#f0ebd8] sm:text-5xl lg:text-6xl">
              projects
            </h1>
            <p className="mt-5 text-base leading-7 text-[#e0e1dd]/80 sm:text-lg">
              A mix of robotics, accessibility, computer vision, web, and systems projects. The layout is built for real screenshots and build photos, so each card can carry the work visually.
            </p>
          </motion.section>

          <section className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} priority={index === 0} />
            ))}
          </section>
        </div>
      </main>
    </CSSWaves>
  );
}
