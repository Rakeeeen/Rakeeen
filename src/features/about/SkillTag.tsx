import type { LocalizedField } from '@/domain/content';
import { useLang } from '@/i18n/LangContext';

interface SkillTagProps {
  title: LocalizedField;
  description?: LocalizedField;
}

/** One skill, as a round tag: its name, and a few words after it if there are any. */
export const SkillTag = ({ title, description }: SkillTagProps) => {
  const { resolveField } = useLang();
  const detail = resolveField(description);

  return (
    <li className="skill">
      <span className="skill__title">{resolveField(title)}</span>
      {detail && <span className="skill__detail">{detail}</span>}
    </li>
  );
};
