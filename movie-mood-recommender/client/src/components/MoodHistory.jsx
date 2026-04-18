export default function MoodHistory({ history }) {
  return (
    <section className="panel">
      <h2>Recent Moods</h2>
      {history.length === 0 ? (
        <p>No mood history yet.</p>
      ) : (
        <ul className="simple-list">
          {history.map((item) => (
            <li key={item.id || `${item.mood}-${item.createdAt}`}>
              {item.mood} — {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'recent'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
