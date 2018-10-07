import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { InfiniteScroll } from '../../components';
import {
  selectCommits,
  selectLoading,
  searchCommits,
  getCommits,
  resetCommits,
  selectRepoName,
  selectPageNumber,
  selectLoadMoreCommits
} from '../../store/commits';

class Commits extends Component {
  state = {
    searchValue: '',
    searchingMode: false
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
    <div key={item.sha} style={{ margin: '20px 0' }}>
      <div>{item.commit.author.name}</div>
      <div>{item.commit.message}</div>
    </div>
  ));

  render() {
    const { isLoading, selectedRepo, loadMoreCommits, commits } = this.props;
    const { searchValue } = this.state;
    
    return (
      <Fragment>
        <div style={{ margin: '10px 0' }}>
          <h3>Selected Repo: {selectedRepo}</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              name="commit-search"
              type="text"
              placeholder="Search commit"
              value={searchValue}
              onChange={this.handleInputChange}
            />
            <button type="submit">Search</button>
            <button type="button" onClick={this.cleanUp}>Clear</button>
          </form>
        </div>
        <InfiniteScroll
          onReload={this.handleLoadCommits}
          isLoading={isLoading}
          loadMore={loadMoreCommits}
        >
          {this.renderCommits(commits)}
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
}

Commits.defaultProps = {
  commits: [],
}

const mapStateToProps = state => ({
  commits: selectCommits(state),
  isLoading: selectLoading(state),
  selectedRepo: selectRepoName(state),
  pageNumber: selectPageNumber(state),
  loadMoreCommits: selectLoadMoreCommits(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchCommits,
  getCommits,
  resetCommits
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Commits);