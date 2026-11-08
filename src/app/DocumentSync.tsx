import { useEffect } from 'react';
import { useSettings } from '@/data/Settings';

/** Mirrors the visitor's theme onto the page, so every colour token follows it. */
export const DocumentSync = () => {
  const { theme } = useSettings();

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
};
