import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPills = ({ categories = [], activeCategory = null }) => {
  return (
    <div className="d-flex align-items-center gap-2 overflow-x-auto py-2 mb-4">
      <Link
        to="/blogs"
        className={`category-pill ${!activeCategory ? 'active' : ''}`}
      >
        All Articles
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat._id || cat.slug}
          to={`/blogs?category=${cat.slug}`}
          className={`category-pill ${activeCategory === cat.slug ? 'active' : ''}`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryPills;
