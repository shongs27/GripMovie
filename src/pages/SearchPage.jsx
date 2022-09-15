import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import styles from './searchPage.module.scss';

import SearchBar from '../components/SearchBar';
import Category from '../components/Category';
import useObserver from '../utils/useObserver';
import MovieItem from '../components/MovieItem';
import FavoritesModal from '../components/FavoritesModal';
import Loading from '../components/Loading';

export default function SearchPage() {
  const searchedMovies = useSelector((state) => state.searchedMovies);
  const selectedMovie = useSelector((state) => state.selectedMovie);
  const categoryCount = useSelector((state) => state.categoryCount);
  const loading = useSelector((state) => state.loading);

  useObserver(searchedMovies);

  const listDOM = useRef();

  useEffect(() => {
    const dom = listDOM.current;
    if (dom) dom.scrollTo(0, 0);
  }, [categoryCount]);

  return (
    <>
      <div className={styles.title}>검색 페이지</div>
      <SearchBar />
      <Category />
      <ul ref={listDOM} className={styles.listContainer}>
        {searchedMovies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}

        {loading && <Loading />}

        {selectedMovie && <FavoritesModal selectedMovie={selectedMovie} />}
      </ul>
    </>
  );
}
