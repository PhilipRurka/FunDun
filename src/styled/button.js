import styled from "styled-components";

export const ButtonWrapper = styled.button`
  padding: 15px 25px;
  text-transform: uppercase;
  color: ${props => props.fontColor};
  border-radius: 30px;
  cursor: pointer;
  bordeR: none;
  background-color: ${props => props.bgColor};
`