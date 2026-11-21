import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

export default function Register() {
  // "candidate" or "employer" - whichever button is selected
  const [role, setRole] = useState('candidate');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // stops the page from reloading

    // TODO (Member A): send this data to the backend and log the user in
    console.log({ role, fullName, email, password });
  }

  return (
    <div className="register">
      <div className="register-card">
        {/* Put your logo image at public/logo.png */}
        <img src="./JobChankali.png" alt="JobChankali" className="register-logo" />

        <h1 className="register-title">Create an account</h1>

        <form onSubmit={handleSubmit}>
          {/* Candidate / Employer buttons */}
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
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="create-button">
            Create account
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}