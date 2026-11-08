/**
 * Resolves once the faces the first screen is set in have loaded (or failed: it never rejects).
 * The site waits for this before showing a page, so the entrance plays once, in the right letters,
 * instead of once in a fallback face and again as the real one swaps in.
 */
export const fontsReady = (): Promise<void> => {
  if (!document.fonts) return Promise.resolve();
  const faces = ['800 1em "General Sans"', '500 1em "General Sans"', '400 1em "General Sans"', '500 1em "Geist Mono"'];
  return Promise.allSettled(faces.map((face) => document.fonts.load(face))).then(() => undefined);
};
