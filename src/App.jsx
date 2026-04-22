import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'
import MovieDetail from './components/MovieDetail'
import { searchMovies, getMovieDetails } from './utils/api'
import { getSavedMovies, saveMovie, removeMovie } from './utils/storage'
import './App.css'

export default function App() {
  const [results, setResults] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [searchPerformed, setSearchPerformed] = useState(false)

  // Load saved movies from server on mount
  useEffect(() => {
    getSavedMovies()
      .then(setSavedMovies)
      .catch(() => {})
  }, [])

  async function handleSearch(query) {
    setIsLoading(true)
    setApiError(null)
    setSearchPerformed(true)
    try {
      const data = await searchMovies(query)
      if (data.error) {
        setApiError(data.error)
        setResults([])
      } else {
        setResults(data.movies)
      }
    } catch (err) {
      setApiError(err.message)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleClickTitle(imdbID) {
    try {
      const details = await getMovieDetails(imdbID)
      setSelectedMovie(details)
    } catch (err) {
      setApiError(err.message)
    }
  }

  async function handleSave(movie, note) {
    try {
      await saveMovie(movie, note)
      setSavedMovies(await getSavedMovies())
    } catch (err) {
      setApiError(err.message)
    }
  }

  async function handleRemove(imdbID) {
    try {
      await removeMovie(imdbID)
      setSavedMovies(await getSavedMovies())
    } catch (err) {
      setApiError(err.message)
    }
  }

  const moviesToShow = showSavedOnly ? savedMovies : results

  return (
    <div className="app">
      <header className="app-header">
        <h1>MovieSearcher</h1>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <div className="filter-bar">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={showSavedOnly}
              onChange={(e) => setShowSavedOnly(e.target.checked)}
            />
            Show Saved Movies ({savedMovies.length})
          </label>
        </div>

        {apiError && <p className="error-message api-error">{apiError}</p>}

        <div className="movie-list">
          {moviesToShow.length > 0 ? (
            moviesToShow.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isSaved={savedMovies.some(m => m.imdbID === movie.imdbID)}
                onSave={handleSave}
                onRemove={handleRemove}
                onClickTitle={handleClickTitle}
              />
            ))
          ) : (
            !isLoading && searchPerformed && !showSavedOnly && (
              <p className="no-results">No movies found. Try a different search.</p>
            )
          )}
          {showSavedOnly && savedMovies.length === 0 && (
            <p className="no-results">No saved movies yet. Search and save some!</p>
          )}
        </div>
      </main>

      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}
