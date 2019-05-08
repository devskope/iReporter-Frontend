import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { login, clearAuthErrors } from '../actions/auth';
import Topbar from '../components/Topbar';
import AuthForm from '../components/Auth/AuthForm';
import Footer from '../components/Footer';

const Login = ({ loginDispatch, clearErrors, auth }) => {
  if (auth.loggedIn || auth.created) {
    return auth.user.is_admin ? (
      <Redirect to="/admin" />
    ) : (
      <Redirect to="/users" />
    );
  }
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    loginDispatch(credentials);
  };

  const topBarLinks = [
    { name: 'Home', target: '/' },
    { name: 'About', target: '.' },
    { name: 'Signup', target: '/signup', className: 'btn btn--nav' },
  ];

  const footerLinks = [
    { name: 'Home', target: '/' },
    { name: 'About', target: '.' },
    { name: 'Signup', target: '/signup' },
  ];

  const fields = [
    {
      label: 'Username',
      type: 'text',
      name: 'username',
      placeholder: 'Ahmed',
      required: true,
      value: credentials.firstname,
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: ' *******',
      required: true,
      value: credentials.password,
    },
  ];

  const loaderClass = classNames({
    loader: true,
    active: auth.pending,
  });

  return (
    <div>
      <Topbar links={topBarLinks} />
      <div className={loaderClass} />
      <AuthForm
        authType="LOGIN"
        clearErrors={clearErrors}
        errors={auth.errors}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
      />
      <Footer links={footerLinks} />
    </div>
  );
};

Login.propTypes = {
  auth: PropTypes.shape({
    created: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
    loggedIn: PropTypes.bool,
    pending: PropTypes.bool,
  }).isRequired,
  clearErrors: PropTypes.func.isRequired,
  loginDispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    auth: state.auth,
  }),
  { clearErrors: clearAuthErrors, loginDispatch: login }
)(Login);
