/**
 * The site's one motion philosophy: things have weight and push their neighbours, and settle
 * gently so it never tires the eye. The spring itself lives in tokens.css (`--spring`,
 * `--spring-duration`), sampled from the same physics as Haus's SPRING; CSS runs it for every
 * transition and entrance, so nothing here needs JavaScript animation.
 */

/** Long enough for a quick tap to show: a press is held at least this long. */
export const MIN_PRESS_MS = 140;
