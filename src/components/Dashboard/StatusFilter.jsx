/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const StatusFilter = ({ active, value, setStatusFilter }) => {
  const filterClasses = classNames({
    'dashboard__filter-category': true,
    active,
  });

  const selectFilter = () => {
    setStatusFilter(value.toLowerCase() !== 'all' ? value.toLowerCase() : '');
  };

  return (
    <li className={filterClasses} onClick={selectFilter}>
      {value}
    </li>
  );
};

StatusFilter.defaultProps = {
  active: false,
};

StatusFilter.propTypes = {
  setStatusFilter: PropTypes.func.isRequired,
  active: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default StatusFilter;
