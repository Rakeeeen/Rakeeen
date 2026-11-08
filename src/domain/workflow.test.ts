import { describe, expect, it } from 'vitest';
import type { WorkflowPhase } from '@/domain/content';
import { blankPhase, movePhase, phaseContent, splitSkills } from '@/domain/workflow';

const phase: WorkflowPhase = {
  en_title: '01 · DISCOVERY', ar_title: '01 · الاكتشاف',
  en_sub: 'RESEARCH', ar_sub: 'بحث',
  en_desc: 'We start with the problem.', ar_desc: 'نبدأ بالمشكلة.',
  en_skills: 'Research · Strategy', ar_skills: 'بحث · استراتيجية',
  it_title: '01 · SCOPERTA',
};

describe('splitSkills', () => {
  it('splits on the middle dot and trims', () => {
    expect(splitSkills('A · B ·C')).toEqual(['A', 'B', 'C']);
  });

  it('drops blanks', () => {
    expect(splitSkills(' · A · · ')).toEqual(['A']);
    expect(splitSkills('')).toEqual([]);
  });
});

describe('phaseContent', () => {
  it('uses the language asked for', () => {
    expect(phaseContent(phase, 'ar').title).toBe('01 · الاكتشاف');
    expect(phaseContent(phase, 'ar').skills).toEqual(['بحث', 'استراتيجية']);
  });

  it('falls back to English for a field the language lacks', () => {
    const italian = phaseContent(phase, 'it');
    expect(italian.title).toBe('01 · SCOPERTA');
    expect(italian.subtitle).toBe('RESEARCH');
    expect(italian.description).toBe('We start with the problem.');
  });
});

describe('movePhase', () => {
  const list = [blankPhase(0), blankPhase(1), blankPhase(2)];

  it('swaps a phase with its neighbour', () => {
    expect(movePhase(list, 1, -1).map((p) => p.en_title.slice(0, 2))).toEqual(['02', '01', '03']);
    expect(movePhase(list, 1, 1).map((p) => p.en_title.slice(0, 2))).toEqual(['01', '03', '02']);
  });

  it('leaves the list alone at either end, and does not change the original', () => {
    expect(movePhase(list, 0, -1)).toEqual(list);
    expect(movePhase(list, 2, 1)).toEqual(list);
    expect(list[0].en_title.slice(0, 2)).toBe('01');
  });
});

describe('blankPhase', () => {
  it('numbers the new phase after the existing ones, in all three languages', () => {
    const phase = blankPhase(5);
    expect(phase.en_title.startsWith('06')).toBe(true);
    expect(phase.ar_title.startsWith('06')).toBe(true);
    expect(phase.it_title?.startsWith('06')).toBe(true);
  });
});
