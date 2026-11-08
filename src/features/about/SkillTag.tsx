import React from 'react';
import { LocalizedField } from '@/domain/content';
import { useLang } from '@/i18n/LangContext';

interface SkillTagProps {
  title: LocalizedField;
  description?: LocalizedField;
}

export const SkillTag: React.FC<SkillTagProps> = ({ title, description }) => {
  const { resolveField } = useLang();
  
  return (
    <div className="premium-skill-card">
      <style>{`
        .premium-skill-card {
          border: 1px solid var(--border);
          background: var(--paper-dark);
          padding: 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          min-width: 200px;
          flex: 1 1 calc(33.333% - 1rem);
          transition: transform 0.15s cubic-bezier(0.19,1,0.22,1), box-shadow 0.15s cubic-bezier(0.19,1,0.22,1), background-color 0.25s ease, color 0.25s ease;
          cursor: default;
          user-select: none;
        }

        .premium-skill-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 4px 4px 0px 0px var(--ink);
          background: var(--sepia) !important;
          color: #000000 !important;
        }

        body.dark .premium-skill-card:hover {
          box-shadow: 4px 4px 0px 0px rgba(255,255,255,0.18) !important;
          color: #000000 !important;
        }

        .skill-title-text {
          font-family: var(--font-display);
          font-size: 1.12rem;
          font-weight: 850;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          transition: color 0.25s ease;
        }

        .skill-desc-text {
          font-family: var(--font-body);
          font-size: 0.8rem;
          line-height: 1.4;
          opacity: 0.55;
          transition: color 0.25s ease, opacity 0.25s ease;
        }

        .premium-skill-card:hover .skill-desc-text {
          color: #000000 !important;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .premium-skill-card {
            flex: 1 1 100%;
          }
        }
      `}</style>
      <span className="skill-title-text">
        {resolveField(title)}
      </span>
      <span className="skill-desc-text">
        {resolveField(description)}
      </span>
    </div>
  );
};
