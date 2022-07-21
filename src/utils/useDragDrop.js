import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadFavoriteMovies } from '../slice';

import { getItem, FAVORITE_MOVIES, setItem } from './storage';

export default function useDragDrop() {
  const dispatch = useDispatch();
  const [dragNode, setDragNode] = useState();

  function dragStart(e) {
    setDragNode(e.currentTarget);

    e.dataTransfer.effectAllowed = 'move';
  }

  function dragOver(e) {
    e.preventDefault();

    e.dataTransfer.dropEffect = 'move';
  }

  function initialize() {
    e.dataTransfer.dropEffect = 'move';
    setDragNode(undefined);
  }

  function dragDrop(e) {
    const dragNodeIndex = Number(dragNode?.id);
    const targetNodeIndex = Number(e.currentTarget.id);

    const newList = [...getItem(FAVORITE_MOVIES)];
    //'타겟노드'를 제거해서 '드래그 노드'를 넣음
    //'드래그 노드'자리에는 '타겟 노드'가 들어감
    newList[dragNodeIndex] = newList.splice(targetNodeIndex, 1, newList[dragNodeIndex])[0];
    setItem(FAVORITE_MOVIES, newList);
    dispatch(loadFavoriteMovies(newList));

    initialize(e);
  }

  return { dragStart, dragOver, dragDrop };
}
