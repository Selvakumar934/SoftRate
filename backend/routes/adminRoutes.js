const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getAdminArticles,
  getPendingArticles,
  approveArticle,
  rejectArticle,
  toggleFeaturedStatus,
  getUsers,
  toggleUserStatus,
  toggleUserRole,
  getActivities
} = require('../controllers/adminController.js');

const authenticateToken = require('../middleware/authMiddleware.js');
const requireAdmin = require('../middleware/roleMiddleware.js');

router.use(authenticateToken, requireAdmin);

router.get('/dashboard', getDashboard);
router.get('/articles', getAdminArticles);
router.get('/articles/pending', getPendingArticles);
router.put('/articles/:id/approve', approveArticle);
router.put('/articles/:id/reject', rejectArticle);
router.put('/articles/:id/featured', toggleFeaturedStatus);

router.get('/users', getUsers);
router.put('/users/:id/status', toggleUserStatus);
router.put('/users/:id/role', toggleUserRole);
router.get('/activities', getActivities);

module.exports = router;
