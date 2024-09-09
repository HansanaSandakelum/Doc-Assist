import axios from "axios";
import { openErrorDialog } from "../../utils/ui-components/pop-ups/ErrorDialog";
import { getLogout, getState } from "../../redux/actions/actions";


const nodeEnv = import.meta.env.MODE;

const devUrl = import.meta.env.VITE_API_DEV;

const prodUrl = import.meta.env.VITE_API_PROD;

let store;

export const injectStore = (_store) => {
  store = _store;
};

// const process = { env: {} };

const interceptor = axios.create({
  baseURL: 
  nodeEnv === "development"
    ? devUrl
    : prodUrl,
});

interceptor.interceptors.request.use(
  (req) => {
    if (store?.getState()?.auth?.authData) {
      let decryptedDefaultData = getState(store?.getState()?.auth?.authData);
      req.headers["Authorization"] = `Bearer ${decryptedDefaultData.token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error)
    if (error?.response?.status === 401) {
      openErrorDialog(
        error?.response?.data?.status,
        error?.response?.data?.comment
      );
      // store.dispatch(getLogout());
    } else {
      openErrorDialog(
        error?.response?.data?.status,
        error?.response?.data?.comment
      );
    }
  }
);

export default interceptor;
