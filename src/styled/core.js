import styled from "styled-components";

export const CoreWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  color: ${props => props.fontColor};
  background-color: ${props => props.bgColor};
`

export const CoreContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

export const Title = styled.h1`
  text-transform: uppercase;
  margin: 0 0 20px 0;
  font-size: 25px;
  font-weight: 100;
  color: inherit;
`

export const Score = styled.span`
  display: block;
  color: inherit;
  margin: 20px 0 40px 0;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  margin: 0 auto 40px auto;
`
export const Level = styled.span`
  display: block;
  color: inherit;
`

export const StatusWrapper = styled.div`
overflow: hidden;
  height: 100%;
  max-height: ${props => props.isExpanded ? '50px' : 0};
  transition: max-height 0.3s ease;
`

export const Status = styled.p``