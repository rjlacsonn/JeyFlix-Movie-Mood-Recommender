import express from "express";

const router = express.Router();

router.get("/recommendations", async (req, res) => {
  try {
    const genre = req.query.genre || "35";
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "TMDB_API_KEY is missing in server/.env" });
    }

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Movie recommendations error:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

router.get("/:id/details", async (req, res) => {
  try {
    const { id } = req.params;
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "TMDB_API_KEY is missing in server/.env" });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Movie details error:", error);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

router.get("/:id/videos", async (req, res) => {
  try {
    const { id } = req.params;
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "TMDB_API_KEY is missing in server/.env" });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Movie videos error:", error);
    res.status(500).json({ error: "Failed to fetch movie videos" });
  }
});

export default router;