import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import API from "../../helpers/API";
// import { auth } from '../../helpers/Firebase';
import {
  LOGIN_USER,
  // REGISTER_USER,
  LOGOUT_USER
} from "../actions";

import {
  loginUserSuccess
  // registerUserSuccess
} from "./actions";

const loginWithEmailPasswordAsync = async (email, password) => {
  const api = new API();
  return await api
    .post(
      "/users/login",
      { email, password },
      {
        params: {
          include: "user"
        }
      }
    )
    .then(response => ({
      user: response.data.user,
      accessToken: response.data.id
    }))
    .catch(error => error);
};

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      localStorage.setItem("user", JSON.stringify(loginUser.user));
      localStorage.setItem("accessToken", loginUser.accessToken);
      yield put(loginUserSuccess(loginUser.user, loginUser.accessToken));
      history.push("/");
    } else {
      console.log("login failed :", loginUser.message);
    }
  } catch (error) {
    console.log("login error : ", error);
  }
}

// const registerWithEmailPasswordAsync = async (email, password) =>
//   await auth.createUserWithEmailAndPassword(email, password)
//     .then(authUser => authUser)
//     .catch(error => error);

// function* registerWithEmailPassword({ payload }) {
//   const { email, password } = payload.user;
//   const { history } = payload
//   try {
//     const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
//     if (!registerUser.message) {
//       localStorage.setItem('user_id', registerUser.user.uid);
//       yield put(registerUserSuccess(registerUser));
//       history.push('/')
//     } else {
//       console.log('register failed :', registerUser.message)
//     }
//   } catch (error) {
//     console.log('register error : ', error)
//   }
// }

const logoutAsync = async history => {
  const accessToken = localStorage.getItem("accessToken");
  const api = new API();
  await api
    .post(`/users/logout?accessToken=${accessToken}`)
    .catch(error => error);
  history.push("/");
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    yield call(logoutAsync, history);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  } catch (error) {}
}

// export function* watchRegisterUser() {
//   yield takeEvery(REGISTER_USER, registerWithEmailPassword);
// }

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser)
    // fork(watchRegisterUser)
  ]);
}
