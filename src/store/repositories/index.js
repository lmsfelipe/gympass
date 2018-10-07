import { get } from 'lodash';

import ServiceHelper from "../../services/service-helper";
import { API_URL } from "../../services/configs";

/**
 * Actions
 */

// Get repos
export const requestRepos = () => ({
  type: 'REQUEST_REPOS'
});

export const rejectRepos = data => ({
  type: 'REJECT_REPOS',
  data
});

export const fulfillRepos = payload => ({
  type: 'FULFILL_REPOS',
  payload
});

// Filter repos
export const requestFilterRepos = () => ({
  type: 'REQUEST_FILTER_REPOS'
});

export const rejectFilterRepos = data => ({
  type: 'REJECT_FILTER_REPOS',
  data
});

export const fulfillFilterRepos = payload => ({
  type: 'FULFILL_FILTER_REPOS',
  payload
});

/**
 * Thunks
 */

// Get repos
export const getRepos = () => async dispatch => {
  try {
    dispatch(requestRepos());
    const response = await ServiceHelper.SendGet(
      `${API_URL}/users/reactjs/repos?type=owner`
    );
    dispatch(fulfillRepos(response));
  } catch (error) {
    dispatch(rejectRepos(error.response));
  }
}

// Get repos
export const getFilteredRepos = data => async dispatch => {
  try {
    dispatch(requestFilterRepos());
    const response = await ServiceHelper.SendGet(
      `${API_URL}/search/repositories?q=user:reactjs&sort=${data}&order=desc`
    );
    dispatch(fulfillFilterRepos(response));
  } catch (error) {
    dispatch(rejectFilterRepos(error.response));
  }
}

/**
 * Selectors
 */

export const selectRepositories = state => get(state, 'repositories.reposResponse');
export const selectLoading = state => get(state, 'repositories.loading');

/**
 * Reducer
 */

export const initialState = {
  loading: false,
  error: false,
  errorMessage: null,
  reposResponse: []
};

const repositoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get repos
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
        reposResponse: action.payload.data
      };

    // Filter repos
    case 'REQUEST_FILTER_REPOS':
      return {
        ...state,
        loading: true,
        error: false
      };
    
    case 'REJECT_FILTER_REPOS':
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.data
      };

    case 'FULFILL_FILTER_REPOS':
      return {
        ...state,
        loading: false,
        error: false,
        reposResponse: action.payload.data.items
      };

    default:
      return state;
  }
};

export default repositoriesReducer;
