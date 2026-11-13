import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { SAMPLE_CATEGORIES } from '../services/sampleData.js';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data.success && res.data.data.length > 0) {
          setCategories(res.data.data);
        } else {
          setCategories(SAMPLE_CATEGORIES);
        }
      } catch (err) {
        setCategories(SAMPLE_CATEGORIES);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-dark text-white px-3 py-1 rounded-1 text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>
          Categories
        </span>
        <h2 className="fw-bold text-dark mb-2">Explore by Category</h2>
        <p className="text-muted small">
          Select a technical discipline to browse relevant articles and guides.
        </p>
      </div>

      <div className="row g-4 mb-5">
        {categories.map((cat) => (
          <div key={cat._id || cat.slug} className="col-lg-4 col-md-6">
            <div className="card h-100 border-dark rounded-2 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold text-dark mb-0">{cat.name}</h5>
                <span className="badge bg-light text-dark border border-dark">
                  {cat.articleCount || 0}
                </span>
              </div>

              <p className="text-muted small mb-4 flex-grow-1">
                {cat.description || 'Explore articles, tutorials, and practical engineering guides in this category.'}
              </p>

              <Link
                to={`/blogs?category=${cat.slug}`}
                className="btn btn-outline-dark btn-sm align-self-start"
              >
                Browse Articles &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
