import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestRepo } from './store/repositories';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.props.requestRepo('some data')}>Redux Test</button>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestRepo }, dispatch);

export default connect(null, mapDispatchToProps)(App);
