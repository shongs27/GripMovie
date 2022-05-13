import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchedMovies,
  getSearchNextPage,
  loadFavoriteMovies,
  selectMovie,
} from '../__redux/slice';
import { FAVORITE_MOVIES, getItem, setItem } from '../utils/storage';

import styles from './MovieList.module.scss';

import MovieItem from './MovieItem';
import { FavoritesButton } from '../commons/FavoritesButton';

export default function MovieList({ type, movies = [] }) {
  const dispatch = useDispatch();

  const selectedMovie = useSelector((state) => state.selectedMovie);

  function handleRegister() {
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie.imdbID,
        toggleBoolean: true,
      })
    );
    setItem(FAVORITE_MOVIES, [
      ...getItem(FAVORITE_MOVIES),
      { ...selectedMovie, favorite: true },
    ]);
    dispatch(loadFavoriteMovies());
    handleCancel();
  }

  function handleExpel() {
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie.imdbID,
        toggleBoolean: false,
      })
    );
    const filtered = getItem(FAVORITE_MOVIES).filter(
      ({ imdbID }) => imdbID !== selectedMovie.imdbID
    );
    setItem(FAVORITE_MOVIES, filtered);
    dispatch(loadFavoriteMovies());
    handleCancel();
  }

  function handleCancel() {
    dispatch(selectMovie());
  }

  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(getSearchNextPage());
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  if (!movies.length) {
    return <div className={styles.noSearch}>검색결과가 없습니다</div>;
  }

  return (
    <ul className={styles.listContainer}>
      {movies.map((movie, i) => {
        if (type === 'search' && movies.length === i + 1) {
          return (
            <MovieItem
              key={`${type}-${i}`}
              ref={lastElementRef}
              movie={movie}
            />
          );
        }
        return <MovieItem key={`${type}-${i}`} movie={movie} />;
      })}

      {selectedMovie && (
        <FavoritesButton
          handleRegister={handleRegister}
          handleExpel={handleExpel}
          handleCancel={handleCancel}
          selectedMovie={selectedMovie}
        />
      )}
    </ul>
  );
}
