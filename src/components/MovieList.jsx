import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './MovieList.module.scss';

import MovieItem from './MovieItem';
import FavoritesModal from './FavoritesModal';
import Loading from './Loading';

import useDragDrop from '../utils/useDragDrop';
import useObserver from '../utils/useObserver';

export default function MovieList({ type, movies = [] }) {
  const selectedMovie = useSelector((state) => state.selectedMovie);
  const categoryCount = useSelector((state) => state.categoryCount);
  const loading = useSelector((state) => state.loading);

  const { dragStart, dragOver, dragDrop } = useDragDrop();
  useObserver(movies);

  const listDOM = useRef();

  useEffect(() => {
    const dom = listDOM.current;
    if (dom) dom.scrollTo(0, 0);
  }, [categoryCount]);

  return (
    <ul ref={listDOM} className={styles.listContainer}>
      {movies.map((movie, i) =>
        type === 'search' ? (
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

      {selectedMovie && <FavoritesModal selectedMovie={selectedMovie} />}
    </ul>
  );
}
