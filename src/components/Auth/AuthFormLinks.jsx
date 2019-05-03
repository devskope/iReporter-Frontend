import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthFormLinks = ({ authType }) => {
  const [altText, altLink] =
    authType === 'LOGIN'
      ? ['Need an account?', '/signup']
      : ['Have an account?', '/login'];

  return (
    <div className="auth__links">
      {authType === 'LOGIN' && (
        <p>
          {`Forgot Password? `}
          <a href=".">We can help</a>
        </p>
      )}
      <p>
        {altText}
        <Link to={altLink}> Log In</Link>
      </p>
    </div>
  );
};

AuthFormLinks.propTypes = {
  authType: PropTypes.oneOf(['LOGIN', 'SIGNUP']).isRequired,
};

export default AuthFormLinks;
