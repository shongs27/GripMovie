import { forwardRef, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { loadFavoriteMovies, selectMovie } from '../slice';

import styles from './MovieItem.module.scss';
import { ExclamationIcon, FullStarIcon } from '../assets/svg';
import { FAVORITE_MOVIES, getItem, setItem } from '../utils/storage';

export default forwardRef(({ movie, index }, ref) => {
  const { Title, Year, imdbID, Type, Poster, favorite } = movie;
  const [dragging, setDragging] = useState(false);
  const dragItemNode = useRef();

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(selectMovie(imdbID));
  }

  function handleError(e) {
    e.currentTarget.src =
      'https://velog.velcdn.com/images/2ujin/post/bbc6b78c-5fdb-4228-adb7-8d3e79679bee/IMG_0290.PNG';
  }

  function dragStart(e) {
    dragItemNode.current = e.currentTarget;

    //event dragEnd
    dragItemNode.current.addEventListener('dragend', handleDragEnd);
    setDragging(true);

    // setTimeout(() => {
    //   setDragging(true);
    // }, 0);
  }

  function dragEnter(e) {
    console.log('Entering a drag target');

    const targetItemNode = e.currentTarget.id;
    console.log('없다고?', targetItemNode);

    // if (dragItemNode.current !== targetItemNode) {
    //   const oldList = getItem(FAVORITE_MOVIES);
    //   const newList = JSON.parse(JSON.stringify(oldList));
    //   console.log(newList);

    //   newList.splice(targetItemNode.id, 1, newList.splice(dragItemNode.current.id, 1)[0]);
    //   console.log(newList);

    //   // const parsed = newList.splice(index, 0, newList.splice(dragItemIndex.current, 1)[0]);
    // }
  }

  function handleDragEnd() {
    console.log('drag End...');
    setDragging(false);
    dragItemNode.current.removeEventListener('dragend', handleDragEnd);
    dragItemNode.current = null;
  }

  return (
    <li
      ref={ref}
      id={index}
      draggable
      onDragStart={dragStart}
      onDragEnter={dragging ? dragEnter : null}
      className={styles.itemContainer}
    >
      <button type="button" onClick={handleClick}>
        <div className={styles.posterContainer}>
          {Poster === 'N/A' ? (
            <ExclamationIcon className={styles.exclamationIcon} />
          ) : (
            <img draggable={false} src={Poster} alt="에러" onError={handleError} title={imdbID} />
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
