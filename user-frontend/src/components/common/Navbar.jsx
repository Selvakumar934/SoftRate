import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;