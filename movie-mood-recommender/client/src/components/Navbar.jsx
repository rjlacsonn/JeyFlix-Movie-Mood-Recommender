import { useState } from "react";

function Navbar({
  darkMode,
  setDarkMode,
  searchTerm,
  setSearchTerm,
  user,
  onOpenAuth,
  onLogout,
}) {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <header className="navbar">
      <div className="logo-wrap">
        <div className="logo-icon">🎬</div>
        <div>
          <h1 className="logo-title">JeyFlix</h1>
          <p className="logo-subtitle">Movie Mood Recommender</p>
        </div>
      </div>

      <div className="nav-actions">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {!user ? (
          <button className="auth-btn" onClick={onOpenAuth}>
            Sign In
          </button>
        ) : (
          <div className="user-box">
            <div className="user-avatar">
              {user.photoURL && !avatarError ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="avatar-fallback">
                  {(user.displayName || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="user-meta">
              <p className="user-name">{user.displayName || "User"}</p>
              <p className="user-email">{user.email}</p>
            </div>

            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;