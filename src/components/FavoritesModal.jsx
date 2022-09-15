import { useDispatch } from 'react-redux';
import { changeSearchedMovies, loadFavoriteMovies, selectMovie } from '../slice';
import { FAVORITE_MOVIES, getItem, setItem } from '../utils/storage';
import styles from './FavoritesModal.module.scss';

export default function FavoritesModal({ selectedMovie }) {
  const { Title, favorite } = selectedMovie;
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(selectMovie());
  };

  const UpdateFavoriteMovies = (favoriteMovies) => {
    setItem(FAVORITE_MOVIES, favoriteMovies);
    dispatch(loadFavoriteMovies());
    handleCancel();
  };

  const handleRegister = () => {
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie.imdbID,
        favorite: true,
      }),
    );

    const added = [...getItem(FAVORITE_MOVIES), { ...selectedMovie, favorite: true }];
    UpdateFavoriteMovies(added);
  };

  const handleExpel = () => {
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
  };

  return (
    <div className={styles.modal}>
      <p className={styles.title}>{Title}</p>

      {favorite ? (
        <button type="button" onClick={handleExpel}>
          즐겨찾기 제거
        </button>
      ) : (
        <button type="button" onClick={handleRegister}>
          즐겨찾기
        </button>
      )}

      <button type="button" onClick={handleCancel}>
        취소
      </button>
      <button type="button" className={styles.modalOut} onClick={handleCancel}>
        <div />
      </button>
    </div>
  );
}
