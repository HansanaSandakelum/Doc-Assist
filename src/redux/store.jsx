import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

/**
 * @desc createStore is used for creating a store for our redux
 * @desc applyMiddleware is used for applying some middleware to redux, in this case we gonna using redux-saga
 */

// composeWithDevTools is tools that gonna be connecting our application for debugging the redux into the browser

// This is the middleware that we gonna use redux-saga

// This is the root saga that will contain our sagas, or I should say model? XD

// This will be contain our reducer for the application

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const Persistor = persistStore(store);

// Run redux-saga
sagaMiddleware.run(rootSaga);

export default store;
export { Persistor };
