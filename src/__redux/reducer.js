const initialState = {
  searchTarget: '',
  searchPage: 1,
  searchedMovies: [
    {
      Title: 'Iron Man: Armored Adventures',
      Year: '2008–2012',
      imdbID: 'tt0837143',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZWNjZTJjZmYtYjhjZS00ZjgwLWFjY2UtMzBlMDkzZmM3M2FiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Man of Iron',
      Year: '1981',
      imdbID: 'tt0082222',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTM5MzI3NTM5Nl5BMl5BanBnXkFtZTgwMTU0MjkwMTE@._V1_SX300.jpg',
    },
  ],
  favoriteMovies: [],
};

const reducer = {
  //setSearchPage ???

  changeSearchField(state, { payload: { searchTarget } }) {
    return {
      ...state,
      searchTarget,
    };
  },

  setSearchedMovies(state, { payload: { searchedMovies } }) {
    return {
      ...state,
      searchedMovies,
    };
  },

  setFavoriteMovies(state, { payload: { favoriteMovies } }) {
    return {
      ...state,
      favoriteMovies,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function (state = initialState, action) {
  return (reducer[action.type] || defaultReducer)(state, action);
}
