import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';

const UserDashboardPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = async () => {
    try {
      const res = await api.get('/articles/my/all');
      if (res.data?.data) setArticles(res.data.data);
    } catch (err) {
      console.warn('Could not load user articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.delete(`/articles/${id}`);
      setArticles(articles.filter((a) => a._id !== id));
    } catch (err) {
      setArticles(articles.filter((a) => a._id !== id));
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <h2 className="fw-bold text-dark mb-0">My Blog Articles</h2>
        <Link to="/dashboard/create" className="btn btn-dark btn-sm px-4 fw-semibold">
          + Create New Blog
        </Link>
      </div>

      <div className="d-flex gap-2 mb-3">
        <span className="badge border border-dark text-dark px-3 py-2 bg-white">Total: <strong>{articles.length}</strong></span>
        <span className="badge border border-dark text-dark px-3 py-2 bg-white">Published: <strong>{articles.filter((a) => a.status === 'published').length}</strong></span>
        <span className="badge border border-dark text-dark px-3 py-2 bg-white">In Review: <strong>{articles.filter((a) => a.status === 'pending').length}</strong></span>
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
              ) : articles.length > 0 ? (
                articles.map((item) => (
                  <tr key={item._id}>
                    <td className="ps-3 py-3 fw-bold text-dark">
                      <div className="d-flex align-items-center gap-2">
                        <img src={item.featuredImage} alt="" className="rounded border border-dark flex-shrink-0" style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
                        <span className="text-truncate" style={{ maxWidth: '300px' }}>{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-dark text-white text-uppercase" style={{ fontSize: '0.7rem' }}>
                        {item.status || 'published'}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="text-end pe-3 py-3">
                      <div className="btn-group btn-group-sm">
                        <Link to={`/dashboard/edit/${item._id}`} className="btn btn-outline-dark">Edit</Link>
                        <button onClick={() => handleDelete(item._id)} className="btn btn-outline-dark">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    No articles written yet. <Link to="/dashboard/create" className="text-dark fw-bold">Create your first blog</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
