import commitsReducer, {
  selectedRepo,
  getPageNumber,
  loadMoreCommits,
  resetCommits,
  initialState,
  requestCommits,
  rejectCommits,
  fulfillCommits,
  requestSearchCommits,
  rejectSearchCommits,
  fulfillSearchCommits
} from '..';

describe('commits store', () => {
  it('should return the initialState', () => {
    expect(commitsReducer(initialState, { type: 'unknown '})).toEqual(initialState);
  });

  it('gets the selected repo', () => {
    const action = selectedRepo('core-notes');
    const state = {
      ...initialState,
      selectedRepo: 'core-notes'
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  it('gets the page number', () => {
    const action = getPageNumber(1);
    const state = {
      ...initialState,
      pageNumber: 1
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  it('checks if is needed to load more commits', () => {
    const action = loadMoreCommits(true);
    const state = {
      ...initialState,
      loadMoreCommits: true
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  it('resets the loaded commits', () => {
    const action = resetCommits();
    const state = {
      ...initialState,
      commitsResponse: [],
      loadMoreCommits: true
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  // Get Commits
  it('handle requestCommits', () => {
    const action = requestCommits();
    const state = {
      ...initialState,
      loading: true,
      error: false
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  it('handle rejectCommits', () => {
    const action = rejectCommits(new Error('Not found'));
    const state = {
      ...initialState,
      loading: false,
      error: true,
      errorMessage: action.payload
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  it('handle fulfillCommits', () => {
    const payload = {
      data: [
        {
          message: 'Add link to December 8 notes',
          author_name: 'Dan Abramov',
          commit_date: '2016-12-09'
        }
      ]
    }
    const action = fulfillCommits(payload);
    const state = {
      ...initialState,
      loading: false,
      error: false,
      commitsResponse: [
        ...action.payload.data
      ]
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  // Search Commit
  it('handle requestSearchCommits', () => {
    const action = requestSearchCommits();
    const state = {
      ...initialState,
      loading: true,
      error: false
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  it('handle rejectSearchCommits', () => {
    const action = rejectSearchCommits(new Error('Not found'));
    const state = {
      ...initialState,
      loading: false,
      error: true,
      errorMessage: action.payload
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });

  it('handle fulfillSearchCommits', () => {
    const payload = {
      data: {
        items: [
          {
            message: 'Add link to December 8 notes',
            author_name: 'Dan Abramov',
            commit_date: '2016-12-09'
          }
        ]
      }
    }
    const action = fulfillSearchCommits(payload);
    const state = {
      ...initialState,
      loading: false,
      error: false,
      commitsResponse: [...action.payload.data.items]
    }
    expect(commitsReducer(initialState, action)).toEqual(state);
  });
});
