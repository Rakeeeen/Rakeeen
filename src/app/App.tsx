import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SettingsProvider } from '@/data/Settings';
import { SiteContentProvider } from '@/data/SiteContent';
import { DocumentSync } from '@/app/DocumentSync';
import { MainLayout } from '@/app/MainLayout';
import { OnlineGuard } from '@/app/OnlineGuard';
import { ScrollToTop } from '@/app/ScrollToTop';
import { Home } from '@/features/home/Home';
import { NotFound } from '@/features/status/NotFound';
import { LangProvider } from '@/i18n/LangContext';
import { usePressHold } from '@/ui/usePressHold';

// Home loads with the site; every other page loads the first time it is opened.
const About = lazy(() => import('@/features/about/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('@/features/contact/Contact').then((m) => ({ default: m.Contact })));
const ProjectDetail = lazy(() => import('@/features/project-detail/ProjectDetail').then((m) => ({ default: m.ProjectDetail })));
const Projects = lazy(() => import('@/features/projects/Projects').then((m) => ({ default: m.Projects })));
const Workflow = lazy(() => import('@/features/workflow/Workflow').then((m) => ({ default: m.Workflow })));
const WorkflowAdmin = lazy(() => import('@/features/workflow-admin/WorkflowAdmin').then((m) => ({ default: m.WorkflowAdmin })));

export default function App() {
  usePressHold();

  return (
    <LangProvider>
      <SiteContentProvider>
        <SettingsProvider>
          <OnlineGuard>
            <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <ScrollToTop />
              <DocumentSync />
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/workflow" element={<Workflow />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin/workflow" element={<WorkflowAdmin />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </OnlineGuard>
        </SettingsProvider>
      </SiteContentProvider>
    </LangProvider>
  );
}
