/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Topbar = ({ links, userWidget, username }) => {
  const [mobileNavToggled, setMobileNavToggled] = useState(false);
  const [userWidgetToggled, setUserWidgetToggled] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavToggled(!mobileNavToggled);
  };

  const generateLinks = () =>
    links.map(({ name, target, className }) => (
      <li key={name} className="topbar__list-item">
        <Link to={target} className={className || 'topbar__link'}>
          {name}
        </Link>
      </li>
    ));

  return (
    <nav className="topbar">
      <div className="topbar__wrapper">
        <Link to="/" href="." className="topbar__brand">
          iReporter
        </Link>

        {userWidget && (
          <div
            className={`topbar__profile-widget ${
              userWidgetToggled ? 'active' : ''
            }`}
          >
            <div
              className="topbar__profile-widget-text"
              onClick={() => setUserWidgetToggled(!userWidgetToggled)}
            >
              {username}
            </div>
            <div
              className={`topbar__profile-dropdown hidden ${
                userWidgetToggled ? 'visible' : 'hidden'
              }`}
            />
          </div>
        )}

        <ul className={`topbar__links ${mobileNavToggled ? `active` : ''}`}>
          <button
            className={`topbar__toggle ${mobileNavToggled ? `active` : ''}`}
            onClick={toggleMobileNav}
            type="button"
          >
            Menu
          </button>
          {generateLinks(links)}
        </ul>
      </div>
    </nav>
  );
};

Topbar.defaultProps = {
  links: [],
  userWidget: false,
  username: '',
};

Topbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      target: PropTypes.string,
      className: PropTypes.string,
    })
  ),
  username: PropTypes.string,
  userWidget: PropTypes.bool,
};

export default Topbar;
