/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Sidebar = ({ button, statWidgets }) => {
  const [active, setActive] = useState(false);

  const sideBarClass = classNames({
    dashboard__sidebar: true,
    active,
  });

  return (
    <aside className={sideBarClass}>
      <p
        className="dashboard__sidebar-toggle"
        onClick={() => setActive(!active)}
      >
        SIDEBAR
      </p>
      {button}
      {statWidgets.map(widget => widget)}
    </aside>
  );
};

Sidebar.propTypes = {
  button: PropTypes.element.isRequired,
  statWidgets: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Sidebar;
