import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { UISettings } from '@/domain/content';
import { useSiteContent } from '@/data/SiteContent';

const STORAGE_KEY = 'visitor_settings';

interface SettingsValue extends UISettings {
  updateSettings: (changes: Partial<UISettings>) => void;
}

const SettingsContext = createContext<SettingsValue | undefined>(undefined);

const readChoice = (): UISettings | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as UISettings) : null;
  } catch {
    return null;
  }
};

const systemTheme = (): UISettings['theme'] =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/**
 * The visitor's settings (theme, cursor). Only what the visitor chose is remembered. Until then the
 * theme is the system's and follows it as it changes, and the cursor's default comes from the
 * content (the Dashboard can turn the custom cursor off).
 */
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { remoteSettings } = useSiteContent();
  const [settings, setSettings] = useState<UISettings>(() => readChoice() ?? { showCursor: true, theme: systemTheme() });
  const latest = useRef(settings);
  latest.current = settings;

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = (event: MediaQueryListEvent) => {
      if (!readChoice()) setSettings((previous) => ({ ...previous, theme: event.matches ? 'dark' : 'light' }));
    };
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  }, []);

  useEffect(() => {
    if (remoteSettings && !readChoice()) setSettings((previous) => ({ ...previous, showCursor: remoteSettings.showCursor }));
  }, [remoteSettings]);

  const updateSettings = useCallback((changes: Partial<UISettings>) => {
    const next = { ...latest.current, ...changes };
    setSettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be off (private windows); the choice then lasts until the page is closed.
    }
  }, []);

  const value = useMemo(() => ({ ...settings, updateSettings }), [settings, updateSettings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsValue => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
