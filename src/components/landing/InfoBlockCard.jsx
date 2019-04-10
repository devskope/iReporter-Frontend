import React from 'react';
import PropTypes from 'prop-types';

const InfoBLockCard = ({ iconAlt, iconSrc, CardTitle, cardText }) => {
  return (
    <div className="card">
      <img alt={iconAlt} src={iconSrc} className="info-block__icon" />
      <h4 className="info-block__text">{CardTitle}</h4>
      <p className="info-block__sub-text">{cardText}</p>
    </div>
  );
};

InfoBLockCard.defaultProps = {
  iconAlt: '',
  iconSrc: '',
  CardTitle: '',
  cardText: '',
};

InfoBLockCard.propTypes = {
  iconAlt: PropTypes.string,
  iconSrc: PropTypes.string,
  CardTitle: PropTypes.string,
  cardText: PropTypes.string,
};

export default InfoBLockCard;
