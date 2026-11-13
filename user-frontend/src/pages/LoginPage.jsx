import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    if (res.success) {
      navigate('/blogs');
    } else {
      setError(res.message || 'Login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card border-dark rounded-2 p-4 bg-white" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="fw-bold text-dark text-center mb-1">Author Sign In</h3>
        <p className="text-muted small text-center mb-4">Sign in to publish software development blogs</p>

        {error && <div className="alert alert-dark border-dark rounded-2 small mb-3">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-uppercase">Email</label>
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center small mt-3">
          Don't have an account? <Link to="/register" className="text-dark fw-bold">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
