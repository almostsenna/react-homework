import type { SkillGroup } from '../types';

import TagList from '../../../components/TagList';

interface SkillsListProps {
  skills: SkillGroup[];
}

export default function SkillsList({ skills }: SkillsListProps) {
  return (
    <section className="surface-card" aria-labelledby="skills-title">
      <h2 id="skills-title">Навички</h2>
      {skills.map((group) => (
        <div className="skills-group" key={group.id}>
          <h3>{group.title}</h3>
          <TagList items={group.items} />
        </div>
      ))}
    </section>
  );
}
