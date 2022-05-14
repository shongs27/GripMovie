// import styles from './FavoritesPage.module.scss';

import { useSelector } from 'react-redux';
import PageTitle from '../commons/PageTitle';
import MovieList from '../components/MovieList';

export default function FavoritesPage() {
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  return (
    <>
      <PageTitle title="즐겨찾기 페이지" />
      <MovieList type="favorite" movies={favoriteMovies} />
    </>
  );
}
