const KEY = 'movieSearcher_savedMovies'

export function getSavedMovies() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] }
  catch { return [] }
}

function writeSaved(movies) {
  localStorage.setItem(KEY, JSON.stringify(movies))
}

export function saveMovie(movie, note = '') {
  const saved = getSavedMovies()
  if (saved.some(m => m.imdbID === movie.imdbID)) return false
  saved.push({ ...movie, note, savedAt: new Date().toISOString() })
  writeSaved(saved)
  return true
}

export function removeMovie(imdbID) {
  writeSaved(getSavedMovies().filter(m => m.imdbID !== imdbID))
}

export function isMovieSaved(imdbID) {
  return getSavedMovies().some(m => m.imdbID === imdbID)
}
