import { useLang } from '@/i18n/LangContext';
import { Button } from '@/ui/Button';
import { FilmScreen } from '@/ui/FilmScreen';

/**
 * Shown in place of the whole site while the browser has no connection (app/OnlineGuard.tsx). When
 * the signal comes back the screen stops glitching and offers a way back in.
 */
export const Offline = ({ isOnline = false }: { isOnline?: boolean }) => {
  const { t } = useLang();

  return (
    <FilmScreen
      stripLabel={t('signalLost')}
      footerLabel={isOnline ? `● ${t('offlineStripBack')}` : t('offlineStripLost')}
      title={isOnline ? t('signalBack') : t('noSignal')}
      subtitle={isOnline ? t('connectionRestored') : t('connectionLost')}
      body={isOnline ? t('offlineBodyBack') : t('offlineBodyLost')}
      glitching={!isOnline}
    >
      {isOnline && <Button onClick={() => window.location.reload()}>{t('returnToSite')}</Button>}
    </FilmScreen>
  );
};
