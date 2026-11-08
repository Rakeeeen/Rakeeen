import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** A new page starts at its top. */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
