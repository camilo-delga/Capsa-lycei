'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    redirect('/login');
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'administrador') {
    redirect('/dashboard');
  }

  return children;
};

export default ProtectedRoute;
