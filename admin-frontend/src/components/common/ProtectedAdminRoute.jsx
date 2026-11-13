import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin, isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAdmin && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
