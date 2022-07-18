import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { selectMovie } from '../slice';

import styles from './MovieItem.module.scss';
import { ExclamationIcon, FullStarIcon } from '../assets/svg';

export default forwardRef(({ movie }, ref) => {
  const { Title, Year, imdbID, Type, Poster, favorite } = movie;

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(selectMovie(imdbID));
  }

  function handleError(e) {
    e.currentTarget.src =
      'https://velog.velcdn.com/images/2ujin/post/bbc6b78c-5fdb-4228-adb7-8d3e79679bee/IMG_0290.PNG';
  }

  return (
    <li ref={ref} className={styles.itemContainer}>
      <button type="button" onClick={handleClick}>
        <div className={styles.posterContainer}>
          {Poster === 'N/A' ? (
            <ExclamationIcon className={styles.exclamationIcon} />
          ) : (
            <img src={Poster} alt="에러" onError={handleError} title={imdbID} />
          )}
        </div>

        <div className={styles.introContainer}>
          <FullStarIcon
            className={cx(styles.emptyStarIcon, {
              [styles.fullStarIcon]: favorite,
            })}
          />
          <div className={styles.intro}>
            <p>{Title}</p>
            <p>개봉 : {Year}</p>
            <p>장르 : {Type}</p>
          </div>
        </div>
      </button>
    </li>
  );
});
