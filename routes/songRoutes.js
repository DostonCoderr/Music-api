const express = require('express');
const { createSong, getSongs, likeSong, rateSong, deleteSong, updateSong ,addComment} = require('../controllers/songController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const Song = require('../models/Song'); // Yangi qo'shilgan qator

const router = express.Router();

router.post('/', createSong);
router.get('/', getSongs);
router.post('/:id/like', likeSong);
router.post('/:id/rate', protect, rateSong);

router.delete('/:id', deleteSong);
router.put('/:id', updateSong); 

router.post('/upload', upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'audioUrl', maxCount: 1 }
]), async (req, res) => {
    try {
        const { title, artist, genre } = req.body;
        const coverImg = req.files['coverImg']?.[0]?.path;
        const audioUrl = req.files['audioUrl']?.[0]?.path;

        const newSong = new Song({ title, artist, genre, coverImg, audioUrl });
        await newSong.save();

        res.status(201).json({ message: 'Song uploaded successfully', song: newSong });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id/comment', protect, addComment); // Yangi qo'shilgan qator

module.exports = router;