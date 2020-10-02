import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
  // REGISTER_USER,
  // REGISTER_USER_SUCCESS
} from "../actions";

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
});
export const loginUserSuccess = (user, accessToken) => ({
  type: LOGIN_USER_SUCCESS,
  payload: { user, accessToken }
});

// export const registerUser = (user, history) => ({
//   type: REGISTER_USER,
//   payload: { user, history }
// })
// export const registerUserSuccess = (user) => ({
//   type: REGISTER_USER_SUCCESS,
//   payload: user
// })

export const logoutUser = history => ({
  type: LOGOUT_USER,
  payload: { history }
});
