import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ button, statWidgets, alternate }) => {
  return (
    <aside
      className={`dashboard__sidebar${
        alternate ? ' hidden-wide sidebar-forced-height' : ''
      }`}
    >
      <p className="dashboard__sidebar-toggle">SIDEBAR</p>
      {button}
      {statWidgets.map(widget => widget)}
    </aside>
  );
};

Sidebar.defaultProps = {
  alternate: false,
  button: (
    <button type="button" className="dashboard__sidebar-btn new">
      New Record
    </button>
  ),
  statWidgets: [],
};

Sidebar.propTypes = {
  alternate: PropTypes.bool,
  button: PropTypes.element,
  statWidgets: PropTypes.arrayOf(PropTypes.element),
};

export default Sidebar;
