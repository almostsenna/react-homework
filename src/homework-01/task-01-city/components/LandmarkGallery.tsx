import type { Landmark } from '../types';

import LandmarkCard from './LandmarkCard';

interface LandmarkGalleryProps {
  landmarks: Landmark[];
}

export default function LandmarkGallery({ landmarks }: LandmarkGalleryProps) {
  return (
    <section className="landmarks" aria-labelledby="landmarks-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Знайомство з містом</p>
          <h2 id="landmarks-title">Місця, які варто побачити</h2>
        </div>
        <span className="count">{landmarks.length} пам’ятки</span>
      </div>

      <div className="landmark-grid">
        {landmarks.map((landmark) => (
          <LandmarkCard key={landmark.id} landmark={landmark} />
        ))}
      </div>
    </section>
  );
}
