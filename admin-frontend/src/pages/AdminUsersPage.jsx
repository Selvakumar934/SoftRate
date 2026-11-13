import React from 'react';
import { Link } from 'react-router-dom';

const AdminUsersPage = () => (
  <div className="container py-5 text-center">
    <h3 className="fw-bold text-dark mb-2">User Accounts</h3>
    <p className="text-muted small mb-4">Platform authors and administrator accounts.</p>
    <Link to="/dashboard" className="btn btn-dark btn-sm">Return to Dashboard</Link>
  </div>
);

export default AdminUsersPage;
