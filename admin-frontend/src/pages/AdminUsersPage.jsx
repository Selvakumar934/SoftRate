import React, { useState, useEffect } from 'react';
import adminApi from '../services/adminApi.js';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', websiteUrl: '', socialMediaId: '', role: 'user' });

  const loadUsers = async () => {
    try {
      const res = await adminApi.get('/admin/users');
      if (res.data?.data) setUsers(res.data.data);
    } catch (e) {}
  };
  useEffect(() => { loadUsers(); }, []);

  const startEdit = (u) => {
    setEditing(u._id);
    setForm({ name: u.name, email: u.email, websiteUrl: u.websiteUrl || '', socialMediaId: u.socialMediaId || '', role: u.role || 'user' });
  };

  const handleSave = async (id) => {
    try {
      await adminApi.put(`/admin/users/${id}`, form);
      setEditing(null);
      loadUsers();
    } catch (err) { alert('Failed to update author details'); }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-dark">
        <div>
          <h2 className="fw-bold text-dark mb-0">Platform Authors & Users</h2>
          <small className="text-muted">Administrator-only management of author credentials, social IDs, and profile links in MongoDB.</small>
        </div>
      </div>

      <div className="card border-dark rounded-2 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small text-uppercase text-dark border-bottom border-dark">
              <tr><th className="ps-3 py-3">Author Name</th><th className="py-3">Email Address</th><th className="py-3">Website / Profile URL</th><th className="py-3">Social Media ID</th><th className="py-3">Role</th><th className="text-end pe-3 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  {editing === u._id ? (
                    <>
                      <td className="ps-3 py-2"><input className="form-control form-control-sm border-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" placeholder="https://..." value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} /></td>
                      <td className="py-2"><input className="form-control form-control-sm border-dark" placeholder="@handle" value={form.socialMediaId} onChange={(e) => setForm({ ...form, socialMediaId: e.target.value })} /></td>
                      <td className="py-2">
                        <select className="form-select form-select-sm border-dark" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                          <option value="user">User / Author</option><option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="text-end pe-3 py-2">
                        <div className="btn-group btn-group-sm">
                          <button onClick={() => handleSave(u._id)} className="btn btn-dark">Save</button>
                          <button onClick={() => setEditing(null)} className="btn btn-outline-dark">Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="ps-3 py-3 fw-bold text-dark">{u.name}</td>
                      <td className="small text-muted">{u.email}</td>
                      <td className="small">{u.websiteUrl ? <a href={u.websiteUrl} target="_blank" rel="noreferrer" className="text-dark text-truncate d-inline-block" style={{ maxWidth: '180px' }}>{u.websiteUrl}</a> : <span className="text-muted">&mdash;</span>}</td>
                      <td className="small text-dark fw-semibold">{u.socialMediaId || <span className="text-muted">&mdash;</span>}</td>
                      <td><span className={`badge ${u.role === 'admin' ? 'bg-dark text-white' : 'bg-light text-dark border border-dark'} text-uppercase`} style={{ fontSize: '0.68rem' }}>{u.role}</span></td>
                      <td className="text-end pe-3 py-3">
                        <button onClick={() => startEdit(u)} className="btn btn-outline-dark btn-sm">Edit Author</button>
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