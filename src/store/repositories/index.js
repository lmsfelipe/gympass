import { get } from 'lodash';

import ServiceHelper from "../../services/service-helper";
import { API_URL } from "../../services/configs";

/**
 * Actions
 */

export const requestRepos = () => ({
  type: 'REQUEST_REPOS'
});

export const rejectRepos = data => ({
  type: 'REJECT_REPOS',
  data
});

export const fulfillRepos = data => ({
  type: 'FULFILL_REPOS',
  data
});

/**
 * Thunks
 */

export const getRepos = () => async dispatch => {
  try {
    dispatch(requestRepos());
    const response = await ServiceHelper.SendGet(`${API_URL}/users/lmsfelipe/repos`, '02f34e544e7c09df672f71d339d680d53ebab7e7');
    dispatch(fulfillRepos(response));
  } catch (error) {
    dispatch(rejectRepos(error.response));
  }
}

/**
 * Selectors
 */

export const selectRepositories = state => get(state, 'repositories.reposResponse.data');

/**
 * Reducer
 */

export const initialState = {
  loading: false,
  error: false,
  errorMessage: null,
  reposResponse: {}
};

const repositoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_REPOS':
      return {
        ...state,
        loading: true,
        error: false
      };
    
    case 'REJECT_REPOS':
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.data
      };

    case 'FULFILL_REPOS':
      return {
        ...state,
        loading: false,
        error: false,
        reposResponse: action.data
      };

    default:
      return state;
  }
};

export default repositoriesReducer;
