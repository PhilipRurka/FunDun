import React from 'react'
import { ButtonWrapper } from '../styled/button'
import { getContrast } from '../utils/getContrast'

const Button = ({
  bgColor,
  handleOnClick,
  children
}) => {
  
  return (
    <ButtonWrapper
      bgColor={bgColor}
      fontColor={getContrast(bgColor)}
      onClick={handleOnClick} >
      {children}
    </ButtonWrapper>
  )
}

export default Button