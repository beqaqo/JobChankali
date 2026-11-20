// All page routes. To add a page: create it in pages/ and add a <Route> below.
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobListing from './pages/JobListing';
import JobDetail from './pages/JobDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import PostJob from './pages/PostJob';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* TODO (Member A): wrap this route in <ProtectedRoute roles={['employer', 'admin']}> */}
          <Route path="/post-job" element={<PostJob />} />
          {/* TODO (Member C): add a 404 "page not found" route (path="*") */}
          {/* TODO (Member B + C): add pages for "my applications" (candidate) and "my jobs" (employer) */}
        </Routes>
      </main>
    </>
  );
}
