import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.jsx';

import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

import HomePage from './pages/HomePage.jsx';
import BlogListingPage from './pages/BlogListingPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UserDashboardPage from './pages/UserDashboardPage.jsx';
import ArticleEditorPage from './pages/ArticleEditorPage.jsx';
import AdminPortalPage from './pages/AdminPortalPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';

const NotFoundPage = () => (
  <div className="container py-5 my-auto text-center">
    <div className="display-4 text-dark fw-bold mb-2">404</div>
    <h3 className="fw-bold mb-3">Page Not Found</h3>
    <p className="text-muted mb-4">The software development article you requested does not exist or has moved.</p>
    <Link to="/" className="btn btn-dark px-4">Return Home</Link>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs" element={<BlogListingPage />} />
                <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                <Route path="/categories" element={<Navigate to="/blogs" replace />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected User Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/create"
                  element={
                    <ProtectedRoute>
                      <ArticleEditorPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/edit/:id"
                  element={
                    <ProtectedRoute>
                      <ArticleEditorPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="/admin" element={<AdminPortalPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
