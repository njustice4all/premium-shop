const initialLocation = { pathname: '/', search: '', hash: '' };

const location = (state = initialLocation, action) => {
  return action.type === 'LOCATION_CHANGE' ? action.location : state;
};

export default location;
