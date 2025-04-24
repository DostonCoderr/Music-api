// routes/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  addToFavorites,
  removeFromFavorites,
  getFavorites
} = require('../controllers/favoriteController');

router.get('/', protect, getFavorites);
router.post('/:id', protect, addToFavorites);
router.delete('/:id', protect, removeFromFavorites);

module.exports = router;
