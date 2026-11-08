import { useEffect, useState, type FormEvent } from 'react';
import { useSiteContent } from '@/data/SiteContent';
import { sendInquiry } from '@/data/inquiries';
import { cleanInquiry, EMPTY_INQUIRY, inquiryProblem, plainLabel, type InquiryDraft } from '@/domain/contact';
import { useLang } from '@/i18n/LangContext';
import { Button } from '@/ui/Button';
import { Field, TextArea } from '@/ui/Field';
import { MascotFace } from '@/ui/MascotFace';
import '@/features/contact/contact.css';

type Status = 'writing' | 'sending' | 'sent';

const step = (n: number) => ({ '--step': n }) as React.CSSProperties;

export const Contact = () => {
  const { siteConfig } = useSiteContent();
  const { t, resolveField } = useLang();
  const [draft, setDraft] = useState<InquiryDraft>(EMPTY_INQUIRY);
  const [status, setStatus] = useState<Status>('writing');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `${t('contact')} | Rakeeen`;
  }, [t]);

  const form = siteConfig.contactForm;
  if (!form.enabled) return null;

  // The Dashboard can rename any of the form's texts; the interface's own line is the fallback.
  const text = (field: typeof form.labelName, fallbackKey: string) => resolveField(field) || t(fallbackKey);
  const set = (field: keyof InquiryDraft) => (event: { target: { value: string } }) =>
    setDraft((previous) => ({ ...previous, [field]: event.target.value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const problem = inquiryProblem(draft);
    if (problem) {
      setError(t(problem === 'missing' ? 'fill_fields' : 'invalidEmail'));
      return;
    }
    setError('');
    setStatus('sending');
    try {
      await sendInquiry(cleanInquiry(draft), resolveField(siteConfig.name));
      setStatus('sent');
    } catch {
      setError(t('error_sending'));
      setStatus('writing');
    }
  };

  const busy = status === 'sending';

  return (
    <div className="contact page">
      <header className="contact__header">
        <p className="rise contact__kicker mono">{t('contactKicker')}</p>
        <h1 className="rise contact__title text-silver" style={step(1)}>{t('contactTitle')}</h1>
      </header>

      {status === 'sent' ? (
        <section className="rise contact__sent card" aria-live="polite">
          <MascotFace size={72} />
          <h2>{text(form.successHeading, 'letterSent')}</h2>
          <p>{resolveField(form.successBody) || t('illGetBack', { name: draft.name.trim() })}</p>
          <Button tone="outline" onClick={() => { setDraft(EMPTY_INQUIRY); setStatus('writing'); }}>
            {t('sendAnother')}
          </Button>
        </section>
      ) : (
        <form className="rise contact__form" style={step(2)} onSubmit={submit} noValidate>
          <div className="contact__pair">
            <Field label={text(form.labelName, 'yourName')} placeholder={text(form.placeholderName, 'ph_name')} value={draft.name} onChange={set('name')} disabled={busy} autoComplete="name" />
            <Field label={text(form.labelEmail, 'yourEmail')} placeholder={text(form.placeholderEmail, 'ph_email')} type="email" value={draft.email} onChange={set('email')} disabled={busy} autoComplete="email" />
          </div>
          <TextArea label={text(form.labelMessage, 'yourMessage')} placeholder={text(form.placeholderMessage, 'ph_message')} value={draft.message} onChange={set('message')} disabled={busy} />

          <div className="contact__actions">
            <p className="contact__error mono" role="alert">{error}</p>
            <Button type="submit" disabled={busy}>
              {busy ? t('sending') : plainLabel(resolveField(form.btnText) || t('send_it'))}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
