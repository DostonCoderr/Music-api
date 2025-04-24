const express = require('express');
const { addGenre, getGenres } = require('../controllers/genreController');
const router = express.Router();

router.post('/', addGenre);
router.get('/', getGenres);

module.exports = router;
