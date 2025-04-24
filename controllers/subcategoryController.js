const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

// Adminni tekshirish uchun function
const isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admin permission required' });
  }
  next();
};

// Subcategory yaratish
const createSubcategory = async (req, res) => {
  try {
    const { name, description, parentCategory } = req.body;

    const category = await Category.findById(parentCategory);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const newSubcategory = new Subcategory({ name, description, parentCategory });
    await newSubcategory.save();

    res.status(201).json(newSubcategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Subcategory o‘chirish
const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

    await subcategory.remove();
    res.status(200).json({ message: 'Subcategory deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createSubcategory, deleteSubcategory, isAdmin };
