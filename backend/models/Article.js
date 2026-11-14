const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true, trim: true },
    fullContent: { type: String, required: true },
    featuredImage: { type: String, required: true },
    domain: { type: String, default: 'General' },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [{ type: String, trim: true }],
    status: { type: String, enum: ['draft', 'pending', 'published', 'rejected'], default: 'draft' },
    rejectionReason: { type: String, default: null },
    featuredStatus: { type: Boolean, default: false },
    publishedDate: { type: Date, default: null },
    readingTimeMinutes: { type: Number, default: 5 },
    viewsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

articleSchema.index({ title: 'text', shortDescription: 'text', fullContent: 'text' });

module.exports = mongoose.model('Article', articleSchema);
