import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import { LANGUAGES } from '@/i18n/language';

/** The language picker: the current language as a small button that opens the other two. */
export const LanguageMenu = () => {
  const { lang, setLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false);
    document.addEventListener('click', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('click', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="language-menu" ref={root}>
      <button
        type="button"
        className="language-menu__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {lang.toUpperCase()}
      </button>
      {isOpen && (
        <ul className="language-menu__list rounded-box" role="listbox">
          {LANGUAGES.map((option) => (
            <li key={option} role="option" aria-selected={option === lang}>
              <button
                type="button"
                className={`language-menu__option ${option === lang ? 'language-menu__option--selected' : ''}`}
                onClick={() => {
                  setLang(option);
                  setIsOpen(false);
                }}
              >
                {option.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
