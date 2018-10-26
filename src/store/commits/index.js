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

export const rejectCommits = payload => ({
  type: 'REJECT_COMMITS',
  payload
});

export const fulfillCommits = payload => ({
  type: 'FULFILL_COMMITS',
  payload
});

// Search commits
export const requestSearchCommits = () => ({
  type: 'REQUEST_SEARCH_COMMITS'
});

export const rejectSearchCommits = payload => ({
  type: 'REJECT_SEARCH_COMMITS',
  payload
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
      `${API_URL}/repos/reactjs/${selectedRepo}/commits?page=${page}&per_page=20`
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
      `${API_URL}/search/commits?q=repo:reactjs/${selectedRepo}+${searchValue}&page=${page}&per_page=20`
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

export const selectCommits = state => state.commits.commitsResponse;
export const selectRepoName = state => state.commits.selectedRepo;
export const selectPageNumber = state => state.commits.pageNumber;
export const selectLoadMoreCommits = state => state.commits.loadMoreCommits;
export const selectLoading = state => state.commits.loading;
export const selectError = state => state.commits.error;

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
        errorMessage: action.payload
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
        errorMessage: action.payload
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
