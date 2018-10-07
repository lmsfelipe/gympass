import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Container } from './components';
import Repositories from './pages/repositories';

const Header = styled.header`
  padding: 30px;
  margin-bottom: 20px;
  background: ${props => props.theme.primaryColor};
`;

const Title = styled.h1`
  margin-bottom: 0;
  text-align: center;
  font-size: 3.5em;
  font-weight: 100;
  color: #fff;
`;

const Subtitle = styled.h2`
  margin-top: 5px;
  text-align: center;
  font-size: 2em;
  font-weight: 100;
  color: #fff;
`;

const App = () => (
  <Fragment>
    <Header>
      <Title>Github API connect</Title>
      <Subtitle>Repos from user <strong>reactjs</strong></Subtitle>
    </Header>
    <Container>
      <Repositories />
    </Container>
  </Fragment>
);

export default App;
