import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="devsphere-footer">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Info */}
          <div className="col-lg-6 col-md-6">
            <Link to="/" className="text-white text-decoration-none fs-4 fw-bold mb-2 d-block">
              DevSphere
            </Link>
            <p className="text-light opacity-75 small pe-lg-4">
              A dedicated software development blog providing clean, beginner-friendly tutorials, programming best practices, and architecture guides.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-6 col-md-6">
            <h6 className="text-white fw-bold text-uppercase small mb-3">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-light opacity-75">Home</Link></li>
              <li><Link to="/blogs" className="text-light opacity-75">All Software Articles</Link></li>
              <li><Link to="/about" className="text-light opacity-75">About DevSphere</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-3 border-top border-secondary border-opacity-50 text-center small text-light opacity-75">
          &copy; {new Date().getFullYear()} DevSphere – Software Development Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
