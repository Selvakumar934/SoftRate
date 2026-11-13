import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedHero = ({ article }) => {
  if (!article) return null;

  const categoryName = article.categoryId?.name || 'Software Development';
  const categorySlug = article.categoryId?.slug || 'software-development';
  const authorName = article.authorId?.name || 'DevSphere Lead Author';
  const dateStr = article.publishedDate
    ? new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  return (
    <div className="card border-dark rounded-3 overflow-hidden mb-5 bg-white">
      <div className="row g-0 align-items-stretch">
        <div className="col-lg-7">
          <Link to={`/blogs/${article.slug}`}>
            <img
              src={article.featuredImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'}
              alt={article.title}
              className="w-100 h-100"
              style={{ objectFit: 'cover', minHeight: '340px' }}
            />
          </Link>
        </div>

        <div className="col-lg-5 p-4 d-flex flex-column justify-content-center">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Link to={`/blogs?category=${categorySlug}`} className="category-badge">
              {categoryName}
            </Link>
            <span className="text-muted small">&bull;</span>
            <span className="text-muted small">{article.readingTimeMinutes || 5} min read</span>
          </div>

          <h3 className="fw-bold mb-3">
            <Link to={`/blogs/${article.slug}`} className="text-dark text-decoration-none">
              {article.title}
            </Link>
          </h3>

          <p className="text-muted mb-4 small">{article.shortDescription}</p>

          <div className="pt-3 border-top border-dark mt-auto">
            <span className="small text-muted">
              By <strong>{authorName}</strong> &bull; {dateStr}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedHero;
