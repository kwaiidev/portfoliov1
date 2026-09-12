import Image from 'next/image';
import type { ProjectImage } from '@/lib/projects';
import styles from './media-gallery.module.css';

export default function MediaGallery({
  title,
  images,
}: {
  title: string;
  images: ProjectImage[];
}) {
  if (images.length === 0) {
    return null;
  }

  const [primaryImage, ...secondaryImages] = images;

  return (
    <section className={styles.gallery} aria-label={`${title} project media`}>
      <a
        href={primaryImage.src}
        target="_blank"
        rel="noopener noreferrer"
      >
        <figure className={styles.primaryFigure}>
          <div className={styles.primaryFrame}>
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              priority
              sizes="(max-width: 900px) calc(100vw - 2.3rem), (max-width: 1440px) calc(100vw - 8rem), 1312px"
              className={styles.image}
              style={{ objectPosition: primaryImage.focalPoint ?? 'center' }}
            />
            <span className={styles.expandLabel}>open original ↗</span>
          </div>
          <figcaption>
            <span>01 / {String(images.length).padStart(2, '0')}</span>
            <span>{primaryImage.caption ?? primaryImage.alt}</span>
          </figcaption>
        </figure>
      </a>

      {secondaryImages.length > 0 && (
        <div className={styles.mediaStrip} aria-label="More project images">
          {secondaryImages.map((image, index) => (
            <a
              key={image.src}
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure>
                <div className={styles.secondaryFrame}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 700px) 78vw, (max-width: 1200px) 42vw, 470px"
                    className={styles.image}
                    style={{ objectPosition: image.focalPoint ?? 'center' }}
                  />
                </div>
                <figcaption>
                  <span>{String(index + 2).padStart(2, '0')}</span>
                  <span>{image.caption ?? image.alt}</span>
                </figcaption>
              </figure>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
