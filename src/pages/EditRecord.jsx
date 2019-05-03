import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  fetchSingleRecord,
  fetchDashboardStats,
} from '../actions/records/fetch';
import editRecord from '../actions/records/edit';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Dashboard/Sidebar';
import RecordStatWidget from '../components/Dashboard/RecordStatWidget';
import RecordForm from '../components/Dashboard/RecordForm';

const EditRecord = ({
  match,
  singleRecordFetchDispatch,
  fetchRecordStats,
  recordEditDispatch,
  records,
  auth,
}) => {
  const [retrievedFieldvalues, setRetrievedFieldvalues] = useState({
    comment: '',
    location: '',
    emailNotify: false,
  });

  const [editableFieldValues, setEditableFields] = useState({
    address: '',
    comment: '',
    location: '',
    emailNotify: false,
  });

  const [staticFields, setStaticFields] = useState({
    title: '',
    type: '',
    id: null,
  });

  const apiFetch = async ({ singleRecordPath }) =>
    singleRecordFetchDispatch({ singleRecordPath });

  useEffect(() => {
    const { params } = match;

    fetchRecordStats({ userScoped: true });
    apiFetch({ singleRecordPath: `${params.type}/${params.id}` });
  }, []);

  useEffect(() => {
    if (records.record.id) {
      const {
        record: {
          address,
          comment,
          email_notify: emailNotify,
          location,
          title,
          type,
          id,
        },
      } = records;

      setEditableFields({
        comment,
        location,
        emailNotify,
        address,
      });

      setRetrievedFieldvalues({ comment, location, emailNotify });
      setStaticFields({ title, type, id });
    }
  }, [records.record.id]);

  const toggleNotifications = ({ target: { checked } }) => {
    setEditableFields({ ...editableFieldValues, emailNotify: checked });
  };

  const handleCommentChange = ({ target: { value } }) => {
    setEditableFields({ ...editableFieldValues, comment: value });
  };

  const handleLocationChange = newAddress => {
    setEditableFields({ ...editableFieldValues, address: newAddress });
  };

  const handleLocationSelect = newAddress => {
    geocodeByAddress(newAddress)
      .then(([location]) => getLatLng(location))
      .then(({ lng, lat }) => {
        setEditableFields({
          ...editableFieldValues,
          location: `${lng},${lat}`,
          address: newAddress,
        });
      });
  };

  const handleFormSubmit = e => {
    const { type, id } = staticFields;
    e.preventDefault();

    recordEditDispatch({
      prevFieldValues: retrievedFieldvalues,
      editedValues: editableFieldValues,
      path: `${type}s/${id}`,
    });
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

  const fieldValues = { ...editableFieldValues, ...staticFields };

  if (records.edited) {
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
              editView
              handleFormSubmit={handleFormSubmit}
              fieldValues={fieldValues}
              handleCommentChange={handleCommentChange}
              toggleNotifications={toggleNotifications}
              handleLocationChange={handleLocationChange}
              handleLocationSelect={handleLocationSelect}
            />
          </section>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
};

EditRecord.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
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
  singleRecordFetchDispatch: PropTypes.func.isRequired,
  fetchRecordStats: PropTypes.func.isRequired,
  recordEditDispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    auth: state.auth,
    records: state.records,
  }),
  {
    singleRecordFetchDispatch: fetchSingleRecord,
    fetchRecordStats: fetchDashboardStats,
    recordEditDispatch: editRecord,
  }
)(EditRecord);
