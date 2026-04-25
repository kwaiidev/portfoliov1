import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import ProjectsClient, { type Project } from './ProjectsClient';
import { projects } from './projects-data';

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const projectsImageRoot = join(process.cwd(), 'public', 'projects');
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

function isProjectImage(fileName: string) {
  const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

  return imageExtensions.has(extension);
}

function sortImages(images: string[]) {
  return images.sort((first, second) => {
    const firstName = first.split('/').pop() ?? first;
    const secondName = second.split('/').pop() ?? second;

    return collator.compare(firstName, secondName);
  });
}

function getProjectImages(slug: string) {
  if (!existsSync(projectsImageRoot)) {
    return [];
  }

  const directImages = readdirSync(projectsImageRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => isProjectImage(fileName))
    .filter((fileName) => fileName.startsWith(`${slug}.`) || fileName.startsWith(`${slug}-`))
    .map((fileName) => `/projects/${fileName}`);

  const projectFolder = join(projectsImageRoot, slug);
  const folderImages = existsSync(projectFolder)
    ? readdirSync(projectFolder, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => isProjectImage(fileName))
      .map((fileName) => `/projects/${slug}/${fileName}`)
    : [];

  return sortImages([...directImages, ...folderImages]);
}

export default function Projects() {
  const projectsWithImages: Project[] = projects.map((project) => ({
    ...project,
    images: getProjectImages(project.slug),
  }));

  return <ProjectsClient projects={projectsWithImages} />;
}
