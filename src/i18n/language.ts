import type { LocalizedField } from '@/domain/content';

export const LANGUAGES = ['en', 'ar', 'it'] as const;
export type Language = (typeof LANGUAGES)[number];

const DEFAULT_LANGUAGE: Language = 'en';

export const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value);

/** The visitor's saved choice first, then the browser's language ("it-IT" → "it"), then English. */
export function detectLanguage(saved: string | null, browserLanguage: string): Language {
  if (isLanguage(saved)) return saved;
  const base = browserLanguage.split('-')[0];
  return isLanguage(base) ? base : DEFAULT_LANGUAGE;
}

/** A text in one language, falling back to English, then to the key itself. */
export function translate(
  table: Record<string, Record<Language, string>>,
  key: string,
  lang: Language,
  variables?: Record<string, string>,
): string {
  const text = table[key]?.[lang] || table[key]?.en || key;
  if (!variables) return text;
  return Object.entries(variables).reduce((out, [name, value]) => out.replace(`{${name}}`, value), text);
}

/** A field that is either one plain string or one string per language. */
export function resolveLocalized(field: LocalizedField | undefined, lang: Language): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.en || '';
}

export const isRightToLeft = (lang: Language): boolean => lang === 'ar';
