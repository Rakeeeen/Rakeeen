import type { GalleryImage, Project } from '@/domain/content';

/** How many picture rows a project page shows; each pairs a picture with one of the fixed captions. */
export const MAX_GALLERY_ROWS = 3;

export interface ProjectNeighbours {
  project: Project;
  previous: Project | null;
  next: Project | null;
}

/** A project with the ones on either side of it in the list, or null for an id nobody has. */
export function findProject(projects: readonly Project[], id: string | undefined): ProjectNeighbours | null {
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return null;
  return {
    project: projects[index],
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}

/** The project's pictures: the captioned gallery if it has one, else its plain detail images. */
export function projectGallery(project: Project): GalleryImage[] {
  const gallery = project.gallery ?? project.detailImages?.map((url) => ({ url })) ?? [];
  return gallery.slice(0, MAX_GALLERY_ROWS);
}
