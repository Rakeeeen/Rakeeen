import { describe, expect, it } from 'vitest';
import { detectLanguage, isRightToLeft, resolveLocalized, translate } from '@/i18n/language';

describe('detectLanguage', () => {
  it('prefers what the visitor saved', () => {
    expect(detectLanguage('it', 'ar-EG')).toBe('it');
  });

  it('falls back to the browser language, ignoring the region', () => {
    expect(detectLanguage(null, 'ar-EG')).toBe('ar');
    expect(detectLanguage(null, 'it')).toBe('it');
  });

  it('ignores a saved value that is not a language', () => {
    expect(detectLanguage('fr', 'it-IT')).toBe('it');
  });

  it('uses English when nothing matches', () => {
    expect(detectLanguage(null, 'fr-FR')).toBe('en');
  });
});

describe('translate', () => {
  const table = { hello: { en: 'Hello, {name}', ar: 'أهلا {name}', it: '' } };

  it('fills the slots', () => {
    expect(translate(table, 'hello', 'ar', { name: 'Hamed' })).toBe('أهلا Hamed');
  });

  it('falls back to English when a language is empty', () => {
    expect(translate(table, 'hello', 'it', { name: 'Hamed' })).toBe('Hello, Hamed');
  });

  it('returns the key when it is unknown', () => {
    expect(translate(table, 'missing', 'en')).toBe('missing');
  });
});

describe('resolveLocalized', () => {
  it('returns a plain string as it is', () => {
    expect(resolveLocalized('Rakeeen', 'ar')).toBe('Rakeeen');
  });

  it('picks the language, falling back to English', () => {
    expect(resolveLocalized({ en: 'Designer', ar: '', it: 'Designer IT' }, 'ar')).toBe('Designer');
    expect(resolveLocalized({ en: 'Designer', ar: '', it: 'Designer IT' }, 'it')).toBe('Designer IT');
  });

  it('is empty for nothing', () => {
    expect(resolveLocalized(undefined, 'en')).toBe('');
  });
});

describe('isRightToLeft', () => {
  it('is true only for Arabic', () => {
    expect(isRightToLeft('ar')).toBe(true);
    expect(isRightToLeft('en')).toBe(false);
  });
});
