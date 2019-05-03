/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const StatusFilter = ({ active, value, setStatusFilter }) => (
  <li
    className={`dashboard__filter-category ${active ? 'active' : ''}`}
    onClick={() =>
      setStatusFilter(value.toLowerCase() !== 'all' ? value.toLowerCase() : '')
    }
  >
    {value}
  </li>
);

StatusFilter.defaultProps = {
  setStatusFilter: x => x,
  active: false,
  value: '',
};

StatusFilter.propTypes = {
  setStatusFilter: PropTypes.func,
  active: PropTypes.bool,
  value: PropTypes.string,
};

export default StatusFilter;
