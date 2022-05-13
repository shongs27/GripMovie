export const FAVORITE_MOVIES = 'favorite_movies'

export function getItem(key) {
  try {
    const item = localStorage.getItem(key)
    const result = JSON.parse(item)

    if (!Array.isArray(result)) {
      throw new Error('해당하는 key에 일치하는 배열이 아닌 다른값이 있음')
    }
    if (item === null) {
      throw new Error('해당하는 key에 일치하는 값이 없음')
    }

    return result
  } catch (e) {
    return []
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    localStorage.setItem(key, localStorage.getItem(key))
  }
}
