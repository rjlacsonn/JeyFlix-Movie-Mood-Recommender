function HeroSection({
  moods,
  selectedMood,
  setSelectedMood,
  genre,
  setGenre,
}) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-badge">Welcome to JeyFlix</p>
        <h2>Choose your mood and let the app recommend something great.</h2>
        <p className="hero-text">
          Pick an emoji mood, filter by genre, and discover movies that match how
          you feel right now.
        </p>

        <div className="mood-list">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`mood-btn ${
                selectedMood.label === mood.label ? "active" : ""
              }`}
              onClick={() => setSelectedMood(mood)}
            >
              <span>{mood.emoji}</span>
              {mood.label}
            </button>
          ))}
        </div>

        <div className="filter-row">
          <select
            className="genre-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Mood-based Genre</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
            <option value="10749">Romance</option>
            <option value="9648">Mystery</option>
            <option value="878">Sci-Fi</option>
            <option value="16">Animation</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;