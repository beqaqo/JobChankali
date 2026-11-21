import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  // These two variables remember what the user types.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // stops the page from reloading

    // TODO (Member A): call the login function from useAuth() here
    //   with email and password, then redirect the user (for example to "/").
    console.log('Login clicked', email, password);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo: swap for <img src="/logo.png" alt="JobChankali" /> if you have the image */}
        <div className="login-logo">
          Job<span>Chankali</span>
        </div>

        <h1 className="login-title">Welcome</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">Sign in</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/register">Create an Account</Link>
        </p>
      </div>
    </div>
  );
}