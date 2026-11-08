import { doc, increment, setDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from '@/data/firebase';

const SESSION_KEY = 'hamed_session_tracked';
// Versioned so a change of counting method starts a clean count.
const VISITOR_KEY = 'hamed_human_v2_confirmed';

const analyticsRef = () => doc(db, 'analytics', 'main');

async function bump(field: 'totalVisits' | 'uniqueVisitors'): Promise<void> {
  try {
    await updateDoc(analyticsRef(), { [field]: increment(1) });
  } catch {
    // The counters document does not exist yet.
    try {
      await setDoc(analyticsRef(), { totalVisits: 1, uniqueVisitors: 1, inquiries: 0 });
    } catch (error) {
      console.warn('Visit counters could not be created', error);
    }
  }
}

/** Counts one visit per browser session, and one visitor per device, ever. */
export async function recordVisit(): Promise<void> {
  if (!sessionStorage.getItem(SESSION_KEY)) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    await bump('totalVisits');
  }
  if (!localStorage.getItem(VISITOR_KEY)) {
    // Set before the request, so a second tab opened at once does not count the same person twice.
    localStorage.setItem(VISITOR_KEY, `v2_${Date.now()}`);
    await bump('uniqueVisitors');
  }
}
