import { SET_USER, LOGOUT } from "../actions/AuthActions";

const initialState = {
  user: null, // No user logged in by default
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
