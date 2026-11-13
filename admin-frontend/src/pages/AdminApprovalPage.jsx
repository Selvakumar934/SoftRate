import React, { useState, useEffect } from 'react';
import adminApi from '../services/adminApi.js';

const AdminApprovalPage = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.get('/admin/articles/pending').then((res) => {
      if (res.data?.data) setPending(res.data.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    try {
      await adminApi.put(`/admin/articles/${id}/approve`);
    } catch (e) {}
    setPending(pending.filter((a) => a._id !== id));
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Enter rejection feedback:', 'Please revise the article content.');
    if (!reason) return;
    try {
      await adminApi.put(`/admin/articles/${id}/reject`, { rejectionReason: reason });
    } catch (e) {}
    setPending(pending.filter((a) => a._id !== id));
  };

  return (
    <div>
      <div className="mb-4 pb-2 border-bottom border-dark">
        <h2 className="fw-bold text-dark mb-1">Article Approval Queue</h2>
        <p className="text-muted small mb-0">Review submitted articles from platform authors before they go live.</p>
      </div>

      <div className="card border-dark rounded-2 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-uppercase text-dark border-bottom border-dark">
              <tr>
                <th scope="col" className="ps-3 py-3">Article Title</th>
                <th scope="col" className="py-3">Author</th>
                <th scope="col" className="text-end pe-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="text-center py-4">Loading queue...</td></tr>
              ) : pending.length > 0 ? (
                pending.map((item) => (
                  <tr key={item._id}>
                    <td className="ps-3 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <img src={item.featuredImage} alt="" className="rounded border border-dark flex-shrink-0" style={{ width: '42px', height: '42px', objectFit: 'cover' }} />
                        <div className="text-truncate" style={{ maxWidth: '340px' }}>
                          <div className="fw-bold text-dark text-truncate">{item.title}</div>
                          <div className="small text-muted text-truncate">{item.shortDescription}</div>
                        </div>
                      </div>
                    </td>
                    <td className="small">
                      <div className="fw-semibold text-dark">{item.authorId?.name || 'Author'}</div>
                      <span className="text-muted" style={{ fontSize: '0.72rem' }}>{item.authorId?.email}</span>
                    </td>
                    <td className="text-end pe-3 py-3">
                      <div className="btn-group btn-group-sm">
                        <button onClick={() => handleApprove(item._id)} className="btn btn-dark">Approve</button>
                        <button onClick={() => handleReject(item._id)} className="btn btn-outline-dark">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-center py-5 text-muted">No articles pending review.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminApprovalPage;
