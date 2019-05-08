import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component, auth, ...rest }) =>
  auth.user ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to="/login" />
  );

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.object, PropTypes.string])
      ),
      PropTypes.object,
      PropTypes.bool,
    ])
  ).isRequired,
};

export default connect(state => ({ auth: state.auth }))(ProtectedRoute);
