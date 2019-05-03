import React from 'react';
import PropTypes from 'prop-types';

const AuthFormField = ({ field, handleInputChange }) => (
  <div className="form-field">
    <label htmlFor={field.name}>{field.label}</label>
    <input
      type={field.type}
      name={field.name}
      id={field.name}
      placeholder={field.placeholder}
      value={field.value}
      onChange={handleInputChange}
      required={field.required}
    />
  </div>
);

AuthFormField.propTypes = {
  field: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default AuthFormField;
