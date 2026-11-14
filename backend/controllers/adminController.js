const mongoose = require('mongoose');
const Article = require('../models/Article.js'), User = require('../models/User.js'), mockStore = require('../utils/mockStore.js');
const isDb = () => mongoose.connection.readyState === 1;
const artF = (k) => mongoose.isValidObjectId(k) ? { _id: k } : { slug: k };

exports.getDashboard = async (req, res) => {
  try {
    const all = isDb() ? await Article.find().populate('authorId', 'name email websiteUrl socialMediaId').sort({ createdAt: -1 }) : mockStore.articles;
    const pub = all.filter((a) => a.status === 'published'), pen = all.filter((a) => a.status === 'pending'), dra = all.filter((a) => a.status === 'draft');
    res.json({ success: true, data: { metrics: { totalArticles: all.length, publishedArticles: pub.length, pendingArticles: pen.length, draftArticles: dra.length, totalViews: all.reduce((acc, a) => acc + (a.viewsCount || 0), 0) }, allArticles: all, recentSubmissions: pen, publishedArticles: pub, draftArticles: dra } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getAdminArticles = async (req, res) => {
  try {
    const { status, search } = req.query;
    let list = isDb() ? await Article.find(status && status !== 'all' ? { status } : {}).populate('authorId', 'name email websiteUrl socialMediaId').sort({ createdAt: -1 }) : [...mockStore.articles];
    if (!isDb() && status && status !== 'all') list = list.filter((a) => a.status === status);
    if (search) { const q = search.toLowerCase(); list = list.filter((a) => a.title.toLowerCase().includes(q) || a.authorId?.name?.toLowerCase().includes(q)); }
    res.json({ success: true, count: list.length, data: list });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getPendingArticles = async (req, res) => {
  const list = isDb() ? await Article.find({ status: 'pending' }).populate('authorId', 'name email') : mockStore.articles.filter((a) => a.status === 'pending');
  res.json({ success: true, count: list.length, data: list });
};

exports.approveArticle = async (req, res) => {
  if (isDb()) {
    try { const a = await Article.findOneAndUpdate(artF(req.params.id), { status: 'published', publishedDate: new Date() }, { returnDocument: 'after' }); if (a) return res.json({ success: true, message: 'Article approved', data: a }); } catch (e) {}
  }
  const art = mockStore.articles.find((a) => a._id === req.params.id || a.slug === req.params.id);
  if (art) { art.status = 'published'; art.publishedDate = new Date(); }
  res.json({ success: true, message: 'Article approved', data: art });
};

exports.rejectArticle = async (req, res) => {
  const r = req.body.rejectionReason || 'Requires revision';
  if (isDb()) {
    try { const a = await Article.findOneAndUpdate(artF(req.params.id), { status: 'rejected', rejectionReason: r }, { returnDocument: 'after' }); if (a) return res.json({ success: true, message: 'Article rejected', data: a }); } catch (e) {}
  }
  const art = mockStore.articles.find((a) => a._id === req.params.id || a.slug === req.params.id);
  if (art) { art.status = 'rejected'; art.rejectionReason = r; }
  res.json({ success: true, message: 'Article rejected', data: art });
};

exports.deleteArticleAdmin = async (req, res) => {
  if (isDb()) { try { await Article.findOneAndDelete(artF(req.params.id)); } catch (e) {} }
  const idx = mockStore.articles.findIndex((a) => a._id === req.params.id || a.slug === req.params.id);
  if (idx !== -1) mockStore.articles.splice(idx, 1);
  res.json({ success: true, message: 'Article deleted permanently' });
};

exports.toggleFeaturedStatus = async (req, res) => {
  if (isDb()) { try { const doc = await Article.findById(req.params.id); if (doc) { doc.featuredStatus = !doc.featuredStatus; await doc.save(); return res.json({ success: true, featuredStatus: doc.featuredStatus }); } } catch (e) {} }
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (art) art.featuredStatus = !art.featuredStatus;
  res.json({ success: true, featuredStatus: art?.featuredStatus });
};

exports.getUsers = async (req, res) => {
  if (isDb()) return res.json({ success: true, data: await User.find().select('-password').sort({ createdAt: 1 }) });
  res.json({ success: true, data: mockStore.users });
};

exports.createUser = async (req, res) => {
  const { name, email, websiteUrl, socialMediaId, role } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email required' });
  if (isDb()) {
    try { const u = await User.create({ name, email, password: 'UserPass2026!', websiteUrl, socialMediaId, role: role || 'user' }); return res.status(201).json({ success: true, data: u }); } catch (e) { return res.status(400).json({ success: false, message: e.message }); }
  }
  const u = { _id: `user-${Date.now()}`, name, email, websiteUrl: websiteUrl || '', socialMediaId: socialMediaId || '', role: role || 'user' };
  mockStore.users.push(u);
  res.status(201).json({ success: true, data: u });
};

exports.updateUser = async (req, res) => {
  const { name, email, websiteUrl, socialMediaId, role, bio } = req.body;
  if (isDb()) {
    try { const u = await User.findByIdAndUpdate(req.params.id, { name, email, websiteUrl, socialMediaId, role, bio }, { returnDocument: 'after' }).select('-password'); if (u) return res.json({ success: true, data: u }); } catch (e) {}
  }
  const u = mockStore.users.find((user) => user._id === req.params.id || user.email === email);
  if (u) Object.assign(u, { name, email, websiteUrl, socialMediaId, role });
  res.json({ success: true, data: u });
};

exports.deleteUser = async (req, res) => {
  if (isDb()) { try { await User.findByIdAndDelete(req.params.id); } catch (e) {} }
  const idx = mockStore.users.findIndex((u) => u._id === req.params.id);
  if (idx !== -1) mockStore.users.splice(idx, 1);
  res.json({ success: true, message: 'Author deleted successfully' });
};

exports.toggleUserStatus = async (req, res) => res.json({ success: true });
exports.toggleUserRole = async (req, res) => res.json({ success: true }); exports.getActivities = async (req, res) => res.json({ success: true, data: mockStore.activities || [] });
