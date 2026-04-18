import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";
import AuthModal from "./components/AuthModal";

import { auth } from "./lib/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

const moods = [
  { emoji: "😊", label: "Happy", genre: "35" },
  { emoji: "😢", label: "Sad", genre: "18" },
  { emoji: "🤩", label: "Excited", genre: "28" },
  { emoji: "😌", label: "Chill", genre: "10749" },
  { emoji: "😱", label: "Scared", genre: "27" },
  { emoji: "🤔", label: "Thoughtful", genre: "9648" },
];

function App() {
  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const displayedMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  const fetchMovies = async (moodGenre) => {
    try {
      setLoading(true);
      setError("");

      const activeGenre = genre || moodGenre;
      const response = await fetch(
        `${API_URL}/api/movies/recommendations?genre=${activeGenre}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("Could not load movies. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchMovies(selectedMood.genre);
  }, [selectedMood, genre]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`app-shell ${darkMode ? "dark" : "light"}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />

      <HeroSection
        moods={moods}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        genre={genre}
        setGenre={setGenre}
      />

      <main className="main-content">
        <div className="section-header">
          <div>
            <h2>Recommended Movies</h2>
            <p>
              Based on your mood: <span>{selectedMood.emoji} {selectedMood.label}</span>
            </p>
          </div>
          <button
            className="refresh-btn"
            onClick={() => fetchMovies(selectedMood.genre)}
          >
            Refresh
          </button>
        </div>

        {loading && <p className="status-text">Loading movies...</p>}
        {error && <p className="status-text error-text">{error}</p>}

        {!loading && !error && (
          <MovieGrid
            movies={displayedMovies}
            onSelectMovie={setSelectedMovie}
          />
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}

export default App;