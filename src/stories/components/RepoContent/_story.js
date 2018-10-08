import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RepoContent } from '../../../components';
import { starSvg, forkSvg } from '../../../pages/repositories/styles';

storiesOf('Repositories Box', module)
  .add('Default', () => (
    <RepoContent
      onClick={action('clicked')}
    >
      <div className="repo-name">reactjs</div>
      <div className="repo-infos">
        <span>{starSvg}</span>
        <span className="repo-info-label">433</span>

        <span>{forkSvg}</span>
        <span className="repo-info-label">245</span>
      </div>
    </RepoContent>
  ));
