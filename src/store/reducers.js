import { combineReducers } from 'redux';

import repositories from './repositories';

const appReducer = combineReducers({
  repositories
});

export default appReducer;
