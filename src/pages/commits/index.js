import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectCommits, selectLoading } from '../../store/commits';

class Commits extends Component {
  renderCommits = () => {
    const { commits } = this.props;

    if (commits) {
      return commits.map(item => (
        <div key={item.sha} style={{ margin: '30px 0' }}>
          <div>{item.commit.author.name}</div>
          <div>{item.commit.message}</div>
        </div>
      ));
    }

    return null;
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return 'Carregando...'
    }

    return (
      <Fragment>
        {this.renderCommits()}
      </Fragment>
    );
  }
}

Commits.propTypes = {
  commits: PropTypes.array,
}

Commits.defaultProps = {
  commits: [],
}

const mapStateToProps = state => ({
  commits: selectCommits(state),
  isLoading: selectLoading(state)
});

export default connect(mapStateToProps, null)(Commits);