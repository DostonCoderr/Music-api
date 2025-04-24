const express = require('express');
const { createSubcategory, deleteSubcategory, isAdmin } = require('../controllers/subcategoryController');

const router = express.Router();

router.post('/', isAdmin, createSubcategory); // Admin faqat
router.delete('/:id', isAdmin, deleteSubcategory); // Admin faqat

module.exports = router;

