import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import { SAMPLE_ARTICLES } from '../services/sampleData.js';

const AdminPortalPage = () => {
  const [articles, setArticles] = useState(SAMPLE_ARTICLES), [filter, setFilter] = useState('all');
  const navigate = useNavigate(), token = localStorage.getItem('devsphere_admin_token');

  const loadData = async () => {
    try {
      const res = await api.get('/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } });
      if (res.data?.data?.allArticles?.length) setArticles(res.data.data.allArticles);
    } catch (e) {}
  };

  useEffect(() => {
    if (!token) { navigate('/admin/login'); return; }
    loadData();
  }, [token]);

  const handleAction = async (id, act) => {
    try {
      if (act === 'approve') await api.put(`/admin/articles/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });
      if (act === 'reject') {
        const r = window.prompt('Rejection feedback:', 'Please revise the article content.');
        if (r) await api.put(`/admin/articles/${id}/reject`, { rejectionReason: r }, { headers: { Authorization: `Bearer ${token}` } });
      }
      loadData();
    } catch (err) {}
  };

  const logout = () => { localStorage.removeItem('devsphere_admin_token'); localStorage.removeItem('devsphere_admin_user'); navigate('/'); };
  const filtered = filter === 'all' ? articles : articles.filter((a) => a.status === filter);
  const counts = { total: articles.length, published: articles.filter(a => a.status === 'published').length, pending: articles.filter(a => a.status === 'pending').length, draft: articles.filter(a => a.status === 'draft').length };
  const cards = [
    { label: 'Total Articles', val: counts.total, sub: 'All stages' }, { label: 'Published', val: counts.published, sub: 'Live reader posts' },
    { label: 'Pending Review', val: counts.pending, sub: 'Moderation queue', badge: true }, { label: 'Drafts', val: counts.draft, sub: 'Work in progress' }
  ];

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark gap-2">
        <div><span className="badge bg-dark text-white mb-1">Integrated Admin View</span><h2 className="fw-bold text-dark mb-0">Platform Administration & Moderation</h2></div>
        <div className="d-flex gap-2"><Link to="/" className="btn btn-outline-dark btn-sm px-3 fw-semibold">&larr; User Website</Link><button onClick={logout} className="btn btn-dark btn-sm px-3 fw-semibold">Sign Out Admin</button></div>
      </div>
      <div className="row g-3 mb-4">
        {cards.map((c, i) => (
          <div key={i} className="col-sm-6 col-lg-3"><div className={`card border-dark rounded-2 p-3 bg-white text-center ${c.badge ? 'border-2' : ''}`}><div className="small text-muted fw-bold text-uppercase">{c.label}</div><div className="h2 fw-bold text-dark my-1">{c.val}</div><div className="text-muted small">{c.sub}</div></div></div>
        ))}
      </div>
      <div className="card border-dark rounded-2 bg-white">
        <div className="p-3 border-bottom border-dark d-flex flex-wrap justify-content-between align-items-center gap-2">
          <h6 className="fw-bold text-dark mb-0">Article Catalog ({filtered.length} items)</h6>
          <div className="btn-group btn-group-sm">
            {['all', 'pending', 'published', 'draft'].map((s) => (<button key={s} onClick={() => setFilter(s)} className={`btn text-capitalize ${filter === s ? 'btn-dark' : 'btn-outline-dark'}`}>{s === 'all' ? `All (${counts.total})` : s}</button>))}
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-uppercase text-dark border-bottom border-dark"><tr><th className="ps-3 py-2">Article</th><th className="py-2">Author</th><th className="py-2">Status</th><th className="text-end pe-3 py-2">Actions</th></tr></thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id || item.slug}>
                  <td className="ps-3 py-2"><div className="d-flex align-items-center gap-2"><img src={item.featuredImage} alt="" className="rounded border border-dark flex-shrink-0" style={{ width: '36px', height: '36px', objectFit: 'cover' }} /><div className="text-truncate" style={{ maxWidth: '340px' }}><div className="fw-bold text-dark small text-truncate">{item.title}</div><span className="text-muted small" style={{ fontSize: '0.72rem' }}>{item.domain || 'Software Development'}</span></div></div></td>
                  <td className="small text-muted">{item.authorId?.name || 'Author'}</td>
                  <td><span className="badge bg-dark text-white text-uppercase" style={{ fontSize: '0.7rem' }}>{item.status}</span></td>
                  <td className="text-end pe-3 py-2">{item.status === 'pending' ? (<div className="btn-group btn-group-sm"><button onClick={() => handleAction(item._id, 'approve')} className="btn btn-dark">Approve</button><button onClick={() => handleAction(item._id, 'reject')} className="btn btn-outline-dark">Reject</button></div>) : <Link to={`/dashboard/edit/${item._id || item.slug}`} className="btn btn-outline-dark btn-sm">Edit</Link>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminPortalPage;
