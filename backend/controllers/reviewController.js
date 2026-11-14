const mongoose = require('mongoose');
const Review = require('../models/Review.js');
const mockStore = require('../utils/mockStore.js');

const isDb = () => mongoose.connection.readyState === 1;

exports.getReviews = async (req, res) => {
  try {
    const { slug, articleSlug, articleId } = req.query;
    const filter = {};
    const targetSlug = slug || articleSlug;
    if (targetSlug) filter.articleSlug = targetSlug;
    if (articleId) filter.articleId = articleId;

    if (isDb()) {
      const list = await Review.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, data: list });
    }
    let list = mockStore.reviews || [];
    if (targetSlug) list = list.filter((r) => r.articleSlug === targetSlug);
    if (articleId) list = list.filter((r) => r.articleId === articleId);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getReviewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (isDb()) {
      const list = await Review.find({ articleSlug: slug }).sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, data: list });
    }
    const list = (mockStore.reviews || []).filter((r) => r.articleSlug === slug);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { articleId, articleTitle, articleSlug, userName, userEmail, rating, comment } = req.body;
    if (!articleTitle || !userName || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Article title, name, rating (1-5), and review comment required.' });
    }

    const payload = {
      articleId: articleId || articleSlug || 'art-' + Date.now(),
      articleTitle,
      articleSlug: articleSlug || articleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      userName: userName.trim(),
      userEmail: (userEmail || '').trim(),
      rating: Math.max(1, Math.min(5, Number(rating) || 5)),
      comment: comment.trim(),
      createdAt: new Date()
    };

    if (isDb()) {
      const doc = await Review.create(payload);
      return res.status(201).json({ success: true, data: doc });
    }

    const fallback = { _id: 'rev-' + Date.now(), ...payload };
    if (!mockStore.reviews) mockStore.reviews = [];
    mockStore.reviews.unshift(fallback);
    res.status(201).json({ success: true, data: fallback });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, userName } = req.query;
    if (isDb()) {
      if (mongoose.isValidObjectId(id)) await Review.findByIdAndDelete(id);
      else if (slug && userName) await Review.findOneAndDelete({ articleSlug: slug, userName });
      else await Review.findOneAndDelete({ $or: [{ articleSlug: id }, { userName: id }] });
    }
    if (mockStore.reviews) mockStore.reviews = mockStore.reviews.filter((r) => r._id !== id && !(r.articleSlug === slug && r.userName === userName));
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
