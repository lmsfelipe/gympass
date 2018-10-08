import React from 'react';
import { storiesOf } from '@storybook/react';

import { Header, Title, Subtitle } from '../../../components';

storiesOf('Header', module)
  .add('Default', () => (
    <Header>
      <Title>Github API connect</Title>
      <Subtitle>Repos from user <strong>reactjs</strong></Subtitle>
    </Header>
  ));
