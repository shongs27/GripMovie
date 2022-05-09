import MovieItem from './MovieItem';

export default function MovieList({ movies }) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieItem movie={movie} />
      ))}
    </div>
  );
}
