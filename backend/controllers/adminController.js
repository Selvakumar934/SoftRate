const mockStore = require('../utils/mockStore.js');

exports.getDashboard = async (req, res) => {
  const published = mockStore.articles.filter((a) => a.status === 'published');
  const pending = mockStore.articles.filter((a) => a.status === 'pending');
  const drafts = mockStore.articles.filter((a) => a.status === 'draft');

  res.json({
    success: true,
    data: {
      metrics: {
        totalArticles: mockStore.articles.length,
        publishedArticles: published.length,
        pendingArticles: pending.length,
        draftArticles: drafts.length,
        totalViews: mockStore.articles.reduce((acc, a) => acc + (a.viewsCount || 0), 0)
      },
      allArticles: mockStore.articles,
      recentSubmissions: pending,
      publishedArticles: published,
      draftArticles: drafts
    }
  });
};

exports.getAdminArticles = async (req, res) => {
  const { status, search } = req.query;
  let list = [...mockStore.articles];
  if (status && status !== 'all') list = list.filter((a) => a.status === status);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((a) => a.title.toLowerCase().includes(q) || a.authorId?.name?.toLowerCase().includes(q));
  }
  res.json({ success: true, count: list.length, data: list });
};

exports.getPendingArticles = async (req, res) => {
  const list = mockStore.articles.filter((a) => a.status === 'pending');
  res.json({ success: true, count: list.length, data: list });
};

exports.approveArticle = async (req, res) => {
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (art) {
    art.status = 'published';
    art.publishedDate = new Date();
  }
  res.json({ success: true, message: 'Article approved', data: art });
};

exports.rejectArticle = async (req, res) => {
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (art) {
    art.status = 'rejected';
    art.rejectionReason = req.body.rejectionReason || 'Requires revision';
  }
  res.json({ success: true, message: 'Article rejected', data: art });
};

exports.toggleFeaturedStatus = async (req, res) => {
  const art = mockStore.articles.find((a) => a._id === req.params.id);
  if (art) art.featuredStatus = !art.featuredStatus;
  res.json({ success: true, featuredStatus: art?.featuredStatus });
};

exports.getUsers = async (req, res) => {
  res.json({ success: true, data: mockStore.users });
};

exports.toggleUserStatus = async (req, res) => {
  const u = mockStore.users.find((user) => user._id === req.params.id);
  if (u) u.accountStatus = req.body.accountStatus || 'active';
  res.json({ success: true, data: u });
};

exports.toggleUserRole = async (req, res) => {
  const u = mockStore.users.find((user) => user._id === req.params.id);
  if (u) u.role = req.body.role || 'user';
  res.json({ success: true, data: u });
};

exports.getActivities = async (req, res) => {
  res.json({ success: true, data: mockStore.activities || [] });
};
