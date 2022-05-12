import { forwardRef, useState } from 'react';
import { FavoritesButton } from '../commons/FavoritesButton';
import { EmptyStarIcon } from '../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovie } from '../__redux/slice';

export default forwardRef(function MovieItem({ movie }, ref) {
  const { Title, Year, imdbID, Type, Poster } = movie;

  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.selectedMovie);

  function handleClick() {
    dispatch(selectMovie(imdbID));
  }

  function handleRegister() {}

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

        {selectedMovie && (
          <FavoritesButton
            handleRegister={handleRegister}
            handleCancel={handleClick}
          />
        )}
      </button>
    </div>
  );
});
