const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const songRoutes = require('./routes/songRoutes');
const authRoutes = require('./routes/authRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const { protect } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('🎵 Welcome to Music API');
});

// Routes
app.use('/api/songs', songRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/favorites', protect, favoriteRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/playlist', protect, playlistRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB error:', err.message);
});

// Run server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});