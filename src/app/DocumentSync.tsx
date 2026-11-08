import { useEffect } from 'react';
import { useSettings } from '@/data/Settings';
import { useSiteContent } from '@/data/SiteContent';

/** Mirrors the theme and the favicon from the site's state onto the document. */
export const DocumentSync = () => {
  const { theme } = useSettings();
  const { siteConfig } = useSiteContent();
  const favicon = siteConfig.siteImages.favicon;

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const link = document.getElementById('favicon') as HTMLLinkElement | null;
    if (link && favicon) link.href = favicon;
  }, [favicon]);

  return null;
};
