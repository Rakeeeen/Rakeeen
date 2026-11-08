import type { LocalizedField, Project } from '@/domain/content';

type Resolve = (field?: LocalizedField) => string;

/** The most filter buttons the projects page offers besides "All". */
export const MAX_CATEGORIES = 5;

const categoryOf = (project: Project, resolve: Resolve) => resolve(project.category).trim();

/** The categories the projects belong to, in the order they first appear, without repeats or blanks. */
export function projectCategories(projects: readonly Project[], resolve: Resolve): string[] {
  const seen = new Set<string>();
  for (const project of projects) {
    const category = categoryOf(project, resolve);
    if (category) seen.add(category);
  }
  return [...seen].slice(0, MAX_CATEGORIES);
}

/** The projects of one category; `null` means all of them. */
export function filterByCategory(projects: readonly Project[], category: string | null, resolve: Resolve): Project[] {
  return category === null ? [...projects] : projects.filter((project) => categoryOf(project, resolve) === category);
}
