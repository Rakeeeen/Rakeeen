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
