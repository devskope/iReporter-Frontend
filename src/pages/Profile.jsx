import React, { Fragment, useState } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Sidebar from '../components/dashboard/Sidebar';
import RecordStatWidget from '../components/dashboard/RecordStatWidget';
import RecordFilters from '../components/dashboard/RecordFilters';
import Record from '../components/dashboard/Record';
import RecordDetailModal from '../components/dashboard/RecordDetailModal';

const Profile = () => {
  const [/*  typeFilter, */ setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [recordToView, setRecordToView] = useState(null);
  const [detailModalVisible, toggleModalVisibility] = useState(false);

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

  return (
    <Fragment>
      <Topbar
        links={[
          { name: 'Dashboard', target: '/users' },
          { name: 'Logout', target: '/', className: 'btn btn--nav' },
        ]}
        userWidget
      />
      <div className="dashboard dashboard--profile">
        <Sidebar
          statWidgets={[
            ['draft', 10],
            ['Resolved'],
            ['Under Investigation'],
            ['Rejected'],
          ].map(([title, count]) => {
            return (
              <RecordStatWidget
                title={title}
                count={count}
                key={Math.random()}
              />
            );
          })}
        />
        <main className="dashboard__main">
          <div className="loader" />
          <RecordFilters
            setTypeFilter={typeFilterChange}
            setStatusFilter={statusFilterChange}
            statusFilter={statusFilter}
          />
          <section className="dashboard__main-content">
            <Record
              record={{
                title: 'title',
                comment: 'this should suffice as a comment',
                type: 'red-flag',
                id: 3,
              }}
              detailView={viewModal}
            />
            <Record
              record={{
                title: 'title',
                comment: 'this 2 should suffice as a comment',
                type: 'red-flag',
                id: 4,
              }}
              detailView={viewModal}
            />
          </section>
        </main>
      </div>
      {detailModalVisible && (
        <RecordDetailModal
          record={recordToView}
          dismissSelf={() => toggleModalVisibility(false)}
          profileView
        />
      )}

      <Footer />
    </Fragment>
  );
};

export default Profile;
