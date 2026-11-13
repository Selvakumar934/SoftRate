import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsletterBlock = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => { setEmail(''); setSubscribed(false); }, 3500);
  };

  return (
    <div className="card border-dark rounded-3 bg-white p-4 p-md-5 my-5 text-center">
      <div className="mx-auto" style={{ maxWidth: '640px' }}>
        <span className="badge bg-dark text-white text-uppercase px-3 py-1 mb-2" style={{ fontSize: '0.7rem' }}>
          Weekly Engineering Digest
        </span>
        <h3 className="fw-bold text-dark mb-2">Architectural Insights Delivered Weekly</h3>
        <p className="text-muted small mb-4">
          Join thousands of developers receiving curated software engineering guides, distributed systems breakdowns, and clean code tutorials.
        </p>

        {subscribed ? (
          <div className="alert alert-dark border-dark py-2 mb-3 small fw-bold">
            Thanks for subscribing! Check your inbox soon for the next engineering edition.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row justify-content-center gap-2 mb-3">
            <input
              type="email"
              className="form-control border-dark"
              style={{ maxWidth: '340px' }}
              placeholder="developer@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-dark px-4 fw-semibold" type="submit">Subscribe</button>
          </form>
        )}

        <div className="small text-muted">
          Written and curated by software engineers for software engineers.
        </div>
      </div>
    </div>
  );
};

export default NewsletterBlock;
