const express = require('express');
const router = express.Router();
const { addToPlaylist, updatePlaylist, deletePlaylist, removeSongFromPlaylist, getPlaylists } = require('../controllers/playlistController');

router.post('/add', addToPlaylist);
router.put('/update', updatePlaylist);
router.delete('/delete', deletePlaylist);
router.delete('/remove-song', removeSongFromPlaylist);
router.get('/', getPlaylists);

module.exports = router;