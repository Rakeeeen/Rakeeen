import { useEffect, useRef, useState } from 'react';
import { useSiteContent } from '@/data/SiteContent';
import type { WorkflowPhase } from '@/domain/content';
import { blankPhase, movePhase } from '@/domain/workflow';
import { Button } from '@/ui/Button';
import { Field, TextArea } from '@/ui/Field';
import { PixelGlyph } from '@/ui/PixelGlyph';
import { PHASE_GLYPHS } from '@/ui/pixelGlyphs';
import '@/features/workflow-admin/workflowAdmin.css';

const LANGUAGES = [
  { code: 'en', name: 'English', rtl: false },
  { code: 'ar', name: 'العربية', rtl: true },
  { code: 'it', name: 'Italiano', rtl: false },
] as const;

type Draft = Record<string, string>;

/** Edit the phases of "How I build": reorder, add, remove, and write each in the three languages. */
export const WorkflowAdmin = () => {
  const { workflowPhases, saveWorkflowPhases } = useSiteContent();
  const [phases, setPhases] = useState<WorkflowPhase[]>(workflowPhases);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft>({});
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => setPhases(workflowPhases), [workflowPhases]);
  useEffect(() => {
    if (editing === null) dialog.current?.close();
    else if (!dialog.current?.open) dialog.current?.showModal();
  }, [editing]);

  const edit = (index: number) => {
    setDraft({ ...phases[index] });
    setEditing(index);
  };
  const applyEdit = () => {
    setPhases((previous) => previous.map((phase, i) => (i === editing ? (draft as unknown as WorkflowPhase) : phase)));
    setEditing(null);
  };

  const save = async () => {
    setStatus('saving');
    try {
      await saveWorkflowPhases(phases);
      setStatus('saved');
    } catch {
      setStatus('failed');
    }
  };

  const field = (key: string) => ({
    value: draft[key] ?? '',
    onChange: (event: { target: { value: string } }) => setDraft((previous) => ({ ...previous, [key]: event.target.value })),
  });

  return (
    <div className="admin page">
      <header className="admin__header">
        <p className="admin__kicker mono">Admin · Dashboard</p>
        <h1 className="admin__title text-silver">Workflow phases</h1>
        <p className="admin__hint">Add, edit, reorder or remove phases. Each one takes its pixel shape from its place in the list.</p>
      </header>

      <ol className="admin__list">
        {phases.map((phase, index) => (
          <li key={index} className="admin__item card">
            <PixelGlyph pixels={PHASE_GLYPHS[index % PHASE_GLYPHS.length]} size={28} />
            <div className="admin__name">
              <strong>{phase.en_title}</strong>
              <span className="mono">{phase.en_sub}</span>
            </div>
            <div className="admin__actions">
              <Button tone="ghost" aria-label="Move up" disabled={index === 0} onClick={() => setPhases(movePhase(phases, index, -1))}>↑</Button>
              <Button tone="ghost" aria-label="Move down" disabled={index === phases.length - 1} onClick={() => setPhases(movePhase(phases, index, 1))}>↓</Button>
              <Button tone="ink" onClick={() => edit(index)}>Edit</Button>
              <Button tone="outline" aria-label="Remove" onClick={() => setPhases(phases.filter((_, i) => i !== index))}>✕</Button>
            </div>
          </li>
        ))}
      </ol>

      <div className="admin__footer">
        <Button tone="outline" onClick={() => setPhases([...phases, blankPhase(phases.length)])}>+ Add a phase</Button>
        <Button onClick={save} disabled={status === 'saving'}>{status === 'saving' ? 'Saving…' : 'Save'}</Button>
        <p className="admin__status mono" role="status">
          {status === 'saved' && 'Saved'}
          {status === 'failed' && 'Could not save'}
        </p>
      </div>

      <dialog ref={dialog} className="admin__dialog card" onClose={() => setEditing(null)}>
        {editing !== null && (
          <form method="dialog" onSubmit={(event) => { event.preventDefault(); applyEdit(); }}>
            <h2 className="admin__dialog-title">Phase {editing + 1}</h2>
            {LANGUAGES.map(({ code, name, rtl }) => (
              <fieldset key={code} className="admin__language" dir={rtl ? 'rtl' : 'ltr'}>
                <legend className="mono">{name}</legend>
                <Field label="Title" {...field(`${code}_title`)} />
                <Field label="Subtitle" {...field(`${code}_sub`)} />
                <Field label="Skills, separated by ·" {...field(`${code}_skills`)} />
                <TextArea label="Description" rows={3} {...field(`${code}_desc`)} />
              </fieldset>
            ))}
            <div className="admin__dialog-actions">
              <Button type="submit">Apply</Button>
              <Button tone="outline" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
};
