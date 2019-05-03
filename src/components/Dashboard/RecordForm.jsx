import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LocationPicker from './LocationPicker';
import { exists } from '../../utils/helpers';

const RecordForm = ({
  handleFormSubmit,
  editView,
  fieldValues,
  handleCommentChange,
  handleTitleChange,
  handleLocationChange,
  handleLocationSelect,
  handleTypeChange,
  mediaAttachmentStateChanged,
  toggleNotifications,
}) => {
  const {
    type,
    title,
    comment,
    emailNotify,
    address = '',
    location,
  } = fieldValues;

  const { formTitle, buttonText } = editView
    ? { formTitle: 'Edit Record', buttonText: 'Update Record' }
    : { formTitle: 'Create Record', buttonText: 'Create Record' };

  const classes = {
    disabledOnEdit: classNames({
      'form-field': true,
      disabled: editView,
    }),
    mediaBlockStyles: classNames({
      'form-field form-field--media': true,
      pushdown: exists(location),
    }),
    notifyBlockStyles: classNames({
      'form-field form-field--notification': true,
      pushdown: exists(location),
    }),
    buttonStyles: classNames({
      'btn btn--submit': true,
      pushdown: exists(location),
    }),
  };

  const {
    disabledOnEdit,
    mediaBlockStyles,
    notifyBlockStyles,
    buttonStyles,
  } = classes;

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit} className="create-edit-form">
        <div className="create-edit-form__header">
          <h2 className="create-edit-form__title">{formTitle}</h2>
        </div>
        <div className="form-fields">
          <div className={disabledOnEdit}>
            <label htmlFor="type">Report Type</label>
            <select
              className="create-edit-form__type"
              id="type"
              value={type}
              onChange={handleTypeChange}
              disabled={editView}
            >
              <option value="" default>
                -----
              </option>
              <option value="red-flag">Red-Flag</option>
              <option value="intervention">Intervention</option>
            </select>
          </div>
          <div className={disabledOnEdit}>
            <label htmlFor="title">Report Title</label>
            <input
              className="create-edit-form__record-title"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              disabled={editView}
            />
          </div>
          <div className="form-field form-field--comment">
            <label htmlFor="edit-comment">Report Comment</label>
            <textarea
              className="create-edit-form__comment"
              rows="4"
              id="edit-comment"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>

          <LocationPicker
            handleLocationChange={handleLocationChange}
            handleLocationSelect={handleLocationSelect}
            address={address}
            location={location}
          />

          {!editView && (
            <div
              className={mediaBlockStyles}
              title="Attach one or more images/videos. 25mb limit per file"
            >
              <label htmlFor="media">
                Media:
                <br />
                <small className="create-edit-form__media-hint">
                  You can add multiple videos & images
                </small>
              </label>
              <input
                className="create-edit-form__media"
                onChange={mediaAttachmentStateChanged}
                type="file"
                id="media"
                multiple
                disabled={editView}
              />
            </div>
          )}
          <div
            className={notifyBlockStyles}
            title="Check to recieve notifications when an admin changes the status of this record"
          >
            <label htmlFor="edit-email-notification">
              {' Email notifications?'}
            </label>
            <input
              className="create-edit-form__email-notification"
              type="checkbox"
              id="create-email-notification"
              checked={emailNotify}
              onChange={toggleNotifications}
            />
          </div>
          <button className={buttonStyles} type="submit">
            {buttonText}
          </button>
        </div>
      </form>
    </Fragment>
  );
};

RecordForm.defaultProps = {
  handleTitleChange: x => x,
  handleTypeChange: x => x,
  mediaAttachmentStateChanged: x => x,
  editView: false,
};

RecordForm.propTypes = {
  fieldValues: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.object,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.string,
    ])
  ).isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
  handleLocationSelect: PropTypes.func.isRequired,
  toggleNotifications: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func,
  handleTypeChange: PropTypes.func,
  mediaAttachmentStateChanged: PropTypes.func,
  editView: PropTypes.bool,
};

export default RecordForm;
