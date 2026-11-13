const express = require('express');
const router = express.Router();
const {
  getArticles,
  getFeaturedArticles,
  getTrendingArticles,
  getArticleBySlug,
  getMyArticles,
  getArticleById,
  createArticle,
  updateArticle,
  submitArticle,
  deleteArticle
} = require('../controllers/articleController.js');

const authenticateToken = require('../middleware/authMiddleware.js');
const checkArticleOwnership = require('../middleware/ownershipMiddleware.js');

// Public read routes
router.get('/', getArticles);
router.get('/featured', getFeaturedArticles);
router.get('/trending', getTrendingArticles);
router.get('/slug/:slug', getArticleBySlug);

// Private author routes
router.get('/my/all', authenticateToken, getMyArticles);
router.get('/id/:id', authenticateToken, getArticleById);
router.post('/', authenticateToken, createArticle);
router.put('/:id', authenticateToken, checkArticleOwnership, updateArticle);
router.put('/:id/submit', authenticateToken, checkArticleOwnership, submitArticle);
router.delete('/:id', authenticateToken, checkArticleOwnership, deleteArticle);

module.exports = router;
