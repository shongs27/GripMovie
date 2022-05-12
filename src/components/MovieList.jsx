import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoritesButton } from '../commons/FavoritesButton';
import { FAVORITE_MOVIES, getItem, setItem } from '../utils/storage';
import {
  changeSearchedMovies,
  getSearchNextPage,
  loadFavoriteMovies,
  selectMovie,
} from '../__redux/slice';
import MovieItem from './MovieItem';

export default function MovieList({ movies = [] }) {
  const dispatch = useDispatch();

  const selectedMovie = useSelector((state) => state.selectedMovie);

  function handleRegister() {
    setItem(FAVORITE_MOVIES, [
      ...getItem(FAVORITE_MOVIES),
      { ...selectedMovie, favorite: true },
    ]);
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie.imdbID,
        toggleBoolean: true,
      })
    );
    dispatch(loadFavoriteMovies());
    handleCancel();
  }

  function handleExpel() {
    const filtered = getItem(FAVORITE_MOVIES).filter(
      ({ imdbID }) => imdbID !== selectedMovie.imdbID
    );
    setItem(FAVORITE_MOVIES, filtered);
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie.imdbID,
        toggleBoolean: false,
      })
    );
    dispatch(loadFavoriteMovies());
    handleCancel();
  }

  function handleCancel() {
    dispatch(selectMovie());
  }

  //observer는 DOM이 아니라 정보를 기억한다
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    //초기화
    if (observer.current) observer.current.disconnect();

    //Observe 생성
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(getSearchNextPage());
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div>
      {movies.map((movie, i) => {
        if (movies.length === i + 1) {
          return (
            <MovieItem
              ref={lastElementRef}
              movie={movie}
              favorite={movie.favorite}
            />
          );
        }
        return <MovieItem movie={movie} favorite={movie.favorite} />;
      })}

      {selectedMovie && (
        <FavoritesButton
          handleRegister={handleRegister}
          handleExpel={handleExpel}
          handleCancel={handleCancel}
          favorite={selectedMovie.favorite}
        />
      )}
    </div>
  );
}
