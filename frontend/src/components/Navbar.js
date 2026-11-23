import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const canPostJobs = user && (user.role === 'employer' || user.role === 'admin');

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // When the user presses Enter or clicks the search button,
  // go to the jobs page and pass the search text in the URL.
  function handleSearch(event) {
    event.preventDefault(); // stops the page from reloading
    navigate(`/jobs?search=${encodeURIComponent(query)}`);
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  // NavLink gives us "isActive" so we can highlight the current page.
  function linkClass({ isActive }) {
    return isActive ? 'sidebar-link active' : 'sidebar-link';
  }

    return (
    <>
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <Link to="/jobs" className="logo">
          <img src="/icons/logo.svg" alt="JobChankali" className="logo-img" />
        </Link>

        <nav className="sidebar-nav">
          <NavLink to="/jobs" end className={linkClass}>
            <img src="/icons/home.svg" alt="" className="icon" /> Home
          </NavLink>
          {canPostJobs && (
            <NavLink to="/post-job" className={linkClass}>
              <img src="/icons/my-jobs.svg" alt="" className="icon" /> Post a job
            </NavLink>
          )}
          {/*<NavLink to="/jobs" className={linkClass}>*/}
          {/*  <img src="/icons/my-jobs.svg" alt="" className="icon" /> My Jobs*/}
          {/*</NavLink>*/}
          {/*<NavLink to="/activity" className={linkClass}>*/}
          {/*  <img src="/icons/activity.svg" alt="" className="icon" /> My Activity*/}
          {/*</NavLink>*/}
        </nav>

        {user && <div className="user-box">{user.name}</div>}
      </aside>

      {/* TOP BAR */}
      <header className="topbar">
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by Category, Company or ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button" aria-label="Search">
            <img src="/icons/search.svg" alt="" className="icon" />
          </button>
        </form>

        {user ? (
          <>
            <span className="login-link">{user.name}</span>
            <button type="button" className="signin-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="signin-button">Sign in</Link>
          </>
        )}
      </header>
    </>
  );
}