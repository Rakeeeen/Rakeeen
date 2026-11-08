import { describe, expect, it } from 'vitest';
import type { Project } from '@/domain/content';
import { findProject, MAX_GALLERY_ROWS, projectGallery } from '@/domain/projectDetail';

const project = (id: string, extra: Partial<Project> = {}): Project => ({ id, title: id, ...extra });
const projects = [project('a'), project('b'), project('c')];

describe('findProject', () => {
  it('finds the project and both neighbours', () => {
    const found = findProject(projects, 'b');
    expect(found?.project.id).toBe('b');
    expect(found?.previous?.id).toBe('a');
    expect(found?.next?.id).toBe('c');
  });

  it('has no previous for the first and no next for the last', () => {
    expect(findProject(projects, 'a')?.previous).toBeNull();
    expect(findProject(projects, 'c')?.next).toBeNull();
  });

  it('is null for an id that does not exist', () => {
    expect(findProject(projects, 'zzz')).toBeNull();
    expect(findProject(projects, undefined)).toBeNull();
  });
});

describe('projectGallery', () => {
  it('prefers the captioned gallery', () => {
    const gallery = [{ url: '1.png', caption: 'one' }];
    expect(projectGallery(project('a', { gallery, detailImages: ['x.png'] }))).toEqual(gallery);
  });

  it('falls back to the plain detail images', () => {
    expect(projectGallery(project('a', { detailImages: ['x.png', 'y.png'] }))).toEqual([{ url: 'x.png' }, { url: 'y.png' }]);
  });

  it('is empty with no pictures, and shows at most MAX_GALLERY_ROWS', () => {
    expect(projectGallery(project('a'))).toEqual([]);
    const many = Array.from({ length: 6 }, (_, i) => ({ url: `${i}.png` }));
    expect(projectGallery(project('a', { gallery: many }))).toHaveLength(MAX_GALLERY_ROWS);
  });
});
