import React from 'react';
import bannerImage from '../../../public/images/selfie.svg';

const Banner = () => {
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
        <button className="btn btn--alt access" type="button">
          Start Reporting
        </button>
      </div>
    </section>
  );
};
export default Banner;
