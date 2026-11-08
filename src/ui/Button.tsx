import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Tone = 'primary' | 'ink' | 'outline' | 'ghost';

const classes = (tone: Tone, className: string) => `btn btn-${tone} ${className}`.trim();

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
}

/**
 * The site's one button, fully round. `primary` (purple) is the single main action on a screen;
 * `ink` is a strong action that is not that one, `outline` is everything else, `ghost` the quietest.
 */
export const Button = ({ tone = 'primary', type = 'button', className = '', ...props }: ButtonProps) => (
  <button type={type} className={classes(tone, className)} {...props} />
);

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: Tone;
}

/** The same button as a link, for going somewhere instead of doing something. */
export const ButtonLink = ({ tone = 'outline', className = '', ...props }: ButtonLinkProps) => (
  <a className={classes(tone, className)} {...props} />
);
