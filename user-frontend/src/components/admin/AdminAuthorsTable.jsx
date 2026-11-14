import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

const AdminAuthorsTable = ({ users, onReload, authHeaders }) => {
  const [authorList, setAuthorList] = useState(users);
  useEffect(() => { setAuthorList(users); }, [users]);
  const [editingUser, setEditingUser] = useState(null), [form, setForm] = useState({}), [showAdd, setShowAdd] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ name: '', email: '', websiteUrl: '', socialMediaId: '', role: 'user' });

  const startEdit = (u) => {
    setEditingUser(u._id);
    setForm({ name: u.name, email: u.email, websiteUrl: u.websiteUrl || '', socialMediaId: u.socialMediaId || '' });
  };

  const syncList = (list) => {
    setAuthorList(list);
    try { localStorage.setItem('devsphere_admin_users', JSON.stringify(list)); } catch (e) {}
    onReload && onReload();
  };

  const handleSave = async (id) => {
    let saved = { ...form };
    try {
      const res = await api.put(`/admin/users/${id}`, form, authHeaders);
      if (res.data?.data) saved = res.data.data;
    } catch (e) {}
    syncList(authorList.map((u) => u._id === id ? { ...u, ...saved } : u));
    setEditingUser(null);
  };

  const handleDelete = async (id, name, email) => {
    if (!window.confirm(`Permanently remove author "${name}" from MongoDB?`)) return;
    try { await api.delete(`/admin/users/${id}?email=${encodeURIComponent(email || '')}`, authHeaders); } catch (e) {}
    syncList(authorList.filter((u) => u._id !== id));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newAuthor.name || !newAuthor.email) return alert('Name and email required');
    let created = { _id: 'u-' + Date.now(), ...newAuthor };
    try {
      const res = await api.post('/admin/users', newAuthor, authHeaders);
      if (res.data?.data) created = res.data.data;
    } catch (e) {}
    syncList([...authorList, created]);
    setShowAdd(false); setNewAuthor({ name: '', email: '', websiteUrl: '', socialMediaId: '', role: 'user' });
  };

  return (
    <div className="card border-dark rounded-2 bg-white">
      <div className="p-3 border-bottom border-dark d-flex justify-content-between align-items-center">
        <div><h6 className="fw-bold text-dark mb-0">Platform Authors & Profiles ({authorList.length} in MongoDB)</h6><small className="text-muted">Admin-only: Real-time author profiles, portfolio URLs, and Twitter/X social handles.</small></div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn btn-dark btn-sm fw-semibold">{showAdd ? 'Close' : '+ Add Author'}</button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="p-3 bg-light border-bottom border-dark row g-2 align-items-center">
          <div className="col-md-3"><input className="form-control form-control-sm border-dark" placeholder="Author Name" value={newAuthor.name} onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })} required /></div>
          <div className="col-md-3"><input type="email" className="form-control form-control-sm border-dark" placeholder="Email Address" value={newAuthor.email} onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })} required /></div>
          <div className="col-md-2"><input className="form-control form-control-sm border-dark" placeholder="Website URL" value={newAuthor.websiteUrl} onChange={(e) => setNewAuthor({ ...newAuthor, websiteUrl: e.target.value })} /></div>
          <div className="col-md-2"><input className="form-control form-control-sm border-dark" placeholder="@twitter_id" value={newAuthor.socialMediaId} onChange={(e) => setNewAuthor({ ...newAuthor, socialMediaId: e.target.value })} /></div>
          <div className="col-md-2"><button type="submit" className="btn btn-dark btn-sm w-100">Save to MongoDB</button></div>
        </form>
      )}

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 small">
          <thead className="table-light"><tr><th className="ps-3 py-2">Name</th><th>Email</th><th>Website / Link</th><th>Social ID (Twitter)</th><th className="text-end pe-3">Actions</th></tr></thead>
          <tbody>
            {authorList.map((u) => (
              <tr key={u._id}>
                {editingUser === u._id ? (
                  <>
                    <td className="ps-3 py-2"><input className="form-control form-control-sm border-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                    <td className="py-2"><input className="form-control form-control-sm border-dark" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
                    <td className="py-2"><input className="form-control form-control-sm border-dark" placeholder="https://..." value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} /></td>
                    <td className="py-2"><input className="form-control form-control-sm border-dark" placeholder="@handle" value={form.socialMediaId} onChange={(e) => setForm({ ...form, socialMediaId: e.target.value })} /></td>
                    <td className="text-end pe-3 py-2"><div className="btn-group btn-group-sm"><button onClick={() => handleSave(u._id)} className="btn btn-dark">Save</button><button onClick={() => setEditingUser(null)} className="btn btn-outline-dark">Cancel</button></div></td>
                  </>
                ) : (
                  <>
                    <td className="ps-3 py-2 fw-bold text-dark">{u.name}</td>
                    <td className="text-muted">{u.email}</td>
                    <td>{u.websiteUrl ? <a href={u.websiteUrl} target="_blank" rel="noreferrer" className="text-dark text-truncate d-inline-block" style={{ maxWidth: '140px' }}>{u.websiteUrl}</a> : <span className="text-muted">&mdash;</span>}</td>
                    <td className="fw-semibold text-dark">{u.socialMediaId || <span className="text-muted">&mdash;</span>}</td>
                    <td className="text-end pe-3 py-2"><div className="btn-group btn-group-sm"><button onClick={() => startEdit(u)} className="btn btn-outline-dark btn-sm">Edit</button>{u.role !== 'admin' && <button onClick={() => handleDelete(u._id, u.name, u.email)} className="btn btn-outline-dark btn-sm">Delete</button>}</div></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminAuthorsTable;
