import { useNavigate } from 'react-router-dom';
import { useLang } from '@/i18n/LangContext';
import { Button } from '@/ui/Button';
import { FilmScreen } from '@/ui/FilmScreen';
import { IconArrow } from '@/ui/icons';

/** A page that was never shot: a frame of film with the reel missing. */
export const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <FilmScreen
      stripLabel={t('notFoundFrame')}
      footerLabel={t('notFoundStrip')}
      title="404"
      subtitle={t('notFoundSubtitle')}
      body={t('notFoundBody')}
    >
      <Button tone="outline" onClick={() => navigate('/')}>
        <IconArrow size={16} className="icon-directional icon-backwards" />
        {t('notFoundBack')}
      </Button>
    </FilmScreen>
  );
};
