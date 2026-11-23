import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Register.css';

export default function Register() {
  const [role, setRole] = useState('candidate');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError('');
      await register({ name: fullName, email, password, role });
      navigate('/jobs');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="register-page">
      <Navbar />

      <div className="main-content main-content--no-topbar">
        <div className="page-center page-center--with-nav">
          <div className="auth-card auth-card--white">
            <img src="/icons/logo.svg" alt="JobChankali" className="register-logo" />

            <form onSubmit={handleSubmit}>
              <div className="role-buttons">
                <button
                  type="button"
                  className={role === 'candidate' ? 'role-button active' : 'role-button'}
                  onClick={() => setRole('candidate')}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  className={role === 'employer' ? 'role-button active' : 'role-button'}
                  onClick={() => setRole('employer')}
                >
                  Employer
                </button>
              </div>

              <input
                className="input"
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="btn btn--primary">
                Create account
              </button>
            </form>

            <p className="register-footer">
              Already have an account?{' '}
              <Link to="/login" className="link-orange">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}