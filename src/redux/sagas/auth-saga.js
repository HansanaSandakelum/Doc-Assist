import { take, fork, cancel, call, put, cancelled } from "redux-saga/effects";
import * as actions from "../actions/actions";
import * as api from "../../assets/api";
// import {browserHistory} from 'react-router'

function loginApi(values) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.signIn(values);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function* loginFlow(values) {
  let data;
  try {
    data = yield call(loginApi, values);

    // .. also inform auth redux that our login was successful
    yield put(actions.getLoginSuccess(data));

    // .. also inform remember me redux that our login was successful
    if (values.rememberMe) {
      let rememberUserData = {
        usuario: values.username,
        clave: values.password,
        recuerdame: values.rememberMe,
      };
      yield put(actions.setRememberMe(rememberUserData));
    } else yield put(actions.setForgetMe());

    // redirect them to dashboard!
    // browserHistory.push('/login')
  } catch (error) {
    // error? send it to redux
    yield put(actions.getLoginError(error));
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      // browserHistory.push('/login')
    }
  }

  return data;
}

function* logout() {
  // dispatches the LOGOUT action
  yield put(actions.getLogout());

  // redirect to the /login screen
  // browserHistory.push('/login')
}

function* loginWatcher() {
  while (true) {
    const { payload } = yield take(actions.Types.LOGIN_REQUESTING);
    const task = yield fork(loginFlow, payload);
    const action = yield take([
      actions.Types.LOGOUT,
      actions.Types.LOGIN_ERROR,
    ]);
    if (action.type === actions.Types.LOGOUT) yield cancel(task);
    yield call(logout);
  }
}

const authSagas = [fork(loginWatcher)];

export default authSagas;
