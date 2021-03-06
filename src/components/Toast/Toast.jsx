/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

const Toast = ({ title, type, messages, timeOut, visible }) => {
  const [toastInState, setToastInState] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setToastInState(false);
    }, timeOut);
  }, []);

  const className = classNames({
    notification: true,
    'notification--success': type === 'SUCCESS',
    'notification--error': type === 'ERROR',
    visible: visible && toastInState,
  });

  const messageList = messages.map((message, i) => {
    return title ? (
      <p key={i} className="notification__text">
        {message}
      </p>
    ) : (
      <li key={i} className="notification__text">
        {message}
      </li>
    );
  });

  return (
    <CSSTransition
      in={toastInState}
      classNames="notification"
      timeout={timeOut}
      mountOnEnter
      unmountOnExit
    >
      <div className={className}>
        <button
          type="button"
          className="dismiss__notification"
          onClick={() => setToastInState(false)}
        >
          ⊝
        </button>
        <ul className="notification__list">
          {title ? (
            <li className="notification__item">
              <h3 className="notification__title">{title}</h3>
              {messageList}
            </li>
          ) : (
            messageList
          )}
        </ul>
      </div>
    </CSSTransition>
  );
};

Toast.defaultProps = {
  title: '',
};

Toast.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['SUCCESS', 'ERROR']).isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeOut: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Toast;
