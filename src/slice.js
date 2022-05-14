import { createSlice } from '@reduxjs/toolkit'

import { fetchSearchCategory, fetchSearchField } from './services/api'
import { FAVORITE_MOVIES, getItem } from './utils/storage'

const initialState = {
  searchField: '',
  searchPage: 1,
  searchedMovies: [],
  favoriteMovies: [],
  selectedMovie: '',
  categoryCount: {
    movie: 0,
    series: 0,
    episode: 0,
  },
  notice: '',
}

const reducers = {
  changeSearchField: (state, { payload: searchField }) => {
    return {
      ...state,
      searchField,
    }
  },

  changeSearchPage: (state, { payload: searchPage }) => {
    return {
      ...state,
      searchPage,
    }
  },

  setSearchedMovies: (state, { payload: { Search, searchPage } }) => {
    return {
      ...state,
      searchedMovies:
        searchPage === 1 ? Search : [...state.searchedMovies, ...Search],
    }
  },

  changeSearchedMovies: (state, { payload: { favoriteID, favorite } }) => {
    const changedMovies = state.searchedMovies.map((movie) => {
      if (movie.imdbID === favoriteID) {
        return {
          ...movie,
          favorite,
        }
      }
      return { ...movie }
    })

    return {
      ...state,
      searchedMovies: changedMovies,
    }
  },

  setFavoriteMovies: (state, { payload: favoriteMovies }) => {
    return {
      ...state,
      favoriteMovies,
    }
  },

  setMoviesCategory: (state, { payload: { type, totals } }) => {
    return {
      ...state,
      categoryCount: {
        ...state.categoryCount,
        [type]: totals,
      },
    }
  },

  setNoticeToggle: (state, { payload: notice }) => {
    return {
      ...state,
      notice,
    }
  },

  selectMovie: (state, { payload: imdbID }) => {
    const { searchedMovies, favoriteMovies } = state
    return {
      ...state,
      selectedMovie:
        searchedMovies.find((movie) => movie.imdbID === imdbID)
        || favoriteMovies.find((movie) => movie.imdbID === imdbID),
    }
  },
}

const { actions, reducer } = createSlice({
  name: 'app',
  initialState,
  reducers,
})

export const {
  changeSearchField,
  changeSearchPage,
  setSearchedMovies,
  changeSearchedMovies,
  setFavoriteMovies,
  setMoviesCategory,
  setNoticeToggle,
  selectMovie,
} = actions

export default reducer

export function getSearchCategory(searchField) {
  return async (dispatch) => {
    // CATEGORY API : movie, series, episode
    const CATEGORY = ['movie', 'series', 'episode']

    const responses = await Promise.all(
      CATEGORY.reduce(
        (arr, category) => [...arr, fetchSearchCategory(searchField, category)],
        [],
      ),
    )

    responses.forEach(({ Response, totalResults }, index) => {
      if (Response === 'True') {
        dispatch(
          setMoviesCategory({ type: CATEGORY[index], totals: totalResults }),
        )
      }
    })
  }
}

function favoriteAdd(favoriteMovies, Search) {
  if (favoriteMovies.length) {
    Search.forEach((searchMovie) => {
      favoriteMovies.forEach((favoriteMovie) => {
        if (searchMovie.imdbID === favoriteMovie.imdbID) {
          searchMovie.favorite = true
        }
      })
    })
  }
}

export function getSearchField(searchPage = 1) {
  return async (dispatch, getState) => {
    const { searchField, favoriteMovies } = getState()

    // 카테고리 받아오기
    dispatch(getSearchCategory(searchField))

    // 찾는페이지 초기화
    dispatch(changeSearchPage(searchPage))

    const { Response, Search } = await fetchSearchField(
      searchField,
      searchPage,
    )

    if (Response === 'False') {
      return dispatch(setNoticeToggle('검색결과가 없습니다'))
    }

    // 찾은영화 정보에 로컬에서의 즐겨찾기 정보 업데이트
    favoriteAdd(favoriteMovies, Search)

    dispatch(setSearchedMovies({ Search, searchPage }))
  }
}

export function getSearchNextPage() {
  return async (dispatch, getState) => {
    const { searchField, searchPage, favoriteMovies } = getState()
    const nextPage = searchPage + 1

    dispatch(changeSearchPage(nextPage))

    const { Response, Search } = await fetchSearchField(searchField, nextPage)

    if (Response === 'False') return

    favoriteAdd(favoriteMovies, Search)

    dispatch(setSearchedMovies({ Search }))
  }
}

export function loadFavoriteMovies() {
  return async (dispatch) => {
    const result = getItem(FAVORITE_MOVIES)

    dispatch(setFavoriteMovies(result))
  }
}
