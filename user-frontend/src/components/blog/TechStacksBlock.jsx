import React, { useState } from 'react';
import ArticleCard from './ArticleCard.jsx';

const DOMAINS = ['All', 'Microservices', 'Clean Code', 'TypeScript', 'Docker', 'Testing', 'Database'];

const TechStacksBlock = ({ articles = [] }) => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? articles
    : articles.filter((a) => a.domain === active || a.title?.toLowerCase().includes(active.toLowerCase()));

  const getCount = (dom) => {
    if (dom === 'All') return articles.length;
    return articles.filter((a) => a.domain === dom || a.title?.toLowerCase().includes(dom.toLowerCase())).length;
  };

  return (
    <section className="my-5" id="engineering-domains">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-dark gap-2">
        <div>
          <h4 className="fw-bold text-dark mb-0">Explore by Engineering Domain</h4>
          <p className="text-muted small mb-0">Browse specialized disciplines with 3 dedicated articles per topic (18 total)</p>
        </div>
        <span className="badge bg-dark text-white px-3 py-2 fw-semibold">
          Showing {filtered.length} of {articles.length} Articles
        </span>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {DOMAINS.map((dom) => {
          const count = getCount(dom);
          const isSelected = active === dom;
          return (
            <button
              key={dom}
              type="button"
              onClick={() => setActive(dom)}
              className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${isSelected ? 'btn-dark' : 'btn-outline-dark'}`}
              style={{ fontSize: '0.8rem', transition: 'all 0.15s ease' }}
            >
              {dom} <span className="opacity-75 ms-1">({count})</span>
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="row g-4">
          {filtered.map((item) => (
            <div key={item._id || item.slug} className="col-md-6 col-lg-4">
              <ArticleCard article={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center border border-dark rounded-2 bg-white text-muted">
          No articles found for domain: <strong>{active}</strong>
        </div>
      )}
    </section>
  );
};

export default TechStacksBlock;
