import { describe, expect, it } from 'vitest';
import type { LocalizedField, Project } from '@/domain/content';
import { filterByCategory, MAX_CATEGORIES, projectCategories } from '@/domain/projects';

const resolve = (field?: LocalizedField) => (typeof field === 'string' ? field : (field?.en ?? ''));
const project = (id: string, category?: string): Project => ({ id, title: id, category });

describe('projectCategories', () => {
  it('lists each category once, in order of appearance', () => {
    const projects = [project('a', 'Mobile'), project('b', 'Web'), project('c', 'Mobile')];
    expect(projectCategories(projects, resolve)).toEqual(['Mobile', 'Web']);
  });

  it('skips projects with no category, and trims', () => {
    const projects = [project('a'), project('b', '  '), project('c', ' Web ')];
    expect(projectCategories(projects, resolve)).toEqual(['Web']);
  });

  it('offers at most MAX_CATEGORIES', () => {
    const projects = Array.from({ length: 9 }, (_, i) => project(String(i), `Category ${i}`));
    expect(projectCategories(projects, resolve)).toHaveLength(MAX_CATEGORIES);
  });
});

describe('filterByCategory', () => {
  const projects = [project('a', 'Mobile'), project('b', 'Web'), project('c')];

  it('returns everything for null', () => {
    expect(filterByCategory(projects, null, resolve)).toHaveLength(3);
  });

  it('returns only the matching category', () => {
    expect(filterByCategory(projects, 'Web', resolve).map((p) => p.id)).toEqual(['b']);
  });
});
