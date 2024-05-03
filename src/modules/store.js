import { configureStore as configureAppStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from 'modules/reducers';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';

const history = createBrowserHistory();

let store;

//custom middleware only to check changes
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

//To implement maybe, or use axios to the refresh token, idk
const tokenMiddleware = function (store) {
  return function (next) {
    return function (action) {
      const token = store.getState().token;
      if (token && token.hora) {
      }
    };
  };
};

export function configureStore(preloadedState) {
  return configureAppStore({
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        loggerMiddleware,
        routerMiddleware(history),
        // tokenMiddleware,
      ),
    preloadedState,
  });
}

export function getHistory() {
  return history;
}

export default function getStore() {
  return store;
}
