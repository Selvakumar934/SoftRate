import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminArticlesTable = ({ articles = [], onAction }) => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? articles : articles.filter((a) => a.status === filter);
  const counts = {
    total: articles.length,
    published: articles.filter((a) => a.status === 'published').length,
    pending: articles.filter((a) => a.status === 'pending').length,
    draft: articles.filter((a) => a.status === 'draft').length
  };

  return (
    <>
      <div className="row g-2 mb-3">
        {[{ label: 'Total', val: counts.total }, { label: 'Published', val: counts.published }, { label: 'Pending Review', val: counts.pending }, { label: 'Drafts', val: counts.draft }].map((c, i) => (
          <div key={i} className="col-6 col-md-3">
            <div className="card border-dark rounded-2 p-2 bg-white text-center">
              <small className="text-muted fw-bold">{c.label}</small>
              <div className="h4 fw-bold text-dark my-1">{c.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-dark rounded-2 bg-white">
        <div className="p-2 border-bottom border-dark d-flex justify-content-between align-items-center">
          <span className="fw-bold small">Articles Catalog ({filtered.length})</span>
          <div className="btn-group btn-group-sm">
            {['all', 'pending', 'published', 'draft'].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`btn text-capitalize ${filter === s ? 'btn-dark' : 'btn-outline-dark'}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 small">
            <thead className="table-light"><tr><th className="ps-3 py-2">Article</th><th>Author</th><th>Status</th><th className="text-end pe-3">Actions</th></tr></thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id || item.slug}>
                  <td className="ps-3 py-2">
                    <div className="fw-bold text-dark text-truncate" style={{ maxWidth: '320px' }}>{item.title}</div>
                    <small className="text-muted">{item.domain}</small>
                  </td>
                  <td className="text-muted">{item.authorId?.name || 'Author'}</td>
                  <td><span className="badge bg-dark text-white text-uppercase" style={{ fontSize: '0.65rem' }}>{item.status}</span></td>
                  <td className="text-end pe-3 py-2">
                    <div className="btn-group btn-group-sm">
                      {item.status === 'pending' && <button onClick={() => onAction(item._id, 'approve', item.slug)} className="btn btn-dark btn-sm">Approve</button>}
                      {item.status === 'pending' && <button onClick={() => onAction(item._id, 'reject', item.slug)} className="btn btn-outline-dark btn-sm">Reject</button>}
                      <Link to={`/dashboard/edit/${item._id || item.slug}`} className="btn btn-outline-dark btn-sm">Edit</Link>
                      <button onClick={() => onAction(item._id, 'delete', item.slug)} className="btn btn-outline-dark btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminArticlesTable;
