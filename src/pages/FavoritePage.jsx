import { useSelector } from 'react-redux';

import { useEffect, useRef } from 'react';
import styles from './favoritePage.module.scss';

import MovieItem from '../components/MovieItem';
import FavoritesModal from '../components/FavoritesModal';
import useDragDrop from '../utils/useDragDrop';

export default function FavoritesPage() {
  const favoriteMovies = useSelector((state) => state.favoriteMovies);
  const selectedMovie = useSelector((state) => state.selectedMovie);
  const categoryCount = useSelector((state) => state.categoryCount);

  const { dragStart, dragOver, dragDrop } = useDragDrop();

  const listDOM = useRef();

  useEffect(() => {
    const dom = listDOM.current;
    if (dom) dom.scrollTo(0, 0);
  }, [categoryCount]);

  return (
    <>
      <div className={styles.title}>즐겨찾기 페이지</div>
      <ul ref={listDOM} className={styles.listContainer}>
        {favoriteMovies.map((movie, i) => (
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
        ))}

        {selectedMovie && <FavoritesModal selectedMovie={selectedMovie} />}
      </ul>
    </>
  );
}
