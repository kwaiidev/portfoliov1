'use client';

import { useState } from 'react';
import styles from '../page.module.css';

type ExperienceItem = {
  title: string;
  place: string;
  date: string;
  description: string[];
};

type ExperienceGroup = {
  label: string;
  items: ExperienceItem[];
};

export default function ExperienceTabs({ groups }: { groups: ExperienceGroup[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = groups[activeIndex] ?? groups[0];

  if (!activeGroup) return null;

  return (
    <>
      <div className={styles.experienceTabList} role="tablist" aria-label="Experience categories">
        {groups.map((group, index) => (
          <button
            key={group.label}
            type="button"
            role="tab"
            id={`experience-tab-${index}`}
            aria-selected={activeIndex === index}
            aria-controls="experience-panel"
            tabIndex={activeIndex === index ? 0 : -1}
            data-active={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              const nextIndex = event.key === 'Home' ? 0
                : event.key === 'End' ? groups.length - 1
                : event.key === 'ArrowRight' ? (index + 1) % groups.length
                : event.key === 'ArrowLeft' ? (index - 1 + groups.length) % groups.length
                : undefined;

              if (nextIndex !== undefined) {
                event.preventDefault();
                setActiveIndex(nextIndex);
                document.getElementById(`experience-tab-${nextIndex}`)?.focus();
              }
            }}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div id="experience-panel" className={styles.experiencePanel} role="tabpanel" aria-labelledby={`experience-tab-${activeIndex}`} tabIndex={0}>
        <ol className={styles.experienceList}>
          {activeGroup.items.map((item, index) => (
            <li key={`${item.place}-${item.title}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{item.title}</h3><p>{item.place}</p></div>
              <span className={styles.experienceDate}>{item.date}</span>
              <ul className={styles.experienceBullets}>
                {item.description.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
