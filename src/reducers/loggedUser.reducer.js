export default function(state = {}, action) {
  switch(action.type) {
    case 'SET_LOGGED_USER':
      return action.payload;
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}