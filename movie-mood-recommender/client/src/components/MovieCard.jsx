function MovieCard({ movie, onClick }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster-wrap">
        <img src={imageUrl} alt={movie.title} className="movie-poster" />
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-date">
          {movie.release_date ? movie.release_date.slice(0, 4) : "Unknown"}
        </p>
        <div className="movie-meta">
          <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
          <span>TMDB</span>
        </div>
        <button className="details-btn">View Details</button>
      </div>
    </div>
  );
}

export default MovieCard;