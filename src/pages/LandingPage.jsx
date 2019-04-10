import React, { Fragment } from 'react';
import Topbar from '../components/Topbar';
import Banner from '../components/landing/Banner';
import InfoBlockCard from '../components/landing/InfoBlockCard';
import cardImageReliability from '../../public/images/reliability.svg';
import cardImageEyes from '../../public/images/eye-closed.svg';
import cardImageTarget from '../../public/images/bullseye.svg';
import Footer from '../components/Footer';

const LandingPage = () => (
  <Fragment>
    <Topbar
      links={[
        { name: 'Home', target: '/' },
        { name: 'About', target: '.' },
        { name: 'Login', target: '/login', className: 'btn btn--nav' },
      ]}
    />
    <Banner />
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
        <button type="button" className="btn btn--alt access">
          Get started
        </button>
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
        { name: 'Signup', target: '/signup' },
      ]}
    />
  </Fragment>
);

export default LandingPage;
