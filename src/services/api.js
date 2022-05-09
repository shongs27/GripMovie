export async function fetchSearchField(searchField, pages) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=92e32667&s=${searchField}&page=${pages}`
  );
  const data = await response.json();
  return data;
}
