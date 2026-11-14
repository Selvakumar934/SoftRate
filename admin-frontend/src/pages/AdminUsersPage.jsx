import React, { useState, useEffect } from 'react';
import adminApi from '../services/adminApi.js';
import { FALLBACK_USERS } from '../services/sampleData.js';

const AdminUsersPage = () => {
  const [users, setUsers] = useState(() => {
    try { const s = localStorage.getItem('devsphere_admin_users'); if (s) return JSON.parse(s); } catch (e) {}
    return FALLBACK_USERS;
  });
  const [editing, setEditing] = useState(null), [form, setForm] = useState({}), [showAdd, setShowAdd] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ name: '', email: '', websiteUrl: '', socialMediaId: '', role: 'user' });

  const syncUsers = (list) => { setUsers(list); try { localStorage.setItem('devsphere_admin_users', JSON.stringify(list)); } catch (e) {} };

  const loadUsers = async () => {
    try { const res = await adminApi.get('/admin/users'); if (res.data?.data?.length) syncUsers(res.data.data); } catch (e) {}
  };
  useEffect(() => { loadUsers(); }, []);

  const startEdit = (u) => { setEditing(u._id); setForm({ name: u.name, email: u.email, websiteUrl: u.websiteUrl || '', socialMediaId: u.socialMediaId || '', role: u.role || 'user' }); };

  const handleSave = async (id) => {
    let saved = { ...form };
    try { const res = await adminApi.put(`/admin/users/${id}`, form); if (res.data?.data) saved = res.data.data; } catch (e) {}
    syncUsers(users.map((u) => u._id === id ? { ...u, ...saved } : u)); setEditing(null);
  };
  const handleDelete = async (id, name, email) => {
    if (!window.confirm(`Permanently remove author "${name}" from MongoDB?`)) return;
    try { await adminApi.delete(`/admin/users/${id}?email=${encodeURIComponent(email || '')}`); } catch (e) {}
    syncUsers(users.filter((u) => u._id !== id));
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newAuthor.name || !newAuthor.email) return alert('Name and email required');
    let created = { _id: 'u-' + Date.now(), ...newAuthor };
    try { const res = await adminApi.post('/admin/users', newAuthor); if (res.data?.data) created = res.data.data; } catch (e) {}
    syncUsers([...users, created]); setShowAdd(false); setNewAuthor({ name: '', email: '', websiteUrl: '', socialMediaId: '', role: 'user' });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <div><h2 className="fw-bold text-dark mb-0">Platform Authors & Profiles ({users.length} in MongoDB)</h2><small className="text-muted">Administrator-only: Manage real-time author profiles, websites, and Twitter/X IDs.</small></div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn btn-dark btn-sm px-4 fw-semibold">{showAdd ? 'Close' : '+ Add Author'}</button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="p-3 bg-light border border-dark rounded-2 mb-4 row g-2 align-items-center">
          <div className="col-md-3"><input className="form-control form-control-sm border-dark" placeholder="Author Name" value={newAuthor.name} onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })} required /></div>
          <div className="col-md-3"><input type="email" className="form-control form-control-sm border-dark" placeholder="Email" value={newAuthor.email} onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })} required /></div>
          <div className="col-md-2"><input className="form-control form-control-sm border-dark" placeholder="Website" value={newAuthor.websiteUrl} onChange={(e) => setNewAuthor({ ...newAuthor, websiteUrl: e.target.value })} /></div>
          <div className="col-md-2"><input className="form-control form-control-sm border-dark" placeholder="@twitter" value={newAuthor.socialMediaId} onChange={(e) => setNewAuthor({ ...newAuthor, socialMediaId: e.target.value })} /></div>
          <div className="col-md-2"><button type="submit" className="btn btn-dark btn-sm w-100">Save to MongoDB</button></div>
        </form>
      )}

      <div className="card border-dark rounded-2 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-uppercase text-dark border-bottom border-dark"><tr><th className="ps-3 py-3">Name</th><th>Email</th><th>Website</th><th>Social (Twitter)</th><th className="text-end pe-3">Actions</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  {editing === u._id ? (
                    <>
                      <td className="ps-3 py-2"><input className="form-control form-control-sm border-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" value={form.socialMediaId} onChange={(e) => setForm({ ...form, socialMediaId: e.target.value })} /></td>
                      <td className="text-end pe-3 py-2"><div className="btn-group btn-group-sm"><button onClick={() => handleSave(u._id)} className="btn btn-dark">Save</button><button onClick={() => setEditing(null)} className="btn btn-outline-dark">Cancel</button></div></td>
                    </>
                  ) : (
                    <>
                      <td className="ps-3 py-3 fw-bold text-dark">{u.name}</td>
                      <td className="text-muted">{u.email}</td>
                      <td>{u.websiteUrl ? <a href={u.websiteUrl} target="_blank" rel="noreferrer" className="text-dark text-truncate d-inline-block" style={{ maxWidth: '140px' }}>{u.websiteUrl}</a> : <span className="text-muted">&mdash;</span>}</td>
                      <td className="fw-semibold text-dark">{u.socialMediaId || <span className="text-muted">&mdash;</span>}</td>
                      <td className="text-end pe-3 py-3"><div className="btn-group btn-group-sm"><button onClick={() => startEdit(u)} className="btn btn-outline-dark btn-sm">Edit</button>{u.role !== 'admin' && <button onClick={() => handleDelete(u._id, u.name, u.email)} className="btn btn-outline-dark btn-sm">Delete</button>}</div></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminUsersPage;
