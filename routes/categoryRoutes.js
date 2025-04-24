const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', isAdmin, createCategory);  // Admin faqat
router.get('/', getCategories);  // Barcha categorylarni olish
router.delete('/:id', isAdmin, deleteCategory);  // Admin faqat

module.exports = router;
