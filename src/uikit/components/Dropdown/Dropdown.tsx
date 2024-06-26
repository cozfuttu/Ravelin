import React from 'react'
import styled from 'styled-components'
import { DropdownProps, PositionProps, Position } from './types'

const getLeft = ({ position }: PositionProps) => {
  if (position === 'top-right') {
    return '100%'
  }
  return '50%'
}

const DropdownContent = styled.div<{ position: Position }>`
  width: max-content;
  display: none;
  flex-direction: column;
  position: absolute;
  transform: translate(-50%, 0);
  left: ${getLeft};
  background-color: #165b54;
  box-shadow: ${({ theme }) => theme.shadows.level1};
  padding: 16px;
  max-height: 500px;
  transition: max-height 0.3s ease-out;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  border-radius: ${({ theme }) => theme.radii.small};
`

const Container = styled.div`
  position: relative;
  &:hover ${DropdownContent}, &:focus-within ${DropdownContent} {
    display: flex;
  }
`

const Dropdown: React.FC<DropdownProps> = ({ target, position = 'bottom', children }) => {
  return (
    <Container>
      {target}
      <DropdownContent position={position}>{children}</DropdownContent>
    </Container>
  )
}
Dropdown.defaultProps = {
  position: 'bottom',
}

export default Dropdown
