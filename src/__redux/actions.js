export function changeSearchField(searchTarget) {
  return {
    type: 'changeSearchField',
    payload: { searchTarget },
  };
}

export function getSearchField() {
  return async (dispatch, getState) => {
    const { searchField } = getState();

    //페이지별로 어떻게 가져올 수 있을까?
    // const result = await fetchSearchField(searchField);

    console.log('getSearchField가 아직 구현 안됐어요');
  };
}

export function setSearchedMovies(searchedMovies) {
  return {
    type: 'setSearchedMovies',
    payload: { searchedMovies },
  };
}

export function setFavoriteMovies(favoriteMovies) {
  return {
    type: 'setFavoriteMovies',
    payload: { favoriteMovies },
  };
}
