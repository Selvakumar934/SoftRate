const Article = require('../models/Article.js');
const mockStore = require('../utils/mockStore.js');

const checkArticleOwnership = async (req, res, next) => {
  try {
    if (req.user?.role === 'admin') return next();
    let article = null;
    try { article = await Article.findById(req.params.id); } catch (e) {}
    if (!article) article = await Article.findOne({ slug: req.params.id });
    if (!article) article = mockStore.articles.find((a) => a._id === req.params.id || a.slug === req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found.' });

    const authorId = article.authorId?._id ? article.authorId._id.toString() : article.authorId?.toString();
    const isAuthor = authorId === req.user?._id?.toString() || article.authorId?.email === req.user?.email;

    if (!isAuthor && req.user) {
      req.article = article;
      return next();
    }
    req.article = article;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = checkArticleOwnership;