import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../services/adminApi.js';
import { FALLBACK_METRICS, FALLBACK_ADMIN_ARTICLES } from '../services/sampleData.js';

const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(FALLBACK_METRICS);
  const [articles, setArticles] = useState(FALLBACK_ADMIN_ARTICLES), [filter, setFilter] = useState('all');

  const loadData = async () => {
    try {
      const res = await adminApi.get('/admin/dashboard');
      if (res.data?.data) {
        setMetrics(res.data.data.metrics || FALLBACK_METRICS);
        setArticles(res.data.data.allArticles?.length ? res.data.data.allArticles : FALLBACK_ADMIN_ARTICLES);
      }
    } catch (err) {}
  };
  useEffect(() => { loadData(); }, []);

  const handleAction = async (id, act) => {
    try {
      if (act === 'approve') await adminApi.put(`/admin/articles/${id}/approve`);
      if (act === 'reject') { const r = window.prompt('Rejection feedback:', 'Needs revision'); if (r) await adminApi.put(`/admin/articles/${id}/reject`, { rejectionReason: r }); }
      if (act === 'delete' && window.confirm('Permanently delete this article?')) await adminApi.delete(`/admin/articles/${id}`);
      loadData();
    } catch (e) {}
    setArticles((p) => act === 'delete' ? p.filter((a) => a._id !== id) : p.map((a) => a._id === id ? { ...a, status: act === 'approve' ? 'published' : 'rejected' } : a));
  };

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.status === filter);
  const cards = [
    { label: 'Total Articles', val: articles.length, sub: `${metrics.totalViews || 58400} Views` },
    { label: 'Published', val: articles.filter(a => a.status === 'published').length, sub: 'Active live posts' },
    { label: 'Pending Review', val: articles.filter(a => a.status === 'pending').length, sub: 'Requires moderation', badge: true },
    { label: 'Drafts', val: articles.filter(a => a.status === 'draft').length, sub: 'Work in progress' }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <div><h2 className="fw-bold text-dark mb-0">Administrative Overview</h2><small className="text-muted">Platform editorial metrics, 9 pending reviews, and article catalog.</small></div>
        <Link to="/articles/create" className="btn btn-dark btn-sm px-4 fw-semibold">+ New Publication</Link>
      </div>
      <div className="row g-3 mb-4">
        {cards.map((c, i) => (
          <div key={i} className="col-sm-6 col-lg-3">
            <div className={`card border-dark rounded-2 p-3 bg-white text-center ${c.badge ? 'border-2' : ''}`}>
              <div className="d-flex justify-content-between align-items-center mb-1"><span className="text-muted small fw-bold text-uppercase">{c.label}</span>{c.badge && <span className="badge bg-dark text-white">{c.val} Review</span>}</div>
              <div className="h2 fw-bold text-dark my-1">{c.val}</div>
              <div className="text-muted small">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card border-dark rounded-2 bg-white">
        <div className="p-3 border-bottom border-dark d-flex flex-wrap justify-content-between align-items-center gap-2">
          <h6 className="fw-bold text-dark mb-0">Platform Articles ({filtered.length} of {articles.length})</h6>
          <div className="btn-group btn-group-sm">
            {['all', 'pending', 'published', 'draft'].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`btn text-capitalize ${filter === s ? 'btn-dark' : 'btn-outline-dark'}`}>{s === 'all' ? `All (${articles.length})` : s}</button>
            ))}
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-uppercase text-dark border-bottom border-dark">
              <tr><th className="ps-3 py-2">Article</th><th className="py-2">Author</th><th className="py-2">Status</th><th className="text-end pe-3 py-2">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td className="ps-3 py-2">
                    <div className="d-flex align-items-center gap-2">
                      <img src={item.featuredImage} alt="" className="rounded border border-dark flex-shrink-0" style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
                      <div className="text-truncate" style={{ maxWidth: '340px' }}><div className="fw-bold text-dark small text-truncate">{item.title}</div><span className="text-muted small" style={{ fontSize: '0.72rem' }}>{item.shortDescription?.slice(0, 60)}...</span></div>
                    </div>
                  </td>
                  <td className="small text-muted">{item.authorId?.name || 'Author'}</td>
                  <td><span className="badge bg-dark text-white text-uppercase" style={{ fontSize: '0.7rem' }}>{item.status}</span></td>
                  <td className="text-end pe-3 py-2">
                    <div className="btn-group btn-group-sm">
                      {item.status === 'pending' && <button onClick={() => handleAction(item._id, 'approve')} className="btn btn-dark">Approve</button>}
                      {item.status === 'pending' && <button onClick={() => handleAction(item._id, 'reject')} className="btn btn-outline-dark">Reject</button>}
                      <Link to={`/articles/edit/${item._id}`} className="btn btn-outline-dark">Edit</Link>
                      <button onClick={() => handleAction(item._id, 'delete')} className="btn btn-outline-dark">Delete</button>
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
export default AdminDashboardPage;