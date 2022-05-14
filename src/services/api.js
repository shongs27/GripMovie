export async function fetchSearchField(searchField, pages) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchField}&page=${pages}`,
  )
  const data = await response.json()
  return data
}

export async function fetchSearchCategory(searchField, type) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchField}&type=${type}`,
  )
  const data = await response.json()
  return data
}
