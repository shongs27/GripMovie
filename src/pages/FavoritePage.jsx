import { useSelector } from 'react-redux';

import styles from './favoritePage.module.scss';

import MovieList from '../components/MovieList';

export default function FavoritesPage() {
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  return (
    <>
      <div className={styles.title}>즐겨찾기 페이지</div>
      <MovieList type="favorite" movies={favoriteMovies} />
    </>
  );
}
