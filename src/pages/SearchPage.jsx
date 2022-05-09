import { useSelector, useDispatch } from 'react-redux';

import Title from '../components/Title';
import SearchBar from '../components/SearchBar';
import Category from '../components/Category';
import MovieList from '../components/MovieList';

export default function SearchPage() {
  const searchedMovies = useSelector((state) => state.searchedMovies);

  return (
    <div>
      <Title title="MovieHome" />
      <SearchBar />
      <Category />
      <MovieList movies={searchedMovies} />
    </div>
  );
}
