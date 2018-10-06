import React, { Fragment } from 'react';
import Repositories from './pages/repositories';

const App = () => (
  <Fragment>
    <header className="App-header">
      <h1>Github API connect</h1>
    </header>
    <div className="container">
      <Repositories />
    </div>
  </Fragment>
);

export default App;
