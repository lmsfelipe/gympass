import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import appReducer from './reducers';

const logger = createLogger({
  collapsed: true
});

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  appReducer,
  applyMiddleware(...middlewares)
);