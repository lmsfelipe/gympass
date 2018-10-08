import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { CommitLoader } from '../../components';

class InfiniteScroll extends Component {
  componentDidMount() {
    window.onscroll = this.handleReload;
  }

  handleReload = () => {
    const { onReload, isLoading, loadMore } = this.props;

    if (isLoading) return null;

    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && loadMore) {
      onReload();
    }
  }

  render() {
    const { children, isLoading } = this.props;

    return (
      <Fragment>
        {children}
        {isLoading && <CommitLoader />}
      </Fragment>
    );
  }
}

InfiniteScroll.propTypes = {
  children: PropTypes.node.isRequired,
  onReload: PropTypes.func.isRequired,
  loader: PropTypes.node
};

InfiniteScroll.defaultProps = {
  loader: null 
};

export default InfiniteScroll;
