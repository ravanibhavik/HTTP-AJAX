import { GET_FRIENDS, ADD_FRIEND, UPDATE_FRIEND } from '../actions';

const initialState = { friends: [] }

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_FRIENDS:
      return Object.assign({}, state, { friends: action.payload.data });
    case ADD_FRIEND:
      return Object.assign({}, state, { friends: action.payload.data });
    case UPDATE_FRIEND:
      return Object.assign({}, state, { friends: action.payload.data });
    default:
      return state;
  }
}