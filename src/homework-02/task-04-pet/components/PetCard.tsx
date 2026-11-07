import type { Pet } from '../types';

import InfoList from '../../../components/InfoList';
import TagList from '../../../components/TagList';

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  const facts = [
    { id: 'species', label: 'Вид', value: pet.species },
    { id: 'breed', label: 'Порода', value: pet.breed },
    { id: 'age', label: 'Вік', value: pet.age },
    { id: 'gender', label: 'Стать', value: pet.gender },
    { id: 'color', label: 'Забарвлення', value: pet.color },
    { id: 'personality', label: 'Характер', value: pet.personality },
  ];

  return (
    <section className="pet-layout" aria-label={`Інформація про ${pet.name}`}>
      <figure className="pet-photo">
        <img src={pet.photo} alt={`Золотистий ретривер ${pet.name}`} width="600" height="450" />
        <figcaption>
          <a href={pet.photoSource} target="_blank" rel="noreferrer">Фото: {pet.photoAuthor} · CC0</a>
        </figcaption>
      </figure>
      <div className="pet-details">
        <p className="pet-breed">{pet.breed}</p>
        <h2>Знайомтесь, {pet.name}</h2>
        <p className="pet-description">{pet.description}</p>
        <InfoList items={facts} />
        <h3>Улюблені заняття</h3>
        <TagList items={pet.hobbies} />
      </div>
    </section>
  );
}
