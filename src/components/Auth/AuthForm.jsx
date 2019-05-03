/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthFormHeader from './AuthFormHeader';
import AuthFormLinks from './AuthFormLinks';
import AuthFormField from './AuthFormField';
import AuthMessageWidget from './AuthMessageWidget';

const AuthForm = ({
  authType,
  clearErrors,
  errors,
  fields,
  handleFormSubmit,
  handleInputChange,
}) => (
  <Fragment>
    <main className="auth">
      <form className="auth__form" onSubmit={handleFormSubmit}>
        <AuthFormHeader authType={authType} />
        <AuthMessageWidget errors={errors} clearErrors={clearErrors} />
        <div className="form-fields">
          {fields.map((field, i) => (
            <AuthFormField
              key={i}
              field={field}
              handleInputChange={handleInputChange}
            />
          ))}
          <button className="btn btn--submit" type="submit">
            {authType === 'LOGIN' ? 'Login' : 'Create account'}
          </button>
        </div>
        <AuthFormLinks authType={authType} />
      </form>
    </main>
  </Fragment>
);

AuthForm.propTypes = {
  authType: PropTypes.oneOf(['LOGIN', 'SIGNUP']).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))
  ).isRequired,
  clearErrors: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default AuthForm;
