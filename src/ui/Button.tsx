import type { ButtonHTMLAttributes } from 'react';

type Tone = 'primary' | 'ink' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
}

/**
 * The site's one button, fully round. `primary` (purple) is the single main action on a screen;
 * `ink` is a strong action that is not that one, `outline` is everything else, `ghost` the quietest.
 */
export const Button = ({ tone = 'primary', type = 'button', className = '', ...props }: ButtonProps) => (
  <button type={type} className={`btn btn-${tone} ${className}`.trim()} {...props} />
);
