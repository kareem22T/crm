import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Use Navigate for React Router v6
import useAuth from '../hooks/useAuth'; // Assuming useAuth returns an object with an isAuthentication property

interface ProtectedRouteProps {
  component: React.ComponentType<any>; // Type for the protected component
  path: string; // Optional path for the route (assuming it's used)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthentication } = useAuth();

  return (
    <Route {...rest} element={
      isAuthentication ? (
        <Component {...rest} /> // Pass remaining props to the protected component
      ) : (
        <Navigate to="/login" replace /> // Use Navigate with replace for better behavior
      )
    } />
  );
};

export default ProtectedRoute;
