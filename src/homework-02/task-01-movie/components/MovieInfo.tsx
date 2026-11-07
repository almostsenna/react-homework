import type { Movie } from '../types';

import InfoList from '../../../components/InfoList';
import TagList from '../../../components/TagList';

interface MovieInfoProps {
  movie: Movie;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
  const facts = [
    { id: 'director', label: 'Режисер', value: movie.director },
    { id: 'year', label: 'Рік випуску', value: movie.year },
    { id: 'genre', label: 'Жанр', value: movie.genre },
    { id: 'studios', label: 'Кіностудії', value: movie.studios.join(', ') },
  ];

  return (
    <section className="movie-layout" aria-label="Інформація про фільм">
      <div className="movie-poster-panel">
        <img className="movie-poster" src={movie.poster} alt={`Афіша фільму ${movie.title}`} width="472" height="700" />
      </div>
      <div className="movie-details">
        <p className="movie-subtitle">{movie.titleUkr} / {movie.year}</p>
        <h2>Легенда, яка залишилася на плівці</h2>
        <p className="movie-description">{movie.description}</p>
        <InfoList items={facts} />
        <TagList items={movie.topics} />
        <p className="source-link">
          <a href={movie.source} target="_blank" rel="noreferrer">Про фільм на сайті режисера ↗</a>
        </p>
      </div>
    </section>
  );
}
