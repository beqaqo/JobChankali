import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
      <Navbar />

      <div className="main-content main-content--no-topbar">
        <div className="page-center page-center--with-nav">
          <div className="auth-card auth-card--white">
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

            <p className="login-footer">
              Don’t have an account? <Link to="/register" className="link-orange">Create an Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}