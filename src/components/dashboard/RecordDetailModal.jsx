import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import trashIcon from '../../../public/images/rubbish-bin.svg';
import editIcon from '../../../public/images/note-interface-symbol.svg';

const RecordDetailModal = ({ record, dismissSelf, profileView, adminView }) => {
  const [ids, setIds] = useState('');
  const { title, comment, type, id } = record;

  useEffect(() => {
    setTimeout(() => {
      setIds(2);
    }, 4000);
  }, []);

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
          <div className="detail-modal__map" />
          <div className="detail-modal__title-block">
            <h3 className="detail-modal__title">{title}</h3>
            <span className="detail-modal__byline">
              by:
              <a href=".">{ids}</a>
            </span>
          </div>
          <p className="detail-modal__comment">{comment}</p>
          <div className="detail-modal__media-block">
            <h4 className="detail-modal__sub">Media</h4>
            <div className="detail-modal__media">
              <div className="detail-modal__media-images" />
              <div className="detail-modal__media-videos" />
            </div>
          </div>
          {adminView ? (
            <div className="detail-modal__toggle-block">
              <h4 className="detail-modal__sub">Status</h4>
              <select className="detail-modal__status-toggle">
                <option value="draft">Draft</option>
                <option value="under investigation">Under Investigation</option>
                <option value="rejected">Rejected</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="detail-modal__footer">
          <button
            type="button"
            className="btn detail-modal__close"
            onClick={dismissSelf}
          >
            Close
          </button>
          {profileView ? (
            <div>
              <img
                src={trashIcon}
                alt="Delete"
                className="detail-modal__delete"
              />
              <img src={editIcon} alt="Edit" className="detail-modal__edit" />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

RecordDetailModal.defaultProps = {
  record: {},
  adminView: false,
  profileView: false,
  dismissSelf: x => x,
};

RecordDetailModal.propTypes = {
  record: PropTypes.shape({}),
  adminView: PropTypes.bool,
  profileView: PropTypes.bool,
  dismissSelf: PropTypes.func,
};
export default RecordDetailModal;
