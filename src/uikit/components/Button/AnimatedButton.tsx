import React from 'react'
import styled, { keyframes } from 'styled-components'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import StyledButton from './StyledButton'
import { ButtonProps, variants, sizes } from './types'

const ANIMATION_FREQUENCY = 2.5
const ANIMATION_DELAY = 0.25

const ButtonAnim1 = keyframes`
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
`

const Anim1 = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: ${ButtonAnim1} ${ANIMATION_FREQUENCY}s linear infinite;
`

const ButtonAnim2 = keyframes`
   0% {
    top: -100%;
  }
  50% {
    top: 100%;
  }
  100% {
    top: 100%;
  }
`

const Anim2 = styled.div`
  position: absolute;
  display: block;
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: ${ButtonAnim2} ${ANIMATION_FREQUENCY}s linear infinite;
  animation-delay: ${ANIMATION_DELAY}s;
`

const ButtonAnim3 = keyframes`
  0% {
    right: -100%;
  }
  50% {
    right: 100%;
  }
  100% {
    right: 100%;
  }
`

const Anim3 = styled.div`
  position: absolute;
  display: block;
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: ${ButtonAnim3} ${ANIMATION_FREQUENCY}s linear infinite;
  animation-delay: ${2 * ANIMATION_DELAY}s;
`

const ButtonAnim4 = keyframes`
0% {
    bottom: -100%;
  }
  50% {
    bottom: 100%;
  }
  100% {
    bottom: 100%;
  }
`

const Anim4 = styled.div`
  position: absolute;
  display: block;
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: ${ButtonAnim4} ${ANIMATION_FREQUENCY}s linear infinite;
  animation-delay: ${3 * ANIMATION_DELAY}s;
`

const ButtonContainer = styled(StyledButton)`
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px;

  &:hover {
    background: #03e9f4;
    background-color: #03e9f4 !important;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
  }
`

const AnimatedButton: React.FC<ButtonProps> = ({ startIcon, endIcon, children, external, isLoading, disabled, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = isLoading || disabled

  return (
    <ButtonContainer {...internalProps} {...props} isLoading={isLoading} disabled={isDisabled}>
      <Anim1 />
      <Anim2 />
      <Anim3 />
      <Anim4 />

      {children}
    </ButtonContainer>
  )
}

AnimatedButton.defaultProps = {
  variant: variants.PRIMARY,
  size: sizes.MD,
  external: false,
  isLoading: false,
  disabled: false,
}

export default AnimatedButton
