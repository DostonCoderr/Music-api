const Genre = require('../models/Genre');

const addGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = new Genre({ name });
    await genre.save();
    res.status(201).json({ message: 'Genre added', genre });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addGenre, getGenres };
