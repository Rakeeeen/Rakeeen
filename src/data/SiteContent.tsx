import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
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
  /** False until the saved content has arrived (or it clearly will not): before that, the texts on
   *  screen would be the defaults, and then change under the visitor's eyes. */
  isReady: boolean;
  /** Saves the phases to the content document, and shows them straight away. */
  saveWorkflowPhases: (phases: WorkflowPhase[]) => Promise<void>;
}

const SiteContentContext = createContext<SiteContentValue | undefined>(undefined);

const CONTENT_DOC = ['content', 'main'] as const;
const READY_TIMEOUT_MS = 2500;

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
  const [isReady, setIsReady] = useState(false);

  // The content is read once when the site opens; what the Dashboard saves shows on the next visit.
  useEffect(() => {
    let cancelled = false;
    // If the answer is slow, the site opens with its defaults rather than keeping the visitor waiting.
    const giveUp = window.setTimeout(() => setIsReady(true), READY_TIMEOUT_MS);
    const ref = doc(db, ...CONTENT_DOC);
    getDoc(ref)
      .then((snapshot) => {
        if (cancelled) return;
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
      })
      .catch((error) => console.warn('Content could not be loaded; showing the defaults.', error))
      .finally(() => {
        if (!cancelled) setIsReady(true);
      });
    return () => {
      cancelled = true;
      window.clearTimeout(giveUp);
    };
  }, []);

  const saveWorkflowPhases = async (phases: WorkflowPhase[]) => {
    await updateDoc(doc(db, ...CONTENT_DOC), { workflowPhases: phases });
    setWorkflowPhases(phases);
  };

  return (
    <SiteContentContext.Provider
      value={{ siteConfig, projects, timeline, competencies, workflowPhases, remoteSettings, isReady, saveWorkflowPhases }}
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
