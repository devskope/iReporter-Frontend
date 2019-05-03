import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { fetchRecords, fetchDashboardStats } from '../actions/records/fetch';
import deleteRecord from '../actions/records/delete';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Dashboard/Sidebar';
import RecordStatWidget from '../components/Dashboard/RecordStatWidget';
import RecordFilters from '../components/Dashboard/RecordFilters';
import Record from '../components/Dashboard/Record';
import RecordDetailModal from '../components/Dashboard/RecordDetailModal';

const Profile = ({
  fetchRecordStats,
  recordFetchDispatch,
  recordDeleteDispatch,
  records,
  auth,
}) => {
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [recordToView, setRecordToView] = useState(null);
  const [detailModalVisible, toggleModalVisibility] = useState(false);

  const apiFetch = async ({ type, status }) =>
    recordFetchDispatch({ type, status, userScoped: true });

  useEffect(() => {
    fetchRecordStats({ userScoped: true });
    apiFetch({ type: typeFilter, status: statusFilter });
  }, [typeFilter, statusFilter]);

  const typeFilterChange = e => {
    setTypeFilter(e.target.value);
  };

  const statusFilterChange = filterValue => {
    setStatusFilter(filterValue);
  };

  const viewModal = record => {
    setRecordToView(record);
    toggleModalVisibility(true);
  };

  const topBarLinks = [
    { name: 'Dashboard', target: '/users' },
    { name: 'Logout', target: '/', className: 'btn btn--nav' },
  ];

  const statWidgets = Object.entries(auth.stats).map(([stat, count]) => (
    <RecordStatWidget
      key={stat}
      title={stat !== 'Investigating' ? stat : 'Under Investigation'}
      count={count}
    />
  ));

  const recordList =
    records.pending || !records.recordList.length
      ? null
      : records.recordList.map(record => {
          return (
            <Record key={record.id} record={record} detailView={viewModal} />
          );
        });

  const classes = {
    loader: classNames({
      loader: true,
      active: records.pending,
    }),
  };

  return (
    <Fragment>
      <Topbar links={topBarLinks} userWidget />
      <div className="dashboard dashboard--profile">
        <Sidebar statWidgets={statWidgets} />
        <main className="dashboard__main">
          <div className={classes.loader} />
          <RecordFilters
            setTypeFilter={typeFilterChange}
            setStatusFilter={statusFilterChange}
            statusFilter={statusFilter}
          />
          <section className="dashboard__main-content">{recordList}</section>
        </main>
      </div>
      {detailModalVisible && (
        <RecordDetailModal
          record={recordToView}
          dismissSelf={() => toggleModalVisibility(false)}
          dispatchRecordDelete={recordDeleteDispatch}
          profileView
        />
      )}

      <Footer />
    </Fragment>
  );
};

Profile.propTypes = {
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
  recordFetchDispatch: PropTypes.func.isRequired,
  recordDeleteDispatch: PropTypes.func.isRequired,
  fetchRecordStats: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    records: state.records,
    auth: state.auth,
  }),
  {
    recordFetchDispatch: fetchRecords,
    recordDeleteDispatch: deleteRecord,
    fetchRecordStats: fetchDashboardStats,
  }
)(Profile);
