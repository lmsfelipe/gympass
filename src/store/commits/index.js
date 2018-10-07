import { get } from 'lodash';

import ServiceHelper from "../../services/service-helper";
import { API_URL } from "../../services/configs";

/**
 * Actions
 */

export const selectedRepo = data => ({
  type: 'SELECTED_REPO',
  data
});

// Get commits
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

// Search commits
export const requestSearchCommits = () => ({
  type: 'REQUEST_SEARCH_COMMITS'
});

export const rejectSearchCommits = data => ({
  type: 'REJECT_SEARCH_COMMITS',
  data
});

export const fulfillSearchCommits = data => ({
  type: 'FULFILL_SEARCH_COMMITS',
  data
});

/**
 * Thunks
 */

// Get commits
export const getCommits = data => async (dispatch, getState) => {
  const repoName = data || getState().commits.selectedRepo;
  try {
    dispatch(selectedRepo(repoName));
    dispatch(requestCommits());
    const response = await ServiceHelper.SendGet(`${API_URL}/repos/lmsfelipe/${repoName}/commits?page=1&per_page=20`, '02f34e544e7c09df672f71d339d680d53ebab7e7');
    dispatch(fulfillCommits(response));
  } catch (error) {
    dispatch(rejectCommits(error.response));
  }
}

// Search commits
export const searchCommits = search => async (dispatch, getState) => {
  const { selectedRepo } = getState().commits;
  try {
    dispatch(requestSearchCommits());
    const response = await ServiceHelper.SendGet(`${API_URL}/search/commits?q=repo:lmsfelipe/${selectedRepo}+${search}`, '02f34e544e7c09df672f71d339d680d53ebab7e7');
    dispatch(fulfillSearchCommits(response));
  } catch (error) {
    dispatch(rejectSearchCommits(error.response));
  }
}

/**
 * Selectors
 */

export const selectCommits = state => get(state, 'commits.commitsResponse.data');
export const selectRepoName = state => get(state, 'commits.selectedRepo');
export const selectLoading = state => get(state, 'commits.loading');

/**
 * Reducer
 */

export const initialState = {
  loading: false,
  error: false,
  errorMessage: null,
  selectedRepo: '',
  commitsResponse: {}
};

const CommitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECTED_REPO':
      return {
        ...state,
        selectedRepo: action.data
      };

    // Get commits
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
    
    // Search commits
    case 'REQUEST_SEARCH_COMMITS':
      return {
        ...state,
        loading: true,
        error: false
      };
    
    case 'REJECT_SEARCH_COMMITS':
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.data
      };

    case 'FULFILL_SEARCH_COMMITS':
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
