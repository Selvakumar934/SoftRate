import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

const AdminNavbar = () => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="admin-topbar">
      <div className="d-flex align-items-center gap-2">
        <span className="badge bg-dark text-white px-2 py-1 small">
          DevSphere Administration
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="d-none d-md-block text-end">
          <div className="fw-bold small text-dark leading-tight">{adminUser?.name || 'Administrator'}</div>
          <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{adminUser?.email}</div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-outline-dark btn-sm px-3"
          title="Sign out of Admin Session"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
