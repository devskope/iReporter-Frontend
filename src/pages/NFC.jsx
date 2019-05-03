import React, { Fragment } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

const NFC = () => (
  <Fragment>
    <Topbar links={[{ name: 'Home', target: '/' }]} />
    <main style={{ height: 'calc(100vh - 12.3rem)' }}>
      <h1 style={{ textAlign: 'center', fontSize: '5rem' }}>
        The page you requested is not available
      </h1>
    </main>
    <Footer />
  </Fragment>
);

export default NFC;
