const fail = (error) => ({ valid: false, error })
const pass = { valid: true, error: null }

export function validateSearchQuery(query) {
  if (query == null) return fail('Search query is required.')
  if (typeof query !== 'string') return fail('Search query must be a string.')

  const trimmed = query.trim()
  if (trimmed.length === 0) return fail('Search query cannot be empty.')
  if (trimmed.length < 2) return fail('Search query must be at least 2 characters.')
  if (trimmed.length > 100) return fail('Search query must be under 100 characters.')
  if (!/^[a-zA-Z0-9\s\-':.!&]+$/.test(trimmed)) return fail('Search query contains invalid characters.')

  return pass
}

export function validateNote(note) {
  if (note == null || note.trim().length === 0) return pass
  if (note.length > 200) return fail('Note must be under 200 characters.')
  return pass
}
