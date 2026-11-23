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

export default function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? '' : 'main-content'}>
        <Routes>
          <Route path="/" element={<Home />} />
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
          {/* TODO (Member C): add a 404 "page not found" route (path="*") */}
          {/* TODO (Member B + C): add pages for "my applications" (candidate) and "my jobs" (employer) */}
        </Routes>
      </main>
    </>
  );
}
