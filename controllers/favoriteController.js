// controllers/favoriteController.js
const User = require('../models/User');
const Song = require('../models/Song');

// Qo‘shish
const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const songId = req.params.id;

    if (user.favorites.includes(songId)) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favorites.push(songId);
    await user.save();
    res.json({ message: 'Added to favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// O‘chirish
const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const songId = req.params.id;

    user.favorites = user.favorites.filter(id => id.toString() !== songId);
    await user.save();
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ko‘rish
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToFavorites, removeFromFavorites, getFavorites };
