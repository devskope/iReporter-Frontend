import React, { Fragment, useState } from 'react';
import Footer from '../components/Footer';
import RecordStatWidget from '../components/dashboard/RecordStatWidget';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/Topbar';
import { handleInputchange } from '../helpers';

const EditRecord = () => {
  const [recordComment, setRecordComment] = useState('');
  const [recordNotifications, setrecordNotifications] = useState(false);

  const toggleCheckBox = () => {
    setrecordNotifications(!recordNotifications);
  };

  return (
    <Fragment>
      <Topbar
        links={[
          { name: 'Profile', target: '/profile' },
          { name: 'Logout', target: '/', className: 'btn btn--nav' },
        ]}
      />
      <div className="dashboard">
        <Sidebar
          statWidgets={[
            ['Draft', 10],
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
          <section className="create-edit-form-wrapper">
            <form className="create-edit-form create-edit-form--edit">
              <div className="create-edit-form__header">
                <h2 className="create-edit-form__title">Edit Record</h2>
              </div>
              <div className="form-fields">
                <div className="form-field disabled">
                  <label htmlFor="edit-type">Report Type</label>
                  <select
                    className="create-edit-form__type"
                    id="edit-type"
                    disabled
                  >
                    <option value="" default>
                      -----
                    </option>
                    <option value="red-flag">Red-Flag</option>
                    <option value="intervention">Intervention</option>
                  </select>
                </div>
                <div className="form-field disabled">
                  <label htmlFor="edit-title">Report Title</label>
                  <input
                    className="create-edit-form__record-title"
                    type="text"
                    id="edit-title"
                    disabled
                  />
                </div>
                <div className="form-field form-field--comment">
                  <label htmlFor="edit-comment">Report Comment</label>
                  <textarea
                    className="create-edit-form__comment"
                    rows="4"
                    id="edit-comment"
                    value={recordComment}
                    onChange={e => handleInputchange(e, setRecordComment)}
                  />
                </div>
                <div className="form-field form-field--location">
                  <label htmlFor="edit-location">Location of Event</label>
                  <input
                    className="create-edit-form__location"
                    type="text"
                    id="edit-location"
                  />
                  <button
                    type="button"
                    className="create-edit-form__location-reset btn"
                  >
                    Clear
                  </button>
                  <p className="create-edit-form__geocodes  hidden" />
                </div>
                <div className="form-field form-field--media">
                  <label htmlFor="edit-media">
                    Media:
                    <br />
                    <small className="create-edit-form__media-hint">
                      You can add multiple videos & images
                    </small>
                  </label>
                  <input
                    className="create-edit-form__media"
                    type="file"
                    id="edit-media"
                    multiple
                    disabled
                  />
                </div>
                <div
                  title="Check to recieve notifications when an admin changes the status of this record"
                  className="form-field form-field--notification"
                >
                  <label htmlFor="edit-email-notification">
                    {' '}
                    Email notifications?
                  </label>
                  <input
                    className="create-edit-form__email-notification"
                    type="checkbox"
                    id="create-email-notification"
                    onChange={toggleCheckBox}
                    checked={recordNotifications}
                  />
                </div>
                <button className="btn btn--submit" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
};

export default EditRecord;
