import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchedMovies, loadFavoriteMovies, selectMovie } from '../slice';

import { FAVORITE_MOVIES, getItem, setItem } from '../utils/storage';

import styles from './MovieList.module.scss';

import MovieItem from './MovieItem';
import FavoritesModal from './FavoritesModal';
import Loading from './Loading';

import useDragDrop from '../utils/useDragDrop';
import useObserver from '../utils/useObserver';

export default function MovieList({ type, movies = [] }) {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.selectedMovie);
  const categoryCount = useSelector((state) => state.categoryCount);
  const loading = useSelector((state) => state.loading);

  const { dragStart, dragOver, dragDrop } = useDragDrop();
  useObserver(movies);

  const listDOM = useRef();

  const handleCancel = useCallback(() => {
    dispatch(selectMovie());
  }, [dispatch]);

  const UpdateFavoriteMovies = useCallback(
    (favoriteMovies) => {
      setItem(FAVORITE_MOVIES, favoriteMovies);
      dispatch(loadFavoriteMovies());
      handleCancel();
    },
    [dispatch, handleCancel],
  );

  const handleRegister = useCallback(() => {
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie.imdbID,
        favorite: true,
      }),
    );

    const added = [...getItem(FAVORITE_MOVIES), { ...selectedMovie, favorite: true }];
    UpdateFavoriteMovies(added);
  }, [dispatch, UpdateFavoriteMovies, selectedMovie]);

  const handleExpel = useCallback(() => {
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie?.imdbID,
        favorite: false,
      }),
    );

    const filtered = getItem(FAVORITE_MOVIES).filter(
      ({ imdbID }) => imdbID !== selectedMovie?.imdbID,
    );
    UpdateFavoriteMovies(filtered);
  }, [dispatch, UpdateFavoriteMovies, selectedMovie?.imdbID]);

  useEffect(() => {
    const dom = listDOM.current;
    if (dom) dom.scrollTo(0, 0);
  }, [categoryCount]);

  if (type === 'search' && !movies.length) {
    return <div className={styles.noSearch}>검색 결과가 없습니다</div>;
  }

  return (
    <ul ref={listDOM} className={styles.listContainer}>
      {movies.map((movie, i) =>
        type === 'search' && movies.length - 1 === i ? (
          <MovieItem key={movie.imdbID} movie={movie} />
        ) : (
          <div
            key={movie.imdbID}
            draggable
            onDragOver={dragOver}
            onDragStart={dragStart}
            onDrop={dragDrop}
            id={i}
          >
            <MovieItem movie={movie} />
          </div>
        ),
      )}

      {loading && <Loading />}

      {selectedMovie && (
        <FavoritesModal
          handleRegister={handleRegister}
          handleExpel={handleExpel}
          handleCancel={handleCancel}
          selectedMovie={selectedMovie}
        />
      )}
    </ul>
  );
}
