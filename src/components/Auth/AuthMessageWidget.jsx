/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AuthMessageWidget = ({ errors, clearErrors }) => {
  const className = classNames({
    auth__messages: true,
    'auth__messages--error visible': errors.length > 0,
  });

  const messages = errors.map((message, i) => (
    <li className="auth__message" key={i}>
      {message}
    </li>
  ));

  return (
    <div className={className}>
      <button
        className="auth__messages-dismiss"
        onClick={clearErrors}
        type="button"
      >
        ⊝
      </button>
      <ul className="auth__message-list">{messages}</ul>
    </div>
  );
};

AuthMessageWidget.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AuthMessageWidget;
