import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const generateLinks = links =>
  links.map(({ name, target }) => (
    <Link key={name} className="footer__link" to={target}>
      {name}
    </Link>
  ));

const Footer = ({ links }) => (
  <footer className="footer">
    {links.length ? (
      <div className="links-wrapper ">{generateLinks(links)}</div>
    ) : (
      ''
    )}
    <div>
      <p className="copyright">iReporter &copy;2018</p>
    </div>
  </footer>
);

Footer.defaultProps = {
  links: [],
};

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      target: PropTypes.string,
    })
  ),
};

export default Footer;
