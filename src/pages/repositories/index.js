import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Commits from '../commits';
import {
  getCommits,
  selectedRepo,
  resetCommits
} from '../../store/commits';
import {
  getRepos,
  selectRepositories,
  selectLoading,
  getFilteredRepos
} from '../../store/repositories';

class Repositories extends Component {
  state = {
    showCommitsComponent: false
  }

  componentDidMount() {
    this.props.getRepos();
  }

  showCommitPage = (repoName) => {
    const { resetCommits, selectedRepo, getCommits } = this.props;
    this.setState({ showCommitsComponent: true });

    resetCommits();
    selectedRepo(repoName);
    getCommits({ page: 1 });
  }

  sortRepos = (filterName) => {
    this.props.getFilteredRepos(filterName);
  }

  renderFilters = () => {
    const filterNames = ['stars', 'created', 'forks', 'size'];

    return filterNames.map((filterName, id) => (
      <div key={id}>
        <button onClick={() => this.sortRepos(filterName)}>{filterName}</button>
      </div>
    ))
  }

  renderRepos = (repos) => repos && repos.map(item => (
    <div key={item.id} style={{ margin: '10px 0' }}>
      <button onClick={() => this.showCommitPage(item.name)}>{item.name} *{item.stargazers_count}</button>
    </div>
  ));

  render() {
    const { isLoading, repos } = this.props;
    const { showCommitsComponent } = this.state;

    return (
      <Fragment>
        <h2>Repos</h2>
        {this.renderFilters()}
        <hr />
        {isLoading ? 'Carregando...' : this.renderRepos(repos)}
        {showCommitsComponent && <Commits />}
      </Fragment>
    );
  }
}

Repositories.propTypes = {
  getRepos: PropTypes.func.isRequired,
  getCommits: PropTypes.func.isRequired,
  repos: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  resetCommits: PropTypes.func.isRequired,
  selectedRepo: PropTypes.func.isRequired,
  getFilteredRepos: PropTypes.func.isRequired,
}

Repositories.defaultProps = {
  repos: [],
}

const mapStateToProps = state => ({
  repos: selectRepositories(state),
  isLoading: selectLoading(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRepos,
  getCommits,
  getFilteredRepos,
  selectedRepo,
  resetCommits
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
