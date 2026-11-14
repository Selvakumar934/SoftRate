import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';

const UserDashboardPage = () => {
  const [articles, setArticles] = useState([]), [filter, setFilter] = useState('all'), [loading, setLoading] = useState(true);

  const loadArticles = async () => {
    try {
      const res = await api.get('/articles/my/all');
      if (res.data?.data) setArticles(res.data.data);
    } catch (err) { console.warn('Could not load user articles'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadArticles(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try { await api.delete(`/articles/${id}`); } catch (e) {}
    setArticles(articles.filter((a) => a._id !== id));
  };

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.status === filter);
  const counts = {
    total: articles.length,
    published: articles.filter((a) => a.status === 'published').length,
    pending: articles.filter((a) => a.status === 'pending').length,
    draft: articles.filter((a) => a.status === 'draft').length
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <div><h2 className="fw-bold text-dark mb-0">My Blog Articles</h2><small className="text-muted">Manage your drafts, pending review submissions, and published articles.</small></div>
        <Link to="/dashboard/create" className="btn btn-dark btn-sm px-4 fw-semibold">+ Create New Blog</Link>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div className="d-flex gap-2">
          <span className="badge border border-dark text-dark px-3 py-2 bg-white">Total: <strong>{counts.total}</strong></span>
          <span className="badge border border-dark text-dark px-3 py-2 bg-white">Published: <strong>{counts.published}</strong></span>
          <span className="badge border border-dark text-dark px-3 py-2 bg-white">Pending: <strong>{counts.pending}</strong></span>
          <span className="badge border border-dark text-dark px-3 py-2 bg-white">Drafts: <strong>{counts.draft}</strong></span>
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
              {loading ? (
                <tr><td colSpan="4" className="text-center py-4">Loading articles...</td></tr>
              ) : filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item._id}>
                    <td className="ps-3 py-3 fw-bold text-dark">
                      <div className="d-flex align-items-center gap-2">
                        <img src={item.featuredImage} alt="" className="rounded border border-dark flex-shrink-0" style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
                        <span className="text-truncate" style={{ maxWidth: '300px' }}>{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${item.status === 'published' ? 'bg-dark text-white' : item.status === 'pending' ? 'bg-warning text-dark' : 'bg-secondary text-white'} text-uppercase`} style={{ fontSize: '0.7rem' }}>
                        {item.status || 'draft'}
                      </span>
                    </td>
                    <td className="small text-muted">{new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="text-end pe-3 py-3">
                      <div className="btn-group btn-group-sm">
                        <Link to={`/dashboard/edit/${item._id}`} className="btn btn-outline-dark">Edit</Link>
                        <button onClick={() => handleDelete(item._id)} className="btn btn-outline-dark">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center py-5 text-muted">No {filter === 'all' ? '' : filter} articles found. <Link to="/dashboard/create" className="text-dark fw-bold">Create a new blog</Link></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;