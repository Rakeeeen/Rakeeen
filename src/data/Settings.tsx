import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { UISettings } from '@/domain/content';
import { useSiteContent } from '@/data/SiteContent';

const STORAGE_KEY = 'visitor_settings';

interface SettingsValue extends UISettings {
  updateSettings: (changes: Partial<UISettings>) => void;
}

const SettingsContext = createContext<SettingsValue | undefined>(undefined);

const readSaved = (): UISettings | null => {
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
 * The visitor's own settings (theme, cursor). Order of say: what they chose on this device, then
 * the defaults saved with the content, then the system's theme.
 */
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { remoteSettings } = useSiteContent();
  const [settings, setSettings] = useState<UISettings>(
    () => readSaved() ?? { showCursor: true, theme: systemTheme() },
  );

  // Without a choice of their own, the visitor follows the system's theme as it changes.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = (event: MediaQueryListEvent) => {
      if (!readSaved()) setSettings((prev) => ({ ...prev, theme: event.matches ? 'dark' : 'light' }));
    };
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  }, []);

  useEffect(() => {
    if (remoteSettings && !readSaved()) setSettings(remoteSettings);
  }, [remoteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback(
    (changes: Partial<UISettings>) => setSettings((prev) => ({ ...prev, ...changes })),
    [],
  );

  const value = useMemo(() => ({ ...settings, updateSettings }), [settings, updateSettings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsValue => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
