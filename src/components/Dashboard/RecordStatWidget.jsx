import React from 'react';
import PropTypes from 'prop-types';

const RecordStatWidget = ({ title, count }) => {
  return (
    <div className="dashboard__stat">
      <p className="dashboard__stat-title">{title}</p>
      <p className="dashboard__stat-count">{count}</p>
    </div>
  );
};

RecordStatWidget.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default RecordStatWidget;
