import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { recordVisit } from '@/data/analytics';
import { useSiteContent } from '@/data/SiteContent';
import { Footer } from '@/app/layout/Footer';
import { Navbar } from '@/app/layout/Navbar';
import { CustomCursor } from '@/ui/CustomCursor';
import '@/app/shell.css';

/** The frame around every page: navigation, the page itself, and the footer. */
export const MainLayout = () => {
  const { isReady } = useSiteContent();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    void recordVisit();
  }, []);

  return (
    <div className="app-shell">
      <CustomCursor />
      <div className="app-shell__nav app-fade-in">
        <Navbar />
      </div>
      <main className={`app-shell__main ${isHome ? '' : 'app-shell__main--padded'}`}>
        {isReady && (
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        )}
      </main>
      {isReady && (
        <div className="app-fade-in app-fade-in--late">
          <Footer />
        </div>
      )}
    </div>
  );
};
