import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import '@/ui/field.css';

interface FieldProps {
  label: string;
}

/** A text input with its label above it, in one squircle box. */
export const Field = ({ label, className = '', ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) => (
  <label className={`field rounded-box ${className}`.trim()}>
    <span className="field__label mono">{label}</span>
    <input className="field__control" {...props} />
  </label>
);

/** The same for a longer text. */
export const TextArea = ({ label, className = '', ...props }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <label className={`field rounded-box ${className}`.trim()}>
    <span className="field__label mono">{label}</span>
    <textarea className="field__control field__control--area" {...props} />
  </label>
);
