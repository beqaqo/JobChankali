import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

export default function Register() {
  const [role, setRole] = useState('candidate');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // TODO (Member A): send this data to the backend and log the user in
    console.log({ role, fullName, email, password });
  }

  return (
    <div className="page-center">
      <div className="auth-card">
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
  );
}