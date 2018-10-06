import React, { Component } from 'react';
import Repositories from './pages/repositories';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Github API connect</h1>
        </header>
        <Repositories />
      </div>
    );
  }
}

export default App;
