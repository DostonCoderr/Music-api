const Song = require('../models/Song');

// Create a new song
const createSong = async (req, res) => {
  try {
    const newSong = new Song(req.body);
    const saved = await newSong.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all songs (+ filter + search)
const getSongs = async (req, res) => {
  const { genre, subgenre, search } = req.query;

  let filter = {};
  if (genre) filter.genre = genre;
  if (subgenre) filter.subgenre = subgenre;
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  try {
    const songs = await Song.find(filter);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a song
const deleteSong = async (req, res) => {
  try {
    const deleted = await Song.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a song
const updateSong = async (req, res) => {
  try {
    const { title, artist, genre, subgenre, lyrics } = req.body;

    // Find the song by ID
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Update with new data
    song.title = title || song.title;
    song.artist = artist || song.artist;
    song.genre = genre || song.genre;
    song.subgenre = subgenre || song.subgenre;
    song.lyrics = lyrics || song.lyrics;

    // Save the updated song
    await song.save();
    res.json(song); // Return the updated song
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like a song
const likeSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });

    song.likes += 1;
    await song.save();
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rate a song
const rateSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const { score } = req.body;
    const userId = req.user.id;

    if (score < 1 || score > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });

    // Check if user has already rated
    const existingRating = song.ratings.find(r => r.user.toString() === userId);
    if (existingRating) {
      existingRating.score = score;
    } else {
      song.ratings.push({ user: userId, score });
    }

    // Recalculate average rating
    const total = song.ratings.reduce((sum, r) => sum + r.score, 0);
    song.averageRating = total / song.ratings.length || 0; // Avoid NaN if no ratings exist

    await song.save();
    res.status(200).json({ message: 'Rating submitted', averageRating: song.averageRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a comment
const addComment = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });

    if (!req.body.text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const comment = {
      user: req.user.id,
      text: req.body.text
    };
    song.comments.push(comment);
    await song.save();

    res.status(201).json({ message: 'Comment added', song });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createSong, getSongs, likeSong, rateSong, deleteSong, updateSong, addComment };