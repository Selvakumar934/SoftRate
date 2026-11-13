import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../services/adminApi.js';

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState([]), [filter, setFilter] = useState('all'), [search, setSearch] = useState('');
  const fetchArticles = async () => {
    try {
      const q = search ? `&search=${encodeURIComponent(search)}` : '';
      const res = await adminApi.get(`/admin/articles?status=${filter}${q}`);
      if (res.data?.data) setArticles(res.data.data);
    } catch (err) { console.warn('Could not load articles'); }
  };
  useEffect(() => { fetchArticles(); }, [filter, search]);

  const handleAction = async (id, act) => {
    try {
      if (act === 'approve') await adminApi.put(`/admin/articles/${id}/approve`);
      if (act === 'reject') {
        const r = window.prompt('Rejection feedback:', 'Needs revision');
        if (r) await adminApi.put(`/admin/articles/${id}/reject`, { rejectionReason: r });
      }
      if (act === 'delete' && window.confirm('Delete this article?')) await adminApi.delete(`/articles/${id}`);
      fetchArticles();
    } catch (e) {}
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <div>
          <h2 className="fw-bold text-dark mb-0">Article Catalog</h2>
          <small className="text-muted">Manage all publications, author submissions, and editorial approvals.</small>
        </div>
        <Link to="/articles/create" className="btn btn-dark btn-sm px-4 fw-semibold">+ New Publication</Link>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div className="btn-group btn-group-sm">
          {['all', 'published', 'pending', 'draft'].map((st) => (
            <button key={st} className={`btn text-capitalize ${filter === st ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFilter(st)}>{st}</button>
          ))}
        </div>
        <input type="text" className="form-control form-control-sm border-dark" style={{ maxWidth: '280px' }} placeholder="Search title or author..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="card border-dark rounded-2 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-uppercase text-dark border-bottom border-dark">
              <tr><th className="ps-3 py-3">Article</th><th className="py-3">Author / User</th><th className="py-3">Status</th><th className="py-3">Views</th><th className="text-end pe-3 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {articles.map((item) => (
                <tr key={item._id}>
                  <td className="ps-3 py-3">
                    <div className="d-flex align-items-center gap-2">
                      <img src={item.featuredImage} alt="" className="rounded border border-dark flex-shrink-0" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                      <div className="text-truncate" style={{ maxWidth: '300px' }}>
                        <div className="fw-bold text-dark text-truncate">{item.title}</div>
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>{item.shortDescription?.slice(0, 55)}...</span>
                      </div>
                    </div>
                  </td>
                  <td className="small">
                    <div className="fw-semibold text-dark">{item.authorId?.name || 'DevSphere Author'}</div>
                    <span className="text-muted" style={{ fontSize: '0.72rem' }}>{item.authorId?.email || 'user@devsphere.com'}</span>
                  </td>
                  <td>
                    <span className="badge bg-dark text-white text-uppercase" style={{ fontSize: '0.68rem' }}>{item.status}</span>
                  </td>
                  <td className="small text-muted">{item.viewsCount || 0}</td>
                  <td className="text-end pe-3 py-3">
                    <div className="btn-group btn-group-sm">
                      {item.status === 'pending' ? (
                        <>
                          <button onClick={() => handleAction(item._id, 'approve')} className="btn btn-dark">Approve</button>
                          <button onClick={() => handleAction(item._id, 'reject')} className="btn btn-outline-dark">Reject</button>
                        </>
                      ) : <a href={`http://localhost:5173/blogs/${item.slug}`} target="_blank" rel="noreferrer" className="btn btn-outline-dark">View</a>}
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

export default AdminArticlesPage;