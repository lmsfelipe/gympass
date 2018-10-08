import styled from 'styled-components';

const RepoContent = styled.div`
  width: 240px;
  padding: 20px 0px 20px 33px;
  margin: 10px;
  background: #fff;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  border-top: 2px solid ${props => props.theme.primaryColor};
  box-shadow: ${props => props.theme.contentShadow};
  transition: ${props => props.theme.transition};

  &:hover {
    box-shadow: ${props => props.theme.contentShadowHover};
  }

  & .repo-name {
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 5px;
  }

  & .repo-infos {
    display: flex;
  }

  & .repo-info-label {
    margin-left: 5px;
    margin-right: 10px;
  }
`;

export default RepoContent;
