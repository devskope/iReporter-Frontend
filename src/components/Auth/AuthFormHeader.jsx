import React from 'react';
import PropTypes from 'prop-types';

const AuthFormHeader = ({ authType }) => (
  <div className="auth__title">
    <h2 className="main-text">{authType === 'LOGIN' ? 'Login' : 'Signup'}</h2>
    <p className="sub-text">Start reporting</p>
  </div>
);

AuthFormHeader.propTypes = {
  authType: PropTypes.oneOf(['LOGIN', 'SIGNUP']).isRequired,
};

export default AuthFormHeader;
