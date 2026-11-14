import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleAdminClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('devsphere_admin_token');
    if (token) navigate('/admin');
    else navigate('/admin/login');
  };

  return (
    <nav className="navbar navbar-expand-lg devsphere-navbar">
      <div className="container">
        <Link className="navbar-brand devsphere-brand" to="/">
          DevSphere
        </Link>
        <button
          className="navbar-toggler border-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blogs">Articles</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/dashboard">My Blogs</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item ms-lg-2">
              <button
                type="button"
                onClick={handleAdminClick}
                className="btn btn-outline-dark btn-sm px-3 fw-bold d-inline-flex align-items-center gap-1"
                title="Access Administrator View"
              >
                <i className="bi bi-shield-lock"></i> Admin
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
