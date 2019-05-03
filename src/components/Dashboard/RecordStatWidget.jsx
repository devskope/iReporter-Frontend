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

RecordStatWidget.defaultProps = {
  title: 'status',
  count: 0,
};

RecordStatWidget.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};

export default RecordStatWidget;
