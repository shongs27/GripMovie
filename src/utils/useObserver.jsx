import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchNextPage } from '../slice';

export default function useObserver(movies) {
  const observer = useRef();
  const dispatch = useDispatch();

  // onload시에 실행되는 것을 보장하지 않는 것 염두
  useEffect(() => {
    const handleObserve = (entries) => {
      if (entries[0].isIntersecting) {
        dispatch(getSearchNextPage());
      }
    };
    observer.current = new IntersectionObserver(handleObserve);

    const lastMovieID = movies[movies.length - 1]?.imdbID;
    const lastMovieNode = document.querySelector(`#${lastMovieID}`);

    if (lastMovieNode) {
      observer.current.observe(lastMovieNode);
    }

    return () => observer.current?.disconnect();
  }, [dispatch, movies]);
}
