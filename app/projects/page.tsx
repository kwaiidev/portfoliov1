import ProjectsClient, { type Project } from './ProjectsClient';
import { projects } from './projects-data';
import { getProjectImages } from './project-utils';

export default function Projects() {
  const projectsWithImages: Project[] = projects.map((project) => ({
    ...project,
    images: getProjectImages(project.slug),
  }));

  return <ProjectsClient projects={projectsWithImages} />;
}
