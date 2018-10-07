import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

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

const starSvg = <svg className="octicon octicon-star v-align-text-bottom" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
const forkSvg = <svg className="octicon octicon-repo-forked v-align-text-bottom" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>

const FilterButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.primaryColor};
  border-radius: 40px;
  padding: 6px 19px;
  margin-right: 15px;
  color: ${props => props.theme.primaryColor};
  text-transform: capitalize;
  font-size: 1em;
  font-weight: 100;
  cursor: pointer;
  outline: none;
  transition: ${props => props.theme.transition};

  &:hover,
  &.selected {
    background: ${props => props.theme.primaryColor};
    color: #fff;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  p {
    margin-right: 30px;
    font-size: 1.5em;
    font-weight: 100;
    color: ${props => props.theme.textColor};
  }
`;

const RepoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  & .repo-name {
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 5px;
  }

  & .repo-infos {
    display: flex;
  }

  & .repo-info-label {
    margin-left: 5px;
    margin-right: 10px;
  }
`;

const RepoContent = styled.div`
  width: 240px;
  padding: 20px 0px 20px 33px;
  margin: 10px;
  background: #fff;
  cursor: pointer;
  border-radius: 2px;
  border-top: 2px solid ${props => props.theme.primaryColor};
  box-shadow: ${props => props.theme.contentShadow};
  transition: ${props => props.theme.transition};

  &:hover {
    box-shadow: ${props => props.theme.contentShadowHover};
  }
`;

class Repositories extends Component {
  state = {
    showCommitsComponent: false,
    selectedFilter: ''
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
    this.setState({ selectedFilter: filterName })
    this.props.getFilteredRepos(filterName);
  }

  renderFilters = () => {
    const { selectedFilter } = this.state;
    const filterNames = ['stars', 'created', 'forks', 'size'];

    return filterNames.map((filterName, id) => (
      <FilterButton key={id} className={selectedFilter === filterName ? 'selected' : ''} onClick={() => this.sortRepos(filterName)}>{filterName}</FilterButton>
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
    const { showCommitsComponent } = this.state;

    return (
      <Fragment>
        <FilterWrapper>
          <p>Filters:</p>
          {this.renderFilters()}
        </FilterWrapper>
        <hr />
        <RepoWrapper>
          {isLoading ? 'Carregando...' : this.renderRepos(repos)}
        </RepoWrapper>
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
