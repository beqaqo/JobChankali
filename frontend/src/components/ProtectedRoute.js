import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Use it like: <ProtectedRoute roles={['employer', 'admin']}><PostJob /></ProtectedRoute>
export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <p>You do not have access to this page.</p>;
  }

  return children;
}
