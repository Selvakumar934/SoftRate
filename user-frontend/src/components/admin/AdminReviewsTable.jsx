import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

const AdminReviewsTable = ({ reviews = [], onReload, authHeaders }) => {
  const [list, setList] = useState(reviews), [filter, setFilter] = useState('all'), [search, setSearch] = useState('');
  useEffect(() => { setList(reviews); }, [reviews]);

  const handleDelete = async (r) => {
    if (!window.confirm(`Permanently remove review for "${r.articleTitle || r.articleSlug}"?`)) return;
    try {
      await api.delete(`/reviews/${r._id}?slug=${encodeURIComponent(r.articleSlug || '')}&userName=${encodeURIComponent(r.userName || '')}`, authHeaders);
    } catch (e) {}
    const updated = list.filter((item) => item._id !== r._id && !(item.articleSlug === r.articleSlug && item.userName === r.userName));
    setList(updated);
    try { localStorage.setItem('devsphere_admin_reviews', JSON.stringify(updated)); } catch (e) {}
    onReload && onReload();
  };

  const filtered = list.filter((r) => {
    const matchRating = filter === 'all' || String(r.rating) === filter;
    const matchSearch = !search || (r.articleTitle || '').toLowerCase().includes(search.toLowerCase()) || (r.userName || '').toLowerCase().includes(search.toLowerCase());
    return matchRating && matchSearch;
  });

  return (
    <div className="card border-dark rounded-2 bg-white">
      <div className="p-3 border-bottom border-dark d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div>
          <h6 className="fw-bold text-dark mb-0">Article Reviews & Reader Queries ({list.length})</h6>
          <small className="text-muted">Real-time user ratings (1 to 5) and feedback stored per article.</small>
        </div>
        <div className="d-flex gap-2">
          <input className="form-control form-control-sm border-dark" style={{ width: '180px' }} placeholder="Search article/user..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="btn-group btn-group-sm">
            {['all', '5', '4', '3', '2', '1'].map((v) => (
              <button key={v} onClick={() => setFilter(v)} className={`btn ${filter === v ? 'btn-dark' : 'btn-outline-dark'}`}>{v === 'all' ? 'All' : `${v}★`}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 small">
          <thead className="table-light">
            <tr>
              <th className="ps-3 py-2">Article Name</th>
              <th>Reviewer</th>
              <th>Rating</th>
              <th style={{ minWidth: '240px' }}>Review / Query Content</th>
              <th>Date</th>
              <th className="text-end pe-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-4 text-muted">No reviews matching filter.</td></tr>
            ) : (
              filtered.map((r) => (
                <tr key={r._id || r.createdAt}>
                  <td className="ps-3 py-2">
                    <div className="fw-bold text-dark text-truncate" style={{ maxWidth: '240px' }}>{r.articleTitle || r.articleSlug}</div>
                    <small className="text-muted">{r.articleSlug}</small>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{r.userName}</div>
                    {r.userEmail && <small className="text-muted">{r.userEmail}</small>}
                  </td>
                  <td><span className="badge bg-dark text-white">{'★'.repeat(r.rating || 5)}{'☆'.repeat(5 - (r.rating || 5))} {r.rating}/5</span></td>
                  <td className="text-dark py-2"><p className="mb-0 text-truncate" style={{ maxWidth: '340px' }} title={r.comment}>{r.comment}</p></td>
                  <td className="text-muted" style={{ whiteSpace: 'nowrap' }}>{new Date(r.createdAt || Date.now()).toLocaleDateString()}</td>
                  <td className="text-end pe-3 py-2"><button onClick={() => handleDelete(r)} className="btn btn-outline-dark btn-sm">Delete</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviewsTable;
