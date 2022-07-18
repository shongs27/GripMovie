import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { changeSearchField, getSearchField } from '../slice';

import PageTitle from '../commons/PageTitle';
import SearchBar from '../components/SearchBar';
import Category from '../components/Category';
import MovieList from '../components/MovieList';

export default function SearchPage() {
  const dispatch = useDispatch();
  const searchedMovies = useSelector((state) => state.searchedMovies);
  const searchField = useSelector((state) => state.searchField);
  const categoryCount = useSelector((state) => state.categoryCount);

  const handleSearchChange = useCallback(
    (searchTarget) => {
      dispatch(changeSearchField(searchTarget));
    },
    [dispatch],
  );

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!searchField) return;

      dispatch(getSearchField(1));
    },
    [dispatch, searchField],
  );

  return (
    <>
      <PageTitle title="검색 페이지" />
      <SearchBar
        searchField={searchField}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <Category categoryCount={categoryCount} />
      <MovieList type="search" movies={searchedMovies} />
    </>
  );
}
