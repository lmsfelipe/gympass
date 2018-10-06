import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getRepos, selectRepositories } from '../../store/repositories';

class Repositories extends Component {
  componentDidMount() {
    this.props.getRepos();
  }

  renderRepos = () => {
    const { repos } = this.props;

    if (repos) {
      return repos.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
        </div>
      ));
    }

    return null;
  }

  render() {
    console.log('Repos =>', this.props.repos);
    return (
      <Fragment>
        <h2>Repos</h2>
        {this.renderRepos()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  repos: selectRepositories(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRepos
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
