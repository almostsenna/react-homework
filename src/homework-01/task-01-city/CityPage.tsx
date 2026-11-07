import CityInfo from './components/CityInfo';
import LandmarkGallery from './components/LandmarkGallery';
import { city, landmarks } from './data/cityData';
import './styles.css';

export default function CityPage() {
  return (
    <div className="city-page">
      <CityInfo city={city} />
      <LandmarkGallery landmarks={landmarks} />
    </div>
  );
}
