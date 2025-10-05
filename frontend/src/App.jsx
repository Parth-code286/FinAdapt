import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { Expense } from './pages/Dashboard/Expense';
import Home from './pages/Dashboard/Home';
import { Income } from './pages/Dashboard/Income'; 
import UserProvider from './context/userContext';

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/expense',
      element: <Expense />,
    },
    {
      path: '/dashboard',
      element: <Home />,
    },
    {
      path: '/income',
      element: <Income />,
    },
  ]);

  return (
    <UserProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: '13px',
            },
          }}
        />
      </Suspense>
    </UserProvider>
  );
};