import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LocalizedField } from '@/domain/content';
import {
  detectLanguage,
  isRightToLeft,
  resolveLocalized,
  translate,
  type Language,
} from '@/i18n/language';
import { UI_TRANSLATIONS } from '@/i18n/translations';

const STORAGE_KEY = 'site_lang';

interface LangContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** A fixed line of the interface. */
  t: (key: string, variables?: Record<string, string>) => string;
  /** A piece of content that comes in one string per language. */
  resolveField: (field?: LocalizedField) => string;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() =>
    detectLanguage(localStorage.getItem(STORAGE_KEY), navigator.language),
  );

  // Until the visitor picks a language, the site follows the system's.
  useEffect(() => {
    const follow = () => {
      if (!localStorage.getItem(STORAGE_KEY)) setLang(detectLanguage(null, navigator.language));
    };
    window.addEventListener('languagechange', follow);
    return () => window.removeEventListener('languagechange', follow);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    const root = document.documentElement;
    root.lang = lang;
    root.dir = isRightToLeft(lang) ? 'rtl' : 'ltr';
    root.classList.toggle('rtl', isRightToLeft(lang));
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: (key, variables) => translate(UI_TRANSLATIONS, key, lang, variables),
      resolveField: (field) => resolveLocalized(field, lang),
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = (): LangContextValue => {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within a LangProvider');
  return context;
};
