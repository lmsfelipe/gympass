import React from 'react';
import { storiesOf } from '@storybook/react';

import { CommitLoader, RepoLoader } from '../../../components';

storiesOf('Loaders', module)
  .add('Commit', () => <CommitLoader />)
  .add('Repo', () => <RepoLoader />);
