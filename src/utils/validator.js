import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { nonExistent, isEmpty, missingFieldsMessage } from './helpers';

export const requireValidateFields = requiredFieldKeys => fields => {
  const response = Object.keys(fields).reduce(
    (validationResponse, fieldName) => {
      const {
        validationErrors,
        missingRequired,
        validFields,
      } = validationResponse;
      if (typeof fields[fieldName] === 'string')
        fields[fieldName] = fields[fieldName].trim();

      if (
        !requiredFieldKeys.includes(fieldName) &&
        (nonExistent(fields[fieldName]) || isEmpty(fields[fieldName]))
      )
        return validationResponse;

      if (
        requiredFieldKeys.includes(fieldName) &&
        (nonExistent(fields[fieldName]) || isEmpty(fields[fieldName]))
      ) {
        missingRequired.push(fieldName);
        return { ...validationResponse, missingRequired };
      }

      if (
        typeof fields[fieldName] === 'string' &&
        !isEmpty(fields[fieldName])
      ) {
        switch (fieldName) {
          case 'email':
            if (isEmail(fields.email)) validFields.email = fields.email;
            else validationErrors.push('Email must be a valid email address');
            break;

          case 'username':
            if (isLength(fields.username, { min: 3, max: 20 }))
              validFields.username = fields.username;
            else
              validationErrors.push(
                'username must be between 3 and 20 characters'
              );
            break;

          case 'password':
            if (isLength(fields.password, { min: 8, max: 20 }))
              validFields.password = fields.password;
            else
              validationErrors.push(
                'Password must be between 8 and 20 characters long'
              );
            break;

          case 'firstname':
          case 'lastname':
            if (isLength(fields[fieldName], { min: 3 }))
              validFields[fieldName] = fields[fieldName];
            else
              validationErrors.push(
                `${fieldName} must be at least 3 characters`
              );
            break;

          default:
            validFields[fieldName] = fields[fieldName];
        }
      } else if (typeof fields[fieldName] === 'boolean')
        validFields[fieldName] = fields[fieldName];

      return { ...validationResponse, validationErrors, validFields };
    },
    {
      validationErrors: [],
      missingRequired: [],
      validFields: {},
    }
  );

  if (response.missingRequired.length) {
    response.validationErrors.unshift(
      missingFieldsMessage(response.missingRequired)
    );
  }

  return response;
};
