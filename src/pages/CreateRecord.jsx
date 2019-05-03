import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { fetchDashboardStats } from '../actions/records/fetch';
import createRecord from '../actions/records/create';
import Footer from '../components/Footer';
import RecordStatWidget from '../components/Dashboard/RecordStatWidget';
import Sidebar from '../components/Dashboard/Sidebar';
import Topbar from '../components/Topbar';
import RecordForm from '../components/Dashboard/RecordForm';

const CreateRecord = ({
  auth,
  records,
  fetchRecordStats,
  recordCreationDispatch,
}) => {
  const [recordDetails, setRecordDetails] = useState({
    type: '',
    title: '',
    comment: '',
    location: '',
    emailNotify: false,
    mediaFiles: [],
  });

  useEffect(() => {
    fetchRecordStats({ userScoped: true });
  }, []);

  const toggleNotifications = ({ target: { checked } }) => {
    setRecordDetails({ ...recordDetails, emailNotify: checked });
  };

  const handleTypeChange = ({ target: { value } }) => {
    setRecordDetails({ ...recordDetails, type: value });
  };

  const handleTitleChange = ({ target: { value } }) => {
    setRecordDetails({ ...recordDetails, title: value });
  };

  const handleCommentChange = ({ target: { value } }) => {
    setRecordDetails({ ...recordDetails, comment: value });
  };

  const handleLocationChange = newAddress => {
    setRecordDetails({ ...recordDetails, address: newAddress });
  };

  const handleLocationSelect = newAddress => {
    geocodeByAddress(newAddress)
      .then(([location]) => getLatLng(location))
      .then(({ lng, lat }) => {
        setRecordDetails({
          ...recordDetails,
          location: `${lng},${lat}`,
          address: newAddress,
        });
      });
  };

  const mediaAttachmentStateChanged = ({ target: { files } }) => {
    setRecordDetails({ ...recordDetails, mediaFiles: files });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    recordCreationDispatch(recordDetails);
  };

  const topBarLinks = [
    { name: 'Profile', target: '/profile' },
    { name: 'Logout', target: '/', className: 'btn btn--nav' },
  ];

  const statWidgets = Object.entries(auth.stats).map(([stat, count]) => (
    <RecordStatWidget
      key={stat}
      title={stat !== 'Investigating' ? stat : 'Under Investigation'}
      count={count}
    />
  ));

  const classes = {
    loader: classNames({
      loader: true,
      active: records.pending,
    }),
  };

  if (records.created) {
    return <Redirect to="/profile" />;
  }

  return (
    <Fragment>
      <Topbar links={topBarLinks} />
      <div className="dashboard">
        <Sidebar statWidgets={statWidgets} />
        <main className="dashboard__main">
          <div className={classes.loader} />
          <section className="create-edit-form-wrapper">
            <RecordForm
              handleFormSubmit={handleFormSubmit}
              fieldValues={recordDetails}
              handleCommentChange={handleCommentChange}
              handleLocationChange={handleLocationChange}
              handleLocationSelect={handleLocationSelect}
              handleTitleChange={handleTitleChange}
              handleTypeChange={handleTypeChange}
              toggleNotifications={toggleNotifications}
              mediaAttachmentStateChanged={mediaAttachmentStateChanged}
            />
          </section>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
};

CreateRecord.propTypes = {
  auth: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.object, PropTypes.string])
      ),
      PropTypes.object,
      PropTypes.bool,
    ])
  ).isRequired,
  records: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.object, PropTypes.string])
      ),
      PropTypes.object,
      PropTypes.bool,
    ])
  ).isRequired,
  fetchRecordStats: PropTypes.func.isRequired,
  recordCreationDispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    auth: state.auth,
    records: state.records,
  }),
  {
    fetchRecordStats: fetchDashboardStats,
    recordCreationDispatch: createRecord,
  }
)(CreateRecord);
