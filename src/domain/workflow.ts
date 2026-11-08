import type { WorkflowPhase } from '@/domain/content';
import type { Language } from '@/i18n/language';

export interface PhaseContent {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

const SKILL_SEPARATOR = '·';

/** "A · B · C" as a list; blanks are dropped. */
export function splitSkills(skills: string): string[] {
  return skills
    .split(SKILL_SEPARATOR)
    .map((skill) => skill.trim())
    .filter(Boolean);
}

/**
 * One phase in one language. A phase saved before Italian existed has no Italian fields, so each
 * field falls back to English instead of showing nothing.
 */
export function phaseContent(phase: WorkflowPhase, lang: Language): PhaseContent {
  const pick = (field: 'title' | 'sub' | 'desc' | 'skills') =>
    phase[`${lang}_${field}` as keyof WorkflowPhase] || phase[`en_${field}`];
  return {
    title: pick('title'),
    subtitle: pick('sub'),
    description: pick('desc'),
    skills: splitSkills(pick('skills')),
  };
}

/** The phases with one moved a step earlier (-1) or later (1); the same list if it cannot move. */
export function movePhase(phases: readonly WorkflowPhase[], index: number, direction: -1 | 1): WorkflowPhase[] {
  const target = index + direction;
  if (target < 0 || target >= phases.length) return [...phases];
  const moved = [...phases];
  [moved[index], moved[target]] = [moved[target], moved[index]];
  return moved;
}

/** A starting point for a phase added at the end of a list of `count` phases. */
export function blankPhase(count: number): WorkflowPhase {
  const number = String(count + 1).padStart(2, '0');
  return {
    en_title: `${number} · New phase`,
    ar_title: `${number} · مرحلة جديدة`,
    it_title: `${number} · Nuova fase`,
    en_sub: 'Subtitle',
    ar_sub: 'عنوان فرعي',
    it_sub: 'Sottotitolo',
    en_desc: 'Describe what happens in this phase.',
    ar_desc: 'وصف المرحلة.',
    it_desc: 'Descrivi cosa succede in questa fase.',
    en_skills: 'Skill A · Skill B',
    ar_skills: 'مهارة أ · مهارة ب',
    it_skills: 'Competenza A · Competenza B',
  };
}
