const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    articleId: { type: String, required: true },
    articleTitle: { type: String, required: true },
    articleSlug: { type: String, required: true },
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, trim: true, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
