import type { LocalizedField } from '@/domain/content';
import { useLang } from '@/i18n/LangContext';

interface SkillTagProps {
  title: LocalizedField;
  description?: LocalizedField;
}

/** One skill: its name, and a line under it if there is one. */
export const SkillTag = ({ title, description }: SkillTagProps) => {
  const { resolveField } = useLang();
  const detail = resolveField(description);

  return (
    <li className="skill card">
      <span className="skill__title">{resolveField(title)}</span>
      {detail && <span className="skill__detail">{detail}</span>}
    </li>
  );
};
