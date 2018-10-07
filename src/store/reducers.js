import { combineReducers } from 'redux';

import repositories from './repositories';
import commits from './commits';

const appReducer = combineReducers({
  repositories,
  commits
});

export default appReducer;
