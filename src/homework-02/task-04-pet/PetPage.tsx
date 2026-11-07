import PageTitle from '../../components/PageTitle';
import PetCard from './components/PetCard';
import { pet } from './data/petData';

export default function PetPage() {
  return (
    <div className="pet-page task-page">
      <PageTitle eyebrow="Домашній улюбленець" title={pet.name} description="Маленька сторінка про великого друга." />
      <PetCard pet={pet} />
      <p className="example-note">Бруно та його характеристики є навчальним прикладом.</p>
    </div>
  );
}
