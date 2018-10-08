import styled from 'styled-components';

const CommitsContent = styled.div`
  padding: 15px 25px;
  position: relative;

  &::before {
    content: '';
    height: 100%;
    width: 1px;
    position: absolute;
    top: 33px;
    right: 100%;
    background: #c3c3c3;
  }

  &::after {
    content: '';
    height: 11px;
    width: 11px;
    position: absolute;
    top: 33px;
    left: -7px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.primaryColor};
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

  & .commit-author-avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    margin-bottom: 10px;
    border-radius: 50%;

    & img {
      width: 100%;
    }
  }
`;

export default CommitsContent;
