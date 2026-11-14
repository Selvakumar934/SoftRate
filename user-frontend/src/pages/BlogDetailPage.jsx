import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../services/api.js';
import { SAMPLE_ARTICLES } from '../services/sampleData.js';
import GoogleResearchBlock from '../components/blog/GoogleResearchBlock.jsx';
import ArticleReviewsBlock from '../components/blog/ArticleReviewsBlock.jsx';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let local = null;
    try {
      const s = localStorage.getItem('devsphere_admin_articles');
      if (s) local = JSON.parse(s).find((a) => a.slug === slug || a._id === slug);
    } catch (e) {}
    if (local) setArticle(local);
    api.get(`/articles/slug/${slug}`).then((res) => {
      if (res.data?.data && !local) setArticle(res.data.data);
      if (res.data?.related) setRelated(res.data.related);
    }).catch(() => {
      if (!local) {
        const match = SAMPLE_ARTICLES.find((a) => a.slug === slug) || SAMPLE_ARTICLES[0];
        setArticle(match);
        setRelated(SAMPLE_ARTICLES.filter((a) => a.slug !== match.slug).slice(0, 3));
      }
    });
  }, [slug]);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!article) return <div className="container py-5 text-center">Loading article...</div>;
  const dateStr = article.publishedDate ? new Date(article.publishedDate).toLocaleDateString() : 'Recent';

  return (
    <article className="container py-5" style={{ maxWidth: '820px' }}>
      <Link to="/blogs" className="text-dark small text-decoration-none fw-semibold d-inline-block mb-3">&larr; All Articles</Link>
      <h1 className="display-6 fw-bold text-dark mb-3">{article.title}</h1>
      <p className="lead text-muted fs-6 mb-4">{article.shortDescription}</p>

      <div className="d-flex justify-content-between align-items-center p-3 mb-4 border border-dark rounded-2 bg-light">
        <div className="small text-dark">By <strong>{article.authorId?.name || 'DevSphere'}</strong> &bull; {dateStr}</div>
        <button onClick={copyUrl} className="btn btn-dark btn-sm px-3 py-1 fw-semibold text-center">{copied ? 'Copied!' : 'Share'}</button>
      </div>

      {article.featuredImage && (
        <div className="mb-4 border border-dark rounded-2 overflow-hidden">
          <img src={article.featuredImage} alt={article.title} className="w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        </div>
      )}

      <div className="article-body mb-4"><ReactMarkdown remarkPlugins={[remarkGfm]}>{article.fullContent}</ReactMarkdown></div>

      <GoogleResearchBlock article={article} />
      <ArticleReviewsBlock article={article} />

      {related.length > 0 && (
        <div className="pt-4 border-top border-light-subtle">
          <h5 className="fw-bold text-dark mb-3">Related Articles</h5>
          <div className="row g-3">
            {related.map((item) => (
              <div key={item._id || item.slug} className="col-md-4">
                <Link to={`/blogs/${item.slug}`} className="d-block p-3 border border-light-subtle rounded-2 h-100 bg-white text-decoration-none hover-popup">
                  <div className="fw-bold text-dark small mb-1">{item.title}</div>
                  <span className="text-muted small">{item.readingTimeMinutes || 4} min read</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogDetailPage;
