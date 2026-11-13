const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController.js');

const authenticateToken = require('../middleware/authMiddleware.js');
const requireAdmin = require('../middleware/roleMiddleware.js');

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

router.post('/', authenticateToken, requireAdmin, createCategory);
router.put('/:id', authenticateToken, requireAdmin, updateCategory);
router.delete('/:id', authenticateToken, requireAdmin, deleteCategory);

module.exports = router;
