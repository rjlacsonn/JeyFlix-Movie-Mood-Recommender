const moods = [
  { emoji: '😄', label: 'Happy', value: 'happy' },
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😱', label: 'Scared', value: 'scared' },
  { emoji: '😍', label: 'Romantic', value: 'romantic' },
  { emoji: '🤩', label: 'Excited', value: 'excited' },
  { emoji: '😌', label: 'Chill', value: 'chill' },
];

export default function MoodSelector({ selectedMood, onSelect }) {
  return (
    <div className="mood-grid">
      {moods.map((mood) => (
        <button
          key={mood.value}
          className={`mood-card ${selectedMood === mood.value ? 'active' : ''}`}
          onClick={() => onSelect(mood.value)}
        >
          <span className="emoji">{mood.emoji}</span>
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
