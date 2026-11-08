import { useEffect, useState, type ReactNode } from 'react';
import { connectionAfter, type Connection } from '@/domain/connection';
import { Offline } from '@/features/status/Offline';

/**
 * Shows the offline screen while the browser has no connection, and keeps it, with a way back in,
 * after the signal returns (the site reloads when the visitor takes it).
 */
export const OnlineGuard = ({ children }: { children: ReactNode }) => {
  const [connection, setConnection] = useState<Connection>(() => (navigator.onLine ? 'online' : 'offline'));

  useEffect(() => {
    const goOnline = () => setConnection((previous) => connectionAfter(previous, true));
    const goOffline = () => setConnection((previous) => connectionAfter(previous, false));
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return connection === 'online' ? <>{children}</> : <Offline isOnline={connection === 'restored'} />;
};
