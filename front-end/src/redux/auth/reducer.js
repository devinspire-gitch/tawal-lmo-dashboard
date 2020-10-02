import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  // REGISTER_USER,
  // REGISTER_USER_SUCCESS,
  LOGOUT_USER
} from "../actions";

const INIT_STATE = {
  user: JSON.parse(localStorage.getItem("user") || null),
  accessToken: localStorage.getItem("accessToken"),
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken
      };
    // case REGISTER_USER:
    //   return { ...state, loading: true };
    // case REGISTER_USER_SUCCESS:
    //   return { ...state, loading: false, user: action.payload.uid };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return { ...state };
  }
};
