import React, { useState } from 'react'
import styled from 'styled-components'
import { MENU_ENTRY_HEIGHT } from './config'
import { MenuEntry, LinkLabel } from './MenuEntry'
import { PushedProps } from './types'

interface Props extends PushedProps {
  label: string
  initialOpenState?: boolean
  className?: string
  color?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // Safari fix
  flex-shrink: 0;
  margin-bottom: 12px;
`

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: ${({ isOpen, maxHeight }) => (isOpen ? `8px` : 0)};
  margin-top: 28px;
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: all 0.3s ease-out;
  overflow: hidden;
  background: linear-gradient(0deg,rgba(0,62,120,1) 0%,rgba(0,122,190,1) 100%);
  box-shadow: 5px 4px 4px -8px #1a4d5d55, 1px 1px 1px #1a4d5d33;
  width: ${({ maxHeight }) => maxHeight};
`

const Accordion: React.FC<Props> = ({
  label,
  isPushed,
  initialOpenState = false,
  children,
  className,
  color,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpenState)

  const hide = () => {
    setIsOpen(false)
  }

  const show = () => {
    setIsOpen(true)
  }

  return (
    <Container onMouseEnter={show} onMouseLeave={hide}>
      <MenuEntry className={className} style={{ padding: '0' }} >
        <LinkLabel isPushed={isPushed} style={{ fontFamily: 'Inter', color: '#ededed', fontWeight: '700', fontSize: '14px' }}>{label}</LinkLabel>
      </MenuEntry>
      <AccordionContent
        isOpen={isOpen}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        <div style={{ padding: '0 8px 8px 8px' }}>
          {children}
        </div>
      </AccordionContent>
    </Container>
  )
}

export default Accordion
