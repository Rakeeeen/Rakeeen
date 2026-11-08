export interface InquiryDraft {
  name: string;
  email: string;
  message: string;
}

export const EMPTY_INQUIRY: InquiryDraft = { name: '', email: '', message: '' };

/** What is wrong with a message before it is sent, if anything. */
export type InquiryProblem = 'missing' | 'email' | null;

// Not a full address grammar: enough to catch a typo, and the owner can still answer a odd one.
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function inquiryProblem(draft: InquiryDraft): InquiryProblem {
  if (!draft.name.trim() || !draft.email.trim() || !draft.message.trim()) return 'missing';
  return EMAIL_SHAPE.test(draft.email.trim()) ? null : 'email';
}

/** The draft as it is stored and sent: nothing padded with spaces. */
export function cleanInquiry(draft: InquiryDraft): InquiryDraft {
  return { name: draft.name.trim(), email: draft.email.trim(), message: draft.message.trim() };
}

/** A label that may carry line-break tags from the content store, as plain text. */
export function plainLabel(label: string): string {
  return label.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
}
