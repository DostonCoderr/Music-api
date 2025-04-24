const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  coverImg: { type: String },  // file path
  audioUrl: { type: String },  
  subgenre: String,
  url: String,
  lyrics: String,
  likes: { type: Number, default: 0 },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number, min: 1, max: 5 }
    }
  ],
  averageRating: { type: Number, default: 0 },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
