import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MascotFace } from '@/ui/MascotFace';
import { useSettings } from '@/data/Settings';
import { useSiteContent } from '@/data/SiteContent';
import { useLang } from '@/i18n/LangContext';
import { LANGUAGES } from '@/i18n/language';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ isOverlay }: { isOverlay?: boolean }) => {
  const { siteConfig } = useSiteContent();
  const { theme, updateSettings } = useSettings();
  const { lang, setLang, t } = useLang();
  const location = useLocation();
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close custom dropdown when clicking outside anywhere on screen
  React.useEffect(() => {
    if (!isLangOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.custom-select-container')) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isLangOpen]);

  const navLinks = [
    { name: isAr ? t('home') : 'HOME',     path: '/' },
    { name: isAr ? t('projects') : 'PROJECTS', path: '/projects' },
    { name: isAr ? t('about') : 'ABOUT',    path: '/about' },
    { name: isAr ? t('contact') : 'SAY HEYYY',  path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? 'light' : 'dark' });
  };

  const logoSrc = siteConfig.siteImages?.navbarLogo || siteConfig.siteImages?.aboutPortrait || '';
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <nav 
      className={`navbar-container ${isOverlay ? 'overlay-nav' : ''}`}
      style={isOverlay ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: 'transparent',
        borderBottom: 'none',
        zIndex: 1000
      } : {}}
    >
      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
        <div style={{ 
          width: 35, 
          height: 35, 
          borderRadius: "50%", 
          border: `1.5px solid ${isOverlay ? '#faf6ee' : 'var(--sepia)'}`, 
          overflow: "hidden", 
          background: "var(--paper-dark)",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Mascot sits underneath and fades out when image loads to avoid layout shift */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MascotFace size={32} color={isOverlay ? '#faf6ee' : 'var(--ink)'} style={{ opacity: logoLoaded ? 0 : 1, transition: 'opacity 220ms ease' } as React.CSSProperties} />
          </div>
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="RAKEEEEN"
              onLoad={() => setLogoLoaded(true)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: logoLoaded ? 1 : 0, transition: 'opacity 260ms ease' }}
            />
          ) : null}
        </div>
        <span className="sketch-font text-lg md:text-xl font-normal" style={{ color: isOverlay ? '#faf6ee' : 'var(--ink)' }}>
          {t('brandName')}
        </span>
      </Link>

      {/* Mobile Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={isOverlay ? { color: '#faf6ee' } : {}}
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Nav Links & Controls */}
      <div className={`navbar-content ${isMenuOpen ? 'mobile-open' : ''} ${isOverlay ? 'overlay-content' : ''}`}>
        <div className="nav-links-wrap">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${isActive(path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
              style={isOverlay ? { color: '#faf6ee', opacity: 0.7 } : {}}
            >
              {name}
            </Link>
          ))}
        </div>
        
        <div className="nav-controls">
          <div className={`custom-select-container ${isLangOpen ? 'active' : ''}`} onClick={() => setIsLangOpen(!isLangOpen)}>
            <div className={`custom-select-trigger ${isOverlay ? 'overlay-trigger' : ''}`} style={isOverlay ? { background: 'rgba(250, 246, 238, 0.1)', color: '#faf6ee', borderColor: 'rgba(250, 246, 238, 0.2)' } : {}}>
              {lang.toUpperCase()}
            </div>
            <div className="custom-select-options">
              {LANGUAGES.map((l) => (
                <div 
                  key={l} 
                  className={`custom-select-option ${lang === l ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLang(l);
                    setIsLangOpen(false);
                  }}
                >
                  {l.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              title="Toggle Theme"
          >
              {isDark ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isOverlay ? "#faf6ee" : "var(--ink)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }}>
                      <circle cx="12" cy="12" r="5" fill="var(--sepia)" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
              ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isOverlay ? "#faf6ee" : "var(--ink)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }}>
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="var(--ink)" />
                  </svg>
              )}
          </button>
        </div>
      </div>
    </nav>
  );
};

