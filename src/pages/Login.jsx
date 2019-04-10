import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [dummyUserLoggedIn, setdummyUserLoggedIn] = useState(false);
  const [dummyAdminLoggedIn, setdummyAdminLoggedIn] = useState(false);

  const handleUsernameChange = ({ target: { value } }) =>
    setCredentials({ username: value, password: credentials.password });

  const handlePasswordChange = ({ target: { value } }) =>
    setCredentials({ password: value, username: credentials.username });

  const handleFormSubmit = e => {
    const { username, password } = credentials;
    e.preventDefault();
    if (username === 'user' && password === 'user') {
      setdummyUserLoggedIn(true);
    } else if (username === 'admin' && password === 'admin') {
      setdummyAdminLoggedIn(true);
    }
  };

  // eslint-disable-next-line no-nested-ternary
  return dummyUserLoggedIn ? (
    <Redirect to="/users" />
  ) : dummyAdminLoggedIn ? (
    <Redirect to="/admin" />
  ) : (
    <div>
      <Topbar
        links={[
          { name: 'Home', target: '/' },
          { name: 'About', target: '.' },
          { name: 'Signup', target: '/signup', className: 'btn btn--nav' },
        ]}
      />
      <main className="auth">
        <form
          className="auth__form auth__form--login"
          onSubmit={handleFormSubmit}
        >
          <div className="auth__title">
            <h2 className="main-text">Login</h2>
            <p className="sub-text">Start reporting</p>
          </div>
          <div className="auth__messages">
            <span className="auth__messages-dismiss">&rotimes;</span>
            <ul className="auth__message-list" />
          </div>
          <div className="form-fields">
            <div className="form-field">
              <label htmlFor="login-username">Username</label>
              <input
                className="form-field__username"
                type="text"
                id="login-username"
                onChange={handleUsernameChange}
                value={credentials.username}
                placeholder="Ahmed Obi"
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                className="form-field__password"
                type="password"
                id="login-password"
                onChange={handlePasswordChange}
                value={credentials.password}
                placeholder="*******"
              />
            </div>
            <button className="btn btn--submit" type="submit">
              Login
            </button>
          </div>
          <div className="auth__links">
            <p>
              {`Forgot Password? `}
              <a href=".">We can help</a>
            </p>
            <p>
              {`Need an account? `}
              <Link to="/signup">Create one for free</Link>
            </p>
          </div>
        </form>
      </main>
      <Footer
        links={[
          { name: 'Home', target: '/' },
          { name: 'About', target: '.' },
          { name: 'Signup', target: '/signup' },
        ]}
      />
    </div>
  );
};

export default Login;
