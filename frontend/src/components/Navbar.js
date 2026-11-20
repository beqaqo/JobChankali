import { Link } from 'react-router-dom';

export default function Navbar() {
  // TODO (Member A): show Login/Register when logged out; user name + Logout when logged in;
  //   show "Post a job" only for employers/admins (use useAuth()).
  // TODO (Member C): design and style the navbar according to Figma.
  return (
    <nav>
      <Link to="/">Home</Link> <Link to="/jobs">Jobs</Link> <Link to="/login">Login</Link> <Link to="/register">Register</Link>
    </nav>
  );
}
