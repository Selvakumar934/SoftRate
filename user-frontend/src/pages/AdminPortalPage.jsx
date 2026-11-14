import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import AdminArticlesTable from '../components/admin/AdminArticlesTable.jsx';
import AdminAuthorsTable from '../components/admin/AdminAuthorsTable.jsx';
import AdminReviewsTable from '../components/admin/AdminReviewsTable.jsx';
import { SAMPLE_ADMIN_ARTICLES, SAMPLE_AUTHORS } from '../services/sampleData.js';
import { SAMPLE_REVIEWS } from '../services/sampleReviews.js';

const AdminPortalPage = () => {
  const [tab, setTab] = useState('articles');
  const [articles, setArticles] = useState(() => {
    try { const s = localStorage.getItem('devsphere_admin_articles'); if (s) return JSON.parse(s); } catch (e) {}
    return SAMPLE_ADMIN_ARTICLES;
  });
  const [users, setUsers] = useState(SAMPLE_AUTHORS), [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const navigate = useNavigate(), token = localStorage.getItem('devsphere_admin_token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const loadData = async () => {
    try {
      const res = await api.get('/admin/dashboard', authHeaders);
      if (res.data?.data?.allArticles?.length) {
        setArticles(res.data.data.allArticles);
        localStorage.setItem('devsphere_admin_articles', JSON.stringify(res.data.data.allArticles));
      }
      const uRes = await api.get('/admin/users', authHeaders);
      if (uRes.data?.data?.length) setUsers(uRes.data.data);
      const rRes = await api.get('/reviews', authHeaders);
      if (rRes.data?.data?.length) setReviews(rRes.data.data);
    } catch (e) {}
  };

  useEffect(() => { if (!token) { navigate('/admin/login'); return; } loadData(); }, [token]);

  const handleAction = async (id, act, slug) => {
    const key = slug || id;
    try {
      if (act === 'approve') await api.put(`/admin/articles/${key}/approve`, {}, authHeaders);
      if (act === 'reject') { const r = window.prompt('Rejection feedback:', 'Please revise.'); if (r) await api.put(`/admin/articles/${key}/reject`, { rejectionReason: r }, authHeaders); }
      if (act === 'delete' && window.confirm('Permanently delete this article from MongoDB?')) await api.delete(`/admin/articles/${key}`, authHeaders);
    } catch (err) {}
    setArticles((prev) => {
      const updated = act === 'delete' ? prev.filter((a) => a._id !== id && a.slug !== key) : prev.map((a) => (a._id === id || a.slug === key) ? { ...a, status: act === 'approve' ? 'published' : 'rejected' } : a);
      try { localStorage.setItem('devsphere_admin_articles', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    setTimeout(() => loadData(), 500);
  };

  const logout = () => {
    localStorage.removeItem('devsphere_admin_token');
    localStorage.removeItem('devsphere_admin_user');
    navigate('/');
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-dark gap-2">
        <div>
          <span className="badge bg-dark text-white mb-1">Admin Portal</span>
          <h3 className="fw-bold text-dark mb-0">Platform Administration</h3>
        </div>
        <div className="d-flex gap-2">
          <div className="btn-group btn-group-sm">
            <button onClick={() => setTab('articles')} className={`btn ${tab === 'articles' ? 'btn-dark' : 'btn-outline-dark'}`}>Articles ({articles.length})</button>
            <button onClick={() => setTab('authors')} className={`btn ${tab === 'authors' ? 'btn-dark' : 'btn-outline-dark'}`}>Authors ({users.length})</button>
            <button onClick={() => setTab('reviews')} className={`btn ${tab === 'reviews' ? 'btn-dark' : 'btn-outline-dark'}`}>Review ({reviews.length})</button>
          </div>
          <Link to="/" className="btn btn-outline-dark btn-sm">&larr; User Website</Link>
          <button onClick={logout} className="btn btn-dark btn-sm">Sign Out</button>
        </div>
      </div>

      {tab === 'articles' ? (
        <AdminArticlesTable articles={articles} onAction={handleAction} />
      ) : tab === 'authors' ? (
        <AdminAuthorsTable users={users} onReload={loadData} authHeaders={authHeaders} />
      ) : (
        <AdminReviewsTable reviews={reviews} onReload={loadData} authHeaders={authHeaders} />
      )}
    </div>
  );
};

export default AdminPortalPage;
