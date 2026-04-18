import { useEffect, useState } from "react";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);

        const [detailsRes, videosRes] = await Promise.all([
          fetch(`${API_URL}/api/movies/${movie.id}/details`),
          fetch(`${API_URL}/api/movies/${movie.id}/videos`),
        ]);

        const detailsData = await detailsRes.json();
        const videosData = await videosRes.json();

        setDetails(detailsData);

        const trailer = (videosData.results || []).find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        setTrailerKey(trailer ? trailer.key : "");
      } catch (error) {
        console.error("Failed to fetch movie modal data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movie.id, API_URL]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="movie-modal upgraded-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {loading ? (
          <div className="modal-loading">Loading movie details...</div>
        ) : (
          <div className="modal-content upgraded-content">
            <div className="modal-left">
              <img src={imageUrl} alt={movie.title} className="modal-poster" />

              {trailerKey && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerKey}`}
                  target="_blank"
                  rel="noreferrer"
                  className="trailer-btn"
                >
                  ▶ Watch Trailer
                </a>
              )}
            </div>

            <div className="modal-details">
              <h2>{details?.title || movie.title}</h2>

              <div className="modal-tags">
                <span>⭐ {details?.vote_average?.toFixed(1) || "N/A"}</span>
                <span>{details?.release_date || "Unknown date"}</span>
                <span>{details?.original_language?.toUpperCase() || "N/A"}</span>
              </div>

              {details?.genres?.length > 0 && (
                <div className="genre-badges">
                  {details.genres.map((genre) => (
                    <span key={genre.id} className="genre-badge">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="modal-overview">
                {details?.overview || "No overview available."}
              </p>

              <div className="modal-extra-info">
                <div className="info-box">
                  <h4>Popularity</h4>
                  <p>{details?.popularity?.toFixed(1) || "N/A"}</p>
                </div>

                <div className="info-box">
                  <h4>Runtime</h4>
                  <p>{details?.runtime ? `${details.runtime} mins` : "N/A"}</p>
                </div>

                <div className="info-box">
                  <h4>Status</h4>
                  <p>{details?.status || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;