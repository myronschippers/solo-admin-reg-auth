const tempUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TEMP_USER':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default tempUserReducer;
