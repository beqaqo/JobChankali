import { useState } from 'react';\
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

export default function Login() {
  // These two variables remember what the user types.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); // stops the page from reloading

    try {
      setError('');
      await login({ email, password });
      navigate('/jobs');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-center">
      <div className="auth-card">
        <img src="/icons/logo.svg" alt="JobChankali" className="login-logo" />

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn--primary">Log in</button>
        </form>

        {error && <p className="post-job-error">{error}</p>}

        <p className="login-footer">
          Don’t have an account? <Link to="/register" className="link-orange">Create an Account</Link>
        </p>
      </div>
    </div>
  );
}