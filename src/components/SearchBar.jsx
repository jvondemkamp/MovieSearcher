import { useState } from 'react'
import { validateSearchQuery } from '../utils/validation'

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const result = validateSearchQuery(query)
    if (!result.valid) {
      setError(result.error)
      return
    }
    setError(null)
    onSearch(query.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Type a movie name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (error) setError(null)
          }}
          aria-label="Search movies"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}
