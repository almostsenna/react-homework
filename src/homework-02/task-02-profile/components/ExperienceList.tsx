import type { WorkExperience } from '../types';

interface ExperienceListProps {
  experience: WorkExperience[];
}

export default function ExperienceList({ experience }: ExperienceListProps) {
  return (
    <section className="surface-card" aria-labelledby="experience-title">
      <h2 id="experience-title">Досвід роботи</h2>
      <div className="experience-list">
        {experience.map((item) => (
          <article key={item.id}>
            <p className="experience-area">{item.area}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
