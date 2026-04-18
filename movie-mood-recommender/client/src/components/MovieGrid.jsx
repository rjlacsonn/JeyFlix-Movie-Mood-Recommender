import MovieCard from "./MovieCard";

function MovieGrid({ movies, onSelectMovie }) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <h3>No movies found</h3>
        <p>Try another mood or search term.</p>
      </div>
    );
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onSelectMovie(movie)}
        />
      ))}
    </section>
  );
}

export default MovieGrid;