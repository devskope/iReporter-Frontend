import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { TransitionGroup } from 'react-transition-group';
import Toast from './Toast';

const ToastContainer = ({ timeOut, toast }) => {
  const className = classNames({
    'notification-wrapper': true,
    visible: !!toast.length,
  });

  return (
    <TransitionGroup className={className}>
      {toast.map(({ id, title, messages, type, visible }) => (
        <Toast
          key={id}
          title={title}
          messages={messages}
          type={type}
          visible={visible}
          timeOut={timeOut}
        />
      ))}
    </TransitionGroup>
  );
};

ToastContainer.defaultProps = {
  timeOut: 2500,
  toast: [],
};

ToastContainer.propTypes = {
  timeOut: PropTypes.number,
  toast: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.bool])
    )
  ),
};

export default connect(state => ({ toast: state.toast }))(ToastContainer);
