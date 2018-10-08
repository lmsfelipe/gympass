import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, RepoContent, RepoLoader } from '../../components';
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
import {
  starSvg,
  forkSvg,
  FilterWrapper,
  RepoWrapper
} from './styles';

class Repositories extends Component {
  state = {
    selectedFilter: ''
  }

  componentDidMount() {
    this.props.getRepos();
  }

  showCommitPage = (repoName) => {
    const { resetCommits, selectedRepo, getCommits, history } = this.props;

    resetCommits();
    selectedRepo(repoName);
    getCommits({ page: 1 });
    history.push('/commits');
  }

  sortRepos = (filterName) => {
    this.setState({ selectedFilter: filterName })
    this.props.getFilteredRepos(filterName);
  }

  renderFilters = () => {
    const { selectedFilter } = this.state;
    const filterNames = ['stars', 'created', 'forks', 'size'];

    return filterNames.map((filterName, id) => (
      <Button key={id} className={selectedFilter === filterName ? 'selected' : ''} onClick={() => this.sortRepos(filterName)}>{filterName}</Button>
    ))
  }

  renderRepos = (repos) => repos && repos.map(item => (
    <RepoContent
      key={item.id}
      onClick={() => this.showCommitPage(item.name)}
    >
      <div className="repo-name">{item.name}</div>
      <div className="repo-infos">
        <span>{starSvg}</span>
        <span className="repo-info-label">{item.stargazers_count}</span>

        <span>{forkSvg}</span>
        <span className="repo-info-label">{item.forks}</span>
      </div>
    </RepoContent>
  ));

  render() {
    const { isLoading, repos } = this.props;

    return (
      <Fragment>
        <FilterWrapper>
          <p>Filters:</p>
          {this.renderFilters()}
        </FilterWrapper>
        <hr />
        <RepoWrapper>
          {isLoading ? <RepoLoader /> : this.renderRepos(repos)}
        </RepoWrapper>
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
