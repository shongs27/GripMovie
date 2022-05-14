import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeSearchedMovies,
  getSearchNextPage,
  loadFavoriteMovies,
  selectMovie,
} from '../slice'

import { FAVORITE_MOVIES, getItem, setItem } from '../utils/storage'

import styles from './MovieList.module.scss'

import MovieItem from './MovieItem'
import FavoritesModal from '../commons/FavoritesModal'

export default function MovieList({ type, movies = [] }) {
  const dispatch = useDispatch()
  const selectedMovie = useSelector((state) => state.selectedMovie)
  const categoryCount = useSelector((state) => state.categoryCount)

  const observer = useRef()
  const listDOM = useRef()

  function UpdateFavoriteMovies(movies) {
    setItem(FAVORITE_MOVIES, movies)
    dispatch(loadFavoriteMovies())
    handleCancel()
  }

  function handleCancel() {
    dispatch(selectMovie())
  }

  function handleRegister() {
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie.imdbID,
        favorite: true,
      }),
    )

    const added = [
      ...getItem(FAVORITE_MOVIES),
      { ...selectedMovie, favorite: true },
    ]
    UpdateFavoriteMovies(added)
  }

  function handleExpel() {
    dispatch(
      changeSearchedMovies({
        favoriteID: selectedMovie.imdbID,
        favorite: false,
      }),
    )

    const filtered = getItem(FAVORITE_MOVIES).filter(
      ({ imdbID }) => imdbID !== selectedMovie.imdbID,
    )
    UpdateFavoriteMovies(filtered)
  }

  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(getSearchNextPage())
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  useEffect(() => {
    const dom = listDOM.current
    if (dom) dom.scrollTo(0, 0)
  }, [categoryCount])

  if (type == 'search' && !movies.length) {
    return <div className={styles.noSearch}>검색 결과가 없습니다</div>
  }

  return (
    <ul ref={listDOM} className={styles.listContainer}>
      {movies.map((movie, i) => (type === 'search' && movies.length - 1 === i ? (
        <MovieItem key={`${type}-${i}`} ref={lastElementRef} movie={movie} />
      ) : (
        <MovieItem key={`${type}-${i}`} movie={movie} />
      )))}

      {selectedMovie && (
        <FavoritesModal
          handleRegister={handleRegister}
          handleExpel={handleExpel}
          handleCancel={handleCancel}
          selectedMovie={selectedMovie}
        />
      )}
    </ul>
  )
}
