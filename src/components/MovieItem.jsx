import { forwardRef, useState } from 'react';
import { FavoritesButton } from '../commons/FavoritesButton';
import { EmptyStarIcon } from '../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavoriteMovies, selectMovie } from '../__redux/slice';
import { FAVORITE_MOVIES, getItem, setItem } from '../utils/storage';

export default forwardRef(function MovieItem({ movie }, ref) {
  const { Title, Year, imdbID, Type, Poster } = movie;

  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.selectedMovie);

  function handleClick() {
    dispatch(selectMovie(imdbID));
  }

  function handleCancel() {
    dispatch(selectMovie());
  }

  function handleRegister() {
    // const prev = getItem(FAVORITE_MOVIES);

    setItem(FAVORITE_MOVIES, [...getItem(FAVORITE_MOVIES), selectedMovie]);
    dispatch(loadFavoriteMovies());
  }

  return (
    <div
      ref={ref}
      style={{ width: '200px', height: '400px', backgroundColor: 'blue' }}
    >
      <EmptyStarIcon />
      <button type="button" onClick={handleClick}>
        <span>{Title}</span>
        <span>{Year}</span>
        <span>{imdbID}</span>
        <span>{Type}</span>

        {Poster === 'N/A' ? (
          <div
            style={{ width: '200px', height: '300px', backgroundColor: 'red' }}
          >
            이미지가 없습니다
          </div>
        ) : (
          <img src={Poster} width="200px" height="300px" />
        )}
      </button>
      {selectedMovie && (
        <FavoritesButton
          handleRegister={handleRegister}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
});
