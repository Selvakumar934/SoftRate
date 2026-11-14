import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { SAMPLE_ADMIN_ARTICLES } from '../services/sampleData.js';

const UserDashboardPage = () => {
  const [articles, setArticles] = useState(() => {
    try { const s = localStorage.getItem('devsphere_admin_articles'); if (s) return JSON.parse(s); } catch (e) {}
    return SAMPLE_ADMIN_ARTICLES;
  });
  const [filter, setFilter] = useState('all');

  const loadArticles = async () => {
    try {
      const res = await api.get('/articles/my/all');
      if (res.data?.data?.length) {
        setArticles(res.data.data);
        localStorage.setItem('devsphere_admin_articles', JSON.stringify(res.data.data));
        return;
      }
    } catch (err) {}
    try { const s = localStorage.getItem('devsphere_admin_articles'); if (s) setArticles(JSON.parse(s)); } catch (e) {}
  };

  useEffect(() => { loadArticles(); }, []);

  const handleDelete = async (id, slug) => {
    if (!window.confirm('Delete this article?')) return;
    const key = slug || id;
    try { await api.delete(`/articles/${key}`); } catch (e) {}
    setArticles((prev) => {
      const updated = prev.filter((a) => a._id !== id && a._id !== key && a.slug !== key);
      try { localStorage.setItem('devsphere_admin_articles', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.status === filter);
  const counts = { total: articles.length, published: articles.filter((a) => a.status === 'published').length, pending: articles.filter((a) => a.status === 'pending').length, draft: articles.filter((a) => a.status === 'draft').length };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <div><h2 className="fw-bold text-dark mb-0">My Blog Articles</h2><small className="text-muted">Manage your drafts, pending review submissions, and published articles.</small></div>
        <Link to="/dashboard/create" className="btn btn-dark btn-sm px-4 fw-semibold">+ Create New Blog</Link>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div className="d-flex gap-2">
          {['total', 'published', 'pending', 'draft'].map((k) => (
            <span key={k} className="badge border border-dark text-dark px-3 py-2 bg-white text-capitalize">{k}: <strong>{counts[k]}</strong></span>
          ))}
        </div>
        <div className="btn-group btn-group-sm">
          {['all', 'published', 'pending', 'draft'].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`btn text-capitalize ${filter === s ? 'btn-dark' : 'btn-outline-dark'}`}>{s === 'all' ? `All (${counts.total})` : s}</button>
          ))}
        </div>
      </div>

      <div className="card border-dark rounded-2 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-uppercase text-dark border-bottom border-dark">
              <tr><th className="ps-3 py-3">Article</th><th className="py-3">Status</th><th className="py-3">Date</th><th className="text-end pe-3 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id || item.slug}>
                  <td className="ps-3 py-3 fw-bold text-dark">
                    <div className="d-flex align-items-center gap-2">
                      <img src={item.featuredImage} alt="" className="rounded border border-dark flex-shrink-0" style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
                      <span className="text-truncate" style={{ maxWidth: '300px' }}>{item.title}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${item.status === 'published' ? 'bg-dark text-white' : item.status === 'pending' ? 'bg-warning text-dark' : 'bg-secondary text-white'} text-uppercase`} style={{ fontSize: '0.7rem' }}>{item.status || 'draft'}</span></td>
                  <td className="small text-muted">{new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleDateString()}</td>
                  <td className="text-end pe-3 py-3">
                    <div className="btn-group btn-group-sm">
                      <Link to={`/dashboard/edit/${item._id || item.slug}`} className="btn btn-outline-dark">Edit</Link>
                      <button onClick={() => handleDelete(item._id, item.slug)} className="btn btn-outline-dark">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserDashboardPage;
