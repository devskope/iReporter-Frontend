import React, { Fragment, useState } from 'react';
import Footer from '../components/Footer';
import RecordStatWidget from '../components/dashboard/RecordStatWidget';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/Topbar';
import { handleInputchange } from '../helpers';

const CreateRecord = () => {
  const [recordType, setRecordType] = useState('');
  const [recordTitle, setRecordTitle] = useState('');
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
            <form
              className="create-edit-form create-edit-form--create"
              encType="multipart/form-data"
            >
              <div className="create-edit-form__header">
                <h2 className="create-edit-form__title">Create Record</h2>
              </div>
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="create-type">Report Type</label>
                  <select
                    className="create-edit-form__type"
                    id="create-type"
                    value={recordType}
                    onChange={e => handleInputchange(e, setRecordType)}
                  >
                    <option value="" default>
                      -----
                    </option>
                    <option value="red-flag">Red-Flag</option>
                    <option value="intervention">Intervention</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="create-title">Report Title</label>
                  <input
                    className="create-edit-form__record-title"
                    type="text"
                    id="create-title"
                    value={recordTitle}
                    onChange={e => handleInputchange(e, setRecordTitle)}
                  />
                </div>
                <div className="form-field form-field--comment">
                  <label htmlFor="create-comment">Report Comment</label>
                  <textarea
                    className="create-edit-form__comment"
                    rows="4"
                    id="create-comment"
                    value={recordComment}
                    onChange={e => handleInputchange(e, setRecordComment)}
                  />
                </div>
                <div className="form-field form-field--location">
                  <label htmlFor="create-location">Location of Event</label>
                  <input
                    className="create-edit-form__location"
                    type="text"
                    id="create-location"
                  />
                  <button
                    type="button"
                    className="create-edit-form__location-reset btn btn--alt"
                  >
                    Clear
                  </button>
                  <p className="create-edit-form__geocodes  hidden" />
                </div>
                <div className="form-field form-field--media">
                  <label htmlFor="create-media">
                    Media:
                    <br />
                    <small className="create-edit-form__media-hint">
                      You can add multiple videos & images
                    </small>
                  </label>
                  <input
                    className="create-edit-form__media"
                    type="file"
                    id="create-media"
                    multiple
                  />
                </div>
                <div
                  title="Check to recieve email notifications when an admin changes the status of this record"
                  className="form-field form-field--notification"
                >
                  <label htmlFor="create-email-notification">
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

export default CreateRecord;
