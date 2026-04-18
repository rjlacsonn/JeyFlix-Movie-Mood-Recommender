export default function Header({ user, onLogin, onLogout }) {
  return (
    <header className="header">
      <div>
        <h1>Movie Mood Recommender</h1>
        <p>Pick an emoji mood and get movie suggestions instantly.</p>
      </div>
      <div>
        {user ? (
          <div className="auth-box">
            <span>{user.displayName}</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={onLogin}>Sign in with Google</button>
        )}
      </div>
    </header>
  );
}
