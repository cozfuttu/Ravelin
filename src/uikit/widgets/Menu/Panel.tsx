import React from 'react'
import styled from 'styled-components'
import { Link } from 'uikit'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from './config'
import { PanelProps, PushedProps } from './types'


interface Props extends PanelProps, PushedProps {
  showMenu: boolean
  isMobile: boolean
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  justify-content: space-between;
  background-color: ${({ theme }) => theme.nav.background};
  width: 100vw;
  z-index: 11;
`

const Panel: React.FC<Props> = ({ ...props }) => {
  const { isPushed, showMenu } = props
  return (
    <StyledPanel isPushed={isPushed} showMenu={showMenu}>       
      <PanelBody {...props}/>        
    </StyledPanel>
  )
}

export default Panel
