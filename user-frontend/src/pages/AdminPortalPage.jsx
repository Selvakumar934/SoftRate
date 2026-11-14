import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import AdminAuthorsTable from '../components/admin/AdminAuthorsTable.jsx';
import { SAMPLE_ADMIN_ARTICLES, SAMPLE_AUTHORS } from '../services/sampleData.js';

const AdminPortalPage = () => {
  const [tab, setTab] = useState('articles'), [articles, setArticles] = useState(SAMPLE_ADMIN_ARTICLES), [users, setUsers] = useState(SAMPLE_AUTHORS);
  const [filter, setFilter] = useState('all'), navigate = useNavigate();
  const token = localStorage.getItem('devsphere_admin_token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const loadData = async () => {
    try {
      const res = await api.get('/admin/dashboard', authHeaders);
      if (res.data?.data?.allArticles?.length) setArticles(res.data.data.allArticles);
      const uRes = await api.get('/admin/users', authHeaders);
      if (uRes.data?.data?.length) setUsers(uRes.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    if (!token) { navigate('/admin/login'); return; }
    loadData();
  }, [token]);

  const handleAction = async (id, act) => {
    try {
      if (act === 'approve') await api.put(`/admin/articles/${id}/approve`, {}, authHeaders);
      if (act === 'reject') { const r = window.prompt('Rejection feedback:', 'Please revise.'); if (r) await api.put(`/admin/articles/${id}/reject`, { rejectionReason: r }, authHeaders); }
      if (act === 'delete' && window.confirm('Permanently delete this article from MongoDB?')) await api.delete(`/admin/articles/${id}`, authHeaders);
      loadData();
    } catch (err) {}
    setArticles((p) => act === 'delete' ? p.filter((a) => a._id !== id) : p.map((a) => a._id === id ? { ...a, status: act === 'approve' ? 'published' : 'rejected' } : a));
  };

  const logout = () => { localStorage.removeItem('devsphere_admin_token'); localStorage.removeItem('devsphere_admin_user'); navigate('/'); };
  const filtered = filter === 'all' ? articles : articles.filter((a) => a.status === filter);
  const counts = { total: articles.length, published: articles.filter(a => a.status === 'published').length, pending: articles.filter(a => a.status === 'pending').length, draft: articles.filter(a => a.status === 'draft').length };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-dark gap-2">
        <div><span className="badge bg-dark text-white mb-1">Admin Portal</span><h3 className="fw-bold text-dark mb-0">Platform Administration</h3></div>
        <div className="d-flex gap-2">
          <div className="btn-group btn-group-sm">
            <button onClick={() => setTab('articles')} className={`btn ${tab === 'articles' ? 'btn-dark' : 'btn-outline-dark'}`}>Articles ({articles.length})</button>
            <button onClick={() => setTab('authors')} className={`btn ${tab === 'authors' ? 'btn-dark' : 'btn-outline-dark'}`}>Authors ({users.length})</button>
          </div>
          <Link to="/" className="btn btn-outline-dark btn-sm">&larr; User Website</Link>
          <button onClick={logout} className="btn btn-dark btn-sm">Sign Out</button>
        </div>
      </div>

      {tab === 'articles' ? (
        <>
          <div className="row g-2 mb-3">
            {[{ label: 'Total', val: counts.total }, { label: 'Published', val: counts.published }, { label: 'Pending Review', val: counts.pending }, { label: 'Drafts', val: counts.draft }].map((c, i) => (
              <div key={i} className="col-6 col-md-3"><div className="card border-dark rounded-2 p-2 bg-white text-center"><small className="text-muted fw-bold">{c.label}</small><div className="h4 fw-bold text-dark my-1">{c.val}</div></div></div>
            ))}
          </div>
          <div className="card border-dark rounded-2 bg-white">
            <div className="p-2 border-bottom border-dark d-flex justify-content-between align-items-center">
              <span className="fw-bold small">Articles Catalog ({filtered.length})</span>
              <div className="btn-group btn-group-sm">
                {['all', 'pending', 'published', 'draft'].map((s) => (<button key={s} onClick={() => setFilter(s)} className={`btn text-capitalize ${filter === s ? 'btn-dark' : 'btn-outline-dark'}`}>{s}</button>))}
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="table-light"><tr><th className="ps-3 py-2">Article</th><th>Author</th><th>Status</th><th className="text-end pe-3">Actions</th></tr></thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item._id || item.slug}>
                      <td className="ps-3 py-2"><div className="fw-bold text-dark text-truncate" style={{ maxWidth: '320px' }}>{item.title}</div><small className="text-muted">{item.domain}</small></td>
                      <td className="text-muted">{item.authorId?.name || 'Author'}</td>
                      <td><span className="badge bg-dark text-white text-uppercase" style={{ fontSize: '0.65rem' }}>{item.status}</span></td>
                      <td className="text-end pe-3 py-2">
                        <div className="btn-group btn-group-sm">
                          {item.status === 'pending' && <button onClick={() => handleAction(item._id, 'approve')} className="btn btn-dark btn-sm">Approve</button>}
                          {item.status === 'pending' && <button onClick={() => handleAction(item._id, 'reject')} className="btn btn-outline-dark btn-sm">Reject</button>}
                          <Link to={`/dashboard/edit/${item._id || item.slug}`} className="btn btn-outline-dark btn-sm">Edit</Link>
                          <button onClick={() => handleAction(item._id, 'delete')} className="btn btn-outline-dark btn-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <AdminAuthorsTable users={users} onReload={loadData} authHeaders={authHeaders} />
      )}
    </div>
  );
};
export default AdminPortalPage;