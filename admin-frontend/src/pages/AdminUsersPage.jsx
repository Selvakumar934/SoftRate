import React, { useState, useEffect } from 'react';
import adminApi from '../services/adminApi.js';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]), [editing, setEditing] = useState(null), [form, setForm] = useState({}), [showAdd, setShowAdd] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ name: '', email: '', websiteUrl: '', socialMediaId: '', role: 'user' });

  const loadUsers = async () => {
    try { const res = await adminApi.get('/admin/users'); if (res.data?.data) setUsers(res.data.data); } catch (e) {}
  };
  useEffect(() => { loadUsers(); }, []);

  const startEdit = (u) => {
    setEditing(u._id);
    setForm({ name: u.name, email: u.email, websiteUrl: u.websiteUrl || '', socialMediaId: u.socialMediaId || '', role: u.role || 'user' });
  };

  const handleSave = async (id) => {
    try { await adminApi.put(`/admin/users/${id}`, form); setEditing(null); loadUsers(); } catch (err) { alert('Failed to update author'); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Permanently remove author "${name}" from MongoDB?`)) return;
    try { await adminApi.delete(`/admin/users/${id}`); loadUsers(); } catch (e) { alert('Failed to delete author'); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newAuthor.name || !newAuthor.email) return alert('Name and email required');
    try {
      await adminApi.post('/admin/users', newAuthor);
      setShowAdd(false);
      setNewAuthor({ name: '', email: '', websiteUrl: '', socialMediaId: '', role: 'user' });
      loadUsers();
    } catch (e) { alert('Failed to create author'); }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <div>
          <h2 className="fw-bold text-dark mb-0">Platform Authors & Profiles ({users.length} in MongoDB)</h2>
          <small className="text-muted">Administrator-only: Manage real-time Indian author profiles, websites, and Twitter/X IDs.</small>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn btn-dark btn-sm fw-semibold">{showAdd ? 'Close' : '+ Add Indian Author'}</button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="p-3 bg-light border border-dark rounded-2 mb-3 row g-2 align-items-center">
          <div className="col-md-3"><input className="form-control form-control-sm border-dark" placeholder="Author Name" value={newAuthor.name} onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })} required /></div>
          <div className="col-md-3"><input type="email" className="form-control form-control-sm border-dark" placeholder="Email Address" value={newAuthor.email} onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })} required /></div>
          <div className="col-md-2"><input className="form-control form-control-sm border-dark" placeholder="Website URL" value={newAuthor.websiteUrl} onChange={(e) => setNewAuthor({ ...newAuthor, websiteUrl: e.target.value })} /></div>
          <div className="col-md-2"><input className="form-control form-control-sm border-dark" placeholder="@twitter_id" value={newAuthor.socialMediaId} onChange={(e) => setNewAuthor({ ...newAuthor, socialMediaId: e.target.value })} /></div>
          <div className="col-md-2"><button type="submit" className="btn btn-dark btn-sm w-100">Save to MongoDB</button></div>
        </form>
      )}

      <div className="card border-dark rounded-2 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 small">
            <thead className="table-light"><tr><th className="ps-3 py-3">Name</th><th>Email</th><th>Website / Link</th><th>Social ID (Twitter)</th><th>Role</th><th className="text-end pe-3">Actions</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  {editing === u._id ? (
                    <>
                      <td className="ps-3 py-2"><input className="form-control form-control-sm border-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" placeholder="https://..." value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" placeholder="@handle" value={form.socialMediaId} onChange={(e) => setForm({ ...form, socialMediaId: e.target.value })} /></td>
                      <td className="py-2"><select className="form-select form-select-sm border-dark" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="user">User</option><option value="admin">Admin</option></select></td>
                      <td className="text-end pe-3 py-2"><div className="btn-group btn-group-sm"><button onClick={() => handleSave(u._id)} className="btn btn-dark">Save</button><button onClick={() => setEditing(null)} className="btn btn-outline-dark">Cancel</button></div></td>
                    </>
                  ) : (
                    <>
                      <td className="ps-3 py-3 fw-bold text-dark">{u.name}</td>
                      <td className="text-muted">{u.email}</td>
                      <td>{u.websiteUrl ? <a href={u.websiteUrl} target="_blank" rel="noreferrer" className="text-dark text-truncate d-inline-block" style={{ maxWidth: '140px' }}>{u.websiteUrl}</a> : <span className="text-muted">&mdash;</span>}</td>
                      <td className="fw-semibold text-dark">{u.socialMediaId || <span className="text-muted">&mdash;</span>}</td>
                      <td><span className="badge bg-dark text-white text-uppercase" style={{ fontSize: '0.65rem' }}>{u.role}</span></td>
                      <td className="text-end pe-3 py-3">
                        <div className="btn-group btn-group-sm">
                          <button onClick={() => startEdit(u)} className="btn btn-outline-dark btn-sm">Edit</button>
                          {u.role !== 'admin' && <button onClick={() => handleDelete(u._id, u.name)} className="btn btn-outline-dark btn-sm">Delete</button>}
                        </div>
                      </td>
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