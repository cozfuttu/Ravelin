import React, { useState } from 'react'
import styled from 'styled-components'
import { MENU_ENTRY_HEIGHT } from './config'
import { MenuEntry, LinkLabel } from './MenuEntry'
import { PushedProps } from './types'
import { ArrowDropDownIcon, ArrowDropUpIcon } from '../../components/Svg'

interface Props extends PushedProps {
  label: string
  initialOpenState?: boolean
  className?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
`

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? 'rgba(133, 133, 133, 0.1)' : 'transparent')};
  border-style: solid;
  border-width: 1px;
`

const Accordion: React.FC<Props> = ({
  label,
  isPushed,
  initialOpenState = false,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpenState)

  const handleClick = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <Container>
      <MenuEntry onClick={handleClick} className={className}>
        <LinkLabel isPushed={isPushed}>{label}</LinkLabel>
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </MenuEntry>
      <AccordionContent
        isOpen={isOpen}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        {isOpen && children}
      </AccordionContent>
    </Container>
  )
}

export default Accordion
