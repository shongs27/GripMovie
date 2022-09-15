import { useSelector } from 'react-redux';

import styles from './searchPage.module.scss';

import SearchBar from '../components/SearchBar';
import Category from '../components/Category';
import MovieList from '../components/MovieList';

export default function SearchPage() {
  const searchedMovies = useSelector((state) => state.searchedMovies);

  return (
    <>
      <div className={styles.title}>검색 페이지</div>
      <SearchBar />
      <Category />
      <MovieList type="search" movies={searchedMovies} />
    </>
  );
}
