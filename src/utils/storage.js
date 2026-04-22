const API_BASE = '/api'

export async function getSavedMovies() {
  const res = await fetch(`${API_BASE}/saved`)
  if (!res.ok) throw new Error('Failed to fetch saved movies.')
  return res.json()
}

export async function saveMovie(movie, note = '') {
  const res = await fetch(`${API_BASE}/saved`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movie, note }),
  })
  if (res.status === 409) return false
  if (!res.ok) throw new Error('Failed to save movie.')
  return true
}

export async function removeMovie(imdbID) {
  const res = await fetch(`${API_BASE}/saved/${encodeURIComponent(imdbID)}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to remove movie.')
}

