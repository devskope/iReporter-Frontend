import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

const LocationPicker = ({
  location,
  address,
  handleLocationChange,
  handleLocationSelect,
}) => (
  <Fragment>
    <PlacesAutocomplete
      value={address}
      onChange={handleLocationChange}
      onSelect={handleLocationSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="form-field form-field--location">
          <label htmlFor="edit-location">Location of Event</label>
          <input
            {...getInputProps({
              placeholder: 'Type an address',
              className: 'create-edit-form__location',
              type: 'text',
            })}
          />
          <button
            type="button"
            className="create-edit-form__location-reset btn"
          >
            Clear
          </button>
          {location && <p className="create-edit-form__geocodes">{location}</p>}
          <div className="create-edit-form__autocomplete-container">
            {suggestions.map(suggestion => (
              <div
                key={suggestion.id}
                {...getSuggestionItemProps(suggestion, {
                  className: suggestion.active
                    ? 'create-edit-form__autocomplete-item--active '
                    : 'create-edit-form__autocomplete-item',
                })}
              >
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  </Fragment>
);

LocationPicker.defaultProps = {
  location: '',
};

LocationPicker.propTypes = {
  location: PropTypes.string,
  address: PropTypes.string.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
  handleLocationSelect: PropTypes.func.isRequired,
};

export default LocationPicker;
