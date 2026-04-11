import { describe, it, expect } from 'vitest'
import { validateSearchQuery, validateNote } from '../utils/validation'

describe('validateSearchQuery', () => {
  it('rejects undefined input', () => {
    const result = validateSearchQuery(undefined)
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Search query is required.')
  })

  it('rejects null input', () => {
    const result = validateSearchQuery(null)
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Search query is required.')
  })

  it('rejects non-string input', () => {
    const result = validateSearchQuery(123)
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Search query must be a string.')
  })

  it('rejects empty string', () => {
    const result = validateSearchQuery('')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Search query cannot be empty.')
  })

  it('rejects whitespace-only string', () => {
    const result = validateSearchQuery('   ')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Search query cannot be empty.')
  })

  it('rejects single character query', () => {
    const result = validateSearchQuery('a')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Search query must be at least 2 characters.')
  })

  it('rejects query over 100 characters', () => {
    const longQuery = 'a'.repeat(101)
    const result = validateSearchQuery(longQuery)
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Search query must be under 100 characters.')
  })

  it('rejects query with invalid special characters', () => {
    const result = validateSearchQuery('movie<script>')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Search query contains invalid characters.')
  })

  it('accepts a valid movie title', () => {
    const result = validateSearchQuery('The Dark Knight')
    expect(result.valid).toBe(true)
    expect(result.error).toBeNull()
  })

  it('accepts title with apostrophe', () => {
    const result = validateSearchQuery("Schindler's List")
    expect(result.valid).toBe(true)
    expect(result.error).toBeNull()
  })

  it('accepts title with colon and numbers', () => {
    const result = validateSearchQuery('Mission: Impossible 3')
    expect(result.valid).toBe(true)
    expect(result.error).toBeNull()
  })

  it('accepts two-character query', () => {
    const result = validateSearchQuery('Up')
    expect(result.valid).toBe(true)
    expect(result.error).toBeNull()
  })

  it('accepts exactly 100 characters', () => {
    const query = 'a'.repeat(100)
    const result = validateSearchQuery(query)
    expect(result.valid).toBe(true)
    expect(result.error).toBeNull()
  })
})

describe('validateNote', () => {
  it('accepts empty note (optional)', () => {
    const result = validateNote('')
    expect(result.valid).toBe(true)
  })

  it('accepts null note', () => {
    const result = validateNote(null)
    expect(result.valid).toBe(true)
  })

  it('accepts undefined note', () => {
    const result = validateNote(undefined)
    expect(result.valid).toBe(true)
  })

  it('accepts a short note', () => {
    const result = validateNote('Great movie!')
    expect(result.valid).toBe(true)
  })

  it('rejects note over 200 characters', () => {
    const longNote = 'x'.repeat(201)
    const result = validateNote(longNote)
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Note must be under 200 characters.')
  })

  it('accepts note at exactly 200 characters', () => {
    const note = 'x'.repeat(200)
    const result = validateNote(note)
    expect(result.valid).toBe(true)
  })
})
