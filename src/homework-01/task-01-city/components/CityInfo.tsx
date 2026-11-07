import type { City } from '../types';

interface CityInfoProps {
  city: City;
}

export default function CityInfo({ city }: CityInfoProps) {
  return (
    <section className="city-intro" aria-labelledby="city-title">
      <div className="intro-text">
        <p className="eyebrow">Моє місто</p>
        <h1 id="city-title">{city.name}</h1>
        <p className="description">{city.description}</p>
      </div>

      <dl className="city-facts">
        <div>
          <dt>Країна</dt>
          <dd>{city.country}</dd>
        </div>
        <div>
          <dt>Рік заснування</dt>
          <dd>{city.founded}</dd>
        </div>
        <div>
          <dt>Річка</dt>
          <dd>{city.river}</dd>
        </div>
      </dl>
      <p className="date-note">1363 рік вважають датою заснування за історичною традицією.</p>
    </section>
  );
}
