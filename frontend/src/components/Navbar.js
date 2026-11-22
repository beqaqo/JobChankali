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
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <Link to="/jobs" className="logo">
          <img src="/icons/logo.svg" alt="JobChankali" className="logo-img" />
        </Link>

        <nav className="sidebar-nav">
          <NavLink to="/jobs" end className={linkClass}>
            <img src="/icons/home.svg" alt="" className="icon" /> Home
          </NavLink>
          {/*<NavLink to="/jobs" className={linkClass}>*/}
          {/*  <img src="/icons/my-jobs.svg" alt="" className="icon" /> My Jobs*/}
          {/*</NavLink>*/}
          {/*<NavLink to="/activity" className={linkClass}>*/}
          {/*  <img src="/icons/activity.svg" alt="" className="icon" /> My Activity*/}
          {/*</NavLink>*/}
        </nav>

        {/* Member A: replace this text with the logged-in user's name */}
        <div className="user-box">Beka Kopadze</div>
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

        {/* Member A: swap these for user name + Logout when logged in */}
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/register" className="signin-button">Sign in</Link>
      </header>
    </>
  );
}