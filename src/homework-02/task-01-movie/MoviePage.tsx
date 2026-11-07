import PageTitle from '../../components/PageTitle';
import MovieInfo from './components/MovieInfo';
import { movie } from './data/movieData';

export default function MoviePage() {
  return (
    <div className="movie-page task-page">
      <PageTitle eyebrow="Улюблений фільм" title={movie.title} description="Історія гонщика, для якого перегони були значно більшим за роботу." />
      <MovieInfo movie={movie} />
    </div>
  );
}
