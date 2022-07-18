import { createSlice } from '@reduxjs/toolkit';

import { fetchSearchCategory, fetchSearchField } from './services/api';
import { FAVORITE_MOVIES, getItem } from './utils/storage';

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
};

const reducers = {
  changeSearchField: (state, { payload: searchField }) => ({
    ...state,
    searchField,
  }),

  changeSearchPage: (state, { payload: searchPage }) => ({
    ...state,
    searchPage,
  }),

  setSearchedMovies: (state, { payload: { Search, searchPage } }) => ({
    ...state,
    searchedMovies: searchPage === 1 ? Search : [...state.searchedMovies, ...Search],
  }),

  changeSearchedMovies: (state, { payload: { favoriteID, favorite } }) => {
    const changedMovies = state.searchedMovies.map((movie) => {
      if (movie.imdbID === favoriteID) {
        return {
          ...movie,
          favorite,
        };
      }
      return { ...movie };
    });

    return {
      ...state,
      searchedMovies: changedMovies,
    };
  },

  setFavoriteMovies: (state, { payload: favoriteMovies }) => ({
    ...state,
    favoriteMovies,
  }),

  setMoviesCategory: (state, { payload: { type, totals } }) => ({
    ...state,
    categoryCount: {
      ...state.categoryCount,
      [type]: totals,
    },
  }),

  setNoticeToggle: (state, { payload: notice }) => ({
    ...state,
    notice,
  }),

  selectMovie: (state, { payload: imdbID }) => {
    const { searchedMovies, favoriteMovies } = state;
    return {
      ...state,
      selectedMovie:
        searchedMovies.find((movie) => movie.imdbID === imdbID) ||
        favoriteMovies.find((movie) => movie.imdbID === imdbID),
    };
  },
};

const { actions, reducer } = createSlice({
  name: 'app',
  initialState,
  reducers,
});

export const {
  changeSearchField,
  changeSearchPage,
  setSearchedMovies,
  changeSearchedMovies,
  setFavoriteMovies,
  setMoviesCategory,
  setNoticeToggle,
  selectMovie,
} = actions;

export default reducer;

export function getSearchCategory(searchField) {
  return async (dispatch) => {
    // CATEGORY API : movie, series, episode
    const CATEGORY = ['movie', 'series', 'episode'];

    const responses = await Promise.all(
      CATEGORY.reduce((arr, category) => [...arr, fetchSearchCategory(searchField, category)], []),
    );

    responses.forEach(({ Response, totalResults }, index) => {
      if (Response === 'True') {
        dispatch(setMoviesCategory({ type: CATEGORY[index], totals: totalResults }));
      }
    });
  };
}

function checkFavoriteMovie(favoriteMovies, searchedMovies) {
  return searchedMovies.map((searchMovie) => {
    let flag = false;
    favoriteMovies.forEach((favoriteMovie) => {
      if (searchMovie.imdbID === favoriteMovie.imdbID) {
        flag = true;
      }
    });

    return { ...searchMovie, favorite: flag };
  });
}

export function getSearchField(searchPage = 1) {
  return async (dispatch, getState) => {
    const { searchField, favoriteMovies } = getState();

    dispatch(getSearchCategory(searchField));

    dispatch(changeSearchPage(searchPage));

    const { Response, Search } = await fetchSearchField(searchField, searchPage);
    if (Response === 'False') {
      dispatch(setNoticeToggle('검색결과가 없습니다'));
      return;
    }

    if (favoriteMovies.length) {
      const checkedMovies = checkFavoriteMovie(favoriteMovies, Search);
      dispatch(setSearchedMovies({ Search: checkedMovies, searchPage }));
    } else {
      dispatch(setSearchedMovies({ Search, searchPage }));
    }
  };
}

export function getSearchNextPage() {
  return async (dispatch, getState) => {
    const { searchField, searchPage, favoriteMovies } = getState();
    const nextPage = searchPage + 1;

    dispatch(changeSearchPage(nextPage));

    const { Response, Search } = await fetchSearchField(searchField, nextPage);

    if (Response === 'False') return;

    if (favoriteMovies.length) {
      const checkedMovies = checkFavoriteMovie(favoriteMovies, Search);
      dispatch(setSearchedMovies({ Search: checkedMovies }));
    } else {
      dispatch(setSearchedMovies({ Search }));
    }
  };
}

export function loadFavoriteMovies() {
  return async (dispatch) => {
    const result = getItem(FAVORITE_MOVIES);

    dispatch(setFavoriteMovies(result));
  };
}
