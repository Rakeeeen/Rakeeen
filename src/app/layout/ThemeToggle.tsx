import { IconMoon, IconSun } from '@/ui/icons';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

/** Light and dark: shows the one you would switch to. */
export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <button
    type="button"
    className="theme-toggle"
    aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    onClick={onToggle}
  >
    {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
  </button>
);
