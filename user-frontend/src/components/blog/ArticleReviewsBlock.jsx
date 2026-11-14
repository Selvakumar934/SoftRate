import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { SAMPLE_REVIEWS } from '../../services/sampleReviews.js';

const ArticleReviewsBlock = ({ article }) => {
  if (!article) return null;
  const slug = article.slug;
  const initial = SAMPLE_REVIEWS.filter((r) => r.articleSlug === slug);
  const [reviews, setReviews] = useState(initial.length ? initial : SAMPLE_REVIEWS.slice(0, 2));
  const [name, setName] = useState(''), [rating, setRating] = useState(5), [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false), [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api.get(`/reviews?slug=${slug}`).then((res) => {
      if (res.data?.data?.length) setReviews(res.data.data);
    }).catch(() => {});
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSubmitting(true);
    const newRev = {
      articleId: article._id || slug, articleTitle: article.title, articleSlug: slug,
      userName: name.trim(), rating: Number(rating), comment: comment.trim(), createdAt: new Date()
    };
    try {
      const res = await api.post('/reviews', newRev);
      if (res.data?.data) newRev._id = res.data.data._id;
    } catch (err) {}
    setReviews([newRev, ...reviews]);
    setName(''); setComment(''); setSubmitted(true); setSubmitting(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const avg = reviews.length ? (reviews.reduce((a, b) => a + Number(b.rating), 0) / reviews.length).toFixed(1) : '5.0';

  return (
    <div className="my-4 pt-3 border-top border-light-subtle">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold text-dark mb-0">Overall Rating: {avg} / 5</h5>
          <small className="text-muted">{'★'.repeat(Math.round(Number(avg)))}{'☆'.repeat(5 - Math.round(Number(avg)))} &bull; Based on {reviews.length} user ratings</small>
        </div>
        <span className="badge bg-dark text-white px-3 py-2">{reviews.length} Ratings</span>
      </div>

      <div className="review-form-card mb-3">
        <h6 className="fw-bold text-dark mb-2">Rate this Article & Submit Query</h6>
        {submitted && <div className="alert alert-dark py-1 px-2 small mb-2">Thank you! Your rating and query have been recorded.</div>}
        <form onSubmit={handleSubmit}>
          <div className="row g-2 mb-2">
            <div className="col-md-7">
              <input className="form-control form-control-sm border-secondary border-opacity-25" placeholder="Your Name or Handle" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-5">
              <select className="form-select form-select-sm border-secondary border-opacity-25" value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value={5}>★★★★★ (5 - Excellent)</option>
                <option value={4}>★★★★☆ (4 - Good)</option>
                <option value={3}>★★★☆☆ (3 - Average)</option>
                <option value={2}>★★☆☆☆ (2 - Needs Improvement)</option>
                <option value={1}>★☆☆☆☆ (1 - Poor)</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <textarea className="form-control form-control-sm border-secondary border-opacity-25" rows={2} placeholder="Share your technical feedback, questions, or queries about this article..." value={comment} onChange={(e) => setComment(e.target.value)} required />
          </div>
          <button type="submit" disabled={submitting} className="btn btn-dark btn-sm px-3 fw-semibold">
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleReviewsBlock;
