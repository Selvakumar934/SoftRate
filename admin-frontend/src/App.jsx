import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import ProtectedAdminRoute from './components/common/ProtectedAdminRoute.jsx';
import AdminSidebar from './components/layout/AdminSidebar.jsx';
import AdminNavbar from './components/layout/AdminNavbar.jsx';

import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminApprovalPage from './pages/AdminApprovalPage.jsx';
import AdminArticlesPage from './pages/AdminArticlesPage.jsx';
import AdminArticleEditorPage from './pages/AdminArticleEditorPage.jsx';
import AdminReviewsPage from './pages/AdminReviewsPage.jsx';

const AdminLayout = ({ children }) => (
  <div className="admin-wrapper">
    <AdminSidebar />
    <div className="admin-main">
      <AdminNavbar />
      <main className="admin-content">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AdminLoginPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedAdminRoute><AdminLayout><AdminDashboardPage /></AdminLayout></ProtectedAdminRoute>}
          />
          <Route
            path="/articles/pending"
            element={<ProtectedAdminRoute><AdminLayout><AdminApprovalPage /></AdminLayout></ProtectedAdminRoute>}
          />
          <Route
            path="/articles"
            element={<ProtectedAdminRoute><AdminLayout><AdminArticlesPage /></AdminLayout></ProtectedAdminRoute>}
          />
          <Route
            path="/articles/create"
            element={<ProtectedAdminRoute><AdminLayout><AdminArticleEditorPage /></AdminLayout></ProtectedAdminRoute>}
          />
          <Route
            path="/articles/edit/:id"
            element={<ProtectedAdminRoute><AdminLayout><AdminArticleEditorPage /></AdminLayout></ProtectedAdminRoute>}
          />
          <Route
            path="/reviews"
            element={<ProtectedAdminRoute><AdminLayout><AdminReviewsPage /></AdminLayout></ProtectedAdminRoute>}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
