import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import bannerImage from '../../../public/images/selfie.svg';

const Banner = ({ authenticated }) => {
  const ctoa = authenticated
    ? { link: '/users', text: 'Dashboard' }
    : { link: '/signup', text: 'Get started' };

  return (
    <section className="banner">
      <div className="banner__image-holder">
        <img className="banner__image" src={bannerImage} alt="capture" />
      </div>
      <div className="banner__message">
        <h1 className="banner__message-main">
          Reporting Corruption &amp;
          <br />
          seeking intervention
        </h1>
        <p className="banner__message-sub">
          A platform to report corrupt acts and issues
          <br />
          affecting the community while also seeking
          <br />
          government&apos;s quick intervention
        </p>
        <Link to={ctoa.link}>
          <button className="btn btn--alt access" type="button">
            {ctoa.text}
          </button>
        </Link>
      </div>
    </section>
  );
};

Banner.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default Banner;
