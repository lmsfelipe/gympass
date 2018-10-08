import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.primaryColor};
  border-radius: 40px;
  padding: 6px 19px;
  margin-right: 15px;
  color: ${props => props.theme.primaryColor};
  text-transform: capitalize;
  font-size: 1em;
  font-weight: 100;
  cursor: pointer;
  outline: none;
  transition: ${props => props.theme.transition};

  &:hover,
  &.selected {
    background: ${props => props.theme.primaryColor};
    color: #fff;
  }
`;

export default Button;
