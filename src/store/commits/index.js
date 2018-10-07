import { get } from 'lodash';

import ServiceHelper from "../../services/service-helper";
import { API_URL } from "../../services/configs";

/**
 * Actions
 */

export const requestCommits = () => ({
  type: 'REQUEST_COMMITS'
});

export const rejectCommits = data => ({
  type: 'REJECT_COMMITS',
  data
});

export const fulfillCommits = data => ({
  type: 'FULFILL_COMMITS',
  data
});

/**
 * Thunks
 */

export const getCommits = repoName => async dispatch => {
  try {
    dispatch(requestCommits());
    const response = await ServiceHelper.SendGet(`${API_URL}/repos/lmsfelipe/${repoName}/commits?page=1&per_page=20`, '02f34e544e7c09df672f71d339d680d53ebab7e7');
    dispatch(fulfillCommits(response));
  } catch (error) {
    dispatch(rejectCommits(error.response));
  }
}

/**
 * Selectors
 */

export const selectCommits = state => get(state, 'commits.commitsResponse.data');
export const selectLoading = state => get(state, 'commits.loading');

/**
 * Reducer
 */

export const initialState = {
  loading: false,
  error: false,
  errorMessage: null,
  commitsResponse: {}
};

const CommitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_COMMITS':
      return {
        ...state,
        loading: true,
        error: false
      };
    
    case 'REJECT_COMMITS':
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.data
      };

    case 'FULFILL_COMMITS':
      return {
        ...state,
        loading: false,
        error: false,
        commitsResponse: action.data
      };

    default:
      return state;
  }
};

export default CommitsReducer;
