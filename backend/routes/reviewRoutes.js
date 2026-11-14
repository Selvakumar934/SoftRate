const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController.js');

router.get('/', reviewController.getReviews);
router.get('/article/:slug', reviewController.getReviewsBySlug);
router.post('/', reviewController.createReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
