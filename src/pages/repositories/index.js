import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Commits from '../commits';
import { getCommits } from '../../store/commits';
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
    this.setState({ showCommitsComponent: true })
    this.props.getCommits(repoName);
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

  renderRepos = () => {
    const { repos } = this.props;

    // TODO CRIAR COMPNENTES REPETIDO ABAIXO
    if (repos && Array.isArray(repos)) {
      return repos.map(item => (
        <div key={item.id} style={{ margin: '10px 0' }}>
          <button onClick={() => this.showCommitPage(item.name)}>{item.name} *{item.stargazers_count}</button>
        </div>
      ));
    } else if (repos.items.length !== 0) {
      return repos.items.map(item => (
        <div key={item.id} style={{ margin: '10px 0' }}>
          <button onClick={() => this.showCommitPage(item.name)}>{item.name} *{item.stargazers_count}</button>
        </div>
      ));
    }

    return 'No filters';
  }

  render() {
    const { isLoading } = this.props;
    const { showCommitsComponent } = this.state;

    return (
      <Fragment>
        <h2>Repos</h2>
        {this.renderFilters()}
        <hr />
        {isLoading ? 'Carregando...' : this.renderRepos()}
        {showCommitsComponent && <Commits />}
      </Fragment>
    );
  }
}

Repositories.propTypes = {
  getRepos: PropTypes.func.isRequired,
  getCommits: PropTypes.func.isRequired,
  repos: PropTypes.array,
  isLoading: PropTypes.bool.isRequired
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
  getFilteredRepos
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
