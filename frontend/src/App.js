// All page routes. To add a page: create it in pages/ and add a <Route> below.
import { Routes, Route, useLocation } from 'react-router-dom';
import './styles/index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobListing from './pages/JobListing';
import Register from './pages/Register';
import Login from './pages/Login';
import PostJob from './pages/PostJob';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();

const showNavbar = ['/', '/jobs', '/post-job'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={showNavbar ? 'main-content' : ''}>
        <Routes>
          <Route path="/" element={<JobListing />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute roles={['employer', 'admin']}>
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          {/* TODO (Member B + C): add pages for "my applications" (candidate) and "my jobs" (employer) */}
        </Routes>
      </main>
    </>
  );
}
