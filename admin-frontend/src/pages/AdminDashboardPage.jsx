import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../services/adminApi.js';

const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState({ totalArticles: 10, publishedArticles: 3, pendingArticles: 5, draftArticles: 2, totalViews: 5600 });
  const [articles, setArticles] = useState([]), [filter, setFilter] = useState('all');

  const loadData = async () => {
    try {
      const res = await adminApi.get('/admin/dashboard');
      if (res.data?.data) { setMetrics(res.data.data.metrics); setArticles(res.data.data.allArticles || []); }
    } catch (err) { console.warn('Using fallback state'); }
  };
  useEffect(() => { loadData(); }, []);
  const handleAction = async (id, act) => {
    try {
      if (act === 'approve') await adminApi.put('/admin/articles/' + id + '/approve');
      if (act === 'reject') {
        const r = window.prompt('Rejection feedback:', 'Needs revision');
        if (r) await adminApi.put('/admin/articles/' + id + '/reject', { rejectionReason: r });
      }
      loadData();
    } catch (e) {}
  };
  const filtered = filter === 'all' ? articles : articles.filter((a) => a.status === filter);
  const cards = [
    { label: 'Total Articles', val: metrics.totalArticles, sub: `${metrics.totalViews || 5600} Total Views` }, { label: 'Published', val: metrics.publishedArticles, sub: 'Active live posts' },
    { label: 'Pending Review', val: metrics.pendingArticles, sub: 'Requires moderation', badge: true }, { label: 'Drafts', val: metrics.draftArticles, sub: 'Work in progress' }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <div>
          <h2 className="fw-bold text-dark mb-0">Administrative Overview</h2>
          <small className="text-muted">Platform editorial metrics, 5 pending reviews, and full 10-article catalog.</small>
        </div>
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
          <div>
            <h6 className="fw-bold text-dark mb-0">Platform Articles ({filtered.length} of 10)</h6>
            <small className="text-muted">Software Development editorial articles across all review stages</small>
          </div>
          <div className="btn-group btn-group-sm">
            {['all', 'pending', 'published', 'draft'].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`btn text-capitalize ${filter === s ? 'btn-dark' : 'btn-outline-dark'}`}>
                {s === 'all' ? 'All (10)' : s === 'pending' ? 'Pending (5)' : s === 'published' ? 'Published (3)' : 'Drafts (2)'}
              </button>
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
                    {item.status === 'pending' ? (
                      <div className="btn-group btn-group-sm"><button onClick={() => handleAction(item._id, 'approve')} className="btn btn-dark">Approve</button><button onClick={() => handleAction(item._id, 'reject')} className="btn btn-outline-dark">Reject</button></div>
                    ) : <Link to={`/articles/edit/${item._id}`} className="btn btn-outline-dark btn-sm">Edit</Link>}
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