const mongoose = require('mongoose');
const Article = require('../models/Article.js'), User = require('../models/User.js'), Category = require('../models/Category.js'), mockStore = require('../utils/mockStore.js');
const isDb = () => mongoose.connection.readyState === 1;
const artF = (k) => mongoose.isValidObjectId(k) ? { _id: k } : { slug: k };

exports.getArticles = async (req, res) => {
  const { search, domain, limit } = req.query;
  let list = isDb() ? await Article.find({ status: 'published' }).populate('authorId', 'name email avatar').sort({ publishedDate: -1 }) : mockStore.articles.filter((a) => a.status === 'published');
  if (domain && domain !== 'All') list = list.filter((a) => a.domain === domain);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((a) => a.domain?.toLowerCase().includes(q) || a.title.toLowerCase().includes(q) || a.shortDescription.toLowerCase().includes(q));
  }
  if (limit) list = list.slice(0, parseInt(limit));
  res.json({ success: true, count: list.length, data: list });
};

exports.getFeaturedArticles = async (req, res) => {
  const list = isDb() ? await Article.find({ status: 'published', featuredStatus: true }).populate('authorId', 'name email').limit(3) : mockStore.articles.filter((a) => a.featuredStatus && a.status === 'published').slice(0, 3);
  res.json({ success: true, data: list });
};

exports.getTrendingArticles = async (req, res) => {
  const list = isDb() ? await Article.find({ status: 'published' }).sort({ viewsCount: -1 }).limit(4) : mockStore.articles.filter((a) => a.status === 'published').slice(0, 4);
  res.json({ success: true, data: list });
};

exports.getArticleBySlug = async (req, res) => {
  if (isDb()) {
    const art = await Article.findOneAndUpdate({ slug: req.params.slug }, { $inc: { viewsCount: 1 } }, { returnDocument: 'after' }).populate('authorId', 'name email avatar');
    if (art) return res.json({ success: true, data: art, related: await Article.find({ _id: { $ne: art._id }, status: 'published' }).limit(3) });
  }
  const art = mockStore.articles.find((a) => a.slug === req.params.slug);
  if (!art) return res.status(404).json({ success: false, message: 'Article not found' });
  art.viewsCount = (art.viewsCount || 0) + 1;
  res.json({ success: true, data: art, related: mockStore.articles.filter((a) => a._id !== art._id).slice(0, 3) });
};

exports.getArticleById = async (req, res) => {
  if (isDb()) {
    try { const a = await Article.findOne(artF(req.params.id)).populate('authorId', 'name email'); if (a) return res.json({ success: true, data: a }); } catch (e) {}
  }
  const art = mockStore.articles.find((a) => a._id === req.params.id || a.slug === req.params.id);
  art ? res.json({ success: true, data: art }) : res.status(404).json({ success: false, message: 'Not found' });
};

exports.getMyArticles = async (req, res) => {
  if (isDb()) {
    const list = await Article.find().populate('authorId', 'name email avatar').sort({ createdAt: -1 });
    if (list.length > 0) return res.json({ success: true, count: list.length, data: list });
  }
  res.json({ success: true, count: mockStore.articles.length, data: mockStore.articles });
};

exports.createArticle = async (req, res) => {
  const { title, shortDescription, fullContent, featuredImage, status, domain } = req.body;
  if (!title || !fullContent) return res.status(400).json({ success: false, message: 'Missing fields' });
  if (isDb()) {
    const u = await User.findOne({ email: req.user?.email }), cat = await Category.findOne();
    const doc = await Article.create({
      title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
      shortDescription: shortDescription || fullContent.slice(0, 140) + '...', fullContent,
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      domain: domain || 'Software Development', authorId: u?._id, categoryId: cat?._id, status: status || 'draft', publishedDate: status === 'published' ? new Date() : null
    });
    return res.status(201).json({ success: true, data: doc });
  }
  const newArt = { _id: `art-${Date.now()}`, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), shortDescription: shortDescription || fullContent.slice(0, 140) + '...', fullContent, featuredImage: featuredImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', domain: domain || 'Software Development', authorId: req.user, status: status || 'draft', createdAt: new Date() };
  mockStore.articles.unshift(newArt);
  res.status(201).json({ success: true, data: newArt });
};

exports.updateArticle = async (req, res) => {
  if (isDb()) { try { const doc = await Article.findOneAndUpdate(artF(req.params.id), req.body, { returnDocument: 'after' }); if (doc) return res.json({ success: true, data: doc }); } catch (e) {} }
  const art = mockStore.articles.find((a) => a._id === req.params.id || a.slug === req.params.id);
  if (!art) return res.status(404).json({ success: false, message: 'Not found' });
  Object.assign(art, req.body, { updatedAt: new Date() });
  res.json({ success: true, data: art });
};

exports.submitArticle = async (req, res) => {
  if (isDb()) { try { const doc = await Article.findOneAndUpdate(artF(req.params.id), { status: 'pending' }, { returnDocument: 'after' }); if (doc) return res.json({ success: true, data: doc }); } catch (e) {} }
  const art = mockStore.articles.find((a) => a._id === req.params.id || a.slug === req.params.id);
  if (art) art.status = 'pending';
  res.json({ success: true, data: art });
};

exports.deleteArticle = async (req, res) => {
  if (isDb()) { try { await Article.findOneAndDelete(artF(req.params.id)); } catch (e) {} }
  const idx = mockStore.articles.findIndex((a) => a._id === req.params.id || a.slug === req.params.id);
  if (idx !== -1) mockStore.articles.splice(idx, 1);
  res.json({ success: true, message: 'Article deleted' });
};
