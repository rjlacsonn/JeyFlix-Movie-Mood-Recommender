import express from 'express';
import { fetchMoviesByMood, moodMap } from '../services/tmdbService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mood = String(req.query.mood || 'happy').toLowerCase();
    const data = await fetchMoviesByMood(mood);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/moods', (req, res) => {
  res.json({ moods: Object.keys(moodMap) });
});

export default router;
