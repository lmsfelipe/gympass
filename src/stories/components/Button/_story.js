import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../../../components';

storiesOf('Button', module)
  .add('Primary', () => <Button onClick={action('clicked')}>Button</Button>);
