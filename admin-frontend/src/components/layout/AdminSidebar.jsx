import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ pendingCount = 5 }) => {
  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div className="admin-sidebar-brand d-flex align-items-center justify-content-between">
        <span className="fw-bold tracking-tight">DevSphere</span>
        <span className="badge bg-white text-dark small text-uppercase">Admin</span>
      </div>

      {/* Nav Menu */}
      <div className="py-3 d-flex flex-column gap-1 flex-grow-1">
        <div className="px-3 text-uppercase small text-light opacity-50 fw-bold" style={{ fontSize: '0.7rem' }}>
          Overview
        </div>

        <NavLink to="/dashboard" className="admin-nav-item">
          <span>Dashboard</span>
        </NavLink>

        <div className="px-3 text-uppercase small text-light opacity-50 fw-bold mt-3" style={{ fontSize: '0.7rem' }}>
          Editorial
        </div>

        <NavLink to="/articles/pending" className="admin-nav-item d-flex justify-content-between align-items-center">
          <span>Approval Queue</span>
          {pendingCount > 0 && (
            <span className="badge bg-white text-dark px-2">{pendingCount}</span>
          )}
        </NavLink>

        <NavLink to="/articles" className="admin-nav-item">
          <span>All Articles</span>
        </NavLink>

        <NavLink to="/reviews" className="admin-nav-item">
          <span>Review</span>
        </NavLink>

        <NavLink to="/articles/create" className="admin-nav-item">
          <span>Publish Article</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
