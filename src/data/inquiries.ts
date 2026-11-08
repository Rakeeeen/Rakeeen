import emailjs from '@emailjs/browser';
import { addDoc, collection, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from '@/data/firebase';
import type { InquiryDraft } from '@/domain/contact';

async function notifyByEmail(draft: InquiryDraft, ownerName: string): Promise<void> {
  const { VITE_EMAILJS_SERVICE_ID: service, VITE_EMAILJS_TEMPLATE_ID: template, VITE_EMAILJS_PUBLIC_KEY: key } = import.meta.env;
  if (!service || !template || !key) return;
  await emailjs.send(service, template, { ...draft, title: 'رسالة جديدة من الموقع', to_name: ownerName }, key);
}

async function countInquiry(): Promise<void> {
  const ref = doc(db, 'analytics', 'main');
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) await updateDoc(ref, { inquiries: increment(1) });
  else await setDoc(ref, { totalVisits: 1, uniqueVisitors: 1, inquiries: 1 });
}

/**
 * Saves the message, which is what counts as sent. The email to the owner and the visit counter are
 * best effort: if either fails, the visitor still sees that their message went through.
 */
export async function sendInquiry(draft: InquiryDraft, ownerName: string): Promise<void> {
  await addDoc(collection(db, 'inquiries'), { ...draft, createdAt: serverTimestamp(), read: false });
  await Promise.allSettled([notifyByEmail(draft, ownerName), countInquiry()]);
}
