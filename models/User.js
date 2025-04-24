const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  playlists: [
    {
      name: String,
      songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
