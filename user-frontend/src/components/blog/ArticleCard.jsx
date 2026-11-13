import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const categoryName = article.categoryId?.name || 'Software Development';
  const categorySlug = article.categoryId?.slug || 'software-development';
  const authorName = article.authorId?.name || 'DevSphere Author';
  const dateStr = article.publishedDate
    ? new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  return (
    <div className="article-card">
      <div className="article-thumbnail-wrapper">
        <Link to={`/blogs/${article.slug}`}>
          <img
            src={article.featuredImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'}
            alt={article.title}
            className="article-thumbnail"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Link to={`/blogs?search=${encodeURIComponent(article.domain || categoryName)}`} className="category-badge">
            {article.domain || categoryName}
          </Link>
          <span className="small text-muted">{article.readingTimeMinutes || 3} min read</span>
        </div>

        <h5 className="fw-bold mb-2">
          <Link to={`/blogs/${article.slug}`} className="text-dark text-decoration-none">
            {article.title}
          </Link>
        </h5>

        <p className="text-muted small mb-3 flex-grow-1">{article.shortDescription}</p>

        {/* Card Footer: Metadata */}
        <div className="pt-3 border-top border-dark mt-auto">
          <div className="d-flex justify-content-between align-items-center small text-muted">
            <span className="text-truncate" style={{ maxWidth: '170px' }}>By <strong>{authorName}</strong></span>
            <span>{dateStr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
