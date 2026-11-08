import React, { useState, useEffect } from 'react';
import { useSiteContent } from '@/data/SiteContent';
import { Button } from '@/ui/Button';
import { PixelGlyph } from '@/ui/PixelGlyph';
import { PHASE_GLYPHS } from '@/ui/pixelGlyphs';
import { WorkflowPhase } from '@/domain/content';
import { db } from '@/data/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const PHASE_COLORS = [
  'var(--sepia)','#3B82F6','#A855F7','#F97316','#22C55E','#EC4899','#14B8A6','#F59E0B',
];

const EMPTY_PHASE: WorkflowPhase = {
  en_title: '',
  ar_title: '',
  en_sub: '',
  ar_sub: '',
  en_desc: '',
  ar_desc: '',
  en_skills: '',
  ar_skills: '',
};

const VectorPreview = ({ index, size = 28 }: { index: number; size?: number }) => (
  <span style={{ display: 'inline-flex', color: PHASE_COLORS[index % PHASE_COLORS.length] }}>
    <PixelGlyph pixels={PHASE_GLYPHS[index % PHASE_GLYPHS.length]} size={size} />
  </span>
);

export const WorkflowAdmin = () => {
  const { workflowPhases, setWorkflowPhases } = useSiteContent();
  const [phases, setPhases] = useState<WorkflowPhase[]>(workflowPhases || []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<WorkflowPhase>(EMPTY_PHASE);

  useEffect(() => {
    setPhases(workflowPhases || []);
  }, [workflowPhases]);

  const openEdit = (i: number) => {
    setEditingIndex(i);
    setEditDraft({ ...phases[i] });
  };

  const closeEdit = () => {
    setEditingIndex(null);
    setEditDraft(EMPTY_PHASE);
  };

  const saveEdit = () => {
    const updated = phases.map((p, i) => i === editingIndex ? editDraft : p);
    setPhases(updated);
    closeEdit();
  };

  const addPhase = () => {
    const newIndex = phases.length;
    const newPhase: WorkflowPhase = {
      en_title: `0${newIndex + 1} · New Phase`,
      ar_title: `0${newIndex + 1} · مرحلة جديدة`,
      en_sub: 'Phase Subtitle',
      ar_sub: 'عنوان فرعي',
      en_desc: 'Describe what happens in this phase.',
      ar_desc: 'وصف المرحلة باللغة العربية.',
      en_skills: 'Skill A · Skill B · Skill C',
      ar_skills: 'مهارة أ · مهارة ب · مهارة ج',
    };
    setPhases(prev => [...prev, newPhase]);
  };

  const deletePhase = (i: number) => {
    setPhases(prev => prev.filter((_, idx) => idx !== i));
  };

  const movePhase = (i: number, dir: -1 | 1) => {
    const arr = [...phases];
    const target = i + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[i], arr[target]] = [arr[target], arr[i]];
    setPhases(arr);
  };

  const saveToFirestore = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'content', 'main');
      await updateDoc(docRef, { workflowPhases: phases });
      setWorkflowPhases(phases);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('Save failed:', e);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    padding: '0.55rem 0.8rem',
    border: '1px solid var(--border)',
    background: 'var(--paper)',
    color: 'var(--ink)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    opacity: 0.5,
    display: 'block',
    marginBottom: '0.35rem',
  };

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh' }}>
      <div className="page-container" style={{ paddingTop: '6rem', paddingBottom: '8rem', maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '0.8rem' }}>
            ADMIN · DASHBOARD
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, color: 'var(--ink)' }}>
            Workflow Phases
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', opacity: 0.5, marginTop: '0.8rem' }}>
            Add, edit, reorder, or remove phases. Each phase auto-generates a unique vector shape.
          </p>
        </div>

        {/* Phase List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {phases.map((phase, i) => (
            <div key={i} style={{
              border: '1px solid var(--border)',
              background: 'var(--paper-dark)',
              padding: '1.4rem 1.8rem',
              display: 'grid',
              gridTemplateColumns: '44px 1fr auto',
              gap: '1.2rem',
              alignItems: 'center',
            }}>
              {/* Auto-generated vector */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.85 }}>
                <VectorPreview index={i} />
              </div>

              {/* Phase info */}
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                  {phase.en_title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', opacity: 0.45, marginTop: '0.2rem' }}>
                  {phase.en_sub}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                <button onClick={() => movePhase(i, -1)} disabled={i === 0}
                  style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--ink)', padding: '0.3rem 0.55rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: i === 0 ? 0.25 : 1 }}>
                  ↑
                </button>
                <button onClick={() => movePhase(i, 1)} disabled={i === phases.length - 1}
                  style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--ink)', padding: '0.3rem 0.55rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: i === phases.length - 1 ? 0.25 : 1 }}>
                  ↓
                </button>
                <button onClick={() => openEdit(i)}
                  style={{ background: 'var(--ink)', color: 'var(--paper)', border: 'none', padding: '0.35rem 0.9rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  EDIT
                </button>
                <button onClick={() => deletePhase(i)}
                  style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--ink)', padding: '0.35rem 0.65rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.5 }}>
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Phase Button */}
        <button onClick={addPhase}
          style={{ border: '1px dashed var(--border)', background: 'transparent', color: 'var(--ink)', padding: '1rem 2rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', width: '100%', opacity: 0.6, marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.1rem' }}>+</span> ADD NEW PHASE — VECTOR AUTO-GENERATED
        </button>

        {/* Save Button */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button onClick={saveToFirestore} disabled={saving} style={{ minWidth: '200px' }}>
            {saving ? 'SAVING...' : 'SAVE TO FIRESTORE'}
          </Button>
          {saved && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#22C55E', fontWeight: 700, letterSpacing: '0.1em' }}>
              ✓ SAVED
            </span>
          )}
        </div>

        {/* Edit Modal */}
        {editingIndex !== null && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
          }}>
            <div style={{
              background: 'var(--paper)', border: '1px solid var(--border)',
              padding: '2.5rem', maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
            }}>
              {/* Modal header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.2rem' }}>
                <VectorPreview index={editingIndex} size={32} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', opacity: 0.4, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Editing Phase {editingIndex + 1}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 850, textTransform: 'uppercase' }}>{editDraft.en_title || 'Untitled'}</div>
                </div>
              </div>

              {/* Form grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem' }}>
                {([
                  ['en_title', 'Title (EN)'], ['ar_title', 'Title (AR)'],
                  ['en_sub',   'Sub-label (EN)'], ['ar_sub', 'Sub-label (AR)'],
                  ['en_skills','Skills (EN)'], ['ar_skills', 'Skills (AR)'],
                ] as [keyof WorkflowPhase, string][]).map(([field, label]) => (
                  <div key={field}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      value={editDraft[field]}
                      onChange={e => setEditDraft(prev => ({ ...prev, [field]: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                ))}

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Description (EN)</label>
                  <textarea
                    value={editDraft.en_desc}
                    onChange={e => setEditDraft(prev => ({ ...prev, en_desc: e.target.value }))}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Description (AR)</label>
                  <textarea
                    value={editDraft.ar_desc}
                    onChange={e => setEditDraft(prev => ({ ...prev, ar_desc: e.target.value }))}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', direction: 'rtl' }}
                  />
                </div>
              </div>

              {/* Modal actions */}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <Button onClick={saveEdit}>SAVE CHANGES</Button>
                <Button tone="outline" onClick={closeEdit}>CANCEL</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
