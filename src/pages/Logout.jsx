import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../actions/auth';

const Logout = ({ dispatchLogout }) => {
  useEffect(() => {
    dispatchLogout();
  }, []);

  return <Redirect to="/" />;
};

Logout.propTypes = {
  dispatchLogout: PropTypes.func.isRequired,
};

export default connect(
  null,
  { dispatchLogout: logout }
)(Logout);
