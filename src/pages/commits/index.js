import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectCommits,
  selectLoading,
  searchCommits,
  getCommits,
  selectRepoName
} from '../../store/commits';

class Commits extends Component {
  state = {
    searchValue: ''
  }

  handleInputChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  searchCommits = (e) => {
    e.preventDefault();
    const { searchValue } = this.state;
    if (!searchValue) {
      return this.props.getCommits();
    }
    return this.props.searchCommits(searchValue);
  }

  cleanUp = () => {
    this.setState({ searchValue: '' });
    this.props.getCommits();
  }

  renderCommits = () => {
    const { commits } = this.props;

    if (commits && Array.isArray(commits)) {
      return commits.map(item => (
        <div key={item.sha} style={{ margin: '20px 0' }}>
          <div>{item.commit.author.name}</div>
          <div>{item.commit.message}</div>
        </div>
      ));
    } else if (commits.items.length !== 0) {
      return commits.items.map(item => (
        <div key={item.sha} style={{ margin: '20px 0' }}>
          <div>{item.commit.author.name}</div>
          <div>{item.commit.message}</div>
        </div>
      ));
    }

    return 'No matches were found';
  }

  render() {
    const { isLoading, selectedRepo } = this.props;
    const { searchValue } = this.state;
    
    return (
      <Fragment>
        <div style={{ margin: '10px 0' }}>
          <h3>Selected Repo: {selectedRepo}</h3>
          <form onSubmit={this.searchCommits}>
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
        {isLoading ? 'Carregando...' : this.renderCommits()}
      </Fragment>
    );
  }
}

Commits.propTypes = {
  commits: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool.isRequired
}

Commits.defaultProps = {
  commits: [],
}

const mapStateToProps = state => ({
  commits: selectCommits(state),
  isLoading: selectLoading(state),
  selectedRepo: selectRepoName(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchCommits,
  getCommits
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Commits);