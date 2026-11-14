const mongoose = require('mongoose');
const Article = require('../models/Article.js');
const mockStore = require('../utils/mockStore.js');

const isDb = () => mongoose.connection.readyState === 1;

exports.getDashboard = async (req, res) => {
  try {
    const all = isDb() ? await Article.find().populate('authorId', 'name email').sort({ createdAt: -1 }) : mockStore.articles;
    const pub = all.filter((a) => a.status === 'published');
    const pen = all.filter((a) => a.status === 'pending');
    const dra = all.filter((a) => a.status === 'draft');
    res.json({
      success: true,
      data: {
        metrics: { totalArticles: all.length, publishedArticles: pub.length, pendingArticles: pen.length, draftArticles: dra.length, totalViews: all.reduce((acc, a) => acc + (a.viewsCount || 0), 0) },
        allArticles: all, recentSubmissions: pen, publishedArticles: pub, draftArticles: dra
      }
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getAdminArticles = async (req, res) => {
  try {
    const { status, search } = req.query;
    let list = isDb() ? await Article.find(status && status !== 'all' ? { status } : {}).populate('authorId', 'name email').sort({ createdAt: -1 }) : [...mockStore.articles];
    if (!isDb() && status && status !== 'all') list = list.filter((a) => a.status === status);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || a.authorId?.name?.toLowerCase().includes(q));
    }
    res.json({ success: true, count: list.length, data: list });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getPendingArticles = async (req, res) => {
  const list = isDb() ? await Article.find({ status: 'pending' }).populate('authorId', 'name email') : mockStore.articles.filter((a) => a.status === 'pending');
  res.json({ success: true, count: list.length, data: list });
};

exports.approveArticle = async (req, res) => {
  if (isDb()) {
    const a = await Article.findByIdAndUpdate(req.params.id, { status: 'published', publishedDate: new Date() }, { returnDocument: 'after' });
    if (a) return res.json({ success: true, message: 'Article approved', data: a });
  }
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (art) { art.status = 'published'; art.publishedDate = new Date(); }
  res.json({ success: true, message: 'Article approved', data: art });
};

exports.rejectArticle = async (req, res) => {
  const r = req.body.rejectionReason || 'Requires revision';
  if (isDb()) {
    const a = await Article.findByIdAndUpdate(req.params.id, { status: 'rejected', rejectionReason: r }, { returnDocument: 'after' });
    if (a) return res.json({ success: true, message: 'Article rejected', data: a });
  }
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (art) { art.status = 'rejected'; art.rejectionReason = r; }
  res.json({ success: true, message: 'Article rejected', data: art });
};

exports.toggleFeaturedStatus = async (req, res) => {
  if (isDb()) {
    const doc = await Article.findById(req.params.id);
    if (doc) { doc.featuredStatus = !doc.featuredStatus; await doc.save(); return res.json({ success: true, featuredStatus: doc.featuredStatus }); }
  }
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (art) art.featuredStatus = !art.featuredStatus;
  res.json({ success: true, featuredStatus: art?.featuredStatus });
};

exports.getUsers = async (req, res) => res.json({ success: true, data: mockStore.users });
exports.toggleUserStatus = async (req, res) => res.json({ success: true });
exports.toggleUserRole = async (req, res) => res.json({ success: true });
exports.getActivities = async (req, res) => res.json({ success: true, data: mockStore.activities || [] });
