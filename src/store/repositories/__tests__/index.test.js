import repositoriesReducer, {
  initialState,
  requestRepos,
  rejectRepos,
  fulfillRepos,
  requestFilterRepos,
  rejectFilterRepos,
  fulfillFilterRepos
} from '..';

describe('repositories store', () => {
  it('should return the initialState', () => {
    expect(repositoriesReducer(initialState, { type: 'unknown '})).toEqual(initialState);
  });

  // Get Repos
  it('handle requestRepos', () => {
    const action = requestRepos();
    const state = {
      ...initialState,
      loading: true,
      error: false
    }
    expect(repositoriesReducer(initialState, action)).toEqual(state);
  });

  it('handle rejectRepos', () => {
    const action = rejectRepos(new Error('Not found'));
    const state = {
      ...initialState,
      loading: false,
      error: true,
      errorMessage: action.payload
    }
    expect(repositoriesReducer(initialState, action)).toEqual(state);
  });

  it('handle fulfillRepos', () => {
    const payload = {
      data: {
        name: 'core-notes',
        stars: '919',
        forks: '44'
      }
    }
    const action = fulfillRepos(payload);
    const state = {
      ...initialState,
      loading: false,
      error: false,
      reposResponse: action.payload.data
    }
    expect(repositoriesReducer(initialState, action)).toEqual(state);
  });

  // Filter Repos
  it('handle requestFilterRepos', () => {
    const action = requestFilterRepos();
    const state = {
      ...initialState,
      loading: true,
      error: false
    }
    expect(repositoriesReducer(initialState, action)).toEqual(state);
  });

  it('handle rejectFilterRepos', () => {
    const action = rejectFilterRepos(new Error('Not found'));
    const state = {
      ...initialState,
      loading: false,
      error: true,
      errorMessage: action.payload
    }
    expect(repositoriesReducer(initialState, action)).toEqual(state);
  });

  it('handle fulfillFilterRepos', () => {
    const payload = {
      data: {
        items: {
          name: 'core-notes',
          stars: '919',
          forks: '44'
        }
      }
    }
    const action = fulfillFilterRepos(payload);
    const state = {
      ...initialState,
      loading: false,
      error: false,
      reposResponse: action.payload.data.items
    }
    expect(repositoriesReducer(initialState, action)).toEqual(state);
  });
});
