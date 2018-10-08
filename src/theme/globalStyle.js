import { injectGlobal } from 'styled-components';

/* eslint-disable no-unused-expressions */

/**
  * Theme
  */
const theme = {
  primaryColor: '#d63f6d',
  primaryColorHover: '#d23b70',
  secondaryColor: '#f5f5f5',
  textColor: '#5f5f5f',
  warningColor: '#b77d0c',
  dangerColor: '#e20322',
  fontFamily: 'Source Sans Pro',
  fontSizeNormal: '1.2em',
  letterSpacing: '0.09em',
  borderRadius: '2px',
  transition: 'all 0.2s',
  boxShadow: '1px 1px 2px #0000001c',
  contentShadow: '3px 3px 6px #00000026',
  contentShadowHover: '1px 1px 3px #0000003d'
};

/**
  * Global CSS
  */
injectGlobal`
  body {
    font-family: 'Roboto', sans-serif;;
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
