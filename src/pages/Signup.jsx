import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

const Signup = () => {
  return (
    <Fragment>
      <Topbar
        links={[
          { name: 'Home', target: '/' },
          { name: 'About', target: '.' },
          { name: 'Login', target: '/login', className: 'btn btn--nav' },
        ]}
      />

      <main className="auth">
        <form className="auth__form auth__form--signup">
          <div className="auth__title">
            <h2 className="main-text">Signup</h2>
            <p className="sub-text">Start reporting</p>
          </div>
          <div className="auth__messages">
            <span className="auth__messages-dismiss">&rotimes;</span>
            <ul className="auth__message-list" />
          </div>
          <div className="form-fields">
            <div className="form-field">
              <label htmlFor="reg-first-name">First Name</label>
              <input
                className="form-field__firstname"
                type="text"
                id="reg-first-name"
                placeholder="Ahmed"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="reg-last-name">Surname</label>
              <input
                className="form-field__lastname"
                type="text"
                id="reg-last-name"
                placeholder="Obi"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="reg-username">Username</label>
              <input
                className="form-field__username"
                type="text"
                id="reg-username"
                placeholder="Ahmed Obi"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="reg-email">Email</label>
              <input
                className="form-field__email"
                type="email"
                id="reg-email"
                placeholder="email@example.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="reg-phone">Phone</label>
              <input
                className="form-field__phone"
                type="tel"
                id="reg-phone"
                placeholder="0812 345 6789"
              />
            </div>
            <div className="form-field">
              <label htmlFor="reg-password">Password</label>
              <input
                className="form-field__password"
                type="password"
                id="reg-password"
                placeholder="******"
                required
              />
            </div>
            <button className="btn btn--submit" type="submit">
              Create account
            </button>
          </div>
          <div className="auth__links">
            <p>
              {`Forgot Password? `}
              <a href=".">We can help</a>
            </p>
            <p>
              {`Have an account? `}
              <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </main>

      <Footer
        links={[
          { name: 'Home', target: '/' },
          { name: 'About', target: '.' },
          { name: 'Login', target: '/login' },
        ]}
      />
    </Fragment>
  );
};

export default Signup;
