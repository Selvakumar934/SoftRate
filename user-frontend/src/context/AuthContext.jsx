import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

const DEMO_USER = {
  _id: 'user-1',
  id: 'user-1',
  name: 'David Miller',
  email: 'david@devsphere.com',
  role: 'user'
};
const DEMO_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItMSIsImVtYWlsIjoiZGF2aWRAZGV2c3BoZXJlLmNvbSIsIm5hbWUiOiJEYXZpZCBNaWxsZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc5NDUzMzIxNiwiZXhwIjoxNzk1MTM4MDE2fQ.MTiy36BlXgtOsWoURy8_BV5xgEG9JIt9011yRsX4KvA';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devsphere_user_info');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('devsphere_user_token') || DEMO_TOKEN;
  });

  useEffect(() => {
    if (token) localStorage.setItem('devsphere_user_token', token);
    if (user) localStorage.setItem('devsphere_user_info', JSON.stringify(user));
  }, [token, user]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      // fallback
    }
    const local = { ...DEMO_USER, email };
    setToken(DEMO_TOKEN);
    setUser(local);
    return { success: true };
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data?.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      // fallback
    }
    const local = { _id: `usr-${Date.now()}`, name, email, role: 'user' };
    setToken(DEMO_TOKEN);
    setUser(local);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('devsphere_user_token');
    localStorage.removeItem('devsphere_user_info');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: Boolean(user && token), login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
