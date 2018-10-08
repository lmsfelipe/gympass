import { injectGlobal } from 'styled-components';

/* eslint-disable no-unused-expressions */

/**
  * Theme
  */
const theme = {
  primaryColor: '#6f36b5',
  textColor: '#5f5f5f',
  borderRadius: '2px',
  transition: 'all 0.2s',
  contentShadow: '3px 3px 6px #00000026',
  contentShadowHover: '1px 1px 3px #0000003d'
};

/**
  * Global CSS
  */
injectGlobal`
  body {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    background: #f5f5f5;
    color: #444;
    margin: 0;
    padding-bottom: 100px;
  }

  hr {
    margin: 20px 0;
    color: #dadada;
    background-color: #dadada;
    border-top: 1px solid #dadada;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;

    @media (max-width: 768px) {
      margin: 20px 0;
    }
  }
`;

export default theme;
