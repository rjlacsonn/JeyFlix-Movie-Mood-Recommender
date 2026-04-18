const moodMap = {
  happy: { genres: '35,10751,16', sortBy: 'popularity.desc' },
  sad: { genres: '18,10749', sortBy: 'vote_average.desc' },
  scared: { genres: '27,53', sortBy: 'popularity.desc' },
  romantic: { genres: '10749', sortBy: 'popularity.desc' },
  excited: { genres: '28,12,878', sortBy: 'popularity.desc' },
  chill: { genres: '99,10402,14', sortBy: 'vote_average.desc' },
};

export async function fetchMoviesByMood(mood) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('Missing TMDB_API_KEY in server environment variables.');
  }

  const selection = moodMap[mood] || moodMap.happy;
  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('with_genres', selection.genres);
  url.searchParams.set('sort_by', selection.sortBy);
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('language', 'en-US');
  url.searchParams.set('vote_count.gte', '150');

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('TMDB request failed.');
  }

  const data = await response.json();
  return {
    mood,
    results: data.results?.slice(0, 12) || [],
  };
}

export { moodMap };
