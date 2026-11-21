import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  // TODO (Member A): show Login/Register when logged out; user name + Logout when logged in;
  //   show "Post a job" only for employers/admins (use useAuth()).

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // When the user presses Enter or clicks the search button,
  // go to the jobs page and pass the search text in the URL.
  function handleSearch(event) {
    event.preventDefault(); // stops the page from reloading
    navigate(`/jobs?search=${encodeURIComponent(query)}`);
  }

  // NavLink gives us "isActive" so we can highlight the current page.
  function linkClass({ isActive }) {
    return isActive ? 'sidebar-link active' : 'sidebar-link';
  }

  return (
    <>
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="sidebar">
        <Link to="/" className="logo">
          Job<span>Chankali</span>
        </Link>

        <nav className="sidebar-nav">
          <NavLink to="/" end className={linkClass}>
            <span className="icon">🏠</span> Home
          </NavLink>
          <NavLink to="/jobs" className={linkClass}>
            <span className="icon">💼</span> My Jobs
          </NavLink>
          <NavLink to="/activity" className={linkClass}>
            <span className="icon">📈</span> My Activity
          </NavLink>
        </nav>

        {/* Member A: replace this text with the logged-in user's name */}
        <div className="user-box">Beka Kopadze</div>
      </aside>

      {/* ===== TOP BAR ===== */}
      <header className="topbar">
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by Category, Company or ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button" aria-label="Search">
            🔍
          </button>
        </form>

        {/* Member A: swap these for user name + Logout when logged in */}
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/register" className="signin-button">Sign in</Link>
      </header>
    </>
  );
}