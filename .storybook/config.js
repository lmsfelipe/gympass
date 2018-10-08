import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import theme from '../src/theme/globalStyle';

const req = require.context('../src/stories/components', true, /_story\.js$/)

function loadStories() {
  require('../src/stories');
  req.keys().forEach(req)
}

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
))

configure(loadStories, module);
