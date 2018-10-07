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

export const getPageNumber = data => ({
  type: 'PAGE_NUMBER',
  data
});

export const loadMoreCommits = bool => ({
  type: 'LOAD_MORE_COMMITS',
  bool
});

export const resetCommits = () => ({
  type: 'RESET_COMMITS'
});

// Get commits
export const requestCommits = () => ({
  type: 'REQUEST_COMMITS'
});

export const rejectCommits = data => ({
  type: 'REJECT_COMMITS',
  data
});

export const fulfillCommits = payload => ({
  type: 'FULFILL_COMMITS',
  payload
});

// Search commits
export const requestSearchCommits = () => ({
  type: 'REQUEST_SEARCH_COMMITS'
});

export const rejectSearchCommits = data => ({
  type: 'REJECT_SEARCH_COMMITS',
  data
});

export const fulfillSearchCommits = payload => ({
  type: 'FULFILL_SEARCH_COMMITS',
  payload
});

/**
 * Thunks
 */

// Get commits
export const getCommits = data => async (dispatch, getState) => {
  const { page } = data;
  const { selectedRepo } = getState().commits;

  try {
    dispatch(getPageNumber(page));
    dispatch(requestCommits());
    const response = await ServiceHelper.SendGet(
      `${API_URL}/repos/lmsfelipe/${selectedRepo}/commits?page=${page}&per_page=20`,
      '02f34e544e7c09df672f71d339d680d53ebab7e7'
    );
    // For performance, it dispatches an action if there is no more content to load
    if (response.data.length === 0) {
      dispatch(loadMoreCommits(false));
    }
    dispatch(fulfillCommits(response));
  } catch (error) {
    dispatch(rejectCommits(error.response));
  }
}

// Search commits
export const searchCommits = data => async (dispatch, getState) => {
  const { selectedRepo } = getState().commits;
  const { searchValue, page } = data;

  try {
    dispatch(requestSearchCommits());
    dispatch(getPageNumber(page));
    const response = await ServiceHelper.SendGet(
      `${API_URL}/search/commits?q=repo:lmsfelipe/${selectedRepo}+${searchValue}&page=${page}&per_page=20`,
      '02f34e544e7c09df672f71d339d680d53ebab7e7'
    );

    if (response.data.items.length === 0) {
      dispatch(loadMoreCommits(false));
    }
    
    dispatch(fulfillSearchCommits(response));
  } catch (error) {
    dispatch(rejectSearchCommits(error.response));
  }
}

/**
 * Selectors
 */

export const selectCommits = state => get(state, 'commits.commitsResponse');
export const selectRepoName = state => get(state, 'commits.selectedRepo');
export const selectPageNumber = state => get(state, 'commits.pageNumber');
export const selectLoadMoreCommits = state => get(state, 'commits.loadMoreCommits');
export const selectLoading = state => get(state, 'commits.loading');

/**
 * Reducer
 */

export const initialState = {
  loading: false,
  error: false,
  errorMessage: null,
  selectedRepo: '',
  pageNumber: 1,
  loadMoreCommits: true,
  commitsResponse: []
};

const CommitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECTED_REPO':
      return {
        ...state,
        selectedRepo: action.data
      };

    case 'PAGE_NUMBER':
      return {
        ...state,
        pageNumber: action.data
      };

    case 'LOAD_MORE_COMMITS':
      return {
        ...state,
        loadMoreCommits: action.bool
      }

    case 'RESET_COMMITS':
      return {
        ...state,
        commitsResponse: [],
        loadMoreCommits: true
      }

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
        commitsResponse: [
          ...state.commitsResponse,
          ...action.payload.data
        ]
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
        commitsResponse: [
          ...state.commitsResponse,
          ...action.payload.data.items
        ]
      };

    default:
      return state;
  }
};

export default CommitsReducer;
