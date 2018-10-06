/**
 * Actions
 */

export const requestRepo = data => ({
  type: 'REQUEST_REPO',
  data
});

/**
 * Reducer
 */

export const initialState = {
  repoResponse: {}
};

const repositoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_REPO':
      return {
        ...state,
        repoResponse: action.data
      };

    default:
      return state;
  }
};

export default repositoriesReducer;
