import styled from 'styled-components'
import Button from './Button'
import { ButtonProps } from './types'

const IconButton = styled(Button) <ButtonProps>`
  padding: 0;
  width: ${({ size }) => (size === 'sm' ? '32px' : '48px')};
  transition: 300ms;

  :hover {
    opacity: 0.6;
  }
`

export default IconButton
