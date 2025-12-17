import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
