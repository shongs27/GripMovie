import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchNextPage } from '../__redux/slice';
import MovieItem from './MovieItem';

export default function MovieList({ movies = [] }) {
  const dispatch = useDispatch();

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
          return <MovieItem ref={lastElementRef} movie={movie} />;
        }
        return <MovieItem movie={movie} />;
      })}
    </div>
  );
}
