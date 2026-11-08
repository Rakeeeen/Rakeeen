import { useEffect, useState, type ReactNode } from 'react';
import { Offline } from '@/features/status/Offline';

/** Shows the offline page while the browser has no connection. */
export const OnlineGuard = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline ? <>{children}</> : <Offline />;
};
