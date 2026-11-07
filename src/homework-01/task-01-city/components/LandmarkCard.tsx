import type { Landmark } from '../types';

interface LandmarkCardProps {
  landmark: Landmark;
}

export default function LandmarkCard({ landmark }: LandmarkCardProps) {
  return (
    <article className="landmark-card">
      <img
        className={`landmark-image ${landmark.id}`}
        src={landmark.image}
        alt={landmark.alt}
        width="640"
        height="440"
      />
      <div className="card-body">
        <h3>{landmark.name}</h3>
        <p>{landmark.description}</p>
        <p className="photo-credit">
          <a href={landmark.source} target="_blank" rel="noreferrer">
            Фото: {landmark.author}
          </a>
          {' · '}
          <a href={landmark.licenseUrl} target="_blank" rel="noreferrer">
            {landmark.license}
          </a>
        </p>
      </div>
    </article>
  );
}
