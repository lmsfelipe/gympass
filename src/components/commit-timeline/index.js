import styled from 'styled-components';

const CommitsContent = styled.div`
  padding: 15px 25px;
  position: relative;

  &::before {
    content: '';
    height: 100%;
    width: 1px;
    position: absolute;
    top: 35px;
    right: 100%;
    background: #c3c3c3;
  }

  &::after {
    content: '';
    height: 11px;
    width: 11px;
    position: absolute;
    top: 35px;
    left: -7px;
    border-radius: 50%;
    border: 1px solid #c75071;
    background: #f5f5f5;
  }

  &:last-child:before {
    content: '';
    height: 0px;
  }

  & .commit-text {
    font-size: 1.2em;
    font-weight: 500;
  }

  & .commit-author {
    font-size: 1em;
    color: ${props => props.theme.textColor};
    margin-top: 3px;
  }

  & .commit-date {
    font-size: 1em;
    color: ${props => props.theme.textColor};
    margin-top: 3px;
  }
`;

export default CommitsContent;
