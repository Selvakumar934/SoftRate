import React from 'react';
import { Link } from 'react-router-dom';

const AdminActivityPage = () => (
  <div className="container py-5 text-center">
    <h3 className="fw-bold text-dark mb-2">Audit Log</h3>
    <p className="text-muted small mb-4">Chronological record of editorial actions.</p>
    <Link to="/dashboard" className="btn btn-dark btn-sm">Return to Dashboard</Link>
  </div>
);

export default AdminActivityPage;
