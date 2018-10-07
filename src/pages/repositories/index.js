import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getRepos, selectRepositories, selectLoading } from '../../store/repositories';
import { getCommits } from '../../store/commits';
import Commits from '../commits';

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

  renderRepos = () => {
    const { repos } = this.props;

    if (repos) {
      return repos.map(item => (
        <div key={item.id}>
          <button onClick={() => this.showCommitPage(item.name)}>{item.name}</button>
        </div>
      ));
    }

    return null;
  }

  render() {
    const { isLoading } = this.props;
    const { showCommitsComponent } = this.state;

    if (isLoading) {
      return 'Carregando...'
    }

    return (
      <Fragment>
        <h2>Repos</h2>
        {this.renderRepos()}
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
  getCommits
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
