import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../../public/images/crashSite.jpeg';

const Record = ({ record, detailView }) => {
  const { title, comment, images = '[]' } = record;
  const image = JSON.parse(images).length
    ? JSON.parse(images)[0]
    : defaultImage;

  return (
    <div className="record">
      <div className="record__image-holder">
        <img className="record__image" src={image} alt="Report thumbnail" />
      </div>
      <div className="record__details">
        <h4 className="record__title">{title}</h4>
        <p className="record__comment">
          {comment
            .split(' ')
            .filter(word => word !== '')
            .slice(0, 30)
            .join(' ')}
          {comment.split(' ').length > 30 ? '...' : ''}
        </p>
      </div>
      <button
        type="button"
        className="record__more-btn"
        onClick={() => detailView(record)}
      >
        View More
      </button>
    </div>
  );
};

Record.defaultProps = {
  record: {},
  detailView: x => x,
};

Record.propTypes = {
  record: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
      PropTypes.string,
      PropTypes.bool,
    ])
  ),
  detailView: PropTypes.func,
};

export default Record;
