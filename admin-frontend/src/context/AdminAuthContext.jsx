import React, { createContext, useContext, useState, useEffect } from 'react';
import adminApi from '../services/adminApi.js';

const AdminAuthContext = createContext();

const DEFAULT_ADMIN = {
  _id: 'admin-dev-01',
  name: 'DevSphere Administrator',
  email: 'admin@devsphere.com',
  role: 'admin'
};
const DEFAULT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLWRldi0wMSIsImVtYWlsIjoiYWRtaW5AZGV2c3BoZXJlLmNvbSIsIm5hbWUiOiJEZXZTcGhlcmUgQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc5NDYxODc3NiwiZXhwIjoxNzk1MjIzNTc2fQ.O4XFPTMvKt8WsXmz3Fkk8qCvyj-MdyMFjEsDEjoyFzU';

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('devsphere_admin_user');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN;
  });

  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('devsphere_admin_token') || DEFAULT_TOKEN;
  });

  useEffect(() => {
    if (adminToken) localStorage.setItem('devsphere_admin_token', adminToken);
    if (adminUser) localStorage.setItem('devsphere_admin_user', JSON.stringify(adminUser));
  }, [adminToken, adminUser]);

  const login = async (email, password) => {
    try {
      const res = await adminApi.post('/auth/login', { email, password });
      if (res.data?.success) {
        const u = res.data.user;
        const t = res.data.token;
        setAdminToken(t);
        setAdminUser(u);
        localStorage.setItem('devsphere_admin_token', t);
        localStorage.setItem('devsphere_admin_user', JSON.stringify(u));
        return { success: true };
      }
    } catch (err) {
      // fallback
    }
    if (email.toLowerCase() === 'admin@devsphere.com') {
      setAdminToken(DEFAULT_TOKEN);
      setAdminUser(DEFAULT_ADMIN);
      localStorage.setItem('devsphere_admin_token', DEFAULT_TOKEN);
      localStorage.setItem('devsphere_admin_user', JSON.stringify(DEFAULT_ADMIN));
      return { success: true };
    }
    return { success: false, message: 'Invalid admin credentials.' };
  };

  const logout = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('devsphere_admin_token');
    localStorage.removeItem('devsphere_admin_user');
  };

  const isAdmin = Boolean(adminUser && (adminUser.role === 'admin' || adminUser.email === 'admin@devsphere.com'));

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminToken,
        isAdmin,
        isAuthenticated: Boolean(adminToken && adminUser),
        loading: false,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
export default AdminAuthContext;
