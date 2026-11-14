import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api.js';
import { SAMPLE_ARTICLES } from '../services/sampleData.js';
import ArticleCard from '../components/blog/ArticleCard.jsx';

const filterSample = (q) => {
  if (!q) return SAMPLE_ARTICLES;
  const lq = q.toLowerCase();
  return SAMPLE_ARTICLES.filter((a) => a.domain?.toLowerCase().includes(lq) || a.title?.toLowerCase().includes(lq) || a.shortDescription?.toLowerCase().includes(lq));
};

const BlogListingPage = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get('search') || '';
  const [articles, setArticles] = useState(() => filterSample(query));
  const [search, setSearch] = useState(query);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      const q = params.get('search') || '';
      try {
        const res = await api.get(`/articles?search=${encodeURIComponent(q)}`);
        if (res.data?.data && res.data.data.length > 0) {
          setArticles(res.data.data);
          return;
        }
      } catch (err) {}
      setArticles(filterSample(q));
    };
    fetchArticles();
  }, [params]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) setParams({ search: search.trim() });
    else setParams({});
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap gap-2 mb-3">
        {['All', 'Microservices', 'Clean Code', 'TypeScript', 'Docker', 'Testing', 'Database'].map((t) => (
          <button key={t} type="button" onClick={() => { if (t === 'All') { setSearch(''); setParams({}); } else { setSearch(t); setParams({ search: t }); } }} className={`btn btn-sm rounded-pill px-3 ${(params.get('search') === t || (!params.get('search') && t === 'All')) ? 'btn-dark' : 'btn-outline-dark'}`} style={{ fontSize: '0.75rem' }}>{t}</button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="d-flex gap-2 mb-4" style={{ maxWidth: '480px' }}>
        <input type="text" className="form-control border-dark" placeholder="Filter articles..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="btn btn-dark" type="submit">Search</button>
        {params.get('search') && <button type="button" className="btn btn-outline-dark" onClick={() => { setSearch(''); setParams({}); }}>Clear</button>}
      </form>

      {/* Articles Grid */}
      {loading ? (
        <div className="py-5 text-center text-muted">Loading articles...</div>
      ) : articles.length > 0 ? (
        <div className="row g-4">
          {articles.map((item) => (
            <div key={item._id || item.slug} className="col-md-6 col-lg-4">
              <ArticleCard article={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 text-muted border border-dark rounded-2 bg-white">
          No articles found matching "{params.get('search')}".
        </div>
      )}
    </div>
  );
};

export default BlogListingPage;
