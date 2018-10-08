import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { InfiniteScroll, Button } from '../../components';
import {
  selectCommits,
  selectLoading,
  searchCommits,
  getCommits,
  resetCommits,
  selectRepoName,
  selectPageNumber,
  selectLoadMoreCommits,
  selectError
} from '../../store/commits';
import {
  RepoTitle,
  SearchWrapper,
  CommitsWrapper,
  CommitsContent,
  Input,
  ClearButton
} from './styles';

class Commits extends Component {
  state = {
    searchValue: '',
    searchingMode: false
  }

  componentDidMount() {
    this.props.getCommits({ page: 1 });
  }

  handleInputChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { searchValue } = this.state;
    const { searchCommits, resetCommits } = this.props;
    this.setState({ searchingMode: true });

    if (!searchValue) {
      return null;
    }

    resetCommits();
    return searchCommits({ searchValue, page: 1 });
  }

  cleanUp = () => {
    const { getCommits, resetCommits } = this.props;

    this.setState({ searchValue: '', searchingMode: false });
    resetCommits();
    getCommits({ page: 1 });
  }

  handleLoadCommits = () => {
    const { pageNumber, searchCommits, getCommits } = this.props;
    const { searchingMode, searchValue } = this.state;
    const page = pageNumber + 1;

    if (searchingMode) {
      return searchCommits({ searchValue, page });
    }

    return getCommits({ page });
  }

  renderCommits = (commits) => commits && commits.map(item => (
    <CommitsContent key={item.sha}>
      <div className="commit-text">{item.commit.message}</div>
      <div>
        <div className="commit-author">{item.commit.author.name} | {item.commit.committer.date.substring(0, 10)}</div>
      </div>
    </CommitsContent>
  ));

  render() {
    const { isLoading, selectedRepo, loadMoreCommits, commits, error, history } = this.props;
    const { searchValue } = this.state;

    if (error) {
      return (
        <div style={{ textAlign: 'center' }}>
          <RepoTitle>No repo selected</RepoTitle>
          <Button onClick={() => history.push('/repositories')}>Select repo</Button>
        </div>
      );
    }
    
    return (
      <Fragment>
        <RepoTitle>Selected Repo: <strong>{selectedRepo || 'felipe'}</strong></RepoTitle>
        <form onSubmit={this.handleSubmit}>
          <SearchWrapper>
            <Button onClick={() => history.push('/repositories')}>Back</Button>
            <Input
              name="commit-search"
              type="text"
              placeholder="Search commits"
              value={searchValue}
              onChange={this.handleInputChange}
            />
            <ClearButton type="button" onClick={this.cleanUp}>X</ClearButton>
          </SearchWrapper>
        </form>
        <InfiniteScroll
          onReload={this.handleLoadCommits}
          isLoading={isLoading}
          loadMore={loadMoreCommits}
        >
          <CommitsWrapper>
            {this.renderCommits(commits)}
          </CommitsWrapper>
        </InfiniteScroll>
      </Fragment>
    );
  }
}

Commits.propTypes = {
  commits: PropTypes.PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  searchCommits: PropTypes.func.isRequired,
  resetCommits: PropTypes.func.isRequired,
  getCommits: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  selectedRepo: PropTypes.string.isRequired,
  loadMoreCommits: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
}

Commits.defaultProps = {
  commits: [],
}

const mapStateToProps = state => ({
  commits: selectCommits(state),
  isLoading: selectLoading(state),
  selectedRepo: selectRepoName(state),
  pageNumber: selectPageNumber(state),
  loadMoreCommits: selectLoadMoreCommits(state),
  error: selectError(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchCommits,
  getCommits,
  resetCommits
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Commits);