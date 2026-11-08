import {
  CHECK_ICON,
  CODE_ICON,
  COMPASS_ICON,
  FLOW_ICON,
  LAYOUT_ICON,
  MAGNIFIER_ICON,
  ROCKET_ICON,
} from '@/ui/phaseIcons.data';
import { SPARKLE_ICON, type SketchIcon } from '@/ui/sketchIcons.data';

/** One hand-drawn icon per phase of "How I build", in order; a longer list starts over. */
export const PHASE_ICONS: readonly SketchIcon[] = [
  MAGNIFIER_ICON, // discovery
  FLOW_ICON, // UX and logic
  LAYOUT_ICON, // UI
  CODE_ICON, // development
  CHECK_ICON, // QA
  ROCKET_ICON, // launch
  COMPASS_ICON,
  SPARKLE_ICON,
];
