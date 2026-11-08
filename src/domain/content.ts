export type DynamicSectionType = 'text' | 'image' | 'video';

export interface LocalizedString {
  en: string;
  ar: string;
  it: string;
}

export type LocalizedField = LocalizedString | string;

export interface DynamicSection {
  id: string;
  type: DynamicSectionType;
  content: LocalizedField;
  order: number;
}

export interface GalleryImage {
  url: string;
  caption?: LocalizedField;
}

export interface SocialLinks {
  linkedin?: string;
  behance?: string;
  x?: string;
}

export interface SiteImages {
  navbarLogo?: string;
  aboutPortrait?: string;
  favicon?: string;
  contactBackground?: string;
  projectDetail1?: string;
  projectDetail2?: string;
  projectDetail3?: string;
}

export interface ContactFormConfig {
  enabled: boolean;
  heading: LocalizedField;
  subtitle: LocalizedField;
  labelName: LocalizedField;
  labelEmail: LocalizedField;
  labelMessage: LocalizedField;
  placeholderName: LocalizedField;
  placeholderEmail: LocalizedField;
  placeholderMessage: LocalizedField;
  btnText: LocalizedField;
  successHeading: LocalizedField;
  successBody: LocalizedField;
  responseTime: LocalizedField;
}

/** Everything the site says about its owner. The Dashboard edits it in Firestore. */
export interface SiteConfig {
  name: LocalizedField;
  role: LocalizedField;
  location: LocalizedField;
  email: string;
  summary: LocalizedField;
  detailed_summary: LocalizedField;
  heroHeadline: LocalizedField;
  heroSubtitle: LocalizedField;
  heroBtnPrimary: LocalizedField;
  heroBtnSecondary1: LocalizedField;
  heroBtnSecondary2: LocalizedField;
  socials: SocialLinks;
  siteImages: SiteImages;
  tools: string[];
  contactForm: ContactFormConfig;
}

export interface Project {
  id: string;
  title: LocalizedField;
  subtitle?: LocalizedField;
  description?: LocalizedField;
  tags?: LocalizedField[];
  image?: string;
  detailImages?: string[];
  gallery?: GalleryImage[];
  category?: LocalizedField;
  year?: LocalizedField;
  summary?: LocalizedField;
  featured?: boolean;
  link?: string;
  github?: string;
  content?: string;
  client?: LocalizedField;
  role?: LocalizedField;
  duration?: LocalizedField;
  challenge?: LocalizedField;
  painPoints?: LocalizedField;
  solution?: LocalizedField;
  architecture?: LocalizedField;
  strategy?: LocalizedField;
  keyResult?: LocalizedField;
  conclusion?: LocalizedField;
  aiWorkflow?: LocalizedField;
  dynamicSections?: DynamicSection[];
}

export interface TimelineItem {
  year: LocalizedField;
  role: LocalizedField;
  company: LocalizedField;
  description: LocalizedField;
  tags?: LocalizedField[];
}

export interface Competency {
  title: LocalizedField;
  description?: LocalizedField;
  icon?: string;
}

export interface WorkflowPhase {
  en_title: string;
  ar_title: string;
  en_sub: string;
  ar_sub: string;
  en_desc: string;
  ar_desc: string;
  en_skills: string;
  ar_skills: string;
  // Italian was added later, so documents saved before then do not have it.
  it_title?: string;
  it_sub?: string;
  it_desc?: string;
  it_skills?: string;
}

export interface UISettings {
  showCursor: boolean;
  theme: 'dark' | 'light';
}
