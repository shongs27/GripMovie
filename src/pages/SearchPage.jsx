import { useSelector, useDispatch } from 'react-redux';

import Title from '../commons/Title';
import SearchBar from '../components/SearchBar';
import Category from '../components/Category';
import MovieList from '../components/MovieList';
import { changeSearchField, getSearchField } from '../__redux/slice';

export default function SearchPage() {
  const dispatch = useDispatch();
  const searchedMovies = useSelector((state) => state.searchedMovies);
  const searchField = useSelector((state) => state.searchField);
  const categoryCount = useSelector((state) => state.categoryCount);

  function handleSearchChange(searchTarget) {
    dispatch(changeSearchField(searchTarget));
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!searchField) return;

    dispatch(getSearchField(1));
  }

  return (
    <div>
      <Title title="MovieHome" />
      <SearchBar
        searchField={searchField}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <Category categoryCount={categoryCount} />
      <MovieList movies={searchedMovies} />
    </div>
  );
}
