/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import trashIcon from '../../../public/images/rubbish-bin.svg';
import editIcon from '../../../public/images/note-interface-symbol.svg';

const ProfileModalControls = ({ triggerEdit, triggerDelete }) => (
  <div>
    <img
      onClick={triggerDelete}
      onKeyDown={e => (e.keycode === 13 ? triggerDelete : null)}
      src={trashIcon}
      alt="Delete"
      className="detail-modal__delete"
    />
    <img
      onClick={triggerEdit}
      onKeyDown={e => (e.keycode === 13 ? triggerEdit : null)}
      src={editIcon}
      alt="Edit"
      className="detail-modal__edit"
    />
  </div>
);

ProfileModalControls.propTypes = {
  triggerEdit: PropTypes.func.isRequired,
  triggerDelete: PropTypes.func.isRequired,
};

export default ProfileModalControls;
