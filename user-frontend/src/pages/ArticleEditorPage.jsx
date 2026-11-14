import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api.js';
import { SAMPLE_ARTICLES } from '../services/sampleData.js';

const ArticleEditorPage = () => {
  const { id } = useParams(), navigate = useNavigate(), fileRef = useRef();
  const [title, setTitle] = useState(''), [content, setContent] = useState(''), [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/articles/id/${id}`).then((res) => {
      if (res.data?.data) {
        setTitle(res.data.data.title || '');
        setContent(res.data.data.fullContent || res.data.data.shortDescription || '');
        setImage(res.data.data.featuredImage || '');
      }
    }).catch(() => {
      const match = SAMPLE_ARTICLES.find((a) => a._id === id || a.slug === id);
      if (match) {
        setTitle(match.title);
        setContent(match.fullContent || match.shortDescription);
        setImage(match.featuredImage);
      }
    });
  }, [id]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async (status = 'published') => {
    if (!title || !content || !image) return alert('Please enter Title, Content, and upload a Cover Image.');
    setLoading(true);
    const data = { title, shortDescription: content.slice(0, 140) + '...', fullContent: content, featuredImage: image, status };
    try {
      if (id) await api.put(`/articles/${id}`, data);
      else await api.post('/articles', data);
      navigate(status === 'draft' ? '/dashboard' : '/blogs');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving article. Please check permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '780px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <Link to="/dashboard" className="text-dark small text-decoration-none fw-bold">&larr; Back to My Blogs</Link>
        <div className="d-flex gap-2">
          <button type="button" onClick={() => handleSave('draft')} className="btn btn-outline-dark btn-sm px-3" disabled={loading}>
            Save Draft
          </button>
          <button type="button" onClick={() => handleSave('published')} className="btn btn-dark btn-sm px-4 fw-semibold" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Save Changes' : 'Publish Blog')}
          </button>
        </div>
      </div>

      <div className="card border-dark rounded-2 p-4 bg-white">
        <div className="mb-3">
          <label className="form-label small fw-bold text-uppercase">Title</label>
          <input className="form-control border-dark fw-bold" placeholder="Article title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label small fw-bold text-uppercase">Content (Markdown Supported)</label>
          <textarea className="form-control border-dark" rows="10" placeholder="Write article content..." value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <label className="form-label small fw-bold text-uppercase d-block">Cover Image</label>
          <input type="file" ref={fileRef} accept="image/*" className="d-none" onChange={handleFile} />
          <button type="button" onClick={() => fileRef.current?.click()} className="btn btn-outline-dark btn-sm me-2">Upload Image File</button>
          {image && <button type="button" onClick={() => setImage('')} className="btn btn-sm btn-outline-dark">Remove</button>}
          {image && (
            <div className="mt-3 border border-dark rounded-2 overflow-hidden" style={{ maxHeight: '160px' }}>
              <img src={image} alt="Preview" className="w-100" style={{ maxHeight: '160px', objectFit: 'cover' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleEditorPage;