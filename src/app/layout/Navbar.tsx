import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '@/data/Settings';
import { useSiteContent } from '@/data/SiteContent';
import { LanguageMenu } from '@/app/layout/LanguageMenu';
import { ThemeToggle } from '@/app/layout/ThemeToggle';
import { useLang } from '@/i18n/LangContext';
import { IconClose, IconMenu } from '@/ui/icons';
import { MascotFace } from '@/ui/MascotFace';
import '@/app/layout/navbar.css';

const LINKS = [
  { labelKey: 'home', path: '/' },
  { labelKey: 'projects', path: '/projects' },
  { labelKey: 'about', path: '/about' },
  { labelKey: 'sayHeyyy', path: '/contact' },
] as const;

const isActive = (path: string, pathname: string) =>
  path === '/' ? pathname === '/' : pathname.startsWith(path);

/** The bar at the top of every page. */
export const Navbar = () => {
  const { siteConfig } = useSiteContent();
  const { theme, updateSettings } = useSettings();
  const { t } = useLang();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const logo = siteConfig.siteImages.navbarLogo || siteConfig.siteImages.aboutPortrait;
  const close = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${isMenuOpen ? 'navbar--open' : ''}`}>
      <Link to="/" className="navbar__brand" onClick={close}>
        <span className="navbar__logo rounded-box">
          <MascotFace size={28} color="currentColor" style={{ opacity: logoLoaded ? 0 : 1 }} />
          {logo && (
            <img src={logo} alt="" onLoad={() => setLogoLoaded(true)} style={{ opacity: logoLoaded ? 1 : 0 }} />
          )}
        </span>
        <span className="navbar__name">{t('brandName')}</span>
      </Link>

      <button
        type="button"
        className="navbar__menu-button"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <IconClose /> : <IconMenu />}
      </button>

      <div className={`navbar__panel ${isMenuOpen ? 'navbar__panel--open' : ''}`}>
        <div className="navbar__links spring-group">
          {LINKS.map(({ labelKey, path }) => (
            <Link
              key={path}
              to={path}
              className={`navbar__link ${isActive(path, pathname) ? 'navbar__link--active' : ''}`}
              aria-current={isActive(path, pathname) ? 'page' : undefined}
              onClick={close}
            >
              {t(labelKey)}
            </Link>
          ))}
        </div>

        <div className="navbar__controls">
          <LanguageMenu />
          <ThemeToggle theme={theme} onToggle={() => updateSettings({ theme: theme === 'dark' ? 'light' : 'dark' })} />
        </div>
      </div>
    </nav>
  );
};
