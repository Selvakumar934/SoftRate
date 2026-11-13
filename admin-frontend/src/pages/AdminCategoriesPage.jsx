import React from 'react';
import { Link } from 'react-router-dom';

const AdminCategoriesPage = () => (
  <div className="container py-5 text-center">
    <h3 className="fw-bold text-dark mb-2">Category Management</h3>
    <p className="text-muted small mb-4">Categories are automatically managed under Software Development.</p>
    <Link to="/articles" className="btn btn-dark btn-sm">Return to Articles</Link>
  </div>
);

export default AdminCategoriesPage;
