import { useState } from 'react'
import { validateNote } from '../utils/validation'

export default function MovieCard({ movie, isSaved, onSave, onRemove, onClickTitle }) {
  const [note, setNote] = useState('')
  const [noteError, setNoteError] = useState(null)
  const [showNoteInput, setShowNoteInput] = useState(false)

  function handleSave() {
    const result = validateNote(note)
    if (!result.valid) {
      setNoteError(result.error)
      return
    }
    setNoteError(null)
    onSave(movie, note)
    setShowNoteInput(false)
    setNote('')
  }

  return (
    <div className="movie-card">
      {movie.poster ? (
        <img src={movie.poster} alt={`${movie.title} poster`} className="movie-poster" />
      ) : (
        <div className="movie-poster-placeholder">No Image</div>
      )}
      <div className="movie-info">
        <h3 className="movie-title" onClick={() => onClickTitle(movie.imdbID)}>
          {movie.title}
        </h3>
        <p className="movie-year">{movie.year} &middot; {movie.type}</p>
        {movie.note && <p className="movie-note">Note: {movie.note}</p>}

        {isSaved ? (
          <button className="btn-remove" onClick={() => onRemove(movie.imdbID)}>
            Remove
          </button>
        ) : (
          <>
            {showNoteInput ? (
              <div className="note-input-group">
                <input
                  type="text"
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value)
                    if (noteError) setNoteError(null)
                  }}
                  maxLength={200}
                />
                {noteError && <p className="error-message">{noteError}</p>}
                <div className="note-buttons">
                  <button className="btn-save" onClick={handleSave}>Confirm Save</button>
                  <button className="btn-cancel" onClick={() => { setShowNoteInput(false); setNote('') }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className="btn-save" onClick={() => setShowNoteInput(true)}>
                Save
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
