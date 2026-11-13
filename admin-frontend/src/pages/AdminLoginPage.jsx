import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@devsphere.com');
  const [password, setPassword] = useState('AdminPass2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) navigate('/dashboard', { replace: true });
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(res.message || 'Invalid admin credentials');
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div className="card border-dark rounded-2 p-4 bg-white shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark mb-1">DevSphere Admin</h3>
          <p className="text-muted small mb-0">Sign in to editorial administration portal</p>
        </div>

        {error && <div className="alert alert-dark border-dark rounded-2 small mb-3">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-uppercase">Admin Email</label>
            <input
              type="email"
              className="form-control border-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-uppercase">Password</label>
            <input
              type="password"
              className="form-control border-dark"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2 fw-semibold" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
