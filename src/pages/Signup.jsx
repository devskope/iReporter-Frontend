import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { signUp, clearAuthErrors } from '../actions/auth';
import Topbar from '../components/Topbar';
import AuthForm from '../components/Auth/AuthForm';
import Footer from '../components/Footer';

const Signup = ({ signUpDispatch, clearErrors, auth }) => {
  if (auth.loggedIn || auth.created) {
    return auth.user.is_admin ? (
      <Redirect to="/admin" />
    ) : (
      <Redirect to="/users" />
    );
  }

  const [credentials, setCredentials] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    phone: '',
    username: '',
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    signUpDispatch(credentials);
  };

  const topBarLinks = [
    { name: 'Home', target: '/' },
    { name: 'About', target: '.' },
    { name: 'Login', target: '/login', className: 'btn btn--nav' },
  ];

  const footerLinks = [
    { name: 'Home', target: '/' },
    { name: 'About', target: '.' },
    { name: 'Login', target: '/login' },
  ];

  const fields = [
    {
      label: 'First Name',
      type: 'text',
      name: 'firstname',
      placeholder: 'Ahmed',
      value: credentials.firstname,
    },
    {
      label: 'Surname',
      type: 'text',
      name: 'lastname',
      placeholder: 'Obi',
      value: credentials.lastname,
    },
    {
      label: 'Username',
      type: 'text',
      name: 'username',
      placeholder: 'AhmedObi',
      required: true,
      value: credentials.username,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'email@example.com',
      required: true,
      value: credentials.email,
    },
    {
      label: 'Phone',
      type: 'tel',
      name: 'phone',
      placeholder: 'AhmedObi',
      value: credentials.phone,
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: '*******',
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
        authType="SIGNUP"
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

Signup.propTypes = {
  auth: PropTypes.shape({
    created: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
    loggedIn: PropTypes.bool,
    pending: PropTypes.bool,
  }).isRequired,
  clearErrors: PropTypes.func.isRequired,
  signUpDispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    auth: state.auth,
  }),
  { clearErrors: clearAuthErrors, signUpDispatch: signUp }
)(Signup);
