import React from 'react';
import PropTypes from 'prop-types';

const ModalStatusToggles = ({ statusChangeHandler }) => (
  <div className="detail-modal__toggle-block">
    <h4 className="detail-modal__sub">Status</h4>
    <select
      className="detail-modal__status-toggle"
      onChange={statusChangeHandler}
    >
      <option value="draft">Draft</option>
      <option value="under investigation">Under Investigation</option>
      <option value="rejected">Rejected</option>
      <option value="resolved">Resolved</option>
    </select>
  </div>
);

ModalStatusToggles.propTypes = {
  statusChangeHandler: PropTypes.func.isRequired,
};

export default ModalStatusToggles;
