import React, { useState } from 'react';
import { useSiteContent } from '@/data/SiteContent';
import { useLang } from '@/i18n/LangContext';
import { MascotFace } from '@/ui/MascotFace';
import { db } from '@/data/firebase';
import {
  collection, addDoc, serverTimestamp,
  doc, updateDoc, increment, getDoc, setDoc,
} from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const fadeUp = (delay: number): React.CSSProperties => ({
  opacity: 0,
  transform: 'translateY(15px)',
  animation: `cnt-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
});

export const Contact = () => {
  const { siteConfig } = useSiteContent();
  const { t, resolveField, lang } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const isAr = lang === 'ar';

  React.useEffect(() => {
    document.title = `${t('contact')} | Rakeeen`;
  }, [t, resolveField, siteConfig.name]);

  const cf = siteConfig.contactForm;
  const res = (field: any, fallback: string) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[lang] || field.en || fallback;
  };

  const lblName    = res(cf?.labelName,          t('yourName'));
  const lblEmail   = res(cf?.labelEmail,         t('yourEmail'));
  const lblMessage = res(cf?.labelMessage,       t('yourMessage'));
  const phName     = res(cf?.placeholderName,    t('ph_name'));
  const phEmail    = res(cf?.placeholderEmail,   t('ph_email'));
  const phMessage  = res(cf?.placeholderMessage, t('ph_message'));
  const btnLabel   = res(cf?.btnText,            '');
  const successH   = res(cf?.successHeading,     t('letterSent'));
  const successB   = res(cf?.successBody,        '');
  const enabled    = cf?.enabled !== false;

  const send = async () => {
    if (!form.name || !form.email || !form.message) {
      setErr(t('fill_fields')); setTimeout(() => setErr(''), 4000); return;
    }
    setBusy(true);
    try {
      await addDoc(collection(db, 'inquiries'), { ...form, createdAt: serverTimestamp(), read: false });
      const [svc, tpl, pub] = [
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      ];
      if (svc && tpl && pub) {
        try {
          await emailjs.send(svc, tpl, {
            name: form.name, email: form.email, message: form.message,
            title: 'رسالة جديدة من الموقع', to_name: resolveField(siteConfig.name),
          }, pub);
        } catch (e) { console.warn('EmailJS', e); }
      }
      try {
        const ref = doc(db, 'analytics', 'main');
        const snap = await getDoc(ref);
        if (snap.exists()) await updateDoc(ref, { inquiries: increment(1) });
        else await setDoc(ref, { totalVisits: 1, uniqueVisitors: 1, inquiries: 1 });
      } catch (e) { console.warn('analytics', e); }
      setSent(true);
    } catch (e) {
      setErr(t('error_sending')); setTimeout(() => setErr(''), 4000);
    } finally { setBusy(false); }
  };

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes cnt-up { to { opacity:1; transform:translateY(0); } }

        /* Full Width Spacious Layout */
        .spacious-contact-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .name-email-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        /* Custom Rectangular Block Input Fields (From Mockup) */
        .premium-input-box {
          position: relative;
          background: rgba(34, 44, 7, 0.04);
          border: 1px solid rgba(34, 44, 7, 0.08);
          padding: 1rem 1.4rem;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        
        body.dark .premium-input-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .premium-input-box:focus-within {
          border-color: var(--border);
          background: rgba(34, 44, 7, 0.06);
        }
        body.dark .premium-input-box:focus-within {
          border-color: var(--border);
          background: rgba(255, 255, 255, 0.05);
        }

        .premium-input-field {
          width: 100%;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--ink);
          padding: 0.35rem 0 0 0;
          margin: 0;
          border-radius: 0;
        }

        .premium-input-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: 0.45;
          margin: 0;
          padding: 0;
          pointer-events: none;
        }

        /* Complete Auto-fill Overlay Removal */
        .premium-input-field:-webkit-autofill,
        .premium-input-field:-webkit-autofill:hover, 
        .premium-input-field:-webkit-autofill:focus, 
        .premium-input-field:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: var(--ink) !important;
          transition: background-color 9999s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px transparent !important;
        }

        @media (max-width: 768px) {
          .name-email-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .page-container {
            padding-top: 3.5rem !important;
          }
        }
      `}</style>

      <div className="page-container" style={{ paddingTop: '6.5rem', paddingBottom: '7rem' }}>
        <div className="spacious-contact-container">
          
          {/* ── Spacious Title Area ── */}
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2.5rem', marginBottom: '4rem' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              opacity: 0.4,
              marginBottom: '1rem',
              ...fadeUp(0.05),
            }}>
              {isAr ? 'تواصل معي' : 'Say heyy !'}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7.5vw, 6rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              lineHeight: 0.9,
              color: 'var(--ink)',
              ...fadeUp(0.1),
            }}>
              {isAr ? 'لنبدأ العمل معاً' : 'for meeeeee'}
            </h1>
          </div>

          {/* ── Form Section ── */}
          {enabled && (
            <div style={{ ...fadeUp(0.18) }}>
              {sent ? (
                /* Spacious Success Message */
                <div style={{
                  border: '1px solid var(--border)',
                  background: 'var(--paper-dark)',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  animation: 'cnt-up 0.5s ease-out forwards'
                }}>
                  <MascotFace size={60} color="var(--ink)" />
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    margin: 0
                  }}>
                    {successH}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.98rem',
                    color: 'var(--ink-faded)',
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: '450px'
                  }}>
                    {successB || t('illGetBack').replace('{name}', form.name)}
                  </p>
                  <button
                    type="button"
                    className="btn-brutalist"
                    style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)' }}
                    onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  >
                    {t('sendAnother')}
                  </button>
                </div>
              ) : (
                /* Full Width Custom Block Fields wrapped in a form element */
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  
                  {/* Grid for Name & Email */}
                  <div className="name-email-grid">
                    <div className="premium-input-box">
                      <label className="premium-input-label">{lblName}</label>
                      <input
                        className="premium-input-field"
                        placeholder={phName}
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        disabled={busy}
                        autoComplete="off"
                        data-lpignore="true"
                      />
                    </div>

                    <div className="premium-input-box">
                      <label className="premium-input-label">{lblEmail}</label>
                      <input
                        className="premium-input-field"
                        type="email"
                        placeholder={phEmail}
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        disabled={busy}
                        autoComplete="off"
                        data-lpignore="true"
                      />
                    </div>
                  </div>

                  {/* Message Block Input */}
                  <div className="premium-input-box" style={{ marginBottom: '1.5rem' }}>
                    <label className="premium-input-label">{lblMessage}</label>
                    <textarea
                      className="premium-input-field"
                      style={{ minHeight: '160px', resize: 'vertical' }}
                      placeholder={phMessage}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      disabled={busy}
                      autoComplete="off"
                      data-lpignore="true"
                    />
                  </div>

                  {/* Errors */}
                  {err && (
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--rust)',
                      marginBottom: '1.5rem'
                    }}>
                      [ERROR] : {err.toUpperCase()}
                    </p>
                  )}

                  {/* CTA Submit Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button
                      type="submit"
                      className="btn-brutalist"
                      disabled={busy}
                      style={{ 
                        opacity: busy ? 0.55 : 1, 
                        minWidth: '180px',
                        maxWidth: '100%',
                        fontFamily: 'var(--font-mono)', 
                        textTransform: 'uppercase',
                        padding: '1.2rem 2.5rem',
                        fontSize: '0.9rem'
                      }}
                    >
                      {busy ? 'SENDING...' : <span dangerouslySetInnerHTML={{ __html: btnLabel || t('send_it') }} />}
                    </button>
                  </div>

                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
