const Category = require('../models/Category');

// Category yaratish
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Barcha Categorylarni olish
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Categoryni o‘chirish
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.remove();
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCategory, getCategories, deleteCategory };
