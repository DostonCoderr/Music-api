const User = require('../models/User');
const Song = require('../models/Song');

// Playlistga qo‘shiq qo‘shish
const addToPlaylist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { playlistName, songId } = req.body;
    const userId = req.user.id;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!Array.isArray(user.playlists)) {
      user.playlists = [];
    }

    let playlist = user.playlists.find(p => p.name === playlistName);
    if (!playlist) {
      playlist = { name: playlistName, songs: [] };
      user.playlists.push(playlist);
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await user.save();
    }

    res.status(200).json({ message: 'Song added to playlist', playlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Pleylist nomini yangilash
const updatePlaylist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { oldName, newName } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!Array.isArray(user.playlists)) {
      user.playlists = [];
    }

    const playlist = user.playlists.find(p => p.name === oldName);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (user.playlists.some(p => p.name === newName)) {
      return res.status(400).json({ message: 'Playlist with this name already exists' });
    }

    playlist.name = newName;
    await user.save();

    res.status(200).json({ message: 'Playlist updated successfully', playlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Pleylistni o‘chirish
const deletePlaylist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { playlistName } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!Array.isArray(user.playlists)) {
      user.playlists = [];
    }

    const playlistIndex = user.playlists.findIndex(p => p.name === playlistName);
    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    user.playlists.splice(playlistIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Pleylistdan qo‘shiqni o‘chirish
const removeSongFromPlaylist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { playlistName, songId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!Array.isArray(user.playlists)) {
      user.playlists = [];
    }

    const playlist = user.playlists.find(p => p.name === playlistName);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const songIndex = playlist.songs.indexOf(songId);
    if (songIndex === -1) {
      return res.status(404).json({ message: 'Song not found in playlist' });
    }

    playlist.songs.splice(songIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Song removed from playlist', playlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Foydalanuvchi pleylistlarini olish
const getPlaylists = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.id;
    const user = await User.findById(userId).populate({
      path: 'playlists.songs',
      model: 'Song'
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ playlists: user.playlists });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToPlaylist, updatePlaylist, deletePlaylist, removeSongFromPlaylist, getPlaylists };