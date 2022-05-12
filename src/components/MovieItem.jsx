import { forwardRef } from 'react';
import { FavoritesButton } from '../commons/FavoritesButton';
import { EmptyStarIcon, FullStarIcon } from '../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchedMovies,
  loadFavoriteMovies,
  selectMovie,
} from '../__redux/slice';
import { FAVORITE_MOVIES, getItem, setItem } from '../utils/storage';

export default forwardRef(function MovieItem({ movie, favorite }, ref) {
  const { Title, Year, imdbID, Type, Poster } = movie;

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(selectMovie(imdbID));
  }

  return (
    <div
      ref={ref}
      style={{ width: '200px', height: '400px', backgroundColor: 'blue' }}
    >
      {favorite ? <FullStarIcon /> : <EmptyStarIcon />}

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
    </div>
  );
});
