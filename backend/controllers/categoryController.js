const mongoose = require('mongoose');
const Category = require('../models/Category.js');
const mockStore = require('../utils/mockStore.js');

const isDb = () => mongoose.connection.readyState === 1;

exports.getCategories = async (req, res) => {
  try {
    if (isDb()) {
      const data = await Category.find().sort({ name: 1 });
      return res.json({ success: true, count: data.length, data });
    }
    res.json({ success: true, count: mockStore.categories.length, data: mockStore.categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    if (isDb()) {
      const cat = await Category.findOne({ slug: req.params.slug });
      return cat ? res.json({ success: true, data: cat }) : res.status(404).json({ success: false, message: 'Not found' });
    }
    const match = mockStore.categories.find((c) => c.slug === req.params.slug);
    match ? res.json({ success: true, data: match }) : res.status(404).json({ success: false, message: 'Not found' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (isDb()) {
      const cat = await Category.create({ name, slug, description: description || '' });
      return res.status(201).json({ success: true, data: cat });
    }
    const cat = { _id: `cat-${Date.now()}`, name, slug, description: description || '', articleCount: 0 };
    mockStore.categories.push(cat);
    res.status(201).json({ success: true, data: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const cat = mockStore.categories.find((c) => c._id === req.params.id);
    if (cat) {
      if (name) cat.name = name;
      if (description) cat.description = description;
    }
    res.json({ success: true, data: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const idx = mockStore.categories.findIndex((c) => c._id === req.params.id);
  if (idx !== -1) mockStore.categories.splice(idx, 1);
  res.json({ success: true, message: 'Category deleted' });
};
