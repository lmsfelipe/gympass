import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getRepos } from './store/repositories';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.props.getRepos()}>Redux Test</button>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getRepos }, dispatch);

export default connect(null, mapDispatchToProps)(App);
