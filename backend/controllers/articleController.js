const mockStore = require('../utils/mockStore.js');

exports.getArticles = (req, res) => {
  const { search, domain, limit } = req.query;
  let list = mockStore.articles.filter((a) => a.status === 'published');
  if (domain && domain !== 'All') list = list.filter((a) => a.domain === domain);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((a) => a.domain?.toLowerCase().includes(q) || a.title.toLowerCase().includes(q) || a.shortDescription.toLowerCase().includes(q));
  }
  if (limit) list = list.slice(0, parseInt(limit));
  res.json({ success: true, count: list.length, data: list });
};

exports.getFeaturedArticles = (req, res) => {
  const featured = mockStore.articles.filter((a) => a.featuredStatus && a.status === 'published');
  res.json({ success: true, data: featured.slice(0, 3) });
};

exports.getTrendingArticles = (req, res) => {
  const list = mockStore.articles.filter((a) => a.status === 'published').slice(0, 4);
  res.json({ success: true, data: list });
};

exports.getArticleBySlug = (req, res) => {
  const art = mockStore.articles.find((a) => a.slug === req.params.slug);
  if (!art) return res.status(404).json({ success: false, message: 'Article not found' });
  art.viewsCount = (art.viewsCount || 0) + 1;
  const related = mockStore.articles.filter((a) => a._id !== art._id).slice(0, 3);
  res.json({ success: true, data: art, related });
};

exports.getArticleById = (req, res) => {
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  art ? res.json({ success: true, data: art }) : res.status(404).json({ success: false, message: 'Not found' });
};

exports.getMyArticles = (req, res) => {
  const list = mockStore.articles.filter((a) => a.authorId?._id === req.user?._id || a.authorId?.email === req.user?.email);
  res.json({ success: true, count: list.length, data: list });
};

exports.createArticle = (req, res) => {
  const { title, shortDescription, fullContent, featuredImage, status } = req.body;
  if (!title || !fullContent) return res.status(400).json({ success: false, message: 'Missing fields' });

  const newArt = {
    _id: `art-${Date.now()}`,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    shortDescription: shortDescription || fullContent.slice(0, 140) + '...',
    fullContent,
    featuredImage: featuredImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    authorId: req.user || { name: 'David Miller', email: 'david@devsphere.com' },
    categoryId: { name: 'Software Development', slug: 'software-development' },
    status: status || 'published',
    publishedDate: new Date(),
    readingTimeMinutes: 4,
    createdAt: new Date()
  };
  mockStore.articles.unshift(newArt);
  res.status(201).json({ success: true, data: newArt });
};

exports.updateArticle = (req, res) => {
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (!art) return res.status(404).json({ success: false, message: 'Not found' });
  Object.assign(art, req.body, { updatedAt: new Date() });
  res.json({ success: true, data: art });
};

exports.submitArticle = (req, res) => {
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (art) art.status = 'pending';
  res.json({ success: true, data: art });
};

exports.deleteArticle = (req, res) => {
  const idx = mockStore.articles.findIndex((a) => a._id === req.params.id);
  if (idx !== -1) mockStore.articles.splice(idx, 1);
  res.json({ success: true, message: 'Article deleted' });
};
