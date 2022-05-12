import { createSlice } from '@reduxjs/toolkit';
// import { equal } from './utils';

import { fetchSearchCategory, fetchSearchField } from '../services/api';
import { FAVORITE_MOVIES, getItem } from '../utils/storage';

// import { saveItem } from './services/storage';

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
  notice: {
    toggle: false,
    content: '',
  },
};

const reducers = {
  changeSearchField: (state, { payload: searchField }) => {
    return {
      ...state,
      searchField,
    };
  },

  changeSearchPage: (state, { payload: searchPage }) => {
    return {
      ...state,
      searchPage,
    };
  },

  setSearchedMovies: (state, { payload: { newMovies, reset } }) => {
    return {
      ...state,
      searchedMovies: reset
        ? newMovies
        : [...state.searchedMovies, ...newMovies],
    };
  },

  changeSearchedMovies: (state, { payload: { favoriteID, toggleBoolean } }) => {
    return {
      ...state,
      searchedMovies: state.searchedMovies.map((movie) => {
        if (movie.imdbID === favoriteID) {
          return {
            ...movie,
            favorite: toggleBoolean,
          };
        }
        return { ...movie };
      }),
    };
  },

  setFavoriteMovies: (state, { payload: favoriteMovies }) => {
    return {
      ...state,
      favoriteMovies,
    };
  },

  setMoviesCategory: (state, { payload: { type, totals } }) => {
    return {
      ...state,
      categoryCount: {
        ...state,
        [type]: totals,
      },
    };
  },

  setNoticeToggle: (state, { payload: [toggle, content] }) => {
    return {
      ...state,
      notice: {
        toggle,
        content,
      },
    };
  },

  selectMovie: (state, { payload: imdbID }) => {
    const { searchedMovies } = state;
    return {
      ...state,
      selectedMovie: searchedMovies.find((movie) => movie.imdbID === imdbID),
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

export function getSearchField(searchPage = 1) {
  return async (dispatch, getState) => {
    dispatch(changeSearchPage(searchPage));

    const { searchField, favoriteMovies } = getState();
    dispatch(getSearchCategory(searchField));

    const { Response, Search, totalResults, Error } = await fetchSearchField(
      searchField,
      searchPage
    );

    if (Response === 'False') {
      dispatch(setNoticeToggle([true, '영화정보를 가져오는데 실패했습니다']));
    }

    //search 항상 10개씩 들어옴
    if (favoriteMovies.length) {
      Search.forEach((searchMovie) => {
        favoriteMovies.forEach((favoriteMovie) => {
          if (searchMovie.imdbID === favoriteMovie.imdbID) {
            searchMovie['favorite'] = true;
          }
        });
      });
    }

    dispatch(setSearchedMovies({ newMovies: Search, reset: true }));
  };
}

export function getSearchNextPage() {
  return async (dispatch, getState) => {
    const { searchField, searchPage, favoriteMovies } = getState();

    const nextPage = searchPage + 1;
    dispatch(changeSearchPage(nextPage));

    const { Response, Search, totalResults, Error } = await fetchSearchField(
      searchField,
      nextPage
    );

    if (Response === 'False') {
      console.log('더이상 보여줄 화면이 없습니다');
    }

    if (favoriteMovies.length) {
      Search.forEach((searchMovie) => {
        favoriteMovies.forEach((favoriteMovie) => {
          if (searchMovie.imdbID === favoriteMovie.imdbID) {
            searchMovie['favorite'] = true;
          }
        });
      });
    }

    dispatch(setSearchedMovies({ newMovies: Search }));
  };
}

export function getSearchCategory(searchField) {
  return async (dispatch, getState) => {
    // movie, series, episode
    const CATEGORY = ['movie', 'series', 'episode'];
    const responses = await Promise.all([
      CATEGORY.reduce(
        (arr, category) => [...arr, fetchSearchCategory(searchField, category)],
        []
      ),
    ]);
    // fetchSearchCategory(searchField, 'movie'),
    // fetchSearchCategory(searchField, 'series'),
    // fetchSearchCategory(searchField, 'episode'),

    responses.forEach(({ Response, totalResults }, index) => {
      if (Response === 'True') {
        dispatch(
          setMoviesCategory({ type: CATEGORY[index], totals: totalResults })
        );
      }
    });
  };
}

export function loadFavoriteMovies() {
  return async (dispatch) => {
    const result = getItem(FAVORITE_MOVIES);

    if (result) {
      dispatch(setFavoriteMovies(result));
    }
  };
}
