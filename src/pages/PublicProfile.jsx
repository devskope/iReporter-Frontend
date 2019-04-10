import React, { Fragment, useState } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Sidebar from '../components/dashboard/Sidebar';
import RecordStatWidget from '../components/dashboard/RecordStatWidget';
import RecordFilters from '../components/dashboard/RecordFilters';
import Record from '../components/dashboard/Record';
import RecordDetailModal from '../components/dashboard/RecordDetailModal';
import userImage from '../../public/images/user.svg';

const PublicProfile = () => {
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

  const sidebarBtn = () => (
    <button className="dashboard__sidebar-btn dash" type="button">
      Dashboard
    </button>
  );

  return (
    <Fragment>
      <Topbar
        links={[
          { name: 'Dashboard', target: '/users' },
          { name: 'Logout', target: '/', className: 'btn btn--nav' },
        ]}
        userWidget
      />
      <div className="dashboard dashboard--user-public-profile">
        <Sidebar
          alternate
          button={sidebarBtn()}
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
          <section className="user-profile-wrapper">
            <div className="loader" />
            <article className="user-profile">
              <div className="user-profile__block user-profile__avatar-block">
                <img
                  src={userImage}
                  alt="avatar"
                  className="user-profile__avatar"
                />
                <p className="user-profile__username">Someuser</p>
              </div>
              <div className="user-profile__block user-profile__info-block">
                <ul className="user-profile__info-wrapper">
                  <li className="user-profile__item">
                    <p className="user-profile__item-key">First Name</p>
                    <p className="user-profile__item-value user-profile__firstname">
                      tester
                    </p>
                  </li>
                  <li className="user-profile__item">
                    <p className="user-profile__item-key">Last Name</p>
                    <p className="user-profile__item-value user-profile__lastname">
                      tester
                    </p>
                  </li>
                  <li className="user-profile__item">
                    <p className="user-profile__item-key">Email</p>
                    <p className="user-profile__item-value user-profile__email">
                      tester@somedomain.ru
                    </p>
                  </li>
                  <li className="user-profile__item">
                    <p className="user-profile__item-key">Phone Number</p>
                    <p className="user-profile__item-value user-profile__phone">
                      +234457215
                    </p>
                  </li>
                  <li className="user-profile__item">
                    <p className="user-profile__item-key">User ID</p>
                    <p className="user-profile__item-value user-profile__uid">
                      2
                    </p>
                  </li>
                  <li className="user-profile__item">
                    <p className="user-profile__item-key">Registered</p>
                    <p className="user-profile__item-value user-profile__create-date">
                      2019/12/1
                    </p>
                  </li>
                </ul>
              </div>
              <div className="user-profile__block user-profile__stats-block">
                <h3 className="user-profile__stats-heading">Record Stats</h3>
                <div className="user-profile__stats-wrapper">
                  <div className="user-profile__record-stat">
                    <div className="user-profile__record-stat-title">
                      Drafts
                    </div>
                    <div className="user-profile__record-stat-count">15</div>
                  </div>
                  <div className="user-profile__record-stat">
                    <div className="user-profile__record-stat-title">
                      Under Investigation
                    </div>
                    <div className="user-profile__record-stat-count">15</div>
                  </div>
                  <div className="user-profile__record-stat">
                    <div className="user-profile__record-stat-title">
                      Resolved
                    </div>
                    <div className="user-profile__record-stat-count">15</div>
                  </div>
                  <div className="user-profile__record-stat">
                    <div className="user-profile__record-stat-title">
                      Rejected
                    </div>
                    <div className="user-profile__record-stat-count">15</div>
                  </div>
                </div>
              </div>
              <div className="user-records__toggle">View Records</div>
            </article>
          </section>
          <div className="user-records">
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
          </div>
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

export default PublicProfile;
