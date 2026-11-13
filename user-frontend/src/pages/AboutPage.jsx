import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <span className="badge bg-dark text-white px-3 py-1 rounded-1 text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>
              About
            </span>
            <h1 className="fw-bold text-dark mb-2">
              About DevSphere
            </h1>
            <p className="text-muted small">
              A clean and simple software development technology blog platform.
            </p>
          </div>

          <div className="card border-dark rounded-2 p-4 bg-white mb-4">
            <h4 className="fw-bold text-dark mb-3">Our Goal</h4>
            <p className="text-dark small mb-4">
              DevSphere is created to provide software developers, students, and technology enthusiasts with clear, beginner-friendly, and practical programming articles.
            </p>

            <h5 className="fw-bold text-dark mb-2">Key Engineering Disciplines</h5>
            <ol className="small text-dark mb-4 ps-3">
              <li>Software Architecture & Microservices</li>
              <li>Clean Code & Object-Oriented Patterns</li>
              <li>Full-Stack JavaScript & TypeScript</li>
              <li>DevOps & Container Orchestration</li>
              <li>Relational & Document Database Systems</li>
              <li>Test-Driven Development & Automation</li>
            </ol>

            <h5 className="fw-bold text-dark mb-2">Built with the MERN Stack</h5>
            <ul className="small text-dark mb-4 ps-3">
              <li><strong>Frontend:</strong> React.js with Vite and Bootstrap 5</li>
              <li><strong>Backend:</strong> Node.js and Express.js REST API</li>
              <li><strong>Database:</strong> MongoDB Atlas</li>
              <li><strong>Authentication:</strong> JWT and bcrypt</li>
            </ul>

            <div className="text-center pt-3 border-top border-dark">
              <Link to="/blogs" className="btn btn-dark btn-sm px-4">
                Explore All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
