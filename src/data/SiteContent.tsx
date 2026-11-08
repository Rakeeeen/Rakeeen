import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import {
  COMPETENCIES,
  DEFAULT_WORKFLOW_PHASES,
  PROJECTS,
  SITE_CONFIG,
  TIMELINE,
} from '@/content/siteDefaults';
import type {
  Competency,
  Project,
  SiteConfig,
  TimelineItem,
  UISettings,
  WorkflowPhase,
} from '@/domain/content';
import { db } from '@/data/firebase';

interface SiteContentValue {
  siteConfig: SiteConfig;
  projects: Project[];
  timeline: TimelineItem[];
  competencies: Competency[];
  workflowPhases: WorkflowPhase[];
  /** The visitor-facing defaults stored with the content, applied until the visitor chooses. */
  remoteSettings: UISettings | null;
  setWorkflowPhases: (phases: WorkflowPhase[]) => void;
}

const SiteContentContext = createContext<SiteContentValue | undefined>(undefined);

const CONTENT_DOC = ['content', 'main'] as const;

/**
 * The site's content: the defaults in `content/siteDefaults.ts` until Firestore answers, then
 * whatever the Dashboard saved there.
 */
export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(SITE_CONFIG);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [timeline, setTimeline] = useState<TimelineItem[]>(TIMELINE);
  const [competencies, setCompetencies] = useState<Competency[]>(COMPETENCIES);
  const [workflowPhases, setWorkflowPhases] = useState<WorkflowPhase[]>(DEFAULT_WORKFLOW_PHASES);
  const [remoteSettings, setRemoteSettings] = useState<UISettings | null>(null);

  useEffect(() => {
    const ref = doc(db, ...CONTENT_DOC);
    return onSnapshot(ref, (snapshot) => {
      if (!snapshot.exists()) {
        void setDoc(ref, {
          siteConfig: SITE_CONFIG,
          projects: PROJECTS,
          timeline: TIMELINE,
          competencies: COMPETENCIES,
          workflowPhases: DEFAULT_WORKFLOW_PHASES,
          settings: { showCursor: true, theme: 'dark' },
        });
        return;
      }
      const data = snapshot.data();
      if (data.siteConfig) {
        // Saved config may predate newer fields, so every group is merged over the defaults.
        setSiteConfig({
          ...SITE_CONFIG,
          ...data.siteConfig,
          contactForm: { ...SITE_CONFIG.contactForm, ...data.siteConfig.contactForm },
          socials: { ...SITE_CONFIG.socials, ...data.siteConfig.socials },
          siteImages: { ...SITE_CONFIG.siteImages, ...data.siteConfig.siteImages },
        });
      }
      if (data.projects) setProjects(data.projects);
      if (data.timeline) setTimeline(data.timeline);
      if (data.competencies) setCompetencies(data.competencies);
      if (data.workflowPhases) setWorkflowPhases(data.workflowPhases);
      if (data.settings) setRemoteSettings(data.settings);
    });
  }, []);

  return (
    <SiteContentContext.Provider
      value={{ siteConfig, projects, timeline, competencies, workflowPhases, remoteSettings, setWorkflowPhases }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = (): SiteContentValue => {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error('useSiteContent must be used within a SiteContentProvider');
  return context;
};
