import styled from 'styled-components';

const RepoTitle = styled.h3`
  text-align: center;
  font-size: 1.75em;
  font-weight: 100;
  color: ${props => props.theme.textColor};
`;

const SearchWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
`;

const CommitsWrapper = styled.div`
  width: 460px;
  margin: 40px auto;
  padding: 10px 0;
`;

const Input = styled.input`
  width: 70%;
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
  Input,
  ClearButton
};
