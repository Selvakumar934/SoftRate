import React, { useState } from 'react';
import api from '../../services/api.js';

const AdminAuthorsTable = ({ users, onReload, authHeaders }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({});

  const startEdit = (u) => {
    setEditingUser(u._id);
    setForm({ name: u.name, email: u.email, websiteUrl: u.websiteUrl || '', socialMediaId: u.socialMediaId || '', role: u.role || 'user' });
  };

  const handleSave = async (id) => {
    try {
      await api.put(`/admin/users/${id}`, form, authHeaders);
      setEditingUser(null);
      onReload();
    } catch (e) { alert('Failed to update author details'); }
  };

  return (
    <div className="card border-dark rounded-2 bg-white">
      <div className="p-3 border-bottom border-dark">
        <h6 className="fw-bold text-dark mb-0">Platform Authors & Profiles (MongoDB Real-Time)</h6>
        <small className="text-muted">Administrator-only access. Update names, URLs, emails, and social handles in MongoDB.</small>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 small">
          <thead className="table-light"><tr><th className="ps-3 py-2">Name</th><th>Email</th><th>Website / Link</th><th>Social ID</th><th>Role</th><th className="text-end pe-3">Actions</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                {editingUser === u._id ? (
                  <>
                    <td className="ps-3 py-2"><input className="form-control form-control-sm border-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                    <td className="py-2"><input className="form-control form-control-sm border-dark" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
                    <td className="py-2"><input className="form-control form-control-sm border-dark" placeholder="https://..." value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} /></td>
                    <td className="py-2"><input className="form-control form-control-sm border-dark" placeholder="@handle" value={form.socialMediaId} onChange={(e) => setForm({ ...form, socialMediaId: e.target.value })} /></td>
                    <td className="py-2"><select className="form-select form-select-sm border-dark" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="user">User</option><option value="admin">Admin</option></select></td>
                    <td className="text-end pe-3 py-2"><div className="btn-group btn-group-sm"><button onClick={() => handleSave(u._id)} className="btn btn-dark">Save</button><button onClick={() => setEditingUser(null)} className="btn btn-outline-dark">Cancel</button></div></td>
                  </>
                ) : (
                  <>
                    <td className="ps-3 py-2 fw-bold text-dark">{u.name}</td>
                    <td className="text-muted">{u.email}</td>
                    <td>{u.websiteUrl ? <a href={u.websiteUrl} target="_blank" rel="noreferrer" className="text-dark text-truncate d-inline-block" style={{ maxWidth: '150px' }}>{u.websiteUrl}</a> : <span className="text-muted">&mdash;</span>}</td>
                    <td className="fw-semibold text-dark">{u.socialMediaId || <span className="text-muted">&mdash;</span>}</td>
                    <td><span className="badge bg-dark text-white text-uppercase" style={{ fontSize: '0.65rem' }}>{u.role}</span></td>
                    <td className="text-end pe-3 py-2"><button onClick={() => startEdit(u)} className="btn btn-outline-dark btn-sm">Edit</button></td>
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