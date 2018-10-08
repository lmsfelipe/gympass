import React, { Fragment } from 'react';

import { Container, Header, Title, Subtitle } from './components';
import Routes from './routes';

const App = () => (
  <Fragment>
    <Header>
      <Title>Github API connect</Title>
      <Subtitle>Repos from user <strong>reactjs</strong></Subtitle>
    </Header>
    <Container>
      <Routes />
    </Container>
  </Fragment>
);

export default App;
