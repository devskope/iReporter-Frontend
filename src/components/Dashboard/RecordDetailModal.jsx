import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Map from 'google-map-react';
import {
  getUsernameByID,
  generateKey,
  CenterLocation,
} from '../../utils/helpers';
import ModalStatusToggles from './ModalStatusToggle';
import ProfileModalControls from './ProfileModalControls';

const RecordDetailModal = ({
  record,
  dismissSelf,
  profileView,
  adminView,
  dispatchRecordDelete,
}) => {
  const [creator, setCreatorName] = useState('');
  const [deletePromptVisible, setDeletePromptVisible] = useState(false);
  const [editTriggered, setEditTriggered] = useState(false);

  const {
    comment,
    created_by: creatorId,
    id,
    images,
    location,
    title,
    type,
    videos,
  } = record;

  useEffect(() => {
    getUsernameByID(creatorId).then(username => {
      setCreatorName(username);
    });
  }, []);

  const confirmDelete = () => {
    setDeletePromptVisible(true);
  };

  const deleteRecord = () => {
    setDeletePromptVisible(true);
    dispatchRecordDelete(`${type}s/${id}`);
    dismissSelf();
  };

  const mapCenter = location ? CenterLocation(location) : null;
  const mapWidget = location ? (
    <div className="detail-modal__map">
      <Map
        bootstrapURLKeys={{
          key: process.env.MAPS_API_KEY,
        }}
        center={mapCenter}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          new maps.Marker({
            position: mapCenter,
            map,
            title: 'Incident Location',
          })
        }
      />
    </div>
  ) : null;

  const imageList = JSON.parse(images).map(url => (
    <img
      className="detail-modal__media-item"
      key={generateKey()}
      alt="record-media"
      src={url}
    />
  ));

  const videoList = JSON.parse(videos).map(url => (
    <video
      className="detail-modal__media-item"
      key={generateKey()}
      alt="record-media"
      src={url}
      controls
    >
      <track kind="captions" />
    </video>
  ));

  const deletePrompt = (
    <div className="detail-modal__delete-prompt-wrapper">
      <div className="detail-modal__delete-prompt">
        <div className="prompt-text">
          {'Really '}
          <b>Delete</b>
          {' this record?'}
        </div>
        <div className="option-group">
          <button
            onClick={deleteRecord}
            type="button"
            className="prompt-option confirm"
          >
            YES
          </button>
          <button
            onClick={() => setDeletePromptVisible(false)}
            type="button"
            className="prompt-option cancel"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );

  if (editTriggered) {
    return <Redirect to={`/records/${type}s/${id}/edit`} />;
  }

  return (
    <div className="modal-wrapper modal-wrapper--users visible">
      <div className="detail-modal">
        <div className="detail-modal__header">
          <h2 className="detail-modal__type-id">{`${type}  #${id}`}</h2>
          <button
            type="button"
            className="detail-modal__close"
            onClick={dismissSelf}
          >
            &times;
          </button>
        </div>
        <div className="detail-modal__content">
          {mapWidget}
          <div className="detail-modal__title-block">
            <h3 className="detail-modal__title">{title}</h3>
            <span className="detail-modal__byline">
              {'by: '}
              <a href=".">{creator}</a>
            </span>
          </div>
          <p className="detail-modal__comment">{comment}</p>
          <div className="detail-modal__media-block">
            <h4 className="detail-modal__sub">Media</h4>
            <div className="detail-modal__media">
              <div className="detail-modal__media-images">{imageList}</div>
              <div className="detail-modal__media-videos">{videoList}</div>
            </div>
          </div>
          {adminView && <ModalStatusToggles />}
        </div>
        <div className="detail-modal__footer">
          <button
            type="button"
            className="btn detail-modal__close"
            onClick={dismissSelf}
          >
            Close
          </button>
          {profileView && (
            <ProfileModalControls
              triggerEdit={() => setEditTriggered(true)}
              triggerDelete={confirmDelete}
            />
          )}
        </div>
        {deletePromptVisible && deletePrompt}
      </div>
    </div>
  );
};

RecordDetailModal.defaultProps = {
  adminView: false,
  profileView: false,
  dispatchRecordDelete: x => x,
};

RecordDetailModal.propTypes = {
  record: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ).isRequired,
  adminView: PropTypes.bool,
  profileView: PropTypes.bool,
  dismissSelf: PropTypes.func.isRequired,
  dispatchRecordDelete: PropTypes.func,
};
export default RecordDetailModal;
