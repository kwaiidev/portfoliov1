'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectSummary } from '@/lib/projects';
import styles from './projects.module.css';

type ProjectPreviewProps = {
  project: ProjectSummary;
  imageIndex: number;
  onImageChange: (index: number) => void;
  id: string;
};

function ArrowIcon({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.arrowIcon} data-direction={direction}>
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ProjectBlueprint({ project }: { project: ProjectSummary }) {
  return (
    <div className={styles.blueprint} role="img" aria-label={`${project.title} technical summary`}>
      <p className={styles.blueprintCode}>project / {String(project.order).padStart(2, '0')}</p>
      <p className={styles.blueprintTitle}>{project.title}</p>
      <ul>
        {project.tech.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
      <p className={styles.blueprintNote}>documentation-first / no media attached</p>
    </div>
  );
}

function ProjectPreview({ project, imageIndex, onImageChange, id }: ProjectPreviewProps) {
  const imageCount = project.images.length;
  const safeImageIndex = imageCount > 0 ? imageIndex % imageCount : 0;
  const currentImage = project.images[safeImageIndex];
  const hasMultipleImages = imageCount > 1;
  const headingId = `${id}-title`;

  return (
    <section id={id} className={styles.preview} aria-labelledby={headingId}>
      <div className={styles.previewTopline}>
        <p>{project.year ?? 'project'}</p>
        <p>{imageCount > 0 ? `${String(safeImageIndex + 1).padStart(2, '0')} / ${String(imageCount).padStart(2, '0')}` : 'system brief'}</p>
      </div>

      <div className={styles.mediaStage} data-has-image={Boolean(currentImage)}>
        {currentImage ? (
          <Image
            key={`${project.slug}-${currentImage.src}`}
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 900px) calc(100vw - 2.3rem), (max-width: 1400px) 46vw, 620px"
            className={styles.previewImage}
            style={{ objectPosition: currentImage.focalPoint ?? 'center' }}
          />
        ) : (
          <ProjectBlueprint project={project} />
        )}

        {hasMultipleImages && (
          <div className={styles.mediaControls}>
            <button
              type="button"
              onClick={() => onImageChange((safeImageIndex - 1 + imageCount) % imageCount)}
              aria-label={`Previous ${project.title} image`}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => onImageChange((safeImageIndex + 1) % imageCount)}
              aria-label={`Next ${project.title} image`}
            >
              <ArrowIcon />
            </button>
          </div>
        )}
      </div>

      {hasMultipleImages && (
        <div className={styles.mediaRail} role="group" aria-label={`${project.title} image selection`}>
          {project.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onImageChange(index)}
              aria-label={`Show ${project.title} image ${String(index + 1).padStart(2, '0')}`}
              aria-pressed={index === safeImageIndex}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      )}

      {currentImage && (
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Image {safeImageIndex + 1} of {imageCount}: {currentImage.alt}
        </p>
      )}

      <div className={styles.previewCopy}>
        <div>
          <h3 id={headingId}>{project.title}</h3>
          <p className={styles.previewSummary}>{project.summary}</p>
          <p className={styles.previewStack}>stack: {project.tech.slice(0, 3).join(' / ')}</p>
          {project.award && <p className={styles.previewAward}>award: {project.award}</p>}
        </div>

        <ul className={styles.previewHighlights} aria-label="Engineering highlights">
          {project.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      </div>

      <footer className={styles.previewFooter}>
        <Link href={`/projects/${project.slug}`}>
          open case study <ArrowIcon />
        </Link>
        {project.links.map((link) => {
          const external = link.href.startsWith('http');

          return (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          );
        })}
      </footer>
    </section>
  );
}

export default function ProjectExplorer({ projects }: { projects: ProjectSummary[] }) {
  const initialProject = projects.find((project) => project.featured) ?? projects[0];
  const [selectedSlug, setSelectedSlug] = useState(initialProject?.slug ?? '');
  const [imageIndex, setImageIndex] = useState(0);

  const selectedProject = projects.find((project) => project.slug === selectedSlug) ?? projects[0];

  const selectProject = (slug: string) => {
    setSelectedSlug(slug);
    setImageIndex(0);
  };

  return (
    <section aria-label="Project explorer">
      {selectedProject ? (
        <div className={styles.explorerGrid}>
          <ol className={styles.projectRail}>
            {projects.map((project, index) => {
              const isSelected = project.slug === selectedProject.slug;

              return (
                <li key={project.slug} data-selected={isSelected}>
                  <div className={styles.projectRow}>
                    <button
                      type="button"
                      className={styles.projectSelect}
                      onClick={() => selectProject(project.slug)}
                      aria-expanded={isSelected}
                      aria-controls={isSelected ? `project-preview-${project.slug} project-preview-desktop` : undefined}
                    >
                      <span className={styles.projectIndex}>{String(index + 1).padStart(2, '0')}</span>
                      <span className={styles.projectName}>{project.title}</span>
                      <span className={styles.projectSummary}>{project.summary}</span>
                      <span className={styles.projectStack}>stack: {project.tech.slice(0, 3).join(' / ')}</span>
                      {project.award && <span className={styles.projectAward}>award: {project.award}</span>}
                    </button>

                    <Link href={`/projects/${project.slug}`} className={styles.rowLink} aria-label={`Open ${project.title} case study`}>
                      <ArrowIcon />
                    </Link>
                  </div>

                  {isSelected && (
                    <div className={styles.mobilePreview}>
                      <ProjectPreview
                        id={`project-preview-${project.slug}`}
                        project={selectedProject}
                        imageIndex={imageIndex}
                        onImageChange={setImageIndex}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <aside className={styles.desktopPreview} aria-label="Selected project">
            <ProjectPreview
              id="project-preview-desktop"
              project={selectedProject}
              imageIndex={imageIndex}
              onImageChange={setImageIndex}
            />
          </aside>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>nothing in this slice of the archive.</p>
        </div>
      )}
    </section>
  );
}
