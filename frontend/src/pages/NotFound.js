import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-center">
      <div className="auth-card auth-card--white">
        <h1 style={{ fontSize: '72px', margin: '0', color: 'var(--orange)' }}>
          404
        </h1>
        <h2 style={{ color: 'var(--navy)', margin: '8px 0 12px' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '28px' }}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/jobs" className="btn btn--primary" style={{ textDecoration: 'none' }}>
          Back to Jobs
        </Link>
      </div>
    </div>
  );
}