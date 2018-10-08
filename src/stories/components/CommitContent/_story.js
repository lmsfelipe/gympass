import React from 'react';
import { storiesOf } from '@storybook/react';

import { CommitsContent } from '../../../components';

storiesOf('Commits Timeline', module)
  .add('Default', () => (
    <div style={{ marginLeft: '50px' }}>
      <CommitsContent>
        <div className="commit-text">Upgrade dev deps, rebuild lock files</div>
        <div>
          <div className="commit-author">Tim Dorr | 2016-02-10</div>
        </div>
      </CommitsContent>
      <CommitsContent>
        <div className="commit-text">Merge pull request #14 from reactjs/vjeux-patch-1 Removing the license section</div>
        <div>
          <div className="commit-author">Michael Jackson | 2016-02-12</div>
        </div>
      </CommitsContent>
      <CommitsContent>
        <div className="commit-text">
          Removing the license section With the merge of the org, there are repos that 
          are under Facebook BSD license which is not MIT/ISC nor owned by a non-profit (Facebook). I believe 
          that "the owners of a project can continue to maintain it" is mostly true, regardless of the license of acquisitions. 
          The problem usually come when the owners leave and the project is left to an uncertain future.
        </div>
        <div>
          <div className="commit-author">Christopher Chedeau | 2016-02-12</div>
        </div>
      </CommitsContent>
      <CommitsContent>
        <div className="commit-text">Update CNAME</div>
        <div>
          <div className="commit-author">Michael Jackson | 2016-02-11</div>
        </div>
      </CommitsContent>
    </div>
  ));
