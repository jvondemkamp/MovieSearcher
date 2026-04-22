const API_KEY = import.meta.env.VITE_OMDB_API_KEY || ''
const BASE_URL = 'https://www.omdbapi.com'

async function fetchApi(params) {
  if (!API_KEY) {
    throw new Error('OMDB API key is not configured.')
  }
  const url = `${BASE_URL}/?apikey=${encodeURIComponent(API_KEY)}&${params}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API request failed with status ${res.status}`)
  return res.json()
}

export async function searchMovies(query) {
  const data = await fetchApi(`s=${encodeURIComponent(query.trim())}&type=movie`)

  if (data.Response === 'False') return { movies: [], error: data.Error }

  return {
    movies: data.Search.map(m => ({
      imdbID: m.imdbID,
      title: m.Title,
      year: m.Year,
      type: m.Type,
      poster: m.Poster !== 'N/A' ? m.Poster : null,
    })),
    error: null,
  }
}

export async function getMovieDetails(imdbID) {
  const data = await fetchApi(`i=${encodeURIComponent(imdbID)}&plot=full`)

  if (data.Response === 'False') throw new Error(data.Error)

  return {
    imdbID: data.imdbID, title: data.Title, year: data.Year,
    rated: data.Rated, runtime: data.Runtime, genre: data.Genre,
    director: data.Director, actors: data.Actors, plot: data.Plot,
    poster: data.Poster !== 'N/A' ? data.Poster : null,
    imdbRating: data.imdbRating,
  }
}
