import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Topbar from '../components/Topbar';
import Banner from '../components/Landing/Banner';
import Footer from '../components/Footer';
import InfoBlockCard from '../components/Landing/InfoBlockCard';
import cardImageReliability from '../../public/images/reliability.svg';
import cardImageEyes from '../../public/images/eye-closed.svg';
import cardImageTarget from '../../public/images/bullseye.svg';

const LandingPage = ({ auth }) => {
  const buttons =
    auth.user && auth.loggedIn
      ? {
          navButton: {
            name: 'Dashboard',
            target: '/users',
            className: 'btn btn--nav',
          },
          ctoa: {
            text: 'Dashboard',
            link: '/users',
          },
          footerButton: {
            name: 'Dashboard',
            target: '/users',
          },
        }
      : {
          navButton: {
            name: 'Login',
            target: '/login',
            className: 'btn btn--nav',
          },
          ctoa: {
            text: 'Get started',
            link: '/signup',
          },
          footerButton: {
            name: 'Signup',
            target: '/signup',
          },
        };

  return (
    <Fragment>
      <Topbar
        links={[
          { name: 'Home', target: '/' },
          { name: 'About', target: '.' },
          buttons.navButton,
        ]}
      />
      <Banner authenticated={Boolean(auth.user && auth.loggedIn)} />
      <section className="join-us">
        <div className="join-us__text-wrapper">
          <h1 className="join-us__text-main">How you can Help ?</h1>
          <p className="join-us__text-sub">
            A platform to report corrupt acts and issues
            <br />
            affecting the community while also seeking
            <br />
            government&apros;s quick intervention.
          </p>
          <Link to={buttons.ctoa.link}>
            <button type="button" className="btn btn--alt access">
              {buttons.ctoa.text}
            </button>
          </Link>
        </div>
        <div className="info-block-wrapper">
          <div className="info-block__first">
            <InfoBlockCard
              iconAlt="truthful"
              iconSrc={cardImageReliability}
              CardTitle="Be Truthful"
              cardText={`A platform to report corrupt acts and issues affecting the
              community while also seeking government's quick
              intervention`}
            />
            <InfoBlockCard
              iconAlt="decency"
              iconSrc={cardImageEyes}
              CardTitle="No Illicit Content"
              cardText={`A platform to report corrupt acts and issues affecting the
              community while also seeking government's quick
              intervention`}
            />
          </div>
          <div className="info-block__second">
            <InfoBlockCard
              iconAlt="brief"
              iconSrc={cardImageTarget}
              CardTitle="Be Concise"
              cardText={`A platform to report corrupt acts and issues affecting the
                community while also seeking government's quick
                intervention`}
            />
            <InfoBlockCard
              iconAlt="truthful"
              iconSrc={cardImageReliability}
              CardTitle="Be Truthful"
              cardText={`A platform to report corrupt acts and issues affecting the
                community while also seeking government's quick
                intervention`}
            />
          </div>
        </div>
      </section>
      <section className="quotes">
        <blockquote className="quotes__block">
          <p className="quote__text">
            {`A platform to report corrupt acts and issues affecting the
                community while also seeking government's quick
                intervention`}
          </p>
        </blockquote>
      </section>
      <Footer
        links={[
          { name: 'Home', target: '/' },
          { name: 'About', target: '.' },
          buttons.footerButton,
        ]}
      />
    </Fragment>
  );
};

LandingPage.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      loggedIn: PropTypes.bool,
    }),
  }).isRequired,
};

export default connect(state => ({
  auth: state.auth,
}))(LandingPage);
