export default function MovieDetail({ movie, onClose }) {
  if (!movie) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          {movie.poster && (
            <img src={movie.poster} alt={`${movie.title} poster`} className="modal-poster" />
          )}
          <div className="modal-info">
            <h2>{movie.title} ({movie.year})</h2>
            <p><strong>Rated:</strong> {movie.rated}</p>
            <p><strong>Runtime:</strong> {movie.runtime}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Actors:</strong> {movie.actors}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            <p className="modal-plot"><strong>Plot:</strong> {movie.plot}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
