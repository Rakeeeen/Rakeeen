import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { recordVisit } from '@/data/analytics';
import { Footer } from '@/app/layout/Footer';
import { Navbar } from '@/app/layout/Navbar';
import { CustomCursor } from '@/ui/CustomCursor';

/** The frame around every page: navigation, the page itself, and the footer. */
export const MainLayout = () => {
  const { pathname } = useLocation();
  const isProjectDetail = pathname.startsWith('/project/');
  const isHome = pathname === '/';

  useEffect(() => {
    void recordVisit();
  }, []);

  return (
    <div className="app-shell">
      <CustomCursor />
      <div className="app-shell__nav app-fade-in">
        <Navbar isOverlay={isProjectDetail} />
      </div>
      <main className={`app-shell__main ${isProjectDetail || isHome ? '' : 'app-shell__main--padded'}`}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <div className="app-fade-in app-fade-in--late">
        <Footer />
      </div>
    </div>
  );
};
