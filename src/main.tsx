import ReactDOM from "react-dom/client";

import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import store, { Persistor } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    {/*<React.StrictMode>*/}

    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App store={store} />
      </PersistGate>
    </Provider>

    {/*</React.StrictMode>*/}
  </BrowserRouter>
);
