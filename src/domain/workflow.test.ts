import { describe, expect, it } from 'vitest';
import type { WorkflowPhase } from '@/domain/content';
import { phaseContent, splitSkills } from '@/domain/workflow';

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
