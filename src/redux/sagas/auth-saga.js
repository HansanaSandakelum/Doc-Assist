import { take, fork, cancel, call, put, cancelled } from "redux-saga/effects";
import * as actions from "../actions/actions";
import * as api from "../../assets/api";

function loginApi(values) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.signIn(values);
      console.log(data);

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function registerApi(values) {
  // console.log(values);

  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.signUp(values);
      console.log(data);

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
    console.log("loginflow:", data);

    if (data?.data?.token) {
      // .. also inform auth redux that our login was successful
      yield put(
        actions.getLoginSuccess(data)
      );

      // .. also inform remember me redux that our login was successful
      if (values.rememberMe) {
        let rememberUserData = {
          usuario: values.username,
          clave: values.password,
          recuerdame: values.rememberMe,
        };
        yield put(actions.setRememberMe(rememberUserData));
      } else {
        yield put(actions.setForgetMe());
      }
      // redirect them to login OTP varification!

      //! set login path.......................................................
      yield put(
        actions.setRedirectPath("/verify-login", {
          state: {
            token: data?.data?.loginOTPToken,
            mobile: data?.data?.mobileNumber,
            startTime: new Date().getTime(),
            expireTime: data?.data?.loginOTPTokenExpirationTime,
          },
        })
      );
    } else {
      yield put(
        actions.getRegisterSuccess({
          ...data,
          data: { token: data.data.registrationOTPToken },
        })
      );

      // yield put(
      //   actions.setRedirectPath("/verify-mobile", {
      //     state: {
      //       token: data?.data.registrationOTPToken,
      //       mobile: data?.data.mobile,
      //       startTime: new Date().getTime(),
      //       expireTime: data?.data?.registrationOTPTokenExpirationTime,
      //     },
      //   })
      // );
    }
  } catch (error) {
    // error? send it to redux
    yield put(actions.getLoginError(error));
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      yield put(actions.setRedirectPath("/login-new"));
    }
  }

  return data;
}

//?......................register flow.............................................

function* registerFlow(values) {
  let data;
  try {
    data = yield call(registerApi, values);
    console.log("registerflow:", data);

    // .. also inform auth redux that our login was successful
    yield put(
      actions.getRegisterSuccess({
        ...data,
        data: {
          mobile: data.data.mobile,
          token: data.data.verifyMobileOTPToken,
        },
      })
    );
    // redirect them to OTP verification!
    yield put(
      actions.setRedirectPath("/verify-mobile", {
        state: {
          mobile: data.data.mobile,
          token: data?.data.registrationOTPToken,
          startTime: new Date().getTime(),
          expireTime: data?.data?.registrationOTPTokenExpirationTime,
        },
      })
    );
  } catch (error) {
    // error? send it to redux
    yield put(actions.getLoginError(error));
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      yield put(actions.setRedirectPath("/login"));
    }
  }
  return data;
}

function* logout() {
  // dispatches the LOGOUT action
  yield put(actions.getLogout());

  // redirect to the /login screen
  yield put(actions.setRedirectPath("/login"));
}

function* loginWatcher() {
  while (true) {
    const payload = yield take([
      actions.Types.LOGIN_REQUESTING,
      actions.Types.REGISTER_REQUESTING,
    ]);
    let task;
    if (payload.type === actions.Types.LOGIN_REQUESTING)
      task = yield fork(loginFlow, payload.payload);
    else if (payload.type === actions.Types.REGISTER_REQUESTING)
      task = yield fork(registerFlow, payload.payload);
    const action = yield take([
      actions.Types.LOGOUT,
      actions.Types.LOGIN_ERROR,
    ]);
    if (action.type === actions.Types.LOGOUT) yield cancel(task);
    // yield call(logout);
  }
}

const authSagas = [fork(loginWatcher)];

export default authSagas;
