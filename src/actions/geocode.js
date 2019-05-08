import { awaitFetch } from '../utils/helpers';
import { createToast } from './toasts';

export const reverseGeocode = ({ lat, lng }) => async dispatch => {
  const errors = {
    invalidAddress: {
      name: 'noLocation',
      message: 'No address exists for given coordinates',
    },
    mapLoad: {
      name: 'Error loading location Information',
      message:
        'There was a problem loading the address/map. Please check your internet connection',
    },
  };

  try {
    const { results } = await awaitFetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyApBXNZ8DfcSajnuuNOEMWNNH0eIZdBtws`
    );

    if (results.length) {
      const [{ formatted_address: mostApproximateLocation }] = results;
      return mostApproximateLocation;
    }
    throw errors.invalidAddress;
  } catch ({ name, message }) {
    if (name === 'noLocation') {
      dispatch(
        createToast({
          type: 'ERROR',
          title: name,
          messages: [message],
        })
      );
    } else {
      dispatch(
        createToast({
          type: 'ERROR',
          title: errors.mapLoad.name,
          messages: [errors.mapLoad.message],
        })
      );
    }
  }
  return '';
};
