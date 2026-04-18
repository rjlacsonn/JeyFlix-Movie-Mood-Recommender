export default function FavoritesList({ favorites }) {
  return (
    <section className="panel">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No saved movies yet.</p>
      ) : (
        <ul className="simple-list">
          {favorites.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
