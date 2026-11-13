import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import { SAMPLE_ARTICLES } from '../services/sampleData.js';
import FeaturedHero from '../components/blog/FeaturedHero.jsx';
import TechStacksBlock from '../components/blog/TechStacksBlock.jsx';
import NewsletterBlock from '../components/blog/NewsletterBlock.jsx';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get('/articles');
        if (res.data?.data?.length) {
          setArticles(res.data.data);
          setFeatured(res.data.data[0]);
          return;
        }
      } catch (err) {}
      setArticles(SAMPLE_ARTICLES);
      setFeatured(SAMPLE_ARTICLES[0]);
    };
    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/blogs?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div>
      <section className="py-5 bg-white border-bottom border-dark text-center">
        <div className="container" style={{ maxWidth: '700px' }}>
          <h1 className="display-4 fw-bold text-dark mb-2">DevSphere</h1>
          <p className="text-muted mb-4">A software development blog covering clean code, system architecture, Git, and web technologies.</p>
          <form onSubmit={handleSearch} className="d-flex justify-content-center gap-2 mb-3">
            <input type="text" className="form-control border-dark" placeholder="Search engineering articles..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-dark px-4" type="submit">Search</button>
          </form>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
            {['Microservices', 'Clean Code', 'TypeScript', 'Docker', 'Testing', 'Database'].map((tag) => (
              <button key={tag} type="button" onClick={() => navigate(`/blogs?search=${encodeURIComponent(tag)}`)} className="btn btn-outline-dark btn-sm rounded-pill px-3 py-1" style={{ fontSize: '0.75rem' }}>
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-5">
        <FeaturedHero article={featured} />
        <TechStacksBlock articles={articles} />
        <NewsletterBlock />
      </div>
    </div>
  );
};

export default HomePage;
