import styled from 'styled-components';

const RepoTitle = styled.h3`
  text-align: center;
  font-size: 1.75em;
  font-weight: 100;
  color: ${props => props.theme.textColor};
`;

const SearchWrapper = styled.div`
  width: 450px;
  margin: 0 auto;
`;

const CommitsWrapper = styled.div`
  width: 600px;
  margin: 40px auto;
  padding: 10px 0;
`;

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

const Input = styled.input`
  width: 80%;
  padding: 15px 16px;
  margin-right: 15px;
  color: ${props => props.theme.primaryColor};
  background: #fff;
  font-size: 1.5em;
  font-weight: 200;
  outline: none;
  border: none;
  box-shadow: ${props => props.theme.contentShadow};
  transition: ${props => props.theme.transition};

  &:focus {
    box-shadow: ${props => props.theme.contentShadowHover};
  }

  &::placeholder {
    color: #b7b7b7;
    font-weight: 100;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  font-size: 1em;
  font-weight: 300;
  color: ${props => props.theme.primaryColor};
  border: 1px solid;
  border-radius: 50%;
  padding: 6px 10px;
  cursor: pointer;
`;

export {
  RepoTitle,
  SearchWrapper,
  CommitsWrapper,
  CommitsContent,
  Input,
  ClearButton
};
