export async function fetchSearchField(searchField, pages) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=92e32667&s=${searchField}&page=${pages}`
  );
  const data = await response.json();
  return data;
}

export async function fetchSearchCategory(searchField, type) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=92e32667&s=${searchField}&type=${type}`
  );
  const data = await response.json();
  return data;
}
